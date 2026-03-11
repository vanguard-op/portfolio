"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRepository } from "@/lib/hooks/use-repository";
import type { ClientReviewSchema } from "@/lib/schema/schema";
import z from "zod";
import { FiPlus, FiEdit2, FiTrash2, FiLoader, FiAlertCircle, FiStar } from "react-icons/fi";

type Review = z.infer<typeof ClientReviewSchema>;

export default function ReviewsAdminPage() {
    const repo = useRepository();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await repo.getReviews();
            setReviews(data);
        } catch {
            setError("Failed to load reviews.");
        } finally {
            setLoading(false);
        }
    }, [repo]);

    useEffect(() => { fetchReviews(); }, [fetchReviews]);

    const handleDelete = async (id: string) => {
        if (confirmDelete !== id) { setConfirmDelete(id); return; }
        try {
            setDeletingId(id);
            await repo.deleteReview(id);
            setReviews(prev => prev.filter(r => r.id !== id));
            setConfirmDelete(null);
        } catch {
            setError("Failed to delete review.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Reviews</h2>
                    <p className="text-sm text-neutral-400 mt-1">{reviews.length} review{reviews.length !== 1 ? "s" : ""} total</p>
                </div>
                <Link href="/admin/reviews/create" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-600/20">
                    <FiPlus size={18} /> New Review
                </Link>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    <FiAlertCircle size={18} className="shrink-0" />{error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3">
                    <FiLoader className="animate-spin text-blue-500" size={32} />
                    <p className="text-neutral-500 text-sm">Loading reviews...</p>
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3 border border-dashed border-neutral-800 rounded-2xl">
                    <FiStar className="text-neutral-600" size={40} />
                    <p className="text-neutral-400 font-medium">No reviews yet</p>
                    <Link href="/admin/reviews/create" className="mt-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">Add Review</Link>
                </div>
            ) : (
                <div className="overflow-hidden border border-neutral-800 rounded-2xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-900/50">
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Client</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Message</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Date</th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold text-neutral-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                            {reviews.map((review) => (
                                <tr key={review.id} className="group hover:bg-neutral-900/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                                                {review.client_image?.url && <img src={review.client_image.url} alt={review.client_image.alt_text} className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-100 text-sm">{review.client_name}</p>
                                                <p className="text-xs text-neutral-500 mt-0.5">{review.client_title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden lg:table-cell"><p className="text-sm text-neutral-400 line-clamp-2 max-w-xs">{review.message}</p></td>
                                    <td className="px-5 py-4 hidden md:table-cell"><span className="text-sm text-neutral-400">{new Date(review.created_at).toLocaleDateString()}</span></td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/reviews/${review.id}/edit`} className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"><FiEdit2 size={16} /></Link>
                                            <button onClick={() => handleDelete(review.id)} disabled={deletingId === review.id}
                                                className={`p-2 rounded-lg transition-colors ${confirmDelete === review.id ? "text-white bg-red-600 hover:bg-red-500" : "text-neutral-400 hover:text-red-400 hover:bg-red-500/10"}`}>
                                                {deletingId === review.id ? <FiLoader size={16} className="animate-spin" /> : <FiTrash2 size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
