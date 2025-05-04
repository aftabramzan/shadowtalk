const axios = require('axios');

async function testUserAPI() {
    try {
        const response = await axios.post('http://localhost:5000/api/create-user', {
            first_name: "John",
            last_name: "Doe",
            middle_name: "Robert",
            age: 25,
            country: "USA",
            city: "New York",
            anonymous_name: "Anonymous123",
            postal_code: "10001",
            uaid: 1,  // Replace with your actual UAID
            name_visibility: "visible",
            personal_info_visibility: "visible"
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testUserAPI(); 