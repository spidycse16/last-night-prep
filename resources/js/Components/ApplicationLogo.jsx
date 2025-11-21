export default function ApplicationLogo(props) {
    return (
        <div {...props} className={`${props.className} flex items-center justify-center`}>
            {/* Custom Logo for FinalNightPrep - Light Bulb Design */}
            <div className="flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                    <span className="text-yellow-500">Final</span>NightPrep
                </span>
            </div>
        </div>
    );
}