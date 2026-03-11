"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown, fetchMarkdownContent } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";

export default function EditProjectPage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", overview: "", content_uri: "", image_uri: "", image_alt: "", stacks: "" });
    const [content, setContent] = useState("");

    useEffect(() => {
        repo.getProjectById(id).then(async (p) => {
            setForm({
                title: p.title, overview: p.overview, content_uri: p.content_uri,
                image_uri: p.image.uri, image_alt: p.image.alt_text,
                stacks: (p.stacks ?? []).map(s => s.name).join(", ")
            });
            if (p.content_url) {
                const md = await fetchMarkdownContent(p.content_url);
                setContent(md);
            }
        }).catch(() => setError("Failed to load project.")).finally(() => setFetching(false));
    }, [id, repo]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const contentUri = await uploadMarkdown("projects", form.title, content);
            const existing = await repo.getProjectById(id);
            const stacks = form.stacks.split(",").map(s => s.trim()).filter(Boolean).map(name => ({ name, description: "" }));
            await repo.updateProject(id, {
                ...existing,
                title: form.title, overview: form.overview, content_uri: contentUri,
                image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri },
                stacks,
            });
            router.push("/admin/projects");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update project.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500 animate-pulse">Loading project...</div>;

    return (
        <FormCard title="Edit Project" onSubmit={handleSubmit} loading={loading} backHref="/admin/projects" error={error} submitLabel="Update Project">
            <FormField label="Title" value={form.title} onChange={set("title")} required />
            <FormTextarea label="Overview" value={form.overview} onChange={set("overview")} rows={3} required />
            <MarkdownEditor value={content} onChange={setContent} label="Project Content" hint="Saving will overwrite the existing .md file in S3." />
            <FormField label="Cover Image URI" value={form.image_uri} onChange={set("image_uri")} hint="S3 key or URL for the cover image." required />
            <FormField label="Image Alt Text" value={form.image_alt} onChange={set("image_alt")} />
            <FormField label="Tech Stacks" value={form.stacks} onChange={set("stacks")} hint="Comma-separated list (e.g. Next.js, FastAPI, PostgreSQL)" />
        </FormCard>
    );
}
