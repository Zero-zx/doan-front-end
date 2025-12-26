/* ============================================
   API SERVICE
   Handle all API requests to backend
   ============================================ */

/**
 * Call API to generate image
 * @param {string} modelType - Model type: 'fast' or 'quality'
 * @param {string} prompt - Text prompt (Vietnamese)
 * @param {string|null} imageBase64 - Base64 image (optional)
 * @param {Function} onProgress - Callback to update progress (optional)
 * @returns {Promise<Object>} - Promise returns result {imageUrl, time}
 */
async function callGenerateAPI(modelType, prompt, imageBase64 = null, onProgress = null) {
    try {
        // Determine endpoint
        const endpoint = API_CONFIG.endpoints[modelType];
        if (!endpoint) {
            throw new Error(`Model type "${modelType}" is invalid. Only "fast" or "quality" are supported`);
        }
        
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        
        // Prepare request body
        const requestBody = {
            prompt: prompt,
            image: imageBase64 // Send base64 if image exists, otherwise null
        };
        
        // Send request
        const startTime = Date.now();
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers
            },
            body: JSON.stringify(requestBody)
        });
        
        // Check response
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        // Parse response
        const result = await response.json();
        const endTime = Date.now();
        const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
        
        // Return result
        return {
            imageUrl: result.image_url || result.imageUrl || result.image,
            time: result.time || elapsedTime,
            success: true
        };
        
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Call API with polling to track progress (if API supports it)
 * @param {string} modelType - Model type
 * @param {string} prompt - Text prompt
 * @param {string|null} imageBase64 - Base64 image
 * @param {Function} onProgress - Progress update callback
 * @returns {Promise<Object>}
 */
async function callGenerateAPIWithProgress(modelType, prompt, imageBase64 = null, onProgress = null) {
    try {
        const endpoint = API_CONFIG.endpoints[modelType];
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        
        const requestBody = {
            prompt: prompt,
            image: imageBase64
        };
        
        const startTime = Date.now();
        
        // Send initial request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...API_CONFIG.headers
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // If API returns task_id, can poll to get progress
        if (result.task_id && onProgress) {
            // Polling logic here if API supports it
            // Example: pollTaskStatus(result.task_id, onProgress)
        }
        
        const endTime = Date.now();
        const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
        
        return {
            imageUrl: result.image_url || result.imageUrl || result.image,
            time: result.time || elapsedTime,
            success: true
        };
        
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Convert File object to base64 string
 * @param {File} file - File object from input
 * @returns {Promise<string>} - Promise returns base64 string
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Get base64 string (remove data:image/...;base64, prefix)
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Check API connection
 * @returns {Promise<boolean>}
 */
async function checkAPIConnection() {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/health`, {
            method: 'GET',
            timeout: 5000
        });
        return response.ok;
    } catch (error) {
        console.warn('API is not available:', error);
        return false;
    }
}

