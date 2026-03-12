"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { uploadMarkdown } from "@/lib/hooks/use-markdown-editor";
import { FormCard, FormField } from "@/components/admin-form";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ImagePicker } from "@/components/image-picker";

export default function EditReviewPage() {
    const repo = useRepository();
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ client_name: "", client_title: "", client_image_uri: "", client_image_alt: "", company_image_uri: "", company_image_alt: "", message: "" });

    useEffect(() => {
        repo.getReviewById(id).then(async (review) => {
            setForm({ client_name: review.client_name, client_title: review.client_title, client_image_uri: review.client_image.uri, client_image_alt: review.client_image.alt_text, company_image_uri: review.company_image.uri, company_image_alt: review.company_image.alt_text, message: review.message });
        }).catch(() => setError("Failed to load review.")).finally(() => setFetching(false));
    }, [id, repo]);

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const reviews = await repo.getReviews();
            const existing = reviews.find(r => r.id === id)!;
            // const messageUri = await repo.uploadMarkdown("reviews", form.client_name, message);
            await repo.updateReview(id, {
                ...existing,
                client_name: form.client_name, client_title: form.client_title,
                message: form.message,
                client_image: { uri: form.client_image_uri, alt_text: form.client_image_alt, url: form.client_image_uri },
                company_image: { uri: form.company_image_uri, alt_text: form.company_image_alt, url: form.company_image_uri },
            });
            router.push("/admin/reviews");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to update review.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex items-center justify-center py-24 text-neutral-500 animate-pulse">Loading review...</div>;

    return (
        <FormCard title="Edit Review" onSubmit={handleSubmit} loading={loading} backHref="/admin/reviews" error={error} submitLabel="Update Review">
            <div className="grid grid-cols-2 gap-4">
                <FormField label="Client Name" value={form.client_name} onChange={set("client_name")} required />
                <FormField label="Client Title" value={form.client_title} onChange={set("client_title")} required />
            </div>
            <FormField label="Review Message" placeholder="Write the client's testimonial here..." value={form.message} onChange={set("message")} required />

            <div className="border-t border-neutral-800 pt-4 space-y-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Client Image</p>
                <ImagePicker label="Client Photo" value={form.client_image_uri} onChange={uri => setForm(f => ({ ...f, client_image_uri: uri }))} />
                <FormField label="Alt Text" value={form.client_image_alt} onChange={set("client_image_alt")} />
            </div>

            <div className="border-t border-neutral-800 pt-4 space-y-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Company Image</p>
                <ImagePicker label="Company Logo" value={form.company_image_uri} onChange={uri => setForm(f => ({ ...f, company_image_uri: uri }))} />
                <FormField label="Alt Text" value={form.company_image_alt} onChange={set("company_image_alt")} />
            </div>
        </FormCard>
    );
}
