"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";

export default function CreateProjectPage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ title: "", overview: "", content_uri: "", image_uri: "", image_alt: "", stacks: "" });
    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.overview || !form.content_uri || !form.image_uri) { setError("All required fields must be filled."); return; }
        try {
            setLoading(true);
            setError(null);
            const stacks = form.stacks.split(",").map(s => s.trim()).filter(Boolean).map(name => ({ name, description: "" }));
            await repo.createProject({ title: form.title, overview: form.overview, content_uri: form.content_uri, image: { uri: form.image_uri, alt_text: form.image_alt, url: form.image_uri }, stacks });
            router.push("/admin/projects");
        } catch {
            setError("Failed to create project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Project" description="Fill in the details below to create a new project." onSubmit={handleSubmit} loading={loading} backHref="/admin/projects" error={error}>
            <FormField label="Title" placeholder="Project name" value={form.title} onChange={set("title")} required />
            <FormTextarea label="Overview" placeholder="Short summary of the project" value={form.overview} onChange={set("overview")} rows={3} required />
            <FormField label="Content URI" placeholder="e.g. projects/my-project.md" value={form.content_uri} onChange={set("content_uri")} hint="S3 key or path to the markdown content file." required />
            <FormField label="Image URI" placeholder="e.g. images/project-cover.png" value={form.image_uri} onChange={set("image_uri")} hint="S3 key or URL for the cover image." required />
            <FormField label="Image Alt Text" placeholder="Describe the image" value={form.image_alt} onChange={set("image_alt")} />
            <FormField label="Tech Stacks" placeholder="Next.js, FastAPI, PostgreSQL" value={form.stacks} onChange={set("stacks")} hint="Comma-separated list of technologies used." />
        </FormCard>
    );
}
