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
    const [form, setForm] = useState({ name: "" });
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !content) { setError("Service name and content are required."); return; }
        try {
            setLoading(true);
            setError(null);
            const contentUri = await uploadMarkdown("services", form.name, content);
            await repo.createService({ name: form.name, description: contentUri });
            router.push("/admin/services");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create service.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Service" description="Add a new service. The content will be saved as a Markdown file." onSubmit={handleSubmit} loading={loading} backHref="/admin/services" error={error}>
            <FormField label="Service Name" placeholder="e.g. Full-Stack Development" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <MarkdownEditor value={content} onChange={setContent} label="Service Description (Markdown)" placeholder={"## Full-Stack Development\n\nDescribe this service..."} hint="This will be saved as a .md file in S3." />
        </FormCard>
    );
}
