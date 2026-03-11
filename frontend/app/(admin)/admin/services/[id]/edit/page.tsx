"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";

export default function EditServicePage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", description: "" });

    useEffect(() => {
        repo.getServiceById(id).then(s => {
            setForm({ name: s.name, description: s.description });
        }).catch(() => setError("Failed to load service.")).finally(() => setFetching(false));
    }, [id, repo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await repo.updateService(id, { name: form.name, description: form.description });
            router.push("/admin/services");
        } catch {
            setError("Failed to update service.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500">Loading...</div>;

    return (
        <FormCard title="Edit Service" onSubmit={handleSubmit} loading={loading} backHref="/admin/services" error={error} submitLabel="Update Service">
            <FormField label="Service Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <FormTextarea label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5} required />
        </FormCard>
    );
}
