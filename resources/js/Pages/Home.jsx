import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, questions = [] }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [expandedQuestions, setExpandedQuestions] = useState({});
    const [expandedAnswers, setExpandedAnswers] = useState({});
    const [likedQuestions, setLikedQuestions] = useState({});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const toggleQuestion = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const toggleAnswer = (answerId) => {
        setExpandedAnswers(prev => ({
            ...prev,
            [answerId]: !prev[answerId]
        }));
    };

    const handleLike = (questionId) => {
        if (!auth.user) {
            // Redirect to login if not authenticated
            window.location.href = route('login');
            return;
        }
        
        // Toggle like state (in a real app, this would make an API call)
        setLikedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    // Sample questions data with answers for demonstration
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
                },
                {
                    id: 102,
                    content: "In my experience, React is better for large-scale applications with complex state management needs. Vue is excellent for rapid prototyping and smaller projects where you want to get something up quickly.",
                    author: "Sarah Williams",
                    likes: 8,
                    is_accepted: false
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
            answers_data: [
                {
                    id: 201,
                    content: "The == operator compares values after converting both operands to a common type. The === operator compares both value and type without conversion. Always use === to avoid unexpected behavior.",
                    author: "Mike Chen",
                    likes: 22,
                    is_accepted: true
                },
                {
                    id: 202,
                    content: "Here's a simple example: 0 == false // true, 0 === false // false. The first converts false to 0, while the second checks both type and value.",
                    author: "Emma Davis",
                    likes: 17,
                    is_accepted: false
                }
            ]
        },
        {
            id: 3,
            title: "How does the CSS Box Model work?",
            content: "The CSS Box Model describes how every HTML element is represented as a rectangular box with four areas: content, padding, border, and margin. The total width of an element is calculated as: width + padding-left + padding-right + border-left + border-right + margin-left + margin-right. Understanding the box model is crucial for proper layout design.",
            tags: ["CSS", "Box Model", "Layout"],
            likes: 31,
            answers: 5,
            answers_data: [
                {
                    id: 301,
                    content: "The box-sizing property can change how the total width is calculated. box-sizing: content-box (default) includes padding and border in the total width. box-sizing: border-box includes padding and border in the defined width.",
                    author: "David Brown",
                    likes: 19,
                    is_accepted: true
                }
            ]
        }
    ];

    const questionsToDisplay = questions.length > 0 ? questions : sampleQuestions;

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animation-delay-2000 animate-blob"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animation-delay-4000 animate-blob"></div>
                </div>

                <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
                    <div className="w-full max-w-7xl mx-auto">

                        {/* Header */}
                        <motion.header
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-20"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-60 animate-pulse"></div>
                                    <div className="relative p-3 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl shadow-2xl">
                                        <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                                    Final<span className="text-white">NightPrep</span>
                                </span>
                            </div>

                            <nav className="flex gap-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="px-6 py-3 text-white/80 hover:text-white transition">
                                            Log in
                                        </Link>
                                        <Link href={route('register')} className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-bold shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </motion.header>

                        {/* Hero Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.2 }}
                            className="text-center mb-24"
                        >
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                                Master Technical Interviews with <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
                                    FinalNightPrep
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                                AI-powered mock interviews • Instant feedback • Real questions from FAANG & startups
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="group px-10 py-5 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:shadow-yellow-400/60 transform hover:scale-105 transition flex items-center gap-3">
                                        Go to Dashboard
                                        <svg className="w-5 h-5 group-hover:translate-x-2 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')} className="px-12 py-5 text-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl hover:shadow-yellow-400/60 transform hover:scale-105 transition">
                                            Get Started Free
                                        </Link>
                                        <Link href={route('login')} className="px-12 py-5 text-lg font-medium text-white border-2 border-white/30 backdrop-blur-lg rounded-full hover:bg-white/10 transition">
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.section>

                        {/* Features Grid */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
                            {[
                                { icon: "💻", title: "Real Interview Simulations", desc: "Practice with AI-generated questions that mimic real technical interviews from top tech companies." },
                                { icon: "🤖", title: "AI-Powered Feedback", desc: "Get detailed analysis of your responses with suggestions for improvement and performance metrics." },
                                { icon: "📊", title: "Track Your Progress", desc: "Monitor your improvement over time with detailed analytics and performance insights." },
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-500 transform hover:-translate-y-3"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition"></div>
                                    <div className="relative z-10">
                                        <div className="text-5xl mb-4">{feature.icon}</div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Questions Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-black text-white mb-4">
                                    Popular Interview Questions
                                </h2>
                                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                    Browse our collection of real interview questions and prepare for your next opportunity
                                </p>
                            </div>

                            <div className="space-y-6">
                                {questionsToDisplay.map((question) => (
                                    <div 
                                        key={question.id} 
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                    >
                                        <div className="p-6">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <h3 className="text-xl font-bold text-white">
                                                    {question.title}
                                                </h3>
                                                <div className="flex items-center space-x-4">
                                                    <button
                                                        onClick={() => handleLike(question.id)}
                                                        className={`flex items-center space-x-1 ${
                                                            likedQuestions[question.id] 
                                                                ? 'text-yellow-400' 
                                                                : 'text-gray-400 hover:text-yellow-400'
                                                        }`}
                                                    >
                                                        <svg className="w-5 h-5" fill={likedQuestions[question.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                                        </svg>
                                                        <span>{question.likes + (likedQuestions[question.id] ? 1 : 0)}</span>
                                                    </button>
                                                    <span className="text-gray-400 text-sm">
                                                        {question.answers} answers
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {question.tags && question.tags.map((tag, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mb-4">
                                                <p className={`${expandedQuestions[question.id] ? '' : 'line-clamp-2'} text-gray-300`}>
                                                    {question.content}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => toggleQuestion(question.id)}
                                                    className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center"
                                                >
                                                    {expandedQuestions[question.id] ? 'Show less' : 'Read more'}
                                                    <svg 
                                                        className={`ml-2 w-4 h-4 transform transition-transform ${
                                                            expandedQuestions[question.id] ? 'rotate-180' : ''
                                                        }`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </button>

                                                <div className="flex space-x-3">
                                                    {auth.user ? (
                                                        <Link 
                                                            href={route('questions.show', question.id)}
                                                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition"
                                                        >
                                                            View Discussion
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            onClick={() => window.location.href = route('login')}
                                                            className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition"
                                                        >
                                                            Login to Comment
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Answers Section */}
                                            {expandedQuestions[question.id] && question.answers_data && (
                                                <div className="mt-6 pt-6 border-t border-white/10">
                                                    <h4 className="text-lg font-semibold text-white mb-4">
                                                        Answers ({question.answers_data.length})
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {question.answers_data.map((answer) => (
                                                            <div 
                                                                key={answer.id} 
                                                                className="bg-white/5 rounded-xl p-4"
                                                            >
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <span className="text-sm font-medium text-yellow-400">
                                                                            {answer.author}
                                                                        </span>
                                                                        {answer.is_accepted && (
                                                                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                                                                Accepted
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <button className="text-gray-400 hover:text-yellow-400">
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                                                            </svg>
                                                                        </button>
                                                                        <span className="text-xs text-gray-400">
                                                                            {answer.likes} likes
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <p className="text-gray-300 text-sm">
                                                                    {answer.content}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!auth.user && (
                                <div className="text-center mt-10">
                                    <p className="text-gray-300 mb-6">
                                        Sign up to participate in discussions, ask questions, and track your progress
                                    </p>
                                    <Link 
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold hover:from-yellow-600 hover:to-orange-600 transition shadow-lg"
                                    >
                                        Create Free Account
                                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </motion.section>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-600 rounded-3xl p-12 text-center shadow-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                    Ready to Ace Your Next Interview?
                                </h2>
                                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                    Join thousands of developers who have landed their dream jobs with FinalNightPrep.
                                </p>
                                {!auth.user && (
                                    <Link href={route('register')} className="inline-flex items-center px-12 py-5 text-xl font-bold text-orange-600 bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition">
                                        Start Practicing Now → 
                                    </Link>
                                )}
                            </div>
                        </motion.div>

                        <footer className="mt-20 text-center text-gray-500 text-sm">
                            <p>© {new Date().getFullYear()} FinalNightPrep. Built for developers, by developers.</p>
                        </footer>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 20s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}