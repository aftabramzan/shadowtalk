const axios = require('axios');

// A small 1x1 pixel base64 encoded image
const smallImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

async function testCompleteProfile() {
    try {
        const response = await axios.post('http://localhost:5000/api/create-complete-profile', {
            first_name: "John",
            middle_name: "Robert",
            last_name: "Doe",
            age: 25,
            country: "USA",
            city: "New York",
            anonymous_name: "Anonymous123",
            postal_code: "10001",
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
testCompleteProfile(); 