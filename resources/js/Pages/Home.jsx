import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useState } from 'react';

export default function Home({ auth, questions }) {
    const [expandedQuestions, setExpandedQuestions] = useState({});

    const toggleQuestion = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                <h1 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                                    Interview Q&A Platform
                                </h1>
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('profile.edit')}
                                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                                Prepare for Your Next Interview
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-xl text-indigo-100">
                                Join our community of job seekers and professionals to practice interview questions, 
                                share knowledge, and advance your career.
                            </p>
                            {!auth.user && (
                                <div className="mt-10 flex justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-200"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Browse Questions Section */}
                <div className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                Popular Interview Questions
                            </h2>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
                                Browse through commonly asked interview questions across various topics
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="space-y-6">
                                {questions.map((question) => (
                                    <div 
                                        key={question.question_id} 
                                        className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between">
                                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                                    question.difficulty === 'easy' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                                        : question.difficulty === 'medium' 
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                }`}>
                                                    {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                                </span>
                                                {question.is_solved && (
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                        Solved
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                                                {question.title}
                                            </h3>
                                            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                Asked by {question.user_name} • {new Date(question.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <span>{question.vote_count} votes</span>
                                                    <span>{question.answer_count} answers</span>
                                                    <span>{question.view_count} views</span>
                                                </div>
                                                <button
                                                    onClick={() => toggleQuestion(question.question_id)}
                                                    className="flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    <span>{expandedQuestions[question.question_id] ? 'Hide' : 'View'} Answers</span>
                                                    <svg 
                                                        className={`ml-1 h-5 w-5 transform transition-transform ${
                                                            expandedQuestions[question.question_id] ? 'rotate-180' : ''
                                                        }`} 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Expanded Answers Section */}
                                            {expandedQuestions[question.question_id] && (
                                                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                                                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                                        {question.answer_count} Answer{question.answer_count !== 1 ? 's' : ''}
                                                    </h4>
                                                    
                                                    <div className="mt-4 space-y-6">
                                                        {question.answers.length > 0 ? (
                                                            question.answers.map((answer) => (
                                                                <div 
                                                                    key={answer.answer_id} 
                                                                    className={`rounded-lg p-4 ${
                                                                        answer.is_accepted 
                                                                            ? 'bg-green-50 dark:bg-green-900/20' 
                                                                            : 'bg-gray-50 dark:bg-gray-700/50'
                                                                    }`}
                                                                >
                                                                    {answer.is_accepted && (
                                                                        <div className="mb-2 flex items-center">
                                                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                                                                                Accepted Answer
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                    <div className="prose prose-indigo max-w-none dark:prose-invert">
                                                                        {answer.body.split('\n').map((line, index) => (
                                                                            line.startsWith('```') ? (
                                                                                <pre key={index} className="rounded bg-gray-800 p-4 text-white">
                                                                                    <code>{line.replace(/```/g, '')}</code>
                                                                                </pre>
                                                                            ) : (
                                                                                <p key={index}>{line}</p>
                                                                            )
                                                                        ))}
                                                                    </div>
                                                                    <div className="mt-4 flex items-center justify-between">
                                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                            Answered by {answer.user_name} • {new Date(answer.created_at).toLocaleDateString()}
                                                                        </div>
                                                                        <div className="flex items-center">
                                                                            <button className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                                                </svg>
                                                                                <span className="ml-1">{answer.vote_count}</span>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="text-center text-gray-500 dark:text-gray-400">
                                                                No answers yet. Be the first to answer!
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Action buttons for logged in users */}
                                                    <div className="mt-6 flex justify-between">
                                                        {auth.user ? (
                                                            <Link
                                                                href="#"
                                                                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                                            >
                                                                Post Your Answer
                                                            </Link>
                                                        ) : (
                                                            <div className="text-center">
                                                                <p className="text-gray-600 dark:text-gray-400">
                                                                    Please <Link href={route('login')} className="text-indigo-600 hover:underline dark:text-indigo-400">log in</Link> to post your answer, comment, or vote.
                                                                </p>
                                                                <div className="mt-4">
                                                                    <Link
                                                                        href={route('login')}
                                                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                                                                    >
                                                                        Log in to Participate
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href={auth.user ? route('dashboard') : route('login')}
                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                {auth.user ? 'Browse All Questions' : 'Log in to Browse All Questions'}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-12 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
                                Features
                            </h2>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                                Everything you need to ace your interviews
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
                                Our platform provides comprehensive tools to help you prepare for technical and behavioral interviews.
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Practice Questions</h3>
                                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                        Access thousands of real interview questions from top companies across various domains.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Community Support</h3>
                                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                        Connect with other job seekers, share experiences, and get help from industry professionals.
                                    </p>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Track Progress</h3>
                                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                        Monitor your preparation progress with detailed analytics and personalized recommendations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-indigo-700">
                    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            <span className="block">Ready to start your interview preparation?</span>
                            <span className="block text-indigo-200">Join our community today.</span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link
                                    href={auth.user ? route('dashboard') : route('register')}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                                >
                                    {auth.user ? 'Go to Dashboard' : 'Get started'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2025 Interview Q&A Platform. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}