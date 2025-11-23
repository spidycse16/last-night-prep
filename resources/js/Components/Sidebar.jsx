import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, setIsOpen }) {
    const { categories } = usePage().props;
    const [expandedCategories, setExpandedCategories] = useState({});

    return (
        <motion.div
            initial={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed left-0 top-16 bottom-0 z-40 bg-[#161b22] border-r border-white/5 overflow-hidden flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0'}`}
            style={{ position: 'fixed', height: 'calc(100vh - 4rem)' }}
        >
            <div className="p-6 overflow-y-auto h-full custom-scrollbar">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span className="whitespace-nowrap">Categories</span>
                </h3>

                <div className="space-y-2">
                    {categories && Object.keys(categories).length > 0 ? (
                        Object.entries(categories).map(([category, tags]) => (
                            <div key={category} className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
                                <button
                                    onClick={() => setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))}
                                    className="w-full flex items-center justify-between py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
                                >
                                    <span className="whitespace-nowrap">{category || 'Uncategorized'}</span>
                                    <svg
                                        className={`w-4 h-4 text-slate-500 group-hover:text-white transition-transform ${expandedCategories[category] ? 'rotate-180' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {expandedCategories[category] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pl-2 py-2 space-y-1">
                                                {tags.map(tag => (
                                                    <Link
                                                        key={tag.tag_id}
                                                        href={route('questions.index', { tag: tag.name })}
                                                        className="block px-2 py-1.5 text-xs text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between group"
                                                    >
                                                        <span className="whitespace-nowrap truncate max-w-[140px]">{tag.name}</span>
                                                        <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded-full text-slate-500 group-hover:text-indigo-400 transition-colors">
                                                            {tag.question_count}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-slate-500 italic whitespace-nowrap">No categories found.</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
