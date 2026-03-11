"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown, fetchMarkdownContent } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ImagePicker } from "@/components/image-picker";

export default function EditArticlePage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", content_uri: "", image_uri: "", image_alt: "" });
    const [content, setContent] = useState("");

    useEffect(() => {
        repo.getArticleById(id).then(async (a) => {
            setForm({ title: a.title, content_uri: a.content_uri, image_uri: a.image.uri, image_alt: a.image.alt_text });
            if (a.content_url) {
                const md = await fetchMarkdownContent(a.content_url);
                setContent(md);
            }
        }).catch(() => setError("Failed to load article.")).finally(() => setFetching(false));
    }, [id, repo]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const contentUri = await uploadMarkdown("articles", form.title, content);
            const existing = await repo.getArticleById(id);
            await repo.updateArticle(id, {
                ...existing,
                title: form.title, content_uri: contentUri,
                image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri },
            });
            router.push("/admin/articles");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update article.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500 animate-pulse">Loading article...</div>;

    return (
        <FormCard title="Edit Article" onSubmit={handleSubmit} loading={loading} backHref="/admin/articles" error={error} submitLabel="Update Article">
            <FormField label="Title" value={form.title} onChange={set("title")} required />
            <MarkdownEditor value={content} onChange={setContent} label="Article Content" hint="Saving will overwrite the existing .md file in S3." />
            <ImagePicker
                label="Cover Image"
                value={form.image_uri}
                onChange={uri => setForm(f => ({ ...f, image_uri: uri }))}
                hint="Select an existing image or upload a new one."
            />
            <FormField label="Image Alt Text" value={form.image_alt} onChange={set("image_alt")} />
        </FormCard>
    );
}
