"use client";

import { markdownToHtml } from "@/lib/utilities/markdown";
import React, { useState } from "react";
import { FiEye, FiEdit3 } from "react-icons/fi";

interface MarkdownEditorProps {
    value: string;
    onChange: (v: string) => void;
    label?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    hint?: string;
}

export function MarkdownEditor({ value, onChange, label = "Content", placeholder = "Write your markdown content here...", rows = 16, disabled, hint }: MarkdownEditorProps) {
    const [preview, setPreview] = useState(false);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-neutral-300">{label}</label>
                <div className="flex items-center gap-1 p-1 bg-neutral-800 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${!preview ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                        <FiEdit3 size={12} /> Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${preview ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                        <FiEye size={12} /> Preview
                    </button>
                </div>
            </div>

            {preview ? (
                <div
                    className="min-h-[200px] w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 prose prose-invert prose-sm max-w-none overflow-auto markdown-content dark"
                    style={{ minHeight: `${rows * 1.5}rem` }}
                    dangerouslySetInnerHTML={{ __html: value ? markdownToHtml(value) : '<span class="text-neutral-600">Nothing to preview</span>' }}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y font-mono leading-relaxed"
                />
            )}

            {hint && <p className="text-xs text-neutral-500">{hint}</p>}
        </div>
    );
}