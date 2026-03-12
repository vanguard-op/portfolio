"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiUpload, FiChevronDown, FiSearch, FiX, FiImage, FiLoader, FiCheck } from "react-icons/fi";
import { useRepository } from "../lib/hooks/use-repository";

interface ImageItem {
    key: string;
    url: string;
}

interface ImagePickerProps {
    label?: string;
    /** The current S3 key value */
    value: string;
    /** Called with the selected/uploaded S3 key */
    onChange: (key: string) => void;
    hint?: string;
    /** S3 directory to list existing images from (default: "images") */
    directory?: string;
}

export function ImagePicker({ label = "Image", value, onChange, hint, directory = "images" }: ImagePickerProps) {
    const repo = useRepository();
    const [images, setImages] = useState<ImageItem[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [loadingList, setLoadingList] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch preview URL for current value
    useEffect(() => {
        if (!value) { setPreviewUrl(""); return; }
        // If it already looks like a URL, use directly
        if (value.startsWith("http")) { setPreviewUrl(value); return; }
        // Otherwise resolve via backend media redirect
        setPreviewUrl(repo.getMediaUrl(value));
    }, [value, repo]);

    // Reset when directory changes
    useEffect(() => {
        setImages([]);
        setHasLoaded(false);
    }, [directory]);

    const fetchImages = useCallback(async () => {
        if (hasLoaded || loadingList) return;
        setLoadingList(true);
        try {
            const data = await repo.listMedia(directory, 50);
            setImages(prev => {
                // Merge server results with local state, avoiding duplicates
                const localKeys = new Set(prev.map(i => i.key));
                const serverItems = data.filter(i => !localKeys.has(i.key));
                return [...prev, ...serverItems];
            });
            setHasLoaded(true);
        } catch {
            setImages(prev => prev); // keep local if fetch fails
        } finally {
            setLoadingList(false);
        }
    }, [directory, hasLoaded, loadingList, repo]);

    const handleOpen = () => {
        setOpen(true);
        fetchImages();
    };

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (item: ImageItem) => {
        onChange(item.key);
        setOpen(false);
        setSearch("");
    };

    const handleClear = () => {
        onChange("");
        setPreviewUrl("");
    };

    /** Upload a local file to S3 via presigned URL */
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setUploadError(null);
        try {
            // 1. Get presigned upload URL via repository
            const { url, key } = await repo.getMediaUploadUrl(directory, file.name, file.type);

            // 2. PUT the file directly to S3 via repository
            await repo.uploadToS3(url, file, file.type);

            onChange(key);
            // Add new item to the local list so it shows in dropdown immediately
            const localUrl = URL.createObjectURL(file);
            setImages(prev => [{ key, url: localUrl }, ...prev.filter(i => i.key !== key)]);
            setPreviewUrl(localUrl);
        } catch (err) {
            setUploadError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setUploading(false);
            // Reset file input so the same file can be re-selected
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const filtered = images.filter(img =>
        img.key.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-neutral-300">{label}</label>}

            {/* Selected image preview */}
            {previewUrl && (
                <div className="relative w-full aspect-video max-h-48 rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700">
                    <img
                        src={previewUrl}
                        alt="Selected image preview"
                        className="w-full h-full object-cover"
                        onError={() => setPreviewUrl("")}
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    >
                        <FiX size={14} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-neutral-950/90 to-transparent">
                        <p className="text-xs text-neutral-300 font-mono truncate">{value}</p>
                    </div>
                </div>
            )}

            {/* Controls row */}
            <div className="flex gap-2">
                {/* Dropdown trigger */}
                <div className="flex-1 relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={handleOpen}
                        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-xl text-sm transition-colors text-left"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <FiImage size={15} className="text-neutral-500 shrink-0" />
                            <span className={`truncate ${value ? "text-neutral-100" : "text-neutral-600"}`}>
                                {value ? value.split("/").pop() : "Select existing image..."}
                            </span>
                        </div>
                        <FiChevronDown size={14} className={`text-neutral-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown panel */}
                    {open && (
                        <div className="absolute z-50 mt-1.5 left-0 right-0 bg-neutral-900 border border-neutral-700 rounded-xl shadow-xl overflow-hidden">
                            {/* Search */}
                            <div className="p-2 border-b border-neutral-800">
                                <div className="relative">
                                    <FiSearch size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                                    <input
                                        autoFocus
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        placeholder="Search images..."
                                        className="w-full pl-8 pr-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Image list */}
                            <div className="max-h-56 overflow-y-auto">
                                {loadingList ? (
                                    <div className="flex items-center justify-center py-8 gap-2 text-neutral-500 text-sm">
                                        <FiLoader className="animate-spin" size={16} /> Loading images...
                                    </div>
                                ) : filtered.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-8 text-neutral-600 text-sm gap-2">
                                        <FiImage size={24} />
                                        {search ? "No images match your search" : "No images found in this directory"}
                                    </div>
                                ) : (
                                    filtered.map(item => (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => handleSelect(item)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-800 transition-colors text-left ${value === item.key ? "bg-blue-500/10" : ""}`}
                                        >
                                            {/* Thumbnail */}
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0 border border-neutral-700">
                                                <img
                                                    src={item.url}
                                                    alt={item.key}
                                                    className="w-full h-full object-cover"
                                                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                />
                                            </div>
                                            {/* Key */}
                                            <span className="text-xs text-neutral-300 font-mono truncate flex-1">{item.key}</span>
                                            {value === item.key && <FiCheck size={14} className="text-blue-400 shrink-0" />}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Upload new image button */}
                <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-60 border border-neutral-700 rounded-xl text-sm text-neutral-300 transition-colors shrink-0"
                    title="Upload a new image from your device"
                >
                    {uploading ? <FiLoader size={16} className="animate-spin" /> : <FiUpload size={16} />}
                    <span className="hidden sm:inline">{uploading ? "Uploading..." : "Upload"}</span>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                />
            </div>

            {uploadError && <p className="text-xs text-red-400">{uploadError}</p>}
            {hint && <p className="text-xs text-neutral-500">{hint}</p>}
        </div>
    );
}
