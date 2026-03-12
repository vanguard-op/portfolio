"use client";

import { useState, useEffect } from "react";
import PortfolioRepository from "../repository/base";
import { useRepository } from "./use-repository";

/**
 * Uploads markdown content to S3 via a presigned URL.
 * @param repo      - The PortfolioRepository instance
 * @param directory - The S3 directory ("articles" | "projects" | "reviews" | "services")
 * @param filename  - The .md filename (without extension; extension appended automatically)
 * @param content   - The markdown text to upload
 * @returns The S3 key (content_uri) to store on the entity
 */
export async function uploadMarkdown(repo: PortfolioRepository, directory: string, filename: string, content: string): Promise<string> {
    const safeFilename = `${filename.replace(/[^a-zA-Z0-9_-]/g, "_")}.md`;
    const contentType = "text/markdown";

    // 1. Get presigned upload URL via repository
    const { url, key } = await repo.getMediaUploadUrl(directory, safeFilename, contentType);

    // 2. PUT the markdown content to S3 via repository
    await repo.uploadToS3(url, content, contentType);

    // Return the S3 key (directory/filename)
    return `${directory}/${safeFilename}`;
}

/**
 * Hook to manage a markdown editor textarea with S3 upload/load capability.
 */
export function useMarkdownEditor(initialContentUrl?: string) {
    const repo = useRepository();
    const [content, setContent] = useState("");
    const [loadingContent, setLoadingContent] = useState(false);

    useEffect(() => {
        if (!initialContentUrl) return;
        setLoadingContent(true);
        repo.fetchMarkdown(initialContentUrl)
            .then(setContent)
            .finally(() => setLoadingContent(false));
    }, [initialContentUrl, repo]);

    return { content, setContent, loadingContent };
}
