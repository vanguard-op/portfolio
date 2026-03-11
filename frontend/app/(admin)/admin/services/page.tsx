"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRepository } from "@/lib/hooks/use-repository";
import type { ServiceSchema } from "@/lib/schema/schema";
import z from "zod";
import { FiPlus, FiEdit2, FiTrash2, FiLoader, FiAlertCircle, FiZap } from "react-icons/fi";

type Service = z.infer<typeof ServiceSchema>;

export default function ServicesAdminPage() {
    const repo = useRepository();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await repo.getServices();
            setServices(data);
        } catch {
            setError("Failed to load services.");
        } finally {
            setLoading(false);
        }
    }, [repo]);

    useEffect(() => { fetchServices(); }, [fetchServices]);

    const handleDelete = async (index: number) => {
        if (confirmDelete !== index) { setConfirmDelete(index); return; }
        try {
            setDeletingIndex(index);
            await repo.deleteService(String(index + 1));
            setServices(prev => prev.filter((_, i) => i !== index));
            setConfirmDelete(null);
        } catch {
            setError("Failed to delete service.");
        } finally {
            setDeletingIndex(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Services</h2>
                    <p className="text-sm text-neutral-400 mt-1">{services.length} service{services.length !== 1 ? "s" : ""} total</p>
                </div>
                <Link href="/admin/services/create" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-600/20">
                    <FiPlus size={18} /> New Service
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
                    <p className="text-neutral-500 text-sm">Loading services...</p>
                </div>
            ) : services.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3 border border-dashed border-neutral-800 rounded-2xl">
                    <FiZap className="text-neutral-600" size={40} />
                    <p className="text-neutral-400 font-medium">No services yet</p>
                    <Link href="/admin/services/create" className="mt-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">Create Service</Link>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {services.map((service, index) => (
                        <div key={index} className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-neutral-100">{service.name}</h3>
                                    <p className="text-sm text-neutral-400 mt-2 line-clamp-3">{service.description}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/services/${index + 1}/edit`} className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"><FiEdit2 size={15} /></Link>
                                    <button onClick={() => handleDelete(index)} disabled={deletingIndex === index}
                                        className={`p-2 rounded-lg transition-colors ${confirmDelete === index ? "text-white bg-red-600 hover:bg-red-500" : "text-neutral-400 hover:text-red-400 hover:bg-red-500/10"}`}>
                                        {deletingIndex === index ? <FiLoader size={15} className="animate-spin" /> : <FiTrash2 size={15} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
