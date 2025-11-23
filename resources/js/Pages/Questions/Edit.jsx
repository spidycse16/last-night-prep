import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function QuestionsEdit({ auth, question, questionTags, tags }) {
    const { data, setData, put, processing, errors } = useForm({
        title: question.title,
        difficulty: question.difficulty,
        tags: questionTags,
    });

    const [selectedTags, setSelectedTags] = useState(questionTags);

    const submit = (e) => {
        e.preventDefault();
        put(route('questions.update', question.question_id));
    };

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            const newTags = selectedTags.filter(id => id !== tagId);
            setSelectedTags(newTags);
            setData('tags', newTags);
        } else {
            const newTags = [...selectedTags, tagId];
            setSelectedTags(newTags);
            setData('tags', newTags);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Question
                </h2>
            }
        >
            <Head title="Edit Question" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit}>
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Question Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="e.g. How do I reverse a linked list in Python?"
                                    />
                                    {errors.title && <div className="mt-1 text-sm text-red-600">{errors.title}</div>}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Difficulty
                                    </label>
                                    <div className="mt-1 grid grid-cols-3 gap-3">
                                        {['easy', 'medium', 'hard'].map((difficulty) => (
                                            <label key={difficulty} className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="difficulty"
                                                    value={difficulty}
                                                    checked={data.difficulty === difficulty}
                                                    onChange={(e) => setData('difficulty', e.target.value)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Tags
                                    </label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <button
                                                key={tag.tag_id}
                                                type="button"
                                                onClick={() => toggleTag(tag.tag_id)}
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${selectedTags.includes(tag.tag_id)
                                                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                                    }`}
                                            >
                                                {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-4">
                                    <Link
                                        href={route('questions.index')}
                                        className="rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        disabled={processing}
                                    >
                                        Update Question
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