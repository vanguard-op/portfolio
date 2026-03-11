"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField } from "@/components/admin-form";

export default function CreateArticlePage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", content_uri: "", image_uri: "", image_alt: "" });

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.content_uri || !form.image_uri) { setError("All required fields must be filled."); return; }
        try {
            setLoading(true);
            setError(null);
            await repo.createArticle({ title: form.title, content_uri: form.content_uri, image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri } });
            router.push("/admin/articles");
        } catch {
            setError("Failed to create article. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Article" description="Fill in the details below to create a new article." onSubmit={handleSubmit} loading={loading} backHref="/admin/articles" error={error}>
            <FormField label="Title" placeholder="Enter article title" value={form.title} onChange={set("title")} required />
            <FormField label="Content URI" placeholder="e.g. articles/my-article.md" value={form.content_uri} onChange={set("content_uri")} hint="S3 key or path to the markdown content file." required />
            <FormField label="Image URI" placeholder="e.g. images/article-cover.png" value={form.image_uri} onChange={set("image_uri")} hint="S3 key or URL for the cover image." required />
            <FormField label="Image Alt Text" placeholder="Describe the image" value={form.image_alt} onChange={set("image_alt")} />
        </FormCard>
    );
}
