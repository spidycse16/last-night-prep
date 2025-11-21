import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Real Interview Simulations",
            description: "Practice with AI-generated interview questions that mimic real technical interviews from top tech companies.",
            color: "from-yellow-400 to-amber-500"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "AI-Powered Feedback",
            description: "Get detailed analysis of your responses with suggestions for improvement and performance metrics.",
            color: "from-orange-400 to-red-500"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: "Track Your Progress",
            description: "Monitor your improvement over time with detailed analytics and performance insights.",
            color: "from-amber-400 to-yellow-500"
        }
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-950 min-h-screen overflow-hidden relative">
                {/* Animated background gradients */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
                    <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-yellow-500 selection:text-white">
                    <div className="relative w-full max-w-7xl px-6">
                        {/* Header */}
                        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/80 backdrop-blur-lg shadow-lg' : ''}`}>
                            <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                                <div className="flex items-center space-x-3 group cursor-pointer">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition" />
                                        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 transform group-hover:scale-110 transition">
                                            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-2xl font-bold text-white">
                                        <span className="text-yellow-400">Final</span>NightPrep
                                    </span>
                                </div>
                                <nav className="flex gap-2">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium hover:shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="px-6 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 font-medium transition"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 font-medium hover:shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </header>

                        <main className="mt-32 pb-20">
                            {/* Hero Section */}
                            <div className="text-center mb-32 animate-fade-in">
                                <div className="inline-block mb-6 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium backdrop-blur-sm">
                                    🚀 AI-Powered Interview Preparation
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                    Master Technical<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-gradient">
                                        Interviews with Confidence
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                                    Prepare for your dream job with our intelligent platform that simulates real interview experiences and provides personalized, actionable feedback.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-2xl transition-all duration-300"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 transition-transform group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative flex items-center gap-2">
                                                Go to Dashboard
                                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-2xl transition-all duration-300"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="relative flex items-center gap-2">
                                                    Get Started Free
                                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </span>
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition"
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-32">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            animation: 'fadeInUp 0.6s ease-out forwards',
                                            opacity: 0
                                        }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform text-white`}>
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                        {hoveredCard === index && (
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 blur-xl -z-10" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Section */}
                            <div className="relative rounded-3xl p-12 text-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-90" />
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
                                <div className="relative z-10">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Ready to Ace Your Next Interview?</h2>
                                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                                        Join thousands of developers who have improved their interview skills and landed their dream jobs.
                                    </p>
                                    {!auth.user && (
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-yellow-600 bg-white rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all shadow-2xl hover:shadow-white/50"
                                        >
                                            Start Practicing Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </main>

                        <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
                            <p>© {new Date().getFullYear()} FinalNightPrep. All rights reserved.</p>
                        </footer>
                    </div>
                </div>

                <style>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @keyframes gradient {
                        0%, 100% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                    }

                    .animate-gradient {
                        background-size: 200% 200%;
                        animation: gradient 3s ease infinite;
                    }

                    .animate-fade-in {
                        animation: fadeInUp 0.8s ease-out;
                    }
                `}</style>
            </div>
        </>
    );
}