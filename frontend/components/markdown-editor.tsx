"use client";

import React, { useState } from "react";
import { FiEye, FiEdit3 } from "react-icons/fi";

interface MarkdownEditorProps {
    value: string;
    onChange: (v: string) => void;
    label?: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    hint?: string;
}

export function MarkdownEditor({ value, onChange, label = "Content", placeholder = "Write your markdown content here...", rows = 16, disabled, hint }: MarkdownEditorProps) {
    const [preview, setPreview] = useState(false);

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-neutral-300">{label}</label>
                <div className="flex items-center gap-1 p-1 bg-neutral-800 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${!preview ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                        <FiEdit3 size={12} /> Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${preview ? "bg-neutral-700 text-white" : "text-neutral-500 hover:text-neutral-300"}`}
                    >
                        <FiEye size={12} /> Preview
                    </button>
                </div>
            </div>

            {preview ? (
                <div
                    className="min-h-[200px] w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 prose prose-invert prose-sm max-w-none overflow-auto"
                    style={{ minHeight: `${rows * 1.5}rem` }}
                    dangerouslySetInnerHTML={{ __html: value ? simpleMarkdownToHtml(value) : '<span class="text-neutral-600">Nothing to preview</span>' }}
                />
            ) : (
                <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y font-mono leading-relaxed"
                />
            )}

            {hint && <p className="text-xs text-neutral-500">{hint}</p>}
        </div>
    );
}

/** Very lightweight markdown → HTML for the preview pane */
function simpleMarkdownToHtml(md: string): string {
    return md
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/^### (.+)$/gm, "<h3 class='text-base font-semibold mt-4 mb-1 text-neutral-100'>$1</h3>")
        .replace(/^## (.+)$/gm, "<h2 class='text-lg font-semibold mt-5 mb-2 text-neutral-100'>$1</h2>")
        .replace(/^# (.+)$/gm, "<h1 class='text-xl font-bold mt-6 mb-3 text-neutral-100'>$1</h1>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code class='px-1 py-0.5 bg-neutral-800 rounded text-blue-300 text-xs'>$1</code>")
        .replace(/^[-*] (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
        .replace(/\n{2,}/g, "</p><p class='mb-3'>")
        .replace(/^(?!<[h|l|p])(.+)$/gm, (line) => `<p class='mb-2 text-neutral-300'>${line}</p>`);
}
