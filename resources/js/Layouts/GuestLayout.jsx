import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F1117] pt-6 sm:pt-0 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
            </div>

            <div className="z-10 mb-8">
                <Link href="/" className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">FinalNight<span className="text-indigo-400">Prep</span></span>
                </Link>
            </div>

            <div className="z-10 w-full overflow-hidden rounded-2xl bg-[#161b22] border border-white/5 shadow-2xl sm:max-w-md">
                <div className="px-6 py-8 sm:px-10">
                    {children}
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()} FinalNightPrep. All rights reserved.
                </p>
            </div>
        </div>
    );
}