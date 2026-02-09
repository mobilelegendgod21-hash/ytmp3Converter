
import './style.css'
import { renderNavbar } from './components/navbar.js'
import { renderHero } from './components/hero.js'
import { renderFooter } from './components/footer.js'
import { supabase } from './lib/supabaseClient.js'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')

  // Create Main Layout
  const header = document.createElement('header')
  header.className = "w-full fixed top-0 left-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent hover:border-supabase-border/50"
  header.innerHTML = renderNavbar()
  document.body.prepend(header) // Prepend to body so it's fixed at top

  // Main Content
  const main = document.createElement('main')
  main.className = "w-full max-w-4xl flex flex-col items-center gap-12 z-10 mt-20"
  main.innerHTML = renderHero()
  app.appendChild(main)

  // Footer
  const footer = document.createElement('footer')
  footer.className = "w-full py-8 mt-auto border-t border-supabase-border/30 text-center text-supabase-muted text-sm"
  footer.innerHTML = renderFooter()
  document.body.appendChild(footer)

  // Modal Container
  const modalContainer = document.createElement('div')
  modalContainer.id = 'modal-container'
  modalContainer.className = 'fixed inset-0 z-[100] hidden flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 transition-opacity duration-300 px-4'
  modalContainer.innerHTML = `
    <div class="relative w-full max-w-2xl transform rounded-lg bg-[#1c1c1c] border border-[#303030] p-8 text-left shadow-2xl transition-all scale-95 opacity-0 duration-300 mx-auto" id="modal-content">
        <h3 class="text-2xl font-bold text-white mb-4" id="modal-title"></h3>
        <div class="mt-2 text-gray-300 space-y-4 max-h-[60vh] overflow-y-auto pr-2" id="modal-body"></div>
        <div class="mt-6 flex justify-end">
            <button id="modal-close" class="bg-supabase-primary text-[#1c1c1c] font-bold py-2 px-4 rounded hover:bg-[#34b27b] transition-colors">Close</button>
        </div>
    </div>
  `
  document.body.appendChild(modalContainer)

  // Initialize Interactions
  initInteractions()
  initModals()
  initMobileMenu()
})

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn')
  const menu = document.getElementById('mobile-menu')

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden')
      if (isHidden) {
        menu.classList.remove('hidden')
        // Small delay for CSS transition
        requestAnimationFrame(() => {
          menu.classList.remove('scale-y-0', 'opacity-0')
        })
      } else {
        menu.classList.add('scale-y-0', 'opacity-0')
        setTimeout(() => {
          menu.classList.add('hidden')
        }, 300)
      }
    })

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target) && !menu.classList.contains('hidden')) {
        menu.classList.add('scale-y-0', 'opacity-0')
        setTimeout(() => {
          menu.classList.add('hidden')
        }, 300)
      }
    })
  }
}

function initModals() {
  const modalContainer = document.getElementById('modal-container')
  const modalContent = document.getElementById('modal-content')
  const modalTitle = document.getElementById('modal-title')
  const modalBody = document.getElementById('modal-body')
  const closeModal = document.getElementById('modal-close')

  const openModal = (title, content) => {
    modalTitle.textContent = title
    modalBody.innerHTML = content
    modalContainer.classList.remove('hidden')
    modalContainer.classList.add('flex') // Ensure flex is active for centering
    // Small delay to allow display:block to apply before opacity transition
    requestAnimationFrame(() => {
      modalContainer.classList.remove('opacity-0')
      modalContent.classList.remove('scale-95', 'opacity-0')
      modalContent.classList.add('scale-100', 'opacity-100')
    })
  }

  const hideModal = () => {
    modalContainer.classList.add('opacity-0')
    modalContent.classList.remove('scale-100', 'opacity-100')
    modalContent.classList.add('scale-95', 'opacity-0')
    setTimeout(() => {
      modalContainer.classList.add('hidden')
      modalContainer.classList.remove('flex')
    }, 300)
  }

  closeModal.addEventListener('click', hideModal)
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) hideModal()
  })

  // Content Data
  const contentData = {
    guide: `
            <h4 class="text-lg font-semibold text-supabase-primary">How to convert YouTube to MP3?</h4>
            <ol class="list-decimal list-inside space-y-2 mt-2">
                <li>Copy the URL of the YouTube video you want to convert.</li>
                <li>Paste the URL into the input field on our homepage.</li>
                <li>Click the <strong>Convert</strong> button.</li>
                <li>Wait specifically for the process to finish (usually a few seconds).</li>
                <li>Click <strong>Download MP3</strong> to save the file to your device.</li>
            </ol>
            <p class="mt-4 text-sm text-gray-400">Note: Videos longer than 15 minutes are not supported to ensure fast service for everyone.</p>
        `,
    terms: `
            <p>By using Rhein's MP3 Converter, you agree to the following terms:</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>This service is for personal use only.</li>
                <li>You must not use this tool to infringe on copyrighted material.</li>
                <li>We are not responsible for how you use the downloaded files.</li>
                <li>Service is provided "as is" without warranties of any kind.</li>
            </ul>
        `,
    privacy: `
            <p>We respect your privacy.</p>
            <ul class="list-disc list-inside space-y-2 mt-2">
                <li>We do not store your personal data.</li>
                <li>We temporarily process the video URL you provide to convert it.</li>
                <li>We may use cookies for essential site functionality.</li>
            </ul>
        `,
    dmca: `
            <p>Rhein's MP3 respects the intellectual property rights of others.</p>
            <p class="mt-2">If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us immediately. We will promptly remove any content that violates copyright laws.</p>
        `
  }

  // Event Listeners
  const safeAddListener = (id, action) => {
    const el = document.getElementById(id)
    if (el) el.addEventListener('click', (e) => {
      e.preventDefault()
      action()
    })
  }

  safeAddListener('nav-guide', () => openModal('User Guide', contentData.guide))
  safeAddListener('mobile-nav-guide', () => openModal('User Guide', contentData.guide)) // Mobile

  safeAddListener('link-terms', () => openModal('Terms of Service', contentData.terms))
  safeAddListener('link-privacy', () => openModal('Privacy Policy', contentData.privacy))
  safeAddListener('link-dmca', () => openModal('DMCA Copyright', contentData.dmca))

  const handleSignIn = (id) => {
    const btn = document.getElementById(id)
    if (!btn) return

    const originalText = btn.textContent;
    btn.textContent = "Coming Soon!";
    // Check if button is mobile (different styling context) or desktops
    if (id === 'mobile-btn-signin') {
      btn.classList.add('text-red-500');
    } else {
      btn.classList.add('bg-red-500', 'border-red-500');
    }

    setTimeout(() => {
      btn.textContent = originalText;
      if (id === 'mobile-btn-signin') {
        btn.classList.remove('text-red-500');
      } else {
        btn.classList.remove('bg-red-500', 'border-red-500');
      }
    }, 2000);
  }

  safeAddListener('btn-signin', () => handleSignIn('btn-signin'))
  safeAddListener('mobile-btn-signin', () => handleSignIn('mobile-btn-signin'))
}

