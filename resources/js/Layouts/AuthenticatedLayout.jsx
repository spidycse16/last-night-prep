import { useState } from 'react';
import Navbar from '@/Components/Navbar';

export default function Authenticated({ user, header, children, tags = [] }) {
    return (
        <div className="min-h-screen bg-[#0F1117] text-slate-300">
            <Navbar auth={{ user }} tags={tags} />

            {/* Page Heading */}
            {header && (
                <header className="bg-[#161b22] border-b border-white/5 shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}
