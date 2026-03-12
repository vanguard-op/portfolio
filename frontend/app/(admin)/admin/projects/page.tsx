"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRepository } from "@/lib/hooks/use-repository";
import type { ProjectSchema } from "@/lib/schema/schema";
import z from "zod";
import { FiPlus, FiEdit2, FiTrash2, FiLoader, FiAlertCircle, FiBriefcase } from "react-icons/fi";

type Project = z.infer<typeof ProjectSchema>;

export default function ProjectsAdminPage() {
    const repo = useRepository();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await repo.getProjects();
            setProjects(data);
        } catch {
            setError("Failed to load projects. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [repo]);

    useEffect(() => { fetchProjects(); }, [fetchProjects]);

    const handleDelete = async (id: string) => {
        if (confirmDelete !== id) { setConfirmDelete(id); return; }
        try {
            setDeletingId(id);
            await repo.deleteProject(id);
            setProjects(prev => prev.filter(p => p.id !== id));
            setConfirmDelete(null);
        } catch {
            setError("Failed to delete project.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Projects</h2>
                    <p className="text-sm text-neutral-400 mt-1">{projects.length} project{projects.length !== 1 ? "s" : ""} total</p>
                </div>
                <Link href="/admin/projects/create" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-colors shadow-lg shadow-blue-600/20">
                    <FiPlus size={18} /> New Project
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
                    <p className="text-neutral-500 text-sm">Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3 border border-dashed border-neutral-800 rounded-2xl">
                    <FiBriefcase className="text-neutral-600" size={40} />
                    <p className="text-neutral-400 font-medium">No projects yet</p>
                    <Link href="/admin/projects/create" className="mt-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">Create Project</Link>
                </div>
            ) : (
                <div className="overflow-hidden border border-neutral-800 rounded-2xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-neutral-800 bg-neutral-900/50">
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Project</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Stack</th>
                                <th className="text-left px-5 py-3.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Created</th>
                                <th className="px-5 py-3.5 text-right text-xs font-semibold text-neutral-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/50">
                            {projects.map((project) => (
                                <tr key={project.id} className="group hover:bg-neutral-900/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
                                                {project.image?.url && <img src={project.image.url} alt={project.image.alt_text} className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-neutral-100 text-sm line-clamp-1">{project.title}</p>
                                                <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">{project.overview}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden lg:table-cell">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.stack?.slice(0, 3).map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-xs rounded-md">{s}</span>
                                            ))}
                                            {(project.stack?.length ?? 0) > 3 && (
                                                <span className="px-2 py-0.5 bg-neutral-800 text-neutral-500 text-xs rounded-md">+{(project.stack?.length ?? 0) - 3}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 hidden md:table-cell"><span className="text-sm text-neutral-400">{new Date(project.created_at).toLocaleDateString()}</span></td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/projects/${project.id}/edit`} className="p-2 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"><FiEdit2 size={16} /></Link>
                                            <button onClick={() => handleDelete(project.id)} disabled={deletingId === project.id}
                                                className={`p-2 rounded-lg transition-colors ${confirmDelete === project.id ? "text-white bg-red-600 hover:bg-red-500" : "text-neutral-400 hover:text-red-400 hover:bg-red-500/10"}`}>
                                                {deletingId === project.id ? <FiLoader size={16} className="animate-spin" /> : <FiTrash2 size={16} />}
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
