import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-6 sm:pt-0 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="mb-8">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20" />
                </Link>
            </div>

            <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl sm:max-w-md sm:rounded-2xl dark:bg-gray-800">
                <div className="rounded-t-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-center dark:from-yellow-600 dark:to-orange-600">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h1 className="mt-2 text-2xl font-bold text-white">FinalNightPrep</h1>
                    <p className="mt-1 text-sm text-yellow-100">Master Your Technical Interviews</p>
                </div>
                
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