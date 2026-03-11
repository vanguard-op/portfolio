"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";

export default function EditProjectPage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", overview: "", content_uri: "", image_uri: "", image_alt: "", stacks: "" });

    useEffect(() => {
        repo.getProjectById(id).then(p => {
            setForm({ title: p.title, overview: p.overview, content_uri: p.content_uri, image_uri: p.image.uri, image_alt: p.image.alt_text, stacks: (p.stacks ?? []).map(s => s.name).join(", ") });
        }).catch(() => setError("Failed to load project.")).finally(() => setFetching(false));
    }, [id, repo]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const existing = await repo.getProjectById(id);
            const stacks = form.stacks.split(",").map(s => s.trim()).filter(Boolean).map(name => ({ name, description: "" }));
            await repo.updateProject(id, { ...existing, title: form.title, overview: form.overview, content_uri: form.content_uri, image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri }, stacks });
            router.push("/admin/projects");
        } catch {
            setError("Failed to update project.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500">Loading...</div>;

    return (
        <FormCard title="Edit Project" onSubmit={handleSubmit} loading={loading} backHref="/admin/projects" error={error} submitLabel="Update Project">
            <FormField label="Title" value={form.title} onChange={set("title")} required />
            <FormTextarea label="Overview" value={form.overview} onChange={set("overview")} rows={3} required />
            <FormField label="Content URI" value={form.content_uri} onChange={set("content_uri")} hint="S3 key or path to the markdown content file." required />
            <FormField label="Image URI" value={form.image_uri} onChange={set("image_uri")} hint="S3 key or URL for the cover image." required />
            <FormField label="Image Alt Text" value={form.image_alt} onChange={set("image_alt")} />
            <FormField label="Tech Stacks" value={form.stacks} onChange={set("stacks")} hint="Comma-separated list of technologies used." />
        </FormCard>
    );
}
