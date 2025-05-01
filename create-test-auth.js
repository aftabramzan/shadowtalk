const mysql = require('mysql2/promise');

async function createTestAuth() {
    const connection = await mysql.createConnection({
        host: 'ballast.proxy.rlwy.net',
        port: 36187,
        user: 'root',
        password: 'DvOaFEEahZudDBXyLLWCKGjMleRcmLDz',
        database: 'railway'
    });

    try {
        // Create a test user authentication
        const [result] = await connection.execute(
            'INSERT INTO UserAuthentication (Username, Email, Password, ConfirmPassword, Username_visibility) VALUES (?, ?, ?, ?, ?)',
            ['testuser', 'test@example.com', 'hashed_password', 'hashed_password', 'visible']
        );

        console.log('Created test user authentication with UAID:', result.insertId);
        
        // Get the created record
        const [rows] = await connection.execute(
            'SELECT UAID, Username FROM UserAuthentication WHERE UAID = ?',
            [result.insertId]
        );
        
        console.log('Created record:', rows[0]);
    } catch (error) {
        console.error('Error creating test auth:', error);
    } finally {
        await connection.end();
    }
}

createTestAuth(); 