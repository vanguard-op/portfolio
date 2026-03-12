"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";

export default function CreateServicePage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", description: "" });

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.description) { setError("Service name and description are required."); return; }
        try {
            setLoading(true);
            setError(null);
            // const contentUri = await repo.uploadMarkdown("services", form.name, form.description);
            await repo.createService({ name: form.name, description: form.description });
            router.push("/admin/services");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Service" description="Add a new service. The content will be saved as a Markdown file." onSubmit={handleSubmit} loading={loading} backHref="/admin/services" error={error}>
            <FormField label="Service Name" placeholder="e.g. Full-Stack Development" value={form.name} onChange={set("name")} required />
            <FormField label="Service Description" placeholder="Write the service description here..." value={form.description} onChange={set("description")} required />
        </FormCard>
    );
}
