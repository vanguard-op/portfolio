"use client";

import React from "react";
import Link from "next/link";
import { FiFileText, FiBriefcase, FiStar, FiZap, FiArrowRight } from "react-icons/fi";

const sections = [
    { label: "Articles", href: "/admin/articles", icon: FiFileText, color: "blue" },
    { label: "Projects", href: "/admin/projects", icon: FiBriefcase, color: "purple" },
    { label: "Services", href: "/admin/services", icon: FiZap, color: "yellow" },
    { label: "Reviews", href: "/admin/reviews", icon: FiStar, color: "green" },
];

const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20",
    green: "bg-green-500/10 text-green-400 group-hover:bg-green-500/20",
};

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-neutral-400 mt-1">Welcome to your admin panel. Manage your portfolio content below.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {sections.map(({ label, href, icon: Icon, color }) => (
                    <Link key={href} href={href} className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-neutral-900/50">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${colorMap[color]}`}>
                            <Icon size={20} />
                        </div>
                        <p className="font-semibold text-neutral-100">{label}</p>
                        <p className="text-xs text-neutral-500 mt-1">Manage {label.toLowerCase()}</p>
                        <div className="flex items-center gap-1 mt-4 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                            <span>View all</span>
                            <FiArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h3 className="font-semibold text-neutral-100 mb-1">Quick Actions</h3>
                <p className="text-sm text-neutral-500 mb-4">Create new content with a single click.</p>
                <div className="flex flex-wrap gap-3">
                    {sections.map(({ label, href, icon: Icon, color }) => (
                        <Link
                            key={href}
                            href={`${href}/create`}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${colorMap[color]}`}
                        >
                            <Icon size={16} />
                            New {label.slice(0, -1)}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
