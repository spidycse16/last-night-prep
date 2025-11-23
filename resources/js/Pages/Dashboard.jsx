import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function Dashboard({ auth, randomQuestions = [], tags = [] }) {
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [aiAnswers, setAiAnswers] = useState({});
    const [loadingAi, setLoadingAi] = useState({});
    const [aiErrors, setAiErrors] = useState({});

    const toggleQuestion = (id) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const fetchAiAnswer = async (questionId, questionTitle) => {
        // Always clear previous state and start loading
        setAiErrors(prev => ({ ...prev, [questionId]: null }));
        setLoadingAi(prev => ({ ...prev, [questionId]: true }));

        // If we already have an answer, we might want to just show it, but the user said "always open the section"
        // so we'll proceed to fetch or just let the state update trigger the open.
        // If we want to re-fetch on every click, we remove the check. 
        // If we want to just open if already present, we can keep it but ensure visibility logic handles it.
        // Let's assume we don't re-fetch if we have a valid answer, unless it was an error before.
        if (aiAnswers[questionId]) {
            setLoadingAi(prev => ({ ...prev, [questionId]: false }));
            return;
        }

        try {
            const response = await axios.post(route('ai.answer'), {
                question_id: questionId,
                question: questionTitle
            });
            setAiAnswers(prev => ({ ...prev, [questionId]: response.data.answer }));
        } catch (error) {
            console.error("Failed to fetch AI answer:", error);
            setAiErrors(prev => ({
                ...prev,
                [questionId]: error.response?.data?.error || "Failed to generate AI answer. Please try again."
            }));
        } finally {
            setLoadingAi(prev => ({ ...prev, [questionId]: false }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
            tags={tags}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 shadow-2xl mb-8"
                    >
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Welcome back, {auth.user.name}!
                            </h1>
                            <p className="text-indigo-100 text-lg max-w-2xl">
                                Ready to crack your next interview? You have new questions waiting for you.
                            </p>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                </span>
                                Recommended for You
                            </h3>

                            {randomQuestions.map((question, index) => (
                                <motion.div
                                    key={question.id || question.question_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-[#161b22] border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3
                                                    onClick={() => toggleQuestion(question.id || question.question_id)}
                                                    className="text-lg font-semibold text-white mb-2 hover:text-indigo-400 transition-colors cursor-pointer"
                                                >
                                                    {question.title}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${question.difficulty === 'Easy' ? 'bg-green-500/10 text-green-400' :
                                                        question.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                                            'bg-red-500/10 text-red-400'
                                                        }`}>
                                                        {question.difficulty}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{question.view_count || 0} views</span>
                                                    <span>•</span>
                                                    <span>{question.answers || 0} answers</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => toggleQuestion(question.id || question.question_id)}
                                                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-2"
                                                >
                                                    {expandedQuestions[question.id || question.question_id] ? 'Hide Answers' : 'View Answers'}
                                                    <svg className={`w-4 h-4 transition-transform ${expandedQuestions[question.id || question.question_id] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => fetchAiAnswer(question.id || question.question_id, question.title)}
                                                    disabled={loadingAi[question.id || question.question_id]}
                                                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {loadingAi[question.id || question.question_id] ? (
                                                        <>
                                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            <span>Thinking...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                            </svg>
                                                            <span>AI Answer</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {(expandedQuestions[question.id || question.question_id] || aiAnswers[question.id || question.question_id] || loadingAi[question.id || question.question_id] || aiErrors[question.id || question.question_id]) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-4 space-y-4">
                                                        {/* AI Answer Section */}
                                                        {(aiAnswers[question.id || question.question_id] || loadingAi[question.id || question.question_id] || aiErrors[question.id || question.question_id]) && (
                                                            <div className={`p-4 rounded-lg border ${aiErrors[question.id || question.question_id] ? 'bg-red-500/10 border-red-500/20' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
                                                                <div className={`flex items-center gap-2 mb-2 ${aiErrors[question.id || question.question_id] ? 'text-red-400' : 'text-indigo-400'}`}>
                                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                    </svg>
                                                                    <span className="text-xs font-bold uppercase tracking-wider">AI Generated Answer</span>
                                                                </div>
                                                                {loadingAi[question.id || question.question_id] ? (
                                                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                                        <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                                                        Generating answer...
                                                                    </div>
                                                                ) : aiErrors[question.id || question.question_id] ? (
                                                                    <div className="text-sm text-red-400">
                                                                        {aiErrors[question.id || question.question_id]}
                                                                    </div>
                                                                ) : (
                                                                    <div className="prose prose-invert max-w-none text-sm text-slate-300">
                                                                        {aiAnswers[question.id || question.question_id]}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Database Answers Section */}
                                                        {expandedQuestions[question.id || question.question_id] && (
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Community Answers</h4>
                                                                {question.answers_data && question.answers_data.length > 0 ? (
                                                                    question.answers_data.map((answer) => (
                                                                        <div key={answer.id} className="p-4 bg-white/5 rounded-lg border border-white/5">
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="text-sm font-medium text-white">{answer.author}</span>
                                                                                    {answer.is_accepted && (
                                                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 uppercase">Accepted</span>
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-xs text-slate-500">{answer.likes} likes</span>
                                                                            </div>
                                                                            <p className="text-sm text-slate-300">{answer.content}</p>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="text-center py-6 text-slate-500 text-sm italic">
                                                                        No answers yet. Be the first to answer!
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href={route('questions.create')} className="flex flex-col items-center justify-center p-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors group">
                                        <svg className="w-6 h-6 text-white mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-xs font-medium text-white">Ask Question</span>
                                    </Link>
                                    <Link href={route('questions.index')} className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group">
                                        <svg className="w-6 h-6 text-slate-300 mb-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <span className="text-xs font-medium text-slate-300">Browse</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-[#161b22] border border-white/5 rounded-xl p-6">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Your Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <span className="text-sm text-slate-400">Questions Asked</span>
                                        <span className="text-lg font-bold text-white">0</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <span className="text-sm text-slate-400">Answers Given</span>
                                        <span className="text-lg font-bold text-white">0</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <span className="text-sm text-slate-400">Reputation</span>
                                        <span className="text-lg font-bold text-yellow-500">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}