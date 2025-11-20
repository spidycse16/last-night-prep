import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function QuestionsIndex({ auth, questions }) {
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
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        All Questions
                    </h2>
                    <Link
                        href={route('questions.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Ask Question
                    </Link>
                </div>
            }
        >
            <Head title="Questions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="space-y-6">
                                {questions.data && questions.data.map((question) => (
                                    <div 
                                        key={question.question_id} 
                                        className="border-b border-gray-200 pb-6 last:border-0 last:pb-0 dark:border-gray-700"
                                    >
                                        <div className="flex items-start">
                                            <div className="flex flex-col items-center text-center text-sm text-gray-500 dark:text-gray-400">
                                                <div className="font-semibold">{question.vote_count}</div>
                                                <div>votes</div>
                                                <div className="mt-2 font-semibold text-green-600 dark:text-green-400">
                                                    {question.answer_count}
                                                </div>
                                                <div>answers</div>
                                                <div className="mt-2 font-semibold">{question.view_count}</div>
                                                <div>views</div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                                        <Link href={route('questions.show', question.question_id)}>
                                                            {question.title}
                                                        </Link>
                                                    </h3>
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
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        question.difficulty === 'easy' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                                            : question.difficulty === 'medium' 
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' 
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                    }`}>
                                                        {question.difficulty}
                                                    </span>
                                                    {question.is_solved && (
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                                            Solved
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    Asked by {question.user_name} • {new Date(question.created_at).toLocaleDateString()}
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
                                            
                                            {/* Edit/Delete buttons for own questions */}
                                            {question.user_id === auth.user.id && (
                                                <div className="ml-4 flex flex-col space-y-2">
                                                    <Link
                                                        href={route('questions.edit', question.question_id)}
                                                        className="inline-flex items-center rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route('questions.destroy', question.question_id)}
                                                        method="delete"
                                                        className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white shadow-sm hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {questions.links && questions.links.length > 3 && (
                                <div className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700 sm:px-6">
                                    <div className="flex flex-1 justify-between sm:hidden">
                                        <Link
                                            href={questions.prev_page_url || '#'}
                                            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 ${
                                                !questions.prev_page_url ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                        >
                                            Previous
                                        </Link>
                                        <Link
                                            href={questions.next_page_url || '#'}
                                            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 ${
                                                !questions.next_page_url ? 'pointer-events-none opacity-50' : ''
                                            }`}
                                        >
                                            Next
                                        </Link>
                                    </div>
                                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                Showing <span className="font-medium">{questions.from}</span> to{' '}
                                                <span className="font-medium">{questions.to}</span> of{' '}
                                                <span className="font-medium">{questions.total}</span> results
                                            </p>
                                        </div>
                                        <div>
                                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                {questions.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                            link.active
                                                                ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700'
                                                        } ${
                                                            !link.url ? 'pointer-events-none opacity-50' : ''
                                                        }`}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}