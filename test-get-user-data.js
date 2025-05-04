const axios = require('axios');

async function testGetUserData() {
    try {
        const response = await axios.post('http://localhost:5000/api/get-user-data', {
            UAID: 1  // Replace with your actual UAID
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testGetUserData(); 