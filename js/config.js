/* ============================================
   CONFIGURATION FILE
   Application configuration file - easy to edit
   ============================================ */

// ========== API CONFIGURATION ==========
const API_CONFIG = {
    // Base URL of API server
    baseURL: 'http://localhost:8000', // Change this URL according to your server
    
    // Endpoints for models (both use same endpoint, backend handles model selection)
    endpoints: {
        fast: '/edit',      // Endpoint for Fast Model
        quality: '/edit'    // Endpoint for Quality Model
    },
    
    // Request timeout (milliseconds)
    timeout: 300000, // 5 minutes
    
    // Note: Headers will be set automatically for FormData (no Content-Type needed)
};

// ========== CAROUSEL CONFIGURATION ==========
// Load images from asset/image (origin) and asset/compare_result (edited)
// Mapping based on image filenames
const CAROUSEL_CONFIG = [
    {
        id: 0,
        prompt: "a slanted rusty mountain motorcycle in front of a fence",
        origin: "asset/image/image.jpg",
        edited: "asset/compare_result/edit0.png"
    },
    {
        id: 1,
        prompt: "a square cake with strawberry frosting on a plastic plate",
        origin: "asset/image/image1.jpg",
        edited: "asset/compare_result/edit1.png"
    },
    {
        id: 2,
        prompt: "a red dog with flowers in mouth standing on a metal chair",
        origin: "asset/image/image2.jpg",
        edited: "asset/compare_result/edit2.png"
    },
    {
        id: 3,
        prompt: "blue light, a black and white dog is playing with a yellow ball",
        origin: "asset/image/image3.jpg",
        edited: "asset/compare_result/edit3.png"
    },
    {
        id: 4,
        prompt: "a silver cat sculpture standing next to a mirror",
        origin: "asset/image/image4.jpg",
        edited: "asset/compare_result/edit4.png"
    },
    {
        id: 6,
        prompt: "a yellow cup of milk with drawing of rose putted on the wooden table",
        origin: "asset/image/image6.jpg",
        edited: "asset/compare_result/edit6.png"
    },
    {
        id: 7,
        prompt: "a white german shepherd dog sits on the grass with big mouth opened",
        origin: "asset/image/image7.jpg",
        edited: "asset/compare_result/edit7.png"
    },
    {
        id: 9,
        prompt: "Painting of a lion laying down on a blue background",
        origin: "asset/image/image9.jpg",
        edited: "asset/compare_result/edit9.png"
    },
    {
        id: 26,
        prompt: "a toy cat with a red fur sitting on a branch",
        origin: "asset/image/image26.jpg",
        edited: "asset/compare_result/edit26.png"
    },
    {
        id: 27,
        prompt: "a closed eyes dog sitting on green grass",
        origin: "asset/image/image27.jpg",
        edited: "asset/compare_result/edit27.png"
    },
    {
        id: 28,
        prompt: "Painting of red flowers on a tree branch with white background",
        origin: "asset/image/image28.jpg",
        edited: "asset/compare_result/edit28.png"
    },
    {
        id: 93,
        prompt: "a Garfield cat is sleeping on a sofa",
        origin: "asset/image/image93.jpg",
        edited: "asset/compare_result/edit93.png"
    },
    {
        id: 94,
        prompt: "a cat is sleeping on a blue sweater",
        origin: "asset/image/image94.jpg",
        edited: "asset/compare_result/edit94.png"
    },
    {
        id: 95,
        prompt: "a painting of a fairy with purple wings holding a white crystal ball",
        origin: "asset/image/image95.jpg",
        edited: "asset/compare_result/edit95.png"
    },
    {
        id: 98,
        prompt: "a cat hanging from a wire with grass in the background",
        origin: "asset/image/image98.jpg",
        edited: "asset/compare_result/edit98.png"
    }
];

// Export for use in other files
// (In browser environment, global variables can be accessed directly)

