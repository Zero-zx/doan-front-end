/* ============================================
   MAIN INITIALIZATION
   Initialize application when page loads
   ============================================ */

// Examples data from first 4 items in prompt.txt
// Mapping: image1.jpg -> test 001 -> result_be/01.png
//          image4.jpg -> test 004 -> result_be/04.png
//          image2.jpg -> test 002 -> result_be/02.png
//          image.jpg -> test 001 (dataset/01.jpg) -> result_be/01.png
const EXAMPLES_DATA = [
    {
        image: 'asset/image/image1.jpg',
        prompt: 'a square cake with strawberry frosting on a plastic plate',
        result: 'asset/result_be/01.png'
    },
    {
        image: 'asset/image/image4.jpg',
        prompt: 'a silver cat sculpture standing next to a mirror',
        result: 'asset/result_be/04.png'
    },
    {
        image: 'asset/image/image2.jpg',
        prompt: 'a red dog with flowers in mouth standing on a metal chair',
        result: 'asset/result_be/02.png'
    },
    {
        image: 'asset/image/image.jpg',
        prompt: 'a slanted rusty mountain motorcycle in front of a fence',
        result: 'asset/result_be/01.png'  // image.jpg maps to dataset/01.jpg which is test 001
    }
];

/**
 * Load example into both Fast and Quality models
 * @param {number} index - Example index (0-3)
 */
function loadExample(index) {
    if (index < 0 || index >= EXAMPLES_DATA.length) return;
    
    const example = EXAMPLES_DATA[index];
    
    // Load image into Fast Model
    loadImageToModel('fast', example.image);
    
    // Load image into Quality Model
    loadImageToModel('quality', example.image);
    
    // Set prompt for both models
    document.getElementById('fast-prompt-input').value = example.prompt;
    document.getElementById('quality-prompt-input').value = example.prompt;
    
    // Display result image in both model result containers
    // Both models use result_be
    if (example.result) {
        displayResultImage('fast', example.result);
        displayResultImage('quality', example.result);
    }
    
    // Scroll to Fast Model section
    document.querySelector('.bg-blue-50\\/30').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Display result image in model result container
 * @param {string} modelType - 'fast' or 'quality'
 * @param {string} imageUrl - Path to result image
 */
function displayResultImage(modelType, imageUrl) {
    const container = document.getElementById(`${modelType}-result-container`);
    const timeBadge = document.getElementById(`${modelType}-time-badge`);
    
    if (!container) return;
    
    // Clear previous result
    container.innerHTML = '';
    
    // Create and display result image
    const resultImg = document.createElement('img');
    resultImg.src = imageUrl;
    resultImg.className = 'w-full h-full object-contain object-center';
    resultImg.alt = 'Result';
    resultImg.onerror = function() {
        container.innerHTML = `
            <div class="text-center p-4 text-gray-500">
                <p>Unable to load result image</p>
            </div>
        `;
    };
    
    container.appendChild(resultImg);
    
    // Hide time badge (or show a placeholder if needed)
    if (timeBadge) {
        timeBadge.classList.add('hidden');
    }
}

/**
 * Load image to a specific model (fast or quality)
 * @param {string} modelType - 'fast' or 'quality'
 * @param {string} imagePath - Path to image
 */
function loadImageToModel(modelType, imagePath) {
    const imageDisplay = document.getElementById(`${modelType}-image-display`);
    const imagePreview = document.getElementById(`${modelType}-image-preview`);
    const uploadLabel = document.getElementById(`${modelType}-upload-label`);
    
    if (!imageDisplay || !imagePreview || !uploadLabel) return;
    
    // Set image source
    imageDisplay.src = imagePath;
    
    // Show preview, hide upload label
    imagePreview.classList.remove('hidden');
    uploadLabel.classList.add('hidden');
    
    // Create a File object from the image URL for API calls
    // Note: This is a simplified approach. In production, you might want to fetch the image first
    fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], imagePath.split('/').pop(), { type: blob.type });
            
            // Store file for API calls
            // Variables are declared in fastModel.js and qualityModel.js (loaded before main.js)
            if (modelType === 'fast') {
                fastImageFile = file;
                const reader = new FileReader();
                reader.onloadend = function() {
                    fastImageData = reader.result;
                };
                reader.readAsDataURL(file);
            } else if (modelType === 'quality') {
                qualityImageFile = file;
                const reader = new FileReader();
                reader.onloadend = function() {
                    qualityImageData = reader.result;
                };
                reader.readAsDataURL(file);
            }
        })
        .catch(error => {
            console.warn('Could not load image as file:', error);
        });
}

/**
 * Initialize application when DOM is ready
 */
function initApp() {
    // Initialize carousel with first slide
    updateCarousel();
    
    console.log('✅ V-Gen App initialized successfully!');
}

// Wait for DOM to load before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM is already ready
    initApp();
}

