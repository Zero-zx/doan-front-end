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
            id: 0,
            prompt: "a slanted rusty mountain motorcycle in front of a fence",
            origin: "asset/image/image.jpg",
            edited: "asset/compare_result/edit0.png"
        }
    ];

