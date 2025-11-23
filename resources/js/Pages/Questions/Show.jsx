import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function QuestionsShow({ auth, question, answers, tags }) {
    const { data, setData, post, processing, errors } = useForm({
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('answers.store', question.question_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Question Details
                    </h2>
                    <Link
                        href={route('questions.index')}
                        className="rounded-md bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Back to Questions
                    </Link>
                </div>
            }
        >
            <Head title={question.title} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Question */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex">
                                <div className="flex flex-col items-center text-center text-sm text-gray-500 dark:text-gray-400">
                                    <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                    <div className="my-1 font-semibold text-lg">{question.vote_count}</div>
                                    <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {question.is_solved && (
                                        <div className="mt-2 text-green-600 dark:text-green-400" title="Solved">
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {question.title}
                                    </h1>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                                            >
                                                {tag.name}
                                            </span>
                                        ))}
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${question.difficulty === 'easy'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                : question.difficulty === 'medium'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                            }`}>
                                            {question.difficulty}
                                        </span>
                                    </div>
                                    <div className="mt-4 prose prose-indigo max-w-none dark:prose-invert">
                                        <p>This is where the question details would be displayed. In a real implementation, this would show the full question content.</p>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Asked by {question.user_name} • {new Date(question.created_at).toLocaleDateString()}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="inline-flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                                Share
                                            </button>
                                            <button className="inline-flex items-center rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                                                Follow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answers count */}
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                {question.answer_count} Answer{question.answer_count !== 1 ? 's' : ''}
                            </h3>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="space-y-6">
                                {answers.length > 0 ? (
                                    answers.map((answer) => (
                                        <div
                                            key={answer.answer_id}
                                            className={`border-b border-gray-200 pb-6 last:border-0 last:pb-0 dark:border-gray-700 ${answer.is_accepted
                                                    ? 'bg-green-50 dark:bg-green-900/20'
                                                    : ''
                                                }`}
                                        >
                                            <div className="flex">
                                                <div className="flex flex-col items-center text-center text-sm text-gray-500 dark:text-gray-400">
                                                    <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    </button>
                                                    <div className="my-1 font-semibold">{answer.vote_count}</div>
                                                    <button className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                    {answer.is_accepted && (
                                                        <button
                                                            className="mt-2 text-green-600 dark:text-green-400"
                                                            title="Accepted answer"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="prose prose-indigo max-w-none dark:prose-invert">
                                                        <p>{answer.body}</p>
                                                    </div>
                                                    <div className="mt-4 flex items-center justify-between">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            Answered by {answer.user_name} • {new Date(answer.created_at).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                                                Reply
                                                            </button>
                                                            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                                                Share
                                                            </button>
                                                        </div>
                                                    </div>
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
                        </div>
                    </div>

                    {/* Answer form */}
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Your Answer
                            </h3>
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Answer
                                    </label>
                                    <textarea
                                        id="body"
                                        name="body"
                                        rows={6}
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="Write your answer here..."
                                    />
                                    {errors.body && <div className="mt-1 text-sm text-red-600">{errors.body}</div>}
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled={processing}
                                    >
                                        Post Your Answer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}