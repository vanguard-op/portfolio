"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ServiceSchema } from "@/lib/schema/schema";
import z from "zod";

export default function EditServicePage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<z.infer<typeof ServiceSchema>>>({});

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    useEffect(() => {
        repo.getServiceById(id).then(async (s) => {
            setForm(s);
        }).catch(() => setError("Failed to load service.")).finally(() => setFetching(false));
    }, [id, repo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await repo.updateService(id, form);
            router.push("/admin/services");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update service.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500 animate-pulse">Loading service...</div>;

    return (
        <FormCard title="Edit Service" onSubmit={handleSubmit} loading={loading} backHref="/admin/services" error={error} submitLabel="Update Service">
            <FormField label="Service Name" value={form.name} onChange={set("name")} required />
            <FormField label="Service Description" value={form.description} onChange={set("description")} required />
        </FormCard>
    );
}
