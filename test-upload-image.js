const axios = require('axios');

// A small 1x1 pixel base64 encoded image
const smallImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

async function testUploadImage() {
    try {
        const response = await axios.post('http://localhost:5000/api/upload-profile-image', {
            uaid: 1,  // Replace with your actual UAID
            real_image: smallImage,
            hide_image: smallImage
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testUploadImage(); 