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
    
    // Update images
    document.getElementById('carousel-fast-img').src = data.fast;
    document.getElementById('carousel-slow-img').src = data.slow;
    
    // Update prompt
    document.getElementById('carousel-prompt').textContent = `"${data.prompt}"`;
    
    // Update time
    document.getElementById('carousel-fast-time').textContent = data.time_fast;
    document.getElementById('carousel-slow-time').textContent = data.time_slow;
    
    // Update dots (slide indicators)
    updateCarouselDots();
}

/**
 * Update slide indicator dots state
 */
function updateCarouselDots() {
    const dots = document.querySelectorAll('[onclick^="goToSlide"]');
    dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
            // Active slide
            dot.className = 'w-6 h-2 rounded-full bg-gray-800 transition-all';
        } else {
            // Inactive slide
            dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-all';
        }
    });
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

