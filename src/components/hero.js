export const renderHero = () => `
<div class="text-center w-full max-w-2xl mx-auto px-4 z-10">
    <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-supabase-border bg-supabase-surface/50 backdrop-blur-sm mb-8 animate-fade-in-down">
        <span class="flex h-2 w-2 relative mr-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-supabase-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-supabase-primary"></span>
        </span>
        <span class="text-xs font-semibold text-supabase-primary uppercase tracking-wide">Fast • Free • Secure • No ADS</span>
    </div>

    <h1 class="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 leading-tight animate-fade-in-up">
        Rhein's <span class="text-supabase-primary">MP3</span> Converter
    </h1>
    
    <p class="mt-4 max-w-xl mx-auto text-lg text-supabase-muted mb-10 animate-fade-in-up delay-100">
        Stop waiting. Get high-quality audio extraction with our lightning-fast, developer-friendly converter. No ads, no fuss.
    </p>
    
    <!-- Converter Input Section -->
    <div class="w-full relative group animate-fade-in-up delay-200">
        <div class="absolute -inset-1 bg-gradient-to-r from-supabase-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative flex flex-col sm:flex-row gap-2 bg-supabase-bg p-2 rounded-lg border border-supabase-border shadow-2xl">
            <div class="flex-grow relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
                <input type="text" id="url-input" class="w-full pl-10 pr-4 py-3 bg-supabase-surface border border-transparent rounded-md focus:border-supabase-primary focus:ring-0 text-white placeholder-gray-500 transition-all font-medium" placeholder="Paste YouTube link here...">
            </div>
            <button id="convert-btn" class="sb-btn flex items-center justify-center gap-2 min-w-[140px] shadow-lg shadow-supabase-primary/20">
                <span>Convert</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
        </div>
    </div>
    
    <!-- Results Placeholder -->
    <div id="result-container" class="w-full mt-10 hidden transition-all duration-500">
        <!-- Result Card will be injected here -->
    </div>
</div>
`
