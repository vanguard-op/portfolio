"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ImagePicker } from "@/components/image-picker";

export default function CreateProjectPage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", overview: "", image_uri: "", image_alt: "", stacks: "" });
    const [content, setContent] = useState("");
    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.overview || !content) { setError("Title, overview, and content are required."); return; }
        try {
            setLoading(true);
            setError(null);
            const contentUri = await uploadMarkdown("projects", form.title, content);
            const stacks = form.stacks.split(",").map(s => s.trim()).filter(Boolean).map(name => ({ name, description: "" }));
            await repo.createProject({
                title: form.title, overview: form.overview, content_uri: contentUri,
                image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri }, stacks,
            });
            router.push("/admin/projects");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create project.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Project" description="Fill in the details below. The content will be uploaded as a Markdown file." onSubmit={handleSubmit} loading={loading} backHref="/admin/projects" error={error}>
            <FormField label="Title" placeholder="Project name" value={form.title} onChange={set("title")} required />
            <FormTextarea label="Overview" placeholder="Short summary shown in project cards" value={form.overview} onChange={set("overview")} rows={3} required />
            <MarkdownEditor value={content} onChange={setContent} label="Project Content" placeholder={"# My Project\n\n## Overview\n\nDescribe your project here..."} hint="This will be saved as a .md file in S3." />
            <ImagePicker
                label="Cover Image"
                value={form.image_uri}
                onChange={uri => setForm(f => ({ ...f, image_uri: uri }))}
                hint="Select an existing image or upload a new one from your device."
            />
            <FormField label="Image Alt Text" placeholder="Describe the image" value={form.image_alt} onChange={set("image_alt")} />
            <FormField label="Tech Stacks" placeholder="Next.js, FastAPI, PostgreSQL" value={form.stacks} onChange={set("stacks")} hint="Comma-separated list of technologies used." />
        </FormCard>
    );
}