function initInteractions() {
  const convertBtn = document.querySelector('#convert-btn')
  const input = document.querySelector('#url-input')
  const resultContainer = document.querySelector('#result-container')
  const API_URL = 'https://ytmp3converter-backend.onrender.com'; // Hardcoded for dev, use env in prod

  if (convertBtn && input) {
    const handleConvert = () => {
      const url = input.value.trim()
      if (url) {
        startConversion(url)
      } else {
        input.classList.add('ring-2', 'ring-red-500')
        setTimeout(() => input.classList.remove('ring-2', 'ring-red-500'), 1000)
      }
    }

    convertBtn.addEventListener('click', handleConvert)

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleConvert()
    })
  }

  async function startConversion(url) {
    const btnText = convertBtn.querySelector('span')

    // Loading State
    convertBtn.disabled = true
    convertBtn.classList.add('opacity-75', 'cursor-not-allowed')
    btnText.textContent = 'Fetching Info...'

    try {
      // Step 1: Get Info
      const infoRes = await fetch(`${API_URL}/info?url=${encodeURIComponent(url)}`)

      if (!infoRes.ok) {
        const errData = await infoRes.json();
        throw new Error(errData.details || errData.error || 'Invalid URL or Server Error');
      }

      const data = await infoRes.json()

      // Show Result
      showResult(data, url)

      // Log to Supabase
      logToSupabase(data.title, url)

    } catch (err) {
      alert("Error: " + err.message)
    } finally {
      // Reset Button
      convertBtn.disabled = false
      convertBtn.classList.remove('opacity-75', 'cursor-not-allowed')
      btnText.textContent = 'Convert'
    }
  }

  function showResult(data, url) {
    if (!resultContainer) return

    const downloadLink = `${API_URL}/convert?url=${encodeURIComponent(url)}`

    resultContainer.innerHTML = `
        <div class="sb-card w-full flex flex-col md:flex-row gap-6 animate-fade-in-up">
            <div class="w-full md:w-48 aspect-video rounded-md overflow-hidden bg-black/50 relative group">
                <img src="${data.thumbnail}" alt="Thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h3 class="text-xl font-bold text-white mb-2 line-clamp-2">${data.title}</h3>
                    <p class="text-supabase-muted text-sm flex items-center gap-2">
                        <span>by ${data.author}</span> • <span>${formatTime(data.lengthSeconds)}</span>
                    </p>
                </div>
                <div class="mt-6 flex gap-3">
                    <a href="${downloadLink}" target="_blank" class="sb-btn flex-1 py-2 flex items-center justify-center gap-2 group no-underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Download MP3
                    </a>
                </div>
            </div>
        </div>
      `
    resultContainer.classList.remove('hidden')
  }

  async function logToSupabase(title, url) {
    // Example implementation - Requires working keys
    const { error } = await supabase
      .from('conversions')
      .insert([{ title, url, created_at: new Date() }])

    if (error) console.error('Supabase Log Error:', error)
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
