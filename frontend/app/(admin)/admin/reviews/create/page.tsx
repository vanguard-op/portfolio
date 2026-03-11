"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRepository } from "@/lib/hooks/use-repository";
import { FormCard, FormField, FormTextarea } from "@/components/admin-form";

export default function CreateReviewPage() {
    const repo = useRepository();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({ client_name: "", client_title: "", message: "", client_image_uri: "", client_image_alt: "", company_image_uri: "", company_image_alt: "" });
    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.client_name || !form.client_title || !form.message) { setError("Name, title, and message are required."); return; }
        try {
            setLoading(true);
            setError(null);
            await repo.createReview({ client_name: form.client_name, client_title: form.client_title, message: form.message, client_image: { uri: form.client_image_uri, alt_text: form.client_image_alt, url: form.client_image_uri }, company_image: { uri: form.company_image_uri, alt_text: form.company_image_alt, url: form.company_image_uri } });
            router.push("/admin/reviews");
        } catch {
            setError("Failed to create review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormCard title="New Review" description="Add a client testimonial to your portfolio." onSubmit={handleSubmit} loading={loading} backHref="/admin/reviews" error={error}>
            <div className="grid grid-cols-2 gap-4">
                <FormField label="Client Name" placeholder="Jane Smith" value={form.client_name} onChange={set("client_name")} required />
                <FormField label="Client Title" placeholder="CEO, Company Name" value={form.client_title} onChange={set("client_title")} required />
            </div>
            <FormTextarea label="Review Message" placeholder="What did the client say?" value={form.message} onChange={set("message")} rows={4} required />
            <div className="border-t border-neutral-800 pt-4 space-y-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Client Image</p>
                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Image URI" placeholder="images/client.png" value={form.client_image_uri} onChange={set("client_image_uri")} hint="S3 key or URL" />
                    <FormField label="Alt Text" placeholder="Client headshot" value={form.client_image_alt} onChange={set("client_image_alt")} />
                </div>
            </div>
            <div className="border-t border-neutral-800 pt-4 space-y-4">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Company Image</p>
                <div className="grid grid-cols-2 gap-4">
                    <FormField label="Image URI" placeholder="images/company-logo.png" value={form.company_image_uri} onChange={set("company_image_uri")} hint="S3 key or URL" />
                    <FormField label="Alt Text" placeholder="Company logo" value={form.company_image_alt} onChange={set("company_image_alt")} />
                </div>
            </div>
        </FormCard>
    );
}
