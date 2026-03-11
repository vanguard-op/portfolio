"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField } from "@/components/admin-form";

export default function EditArticlePage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", content_uri: "", image_uri: "", image_alt: "" });

    useEffect(() => {
        repo.getArticleById(id).then(a => {
            setForm({ title: a.title, content_uri: a.content_uri, image_uri: a.image.uri, image_alt: a.image.alt_text });
        }).catch(() => setError("Failed to load article.")).finally(() => setFetching(false));
    }, [id, repo]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const existing = await repo.getArticleById(id);
            await repo.updateArticle(id, { ...existing, title: form.title, content_uri: form.content_uri, image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri } });
            router.push("/admin/articles");
        } catch {
            setError("Failed to update article.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500">Loading...</div>;

    return (
        <FormCard title="Edit Article" onSubmit={handleSubmit} loading={loading} backHref="/admin/articles" error={error} submitLabel="Update Article">
            <FormField label="Title" value={form.title} onChange={set("title")} required />
            <FormField label="Content URI" value={form.content_uri} onChange={set("content_uri")} hint="S3 key or path to the markdown content file." required />
            <FormField label="Image URI" value={form.image_uri} onChange={set("image_uri")} hint="S3 key or URL for the cover image." required />
            <FormField label="Image Alt Text" value={form.image_alt} onChange={set("image_alt")} />
        </FormCard>
    );
}
