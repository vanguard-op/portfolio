"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ImagePicker } from "@/components/image-picker";

export default function CreateArticlePage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", image_uri: "", image_alt: "" });
    const [content, setContent] = useState("");

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !content) { setError("Title and content are required."); return; }
        try {
            setLoading(true);
            setError(null);
            const contentUri = await uploadMarkdown("articles", form.title, content);
            await repo.createArticle({
                title: form.title,
                content_uri: contentUri,
                image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri },
            });
            router.push("/admin/articles");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create article.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Article" description="Write your article content below. It will be saved to S3 as a Markdown file." onSubmit={handleSubmit} loading={loading} backHref="/admin/articles" error={error}>
            <FormField label="Title" placeholder="Enter article title" value={form.title} onChange={set("title")} required />
            <MarkdownEditor value={content} onChange={setContent} label="Article Content" placeholder={"# My Article\n\nStart writing your article here..."} hint="This will be saved as a .md file in S3." />
            <ImagePicker
                label="Cover Image"
                value={form.image_uri}
                onChange={uri => setForm(f => ({ ...f, image_uri: uri }))}
                hint="Select an existing image from S3 or upload a new one."
            />
            <FormField label="Image Alt Text" placeholder="Describe the image" value={form.image_alt} onChange={set("image_alt")} />
        </FormCard>
    );
}
