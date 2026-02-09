export const renderNavbar = () => `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-supabase-primary to-green-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            </div>
            <span class="font-bold text-xl tracking-tight text-white">
                Rhein's <span class="text-supabase-primary">MP3</span>
            </span>
        </div>
        
        <!-- Navigation -->
        <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
                <a href="#" class="text-white hover:text-supabase-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Converter</a>
                <a href="#" id="nav-guide" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Guide</a>
                <button id="btn-signin" class="bg-supabase-surface border border-supabase-border text-white hover:border-supabase-primary/50 px-4 py-2 rounded-full text-sm font-medium transition-all ml-4 cursor-pointer">
                    Sign In
                </button>
            </div>
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="-mr-2 flex md:hidden">
            <button type="button" id="mobile-menu-btn" class="bg-supabase-surface inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                <span class="sr-only">Open main menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- Mobile Menu, show/hide based on menu state. -->
<div class="hidden md:hidden absolute top-16 left-0 w-full bg-[#1c1c1c] border-b border-[#303030] shadow-xl z-40 transition-all duration-300 origin-top transform scale-y-0 opacity-0" id="mobile-menu">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a href="#" class="text-white hover:bg-supabase-surface block px-3 py-2 rounded-md text-base font-medium">Converter</a>
        <a href="#" id="mobile-nav-guide" class="text-gray-300 hover:text-white hover:bg-supabase-surface block px-3 py-2 rounded-md text-base font-medium">Guide</a>
        <button id="mobile-btn-signin" class="w-full text-left text-gray-300 hover:text-white hover:bg-supabase-surface block px-3 py-2 rounded-md text-base font-medium">
            Sign In
        </button>
    </div>
</div>
`
