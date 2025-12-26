/* ============================================
   MAIN INITIALIZATION
   Initialize application when page loads
   ============================================ */

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

