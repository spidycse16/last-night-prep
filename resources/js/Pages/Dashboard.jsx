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
                                        className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
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
                                            <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3">
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                                            <div className="flex-shrink-0 rounded-md bg-blue-500 p-3">
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                                            <div className="flex-shrink-0 rounded-md bg-green-500 p-3">
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
                                            <div className="flex-shrink-0 rounded-md bg-purple-500 p-3">
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
                                                        className="text-lg font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                    >
                                                        {question.title}
                                                    </Link>
                                                    <button
                                                        onClick={() => toggleQuestion(question.question_id)}
                                                        className="flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
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
                                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <span>Asked by {question.user_name}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{question.answer_count} answers</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{question.view_count} views</span>
                                                </div>
                                                
                                                {/* Expanded content */}
                                                {expandedQuestions[question.question_id] && (
                                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                                        <p>This is a preview of the question content. Click on the question title to view the full details and answers.</p>
                                                        <div className="mt-2">
                                                            <Link 
                                                                href={route('questions.show', question.question_id)}
                                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                            >
                                                                View full question →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-4">
                                        <Link 
                                            href={route('questions.index')}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            View all questions →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Stats and Profile */}
                        <div>
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Your Profile
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                                                {auth?.user?.name?.charAt(0) || 'U'}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {auth?.user?.name || 'User'}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {auth?.user?.email || ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={route('profile.edit')}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                        >
                                            Edit Profile →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Your Stats
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Questions Asked</span>
                                            <span className="font-medium">5</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Answers Given</span>
                                            <span className="font-medium">12</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Reputation</span>
                                            <span className="font-medium">125</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Badges</span>
                                            <span className="font-medium">3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        Recent Activity
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium text-gray-900 dark:text-white">You</span> asked a question
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    2 hours ago
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium text-gray-900 dark:text-white">You</span> answered a question
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    1 day ago
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