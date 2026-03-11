"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";

export default function CreateServicePage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: "", description: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.description) { setError("All fields are required."); return; }
        try {
            setLoading(true);
            setError(null);
            await repo.createService({ name: form.name, description: form.description });
            router.push("/admin/services");
        } catch {
            setError("Failed to create service. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Service" description="Add a new service offering to your portfolio." onSubmit={handleSubmit} loading={loading} backHref="/admin/services" error={error}>
            <FormField label="Service Name" placeholder="e.g. Full-Stack Development" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            <FormTextarea label="Description" placeholder="Describe what this service entails..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5} required />
        </FormCard>
    );
}
