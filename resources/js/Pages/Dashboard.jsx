import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, randomQuestions, tags }) {
    const [expandedQuestions, setExpandedQuestions] = useState({});

    const toggleQuestion = (questionId) => {
        setExpandedQuestions(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
            tags={tags}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                        <div className="px-6 py-8 sm:p-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                        Welcome back, {auth.user.name}!
                                    </h1>
                                    <p className="mt-2 text-yellow-100">
                                        Continue your journey to master technical interviews
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Link
                                        href={route('questions.create')}
                                        className="inline-flex items-center rounded-lg bg-white px-5 py-3 text-base font-medium text-yellow-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-yellow-600"
                                    >
                                        Practice Now
                                        <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Tags Section */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Popular Tags
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-2">
                                {tags && tags.slice(0, 15).map((tag) => (
                                    <Link
                                        key={tag.tag_id || tag.id}
                                        href={route('questions.index') + '?tag=' + tag.name}
                                        className="inline-flex items-center rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 text-sm font-medium text-yellow-800 hover:from-yellow-200 hover:to-orange-200 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-100 dark:hover:from-yellow-800 dark:hover:to-orange-800"
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left column - Quick Actions */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Ask Question Card */}
                                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 rounded-md bg-gradient-to-r from-yellow-500 to-amber-500 p-3">
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    Ask Question
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Share your interview questions with the community
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={route('questions.create')}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-yellow-600 to-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-yellow-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                            >
                                                Ask Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* My Questions Card */}
                                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 rounded-md bg-gradient-to-r from-yellow-500 to-orange-500 p-3">
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    My Questions
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    View questions you've asked
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={route('questions.index') + '?user=' + auth.user.id}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-yellow-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* My Answers Card */}
                                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 rounded-md bg-gradient-to-r from-green-500 to-teal-500 p-3">
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    My Answers
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    View questions you've answered
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={route('questions.index') + '?answered_by=' + auth.user.id}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Practice Interview Card */}
                                <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 rounded-md bg-gradient-to-r from-orange-500 to-red-500 p-3">
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    Practice Interview
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Practice answering interview questions
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Link
                                                href={route('questions.create')}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                            >
                                                Start
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Random Questions Section */}
                            <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Random Questions
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {randomQuestions && randomQuestions.map((question) => (
                                            <div key={question.question_id} className="border-b border-gray-200 pb-4 dark:border-gray-700 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between">
                                                    <Link 
                                                        href={route('questions.show', question.question_id)}
                                                        className="text-lg font-medium text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                    >
                                                        {question.title}
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleQuestion(question.question_id)}
                                                        className="flex items-center text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                    >
                                                        <svg 
                                                            className={`h-5 w-5 transform transition-transform ${
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
                                                {expandedQuestions[question.question_id] && (
                                                    <div className="mt-2 text-gray-600 dark:text-gray-400">
                                                        <p>This is a sample question content. In a real implementation, this would show the full question details.</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Stats and Activity */}
                        <div className="lg:col-span-1">
                            <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Your Stats
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 rounded-md bg-yellow-100 p-2 dark:bg-yellow-900/50">
                                                    <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Questions Asked
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                12
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 rounded-md bg-green-100 p-2 dark:bg-green-900/50">
                                                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Answers Given
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                24
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 rounded-md bg-blue-100 p-2 dark:bg-blue-900/50">
                                                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Reputation
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                142
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Recent Activity
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-md bg-yellow-100 p-2 dark:bg-yellow-900/50">
                                                <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    You answered a question about React hooks
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    2 hours ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-md bg-green-100 p-2 dark:bg-green-900/50">
                                                <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    Your answer was accepted
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    1 day ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 rounded-md bg-blue-100 p-2 dark:bg-blue-900/50">
                                                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    New badge earned: Helper
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    3 days ago
                                                </p>
                                            </div>
                                        </div>
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