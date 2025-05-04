const axios = require('axios');

async function testAPI() {
    try {
        const response = await axios.post('http://localhost:5000/api/chat', {
            uaid: 1,  // Replace with your actual UAID
            message: "Hello, this is a test message"
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testAPI(); 