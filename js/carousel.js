/* ============================================
   CAROUSEL CONTROLLER
   Manage carousel display and navigation
   ============================================ */

let currentSlide = 0;

/**
 * Update carousel content based on current slide
 */
function updateCarousel() {
    const data = CAROUSEL_DATA[currentSlide];
    
    // Update images: origin -> edited
    document.getElementById('carousel-origin-img').src = data.origin;
    document.getElementById('carousel-edited-img').src = data.edited;
    
    // Update prompt
    document.getElementById('carousel-prompt').textContent = `"${data.prompt}"`;
    
    // Update dots (slide indicators)
    updateCarouselDots();
}

/**
 * Update slide indicator dots state
 */
function updateCarouselDots() {
    const container = document.getElementById('carousel-dots-container');
    if (!container) return;
    
    // Clear existing dots
    container.innerHTML = '';
    
    // Create dots for each slide
    for (let i = 0; i < CAROUSEL_DATA.length; i++) {
        const dot = document.createElement('button');
        dot.onclick = () => goToSlide(i);
        if (i === currentSlide) {
            // Active slide
            dot.className = 'w-6 h-2 rounded-full bg-gray-800 transition-all';
        } else {
            // Inactive slide
            dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-all';
        }
        container.appendChild(dot);
    }
}

/**
 * Go to next slide
 */
function nextSlide() {
    currentSlide = (currentSlide === CAROUSEL_DATA.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
}

/**
 * Go to previous slide
 */
function prevSlide() {
    currentSlide = (currentSlide === 0) ? CAROUSEL_DATA.length - 1 : currentSlide - 1;
    updateCarousel();
}

/**
 * Go to specific slide
 * @param {number} index - Slide index (0, 1, 2...)
 */
function goToSlide(index) {
    if (index >= 0 && index < CAROUSEL_DATA.length) {
        currentSlide = index;
        updateCarousel();
    }
}

