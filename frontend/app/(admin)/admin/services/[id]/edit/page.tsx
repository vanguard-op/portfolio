"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown, fetchMarkdownContent } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";

export default function EditServicePage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        repo.getServiceById(id).then(async (s) => {
            setName(s.name);
            // If description is a URL or S3 key, try to fetch it as markdown
            if (s.description?.startsWith("http") || s.description?.includes("/")) {
                const md = await fetchMarkdownContent(s.description);
                setContent(md || s.description);
            } else {
                setContent(s.description);
            }
        }).catch(() => setError("Failed to load service.")).finally(() => setFetching(false));
    }, [id, repo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const descriptionUri = await uploadMarkdown("services", name, content);
            await repo.updateService(id, { name, description: descriptionUri });
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
            <FormField label="Service Name" value={name} onChange={e => setName(e.target.value)} required />
            <MarkdownEditor value={content} onChange={setContent} label="Service Description (Markdown)" hint="Saving will overwrite the existing .md file in S3." />
        </FormCard>
    );
}
