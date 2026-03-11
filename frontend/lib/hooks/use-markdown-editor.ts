"use client";

import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Uploads markdown content to S3 via a presigned URL.
 * @param directory - The S3 directory ("articles" | "projects" | "reviews" | "services")
 * @param filename  - The .md filename (without extension; extension appended automatically)
 * @param content   - The markdown text to upload
 * @returns The S3 key (content_uri) to store on the entity
 */
export async function uploadMarkdown(directory: string, filename: string, content: string): Promise<string> {
    const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;

    // 1. Get presigned upload URL
    const urlRes = await fetch(`${API_BASE}/v1/media/upload-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ directory, filename: safeFilename }),
    });
    if (!urlRes.ok) throw new Error("Failed to get upload URL");
    const presignedUrl: string = await urlRes.json();

    // 2. PUT the markdown content to S3 via the presigned URL
    const putRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": "text/markdown" },
        body: content,
    });
    if (!putRes.ok) throw new Error("Failed to upload content to S3");

    // Return the S3 key (directory/filename)
    return `${directory}/${safeFilename}`;
}

/**
 * Fetches existing markdown content from a content_url (presigned GET URL or redirect).
 */
export async function fetchMarkdownContent(contentUrl: string): Promise<string> {
    if (!contentUrl) return "";
    try {
        const res = await fetch(contentUrl);
        if (!res.ok) return "";
        return await res.text();
    } catch {
        return "";
    }
}

/**
 * Hook to manage a markdown editor textarea with S3 upload/load capability.
 */
export function useMarkdownEditor(initialContentUrl?: string) {
    const [content, setContent] = useState("");
    const [loadingContent, setLoadingContent] = useState(false);

    useEffect(() => {
        if (!initialContentUrl) return;
        setLoadingContent(true);
        fetchMarkdownContent(initialContentUrl)
            .then(setContent)
            .finally(() => setLoadingContent(false));
    }, [initialContentUrl]);

    return { content, setContent, loadingContent };
}
