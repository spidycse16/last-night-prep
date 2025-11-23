import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function QuestionsIndex({ auth, questions }) {
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [aiAnswers, setAiAnswers] = useState({});
    const [loadingAi, setLoadingAi] = useState({});
    const [aiErrors, setAiErrors] = useState({});

    const toggleQuestion = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const fetchAiAnswer = async (questionId, questionTitle) => {
        // Always clear previous state and start loading
        setAiErrors(prev => ({ ...prev, [questionId]: null }));
        setLoadingAi(prev => ({ ...prev, [questionId]: true }));

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
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-white">
                        All Questions
                    </h2>
                    <Link
                        href={route('questions.create')}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                    >
                        Ask Question
                    </Link>
                </div>
            }
        >
            <Head title="Questions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {questions.data && questions.data.map((question, index) => (
                            <motion.div
                                key={question.question_id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[#161b22] border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-6">
                                        {/* Stats Column */}
                                        <div className="flex flex-col items-center gap-4 min-w-[60px]">
                                            <div className="text-center">
                                                <div className="text-lg font-bold text-white">{question.vote_count}</div>
                                                <div className="text-xs text-slate-500 uppercase tracking-wider">votes</div>
                                            </div>
                                            <div className={`text-center px-2 py-1 rounded-lg ${question.is_solved ? 'bg-green-500/10' : 'bg-white/5'}`}>
                                                <div className={`text-lg font-bold ${question.is_solved ? 'text-green-400' : 'text-slate-300'}`}>
                                                    {question.answer_count}
                                                </div>
                                                <div className={`text-xs uppercase tracking-wider ${question.is_solved ? 'text-green-500' : 'text-slate-500'}`}>
                                                    answers
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium text-slate-400">{question.view_count}</div>
                                                <div className="text-[10px] text-slate-600 uppercase tracking-wider">views</div>
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white mb-2 hover:text-indigo-400 transition-colors">
                                                        <Link href={route('questions.show', question.question_id)}>
                                                            {question.title}
                                                        </Link>
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${question.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                                                            question.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                                                'bg-red-500/10 text-red-400'
                                                            }`}>
                                                            {question.difficulty}
                                                        </span>
                                                        {question.is_solved && (
                                                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                                                                Solved
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => toggleQuestion(question.question_id)}
                                                        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-2"
                                                    >
                                                        {expandedQuestions[question.question_id] ? 'Hide Answers' : 'View Answers'}
                                                        <svg className={`w-4 h-4 transition-transform ${expandedQuestions[question.question_id] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        onClick={() => fetchAiAnswer(question.question_id, question.title)}
                                                        disabled={loadingAi[question.question_id]}
                                                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {loadingAi[question.question_id] ? (
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

                                            <div className="flex items-center justify-between text-sm text-slate-500 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <span>Asked by <span className="text-slate-300">{question.user_name}</span></span>
                                                    <span>•</span>
                                                    <span>{new Date(question.created_at).toLocaleDateString()}</span>
                                                </div>

                                                {question.user_id === auth.user.id && (
                                                    <div className="flex items-center gap-3">
                                                        <Link
                                                            href={route('questions.edit', question.question_id)}
                                                            className="text-slate-400 hover:text-white transition-colors"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route('questions.destroy', question.question_id)}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Expanded Content */}
                                            <AnimatePresence>
                                                {(expandedQuestions[question.question_id] || aiAnswers[question.question_id] || loadingAi[question.question_id] || aiErrors[question.question_id]) && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-6 space-y-4 pt-6 border-t border-white/5">
                                                            {/* AI Answer Section */}
                                                            {(aiAnswers[question.question_id] || loadingAi[question.question_id] || aiErrors[question.question_id]) && (
                                                                <div className={`p-4 rounded-lg border mb-4 ${aiErrors[question.question_id] ? 'bg-red-500/10 border-red-500/20' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
                                                                    <div className={`flex items-center gap-2 mb-2 ${aiErrors[question.question_id] ? 'text-red-400' : 'text-indigo-400'}`}>
                                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                        </svg>
                                                                        <span className="text-xs font-bold uppercase tracking-wider">AI Generated Answer</span>
                                                                    </div>
                                                                    {loadingAi[question.question_id] ? (
                                                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                                            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                                                            Generating answer...
                                                                        </div>
                                                                    ) : aiErrors[question.question_id] ? (
                                                                        <div className="text-sm text-red-400">
                                                                            {aiErrors[question.question_id]}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="prose prose-invert max-w-none text-sm text-slate-300">
                                                                            {aiAnswers[question.question_id]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Database Answers Section */}
                                                            <div className="space-y-3">
                                                                <h4 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Top Answers</h4>
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

                                                                <div className="mt-4 text-center">
                                                                    <Link
                                                                        href={route('questions.show', question.question_id)}
                                                                        className="inline-flex items-center justify-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-colors gap-2"
                                                                    >
                                                                        <span>View All Answers</span>
                                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                        </svg>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {questions.links && questions.links.length > 3 && (
                            <div className="mt-8 flex items-center justify-center">
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    {questions.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link.active
                                                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                : 'text-slate-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:outline-offset-0'
                                                } ${index === 0 ? 'rounded-l-md' : ''
                                                } ${index === questions.links.length - 1 ? 'rounded-r-md' : ''
                                                } ${!link.url ? 'pointer-events-none opacity-50' : ''
                                                }`}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}