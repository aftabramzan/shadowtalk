const axios = require('axios');

async function testRegister() {
    try {
        const response = await axios.post('http://localhost:5000/api/register', {
            email: 'newuser@example.com',
            username: 'newuser123',
            password: 'password123',
            confirm_password: 'password123'
        });

        console.log('API Response:', response.data);
    } catch (error) {
        console.error('Error testing API:', error.response ? error.response.data : error.message);
    }
}

// Run the test
testRegister(); 