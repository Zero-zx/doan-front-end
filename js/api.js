/* ============================================
   API SERVICE
   Handle all API requests to backend
   ============================================ */

/**
 * Convert base64 string to File object
 * @param {string} base64String - Base64 string (with or without data URL prefix)
 * @param {string} filename - Filename for the file
 * @returns {File} - File object
 */
function base64ToFile(base64String, filename = 'image.png') {
    // Remove data URL prefix if present
    let base64Data = base64String;
    if (base64String.includes(',')) {
        base64Data = base64String.split(',')[1];
    }
    
    // Convert base64 to binary
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    
    return new File([blob], filename, { type: 'image/png' });
}

/**
 * Create a placeholder image file if no image is provided
 * @returns {File} - Placeholder image file
 */
function createPlaceholderImage() {
    // Create a simple 1x1 white PNG image
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 512, 512);
    
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            const file = new File([blob], 'placeholder.png', { type: 'image/png' });
            resolve(file);
        }, 'image/png');
    });
}

/**
 * Call API to generate image
 * @param {string} modelType - Model type: 'fast' or 'quality'
 * @param {string} prompt - Text prompt (Vietnamese)
 * @param {File|null} imageFile - Image file object (optional, but backend requires it)
 * @param {Function} onProgress - Callback to update progress (optional)
 * @returns {Promise<Object>} - Promise returns result {imageUrl, time}
 */
async function callGenerateAPI(modelType, prompt, imageFile = null, onProgress = null) {
    try {
        // Determine endpoint
        const endpoint = API_CONFIG.endpoints[modelType];
        if (!endpoint) {
            throw new Error(`Model type "${modelType}" is invalid. Only "fast" or "quality" are supported`);
        }
        
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        
        // Backend requires image file, so create placeholder if not provided
        let fileToSend = imageFile;
        if (!fileToSend) {
            fileToSend = await createPlaceholderImage();
        }
        
        // Prepare FormData (backend expects FormData with image, positive_prompt, negative_prompt)
        const formData = new FormData();
        formData.append('image', fileToSend);
        formData.append('positive_prompt', prompt);
        formData.append('negative_prompt', ''); // Empty negative prompt
        
        // Send request
        const startTime = Date.now();
        
        const response = await fetch(url, {
            method: 'POST',
            // Don't set Content-Type header, browser will set it automatically for FormData
            body: formData
        });
        
        // Check response
        if (!response.ok) {
            // Try to get error message from response
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.detail || errorData.message || errorMessage;
            } catch (e) {
                const errorText = await response.text().catch(() => '');
                if (errorText) {
                    errorMessage = errorText;
                }
            }
            throw new Error(errorMessage);
        }
        
        // Backend returns image/png stream, convert to blob URL
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        
        const endTime = Date.now();
        const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
        
        // Return result
        return {
            imageUrl: imageUrl,
            time: elapsedTime,
            success: true,
            blob: blob // Keep blob reference for cleanup if needed
        };
        
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Call API with polling to track progress (if API supports it)
 * Note: Current backend doesn't support polling, but keeping this for future use
 * @param {string} modelType - Model type
 * @param {string} prompt - Text prompt
 * @param {File|null} imageFile - Image file
 * @param {Function} onProgress - Progress update callback
 * @returns {Promise<Object>}
 */
async function callGenerateAPIWithProgress(modelType, prompt, imageFile = null, onProgress = null) {
    // For now, just call the regular API
    // If backend adds polling support in the future, implement it here
    return await callGenerateAPI(modelType, prompt, imageFile, onProgress);
}

/**
 * Convert File object to base64 string (kept for backward compatibility)
 * @param {File} file - File object from input
 * @returns {Promise<string>} - Promise returns base64 string
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Get base64 string (with data URL prefix)
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Check API connection
 * Note: Backend doesn't have /health endpoint, so we'll try /edit with a test request
 * @returns {Promise<boolean>}
 */
async function checkAPIConnection() {
    try {
        // Try to make a simple request to check if server is up
        // We can't actually call /edit without proper data, so just check if server responds
        const response = await fetch(`${API_CONFIG.baseURL}/edit`, {
            method: 'POST',
            // This will likely fail, but we can check if server is reachable
        });
        // If we get any response (even error), server is up
        return true;
    } catch (error) {
        // If network error, server is down
        console.warn('API is not available:', error);
        return false;
    }
}

