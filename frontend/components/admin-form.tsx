"use client";

import React from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: string;
}

export function FormField({ label, error, hint, ...props }: FieldProps) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-300">{label}</label>
            <input
                {...props}
                className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${error ? "border-red-500" : "border-neutral-700 focus:border-blue-500"} ${props.className ?? ""}`}
            />
            {hint && <p className="text-xs text-neutral-500">{hint}</p>}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    hint?: string;
}

export function FormTextarea({ label, error, hint, ...props }: TextAreaProps) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-neutral-300">{label}</label>
            <textarea
                {...props}
                className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${error ? "border-red-500" : "border-neutral-700 focus:border-blue-500"} ${props.className ?? ""}`}
            />
            {hint && <p className="text-xs text-neutral-500">{hint}</p>}
            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    );
}

interface FormCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
    loading?: boolean;
    backHref: string;
    error?: string | null;
}

export function FormCard({ title, description, children, onSubmit, submitLabel = "Save", loading, backHref, error }: FormCardProps) {
    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <a href={backHref} className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-4 inline-flex items-center gap-1">
                    ← Back
                </a>
                <h2 className="text-2xl font-bold text-white mt-2">{title}</h2>
                {description && <p className="text-sm text-neutral-400 mt-1">{description}</p>}
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={onSubmit} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-5">
                {children}
                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
                    >
                        {loading && (
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {loading ? "Saving..." : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}
