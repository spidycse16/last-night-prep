import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, questions = [] }) {
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [likedQuestions, setLikedQuestions] = useState({});
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleQuestion = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const handleLike = (e, questionId) => {
        e.stopPropagation();
        if (!auth.user) {
            window.location.href = route('login');
            return;
        }
        
        setLikedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    // Sample questions data fallback
    const sampleQuestions = [
        {
            id: 1,
            title: "Explain the differences between React and Vue.js",
            content: "Both React and Vue.js are popular JavaScript frameworks for building user interfaces. React is a library developed by Facebook, while Vue.js is a progressive framework created by Evan You. React uses JSX syntax and has a steeper learning curve, while Vue.js uses a template-based approach and is generally easier to learn.",
            tags: ["React", "Vue.js", "JavaScript"],
            likes: 24,
            answers: 8,
            answers_data: [
                {
                    id: 101,
                    content: "React is a library while Vue is a framework. React requires more boilerplate code but offers more flexibility. Vue has a gentler learning curve and built-in solutions for routing and state management.",
                    author: "Alex Johnson",
                    likes: 15,
                    is_accepted: true
                }
            ]
        },
        {
            id: 2,
            title: "What is the difference between == and === in JavaScript?",
            content: "In JavaScript, == is the equality operator that performs type coercion, while === is the strict equality operator that does not perform type coercion. For example, '5' == 5 returns true because JavaScript converts the string to a number, but '5' === 5 returns false because they are different types.",
            tags: ["JavaScript", "Equality", "Type Coercion"],
            likes: 42,
            answers: 12,
            answers_data: []
        },
        {
            id: 3,
            title: "How does the CSS Box Model work?",
            content: "The CSS Box Model describes how every HTML element is represented as a rectangular box with four areas: content, padding, border, and margin. The total width of an element is calculated as: width + padding-left + padding-right + border-left + border-right + margin-left + margin-right.",
            tags: ["CSS", "Box Model", "Layout"],
            likes: 31,
            answers: 5,
            answers_data: []
        }
    ];

    const questionsToDisplay = questions.length > 0 ? questions : sampleQuestions;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#0F1117] text-slate-300 font-sans selection:bg-indigo-500/30">
                
                {/* Navbar */}
                <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F1117]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">FinalNight<span className="text-indigo-400">Prep</span></span>
                        </div>

                        <div className="flex items-center gap-6">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-200">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="hidden md:block text-slate-300 hover:text-white font-medium transition-colors">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent opacity-50 blur-3xl pointer-events-none" />
                    
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium text-slate-300">Live Interview Practice</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                                Master Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Technical Interviews</span>
                            </h1>
                            
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                                Join thousands of developers preparing for their dream jobs. 
                                Practice with real questions, get AI-powered feedback, and track your progress.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {!auth.user && (
                                    <Link href={route('register')} className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-xl shadow-white/5">
                                        Start Practicing Free
                                    </Link>
                                )}
                                <Link href="#questions" className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    Explore Questions
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="border-y border-white/5 bg-white/[0.02]">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: "Active Users", value: "10K+" },
                                { label: "Questions", value: "5,000+" },
                                { label: "Companies", value: "500+" },
                                { label: "Success Rate", value: "92%" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div id="questions" className="max-w-7xl mx-auto px-6 py-24">
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Questions Feed */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white">Latest Questions</h2>
                                <div className="flex gap-2">
                                    {['All', 'Frontend', 'Backend', 'System Design'].map((filter, i) => (
                                        <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                {questionsToDisplay.map((question) => (
                                    <motion.div
                                        key={question.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="group bg-[#161b22] border border-white/5 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {question.tags && question.tags.map((tag, idx) => (
                                                        <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                
                                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => toggleQuestion(question.id)}>
                                                    {question.title}
                                                </h3>
                                                
                                                <div className={`prose prose-invert max-w-none text-slate-400 mb-4 ${expandedQuestions[question.id] ? '' : 'line-clamp-2'}`}>
                                                    {question.content}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                    <div className="flex items-center gap-6">
                                                        <button 
                                                            onClick={(e) => handleLike(e, question.id)}
                                                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${likedQuestions[question.id] ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}
                                                        >
                                                            <svg className="w-5 h-5" fill={likedQuestions[question.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                            </svg>
                                                            <span>{question.likes + (likedQuestions[question.id] ? 1 : 0)}</span>
                                                        </button>
                                                        
                                                        <button 
                                                            onClick={() => toggleQuestion(question.id)}
                                                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-400 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.6 8.6 0 01-5.938-2.375 1.375 1.375 0 00-1.938 0L2.1 19.9a1.375 1.375 0 01-1.938-1.938l2.275-2.275a1.375 1.375 0 000-1.938A8.6 8.6 0 011 12C1 7.582 4.582 4 9 4s8 3.582 8 8z" />
                                                            </svg>
                                                            <span>{question.answers} Answers</span>
                                                        </button>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        {auth.user ? (
                                                            <Link href={route('questions.show', question.id)} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                                                View Discussion →
                                                            </Link>
                                                        ) : (
                                                            <Link href={route('login')} className="text-sm font-medium text-slate-500 hover:text-white transition-colors">
                                                                Login to Answer
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Expanded Answers Section */}
                                                <AnimatePresence>
                                                    {expandedQuestions[question.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-6 pt-6 border-t border-white/5 overflow-hidden"
                                                        >
                                                            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Top Answers</h4>
                                                            {question.answers_data && question.answers_data.length > 0 ? (
                                                                <div className="space-y-4">
                                                                    {question.answers_data.map((answer) => (
                                                                        <div key={answer.id} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                                                            <div className="flex items-center justify-between mb-2">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400">
                                                                                        {answer.author.charAt(0)}
                                                                                    </div>
                                                                                    <span className="text-sm font-medium text-slate-300">{answer.author}</span>
                                                                                    {answer.is_accepted && (
                                                                                        <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wide border border-green-500/20">
                                                                                            Accepted
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <span className="text-xs text-slate-500">{answer.likes} likes</span>
                                                                            </div>
                                                                            <p className="text-sm text-slate-400 leading-relaxed">{answer.content}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-center py-8 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                                                    <p className="text-slate-500 text-sm mb-3">No answers yet. Be the first to help!</p>
                                                                    {auth.user ? (
                                                                        <Link href={route('questions.show', question.id)} className="text-indigo-400 text-sm font-medium hover:underline">
                                                                            Write an answer
                                                                        </Link>
                                                                    ) : (
                                                                        <Link href={route('login')} className="text-indigo-400 text-sm font-medium hover:underline">
                                                                            Login to answer
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-80 space-y-8">
                            {/* CTA Card */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-2">Ready to excel?</h3>
                                <p className="text-indigo-100 text-sm mb-6">Create an account to track your progress and get personalized recommendations.</p>
                                <Link href={route('register')} className="block w-full py-3 bg-white text-indigo-600 font-bold text-center rounded-lg hover:bg-indigo-50 transition-colors">
                                    Join Now
                                </Link>
                            </div>

                            {/* Trending Tags */}
                            <div className="p-6 rounded-2xl bg-[#161b22] border border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">Trending Topics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['JavaScript', 'Python', 'System Design', 'React', 'AWS', 'Algorithms', 'CSS'].map((tag, i) => (
                                        <Link key={i} href="#" className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-sm hover:bg-white/10 hover:text-white transition-colors">
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/5 bg-[#0F1117] py-12">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} FinalNightPrep. Built for developers, by developers.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}