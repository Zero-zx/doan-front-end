/* ============================================
   QUALITY MODEL CONTROLLER
   Manage logic for Quality Model (high-quality model)
   ============================================ */

let qualityImageData = null;  // Store uploaded image data (base64)
let qualityImageFile = null;  // Store File object to send to API
let qualityTimer = null;      // Timer for progress bar (fallback)

/**
 * Handle when user uploads image for Quality Model
 * @param {Event} event - Event from file input
 */
function handleQualityImageUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    
    qualityImageFile = file; // Save file to send to API
    
    const reader = new FileReader();
    reader.onloadend = function() {
        qualityImageData = reader.result; // Base64 with data URL prefix
        
        // Display image preview
        document.getElementById('quality-image-display').src = qualityImageData;
        document.getElementById('quality-image-preview').classList.remove('hidden');
        document.getElementById('quality-upload-label').classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

/**
 * Remove uploaded image for Quality Model
 */
function removeQualityImage() {
    qualityImageData = null;
    qualityImageFile = null;
    document.getElementById('quality-image-preview').classList.add('hidden');
    document.getElementById('quality-upload-label').classList.remove('hidden');
    document.getElementById('quality-image-input').value = '';
}

/**
 * Generate image using Quality Model - CALL REAL API
 */
async function generateQuality() {
    const prompt = document.getElementById('quality-prompt-input').value.trim();
    
    // Check input
    if (!prompt && !qualityImageFile) {
        alert('Please enter a prompt or upload an image!');
        return;
    }
    
    const btn = document.getElementById('quality-generate-btn');
    const container = document.getElementById('quality-result-container');
    const timeBadge = document.getElementById('quality-time-badge');
    
    // Disable button and show loading
    setQualityButtonLoading(btn, true);
    
    // Clear previous result
    container.innerHTML = '';
    timeBadge.classList.add('hidden');
    
    // Show progress bar
    const progressBar = createQualityProgressBar('quality-progress-bar', 'purple-600', 50);
    container.appendChild(progressBar);
    const progressBarFill = document.getElementById('quality-progress-bar');
    const stepsText = progressBar.querySelector('.font-mono');
    
    try {
        // Convert image to base64 if exists
        let imageBase64 = null;
        if (qualityImageFile) {
            imageBase64 = await fileToBase64(qualityImageFile);
        }
        
        // Simulate progress while waiting for API (fallback)
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 0.5;
            if (progress < 90) {
                progressBarFill.style.width = progress + '%';
                stepsText.textContent = `Steps: ${Math.floor(progress / 2)}/50`;
            }
        }, 100);
        
        // CALL REAL API
        const result = await callGenerateAPI('quality', prompt, imageBase64);
        
        // Stop progress simulation
        clearInterval(progressInterval);
        
        // Display result from API
        progressBarFill.style.width = '100%';
        stepsText.textContent = 'Steps: 50/50';
        
        // Display result image
        showQualityResult(container, result.imageUrl);
        
        // Display time
        timeBadge.textContent = `${result.time}s`;
        timeBadge.classList.remove('hidden');
        
        // Re-enable button
        setQualityButtonLoading(btn, false);
        
    } catch (error) {
        // Handle error
        clearInterval(progressInterval);
        container.innerHTML = `
            <div class="text-center p-4 text-red-600">
                <p class="font-bold">Error generating image!</p>
                <p class="text-sm mt-2">${error.message}</p>
                <p class="text-xs mt-2 text-gray-500">Please check API connection or try again later.</p>
            </div>
        `;
        setQualityButtonLoading(btn, false);
        console.error('Quality Model Error:', error);
    }
}

/**
 * Create progress bar for Quality Model
 * @param {string} id - Progress bar ID
 * @param {string} color - Progress bar color
 * @param {number} totalSteps - Total number of steps
 * @returns {HTMLElement} - Progress bar element
 */
function createQualityProgressBar(id, color, totalSteps) {
    const progressBar = document.createElement('div');
    progressBar.className = 'w-3/4';
    progressBar.innerHTML = `
        <div class="h-1 bg-gray-300 rounded-full overflow-hidden">
            <div id="${id}" class="h-full bg-${color} transition-all duration-75" style="width: 0%"></div>
        </div>
        <div class="text-center text-xs text-gray-500 mt-2 font-mono">Steps: 0/${totalSteps}</div>
    `;
    return progressBar;
}

/**
 * Display result image for Quality Model
 * @param {HTMLElement} container - Container to display image
 * @param {string} imageUrl - Image URL
 */
function showQualityResult(container, imageUrl) {
    const resultImg = document.createElement('img');
    resultImg.src = imageUrl;
    resultImg.className = 'w-full h-full object-cover';
    container.innerHTML = '';
    container.appendChild(resultImg);
}

/**
 * Set loading state for Quality Model button
 * @param {HTMLElement} btn - Button element
 * @param {boolean} isLoading - Whether it's loading or not
 */
function setQualityButtonLoading(btn, isLoading) {
    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
        `;
        btn.className = 'w-full py-3 px-6 rounded-lg text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 bg-gray-400 cursor-not-allowed';
    } else {
        btn.disabled = false;
        btn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Run Generation
        `;
        btn.className = 'w-full py-3 px-6 rounded-lg text-white font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 bg-gray-900 hover:bg-gray-800';
    }
}

