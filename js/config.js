/* ============================================
   CONFIGURATION FILE
   Application configuration file - easy to edit
   ============================================ */

// ========== API CONFIGURATION ==========
const API_CONFIG = {
    // Base URL of API server
    baseURL: 'http://localhost:8000', // Change this URL according to your server
    
    // Endpoints for models
    endpoints: {
        fast: '/api/v1/generate/fast',      // Endpoint for Fast Model
        quality: '/api/v1/generate/quality' // Endpoint for Quality Model
    },
    
    // Request timeout (milliseconds)
    timeout: 300000, // 5 minutes
    
    // Default headers
    headers: {
        'Content-Type': 'application/json'
    }
};

// ========== CAROUSEL CONFIGURATION ==========
// You can add, delete or edit carousel items here
const CAROUSEL_CONFIG = [
    {
        id: 1,
        prompt: "A cyberpunk robot cat sitting on top of a skyscraper in neon rain, high detail, 8k.",
        fast: "https://picsum.photos/seed/cat_fast/800/800",
        slow: "https://picsum.photos/seed/cat_slow/800/800",
        time_fast: "1.2s",
        time_slow: "5.8s"
    },
    {
        id: 2,
        prompt: "Majestic mountain landscape in Ha Giang during rice harvest season, Van Gogh oil painting style.",
        fast: "https://picsum.photos/seed/landscape_fast/800/800",
        slow: "https://picsum.photos/seed/landscape_slow/800/800",
        time_fast: "1.1s",
        time_slow: "6.2s"
    },
    {
        id: 3,
        prompt: "Portrait of a medieval dragon warrior, shiny iron armor, cinematic lighting.",
        fast: "https://picsum.photos/seed/dragon_fast/800/800",
        slow: "https://picsum.photos/seed/dragon_slow/800/800",
        time_fast: "1.3s",
        time_slow: "5.5s"
    }
    // Add new item here if needed:
    // {
    //     id: 4,
    //     prompt: "Your new prompt...",
    //     fast: "fast_image_URL",
    //     slow: "slow_image_URL",
    //     time_fast: "1.0s",
    //     time_slow: "6.0s"
    // }
];

// Export for use in other files
// (In browser environment, global variables can be accessed directly)

