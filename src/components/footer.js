export const renderFooter = () => `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2">
            <span class="font-semibold text-white">Rhein's <span class="text-supabase-primary">MP3</span></span>
            <span>&copy; 2026</span>
        </div>
        <div class="flex gap-6">
            <a href="#" id="link-terms" class="hover:text-supabase-primary transition-colors">Terms</a>
            <a href="#" id="link-privacy" class="hover:text-supabase-primary transition-colors">Privacy</a>
            <a href="#" id="link-dmca" class="hover:text-supabase-primary transition-colors">DMCA</a>
        </div>
    </div>
</div>
`
