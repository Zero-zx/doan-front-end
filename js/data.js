/* ============================================
   CAROUSEL DATA
   Load from config.js
   ============================================ */

// Use data from CAROUSEL_CONFIG in config.js
// If config.js hasn't loaded, use default data
const CAROUSEL_DATA = typeof CAROUSEL_CONFIG !== 'undefined' 
    ? CAROUSEL_CONFIG 
    : [
        {
            id: 1,
            prompt: "A cyberpunk robot cat sitting on top of a skyscraper in neon rain, high detail, 8k.",
            fast: "https://picsum.photos/seed/cat_fast/800/800",
            slow: "https://picsum.photos/seed/cat_slow/800/800",
            time_fast: "1.2s",
            time_slow: "5.8s"
        }
    ];

