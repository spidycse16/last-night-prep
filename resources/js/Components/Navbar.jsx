import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ auth, tags = [] }) {
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTagsOpen, setIsTagsOpen] = useState(false);

    // Determine which nav item is active based on current URL
    const isActive = (path) => {
        if (path === 'dashboard') {
            return url === '/dashboard';
        } else if (path === 'questions') {
            return url.startsWith('/questions');
        } else if (path === 'ask') {
            return url === '/questions/create';
        }
        return false;
    };

    return (
        <nav className="bg-[#0F1117] border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between">
                    <div className="flex">
                        <div className="flex flex-shrink-0 items-center">
                            <Link href={route('dashboard')} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-white tracking-tight hidden md:block">FinalNight<span className="text-indigo-400">Prep</span></span>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            {[
                                { name: 'Dashboard', route: 'dashboard', id: 'dashboard' },
                                { name: 'Questions', route: 'questions.index', id: 'questions' },
                                { name: 'Ask Question', route: 'questions.create', id: 'ask' },
                            ].map((item) => (
                                <Link
                                    key={item.id}
                                    href={route(item.route)}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive(item.id)
                                            ? 'border-indigo-500 text-white'
                                            : 'border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {/* Tags dropdown */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsTagsOpen(!isTagsOpen)}
                                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Tags
                                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                            {isTagsOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsTagsOpen(false)}></div>
                                    <div className="absolute right-0 z-20 mt-2 w-64 origin-top-right rounded-xl bg-[#161b22] border border-white/10 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="p-4">
                                            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Popular Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {tags && tags.slice(0, 10).map((tag) => (
                                                    <Link
                                                        key={tag.tag_id || tag.id}
                                                        href={route('questions.index') + '?tag=' + tag.name}
                                                        className="inline-flex items-center rounded-md bg-white/5 border border-white/5 px-2 py-1 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                                                    >
                                                        {tag.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0F1117]"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                                        {auth?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                </button>
                            </div>
                            {isMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                                    <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-[#161b22] border border-white/10 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                                        <div className="px-4 py-2 border-b border-white/5">
                                            <p className="text-sm text-white font-medium truncate">{auth?.user?.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{auth?.user?.email}</p>
                                        </div>
                                        <Link
                                            href={route('profile.edit')}
                                            className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                                        >
                                            Sign out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[#161b22] border-b border-white/5">
                    <div className="space-y-1 pb-3 pt-2">
                        {[
                            { name: 'Dashboard', route: 'dashboard', id: 'dashboard' },
                            { name: 'Questions', route: 'questions.index', id: 'questions' },
                            { name: 'Ask Question', route: 'questions.create', id: 'ask' },
                        ].map((item) => (
                            <Link
                                key={item.id}
                                href={route(item.route)}
                                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${isActive(item.id)
                                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                                        : 'border-transparent text-slate-400 hover:border-slate-700 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-white/5 pb-3 pt-4">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {auth?.user?.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{auth?.user?.name || 'User'}</div>
                                <div className="text-sm font-medium text-slate-500">{auth?.user?.email || ''}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <Link
                                href={route('profile.edit')}
                                className="block px-4 py-2 text-base font-medium text-slate-400 hover:bg-white/5 hover:text-white"
                            >
                                Your Profile
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="block w-full px-4 py-2 text-left text-base font-medium text-slate-400 hover:bg-white/5 hover:text-white"
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}