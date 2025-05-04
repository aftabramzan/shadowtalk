const mysql = require('mysql2/promise');

async function checkUAIDs() {
    const connection = await mysql.createConnection({
        host: 'ballast.proxy.rlwy.net',
        port: 36187,
        user: 'root',
        password: 'DvOaFEEahZudDBXyLLWCKGjMleRcmLDz',
        database: 'railway'
    });

    try {
        const [rows] = await connection.execute('SELECT UAID, Username FROM UserAuthentication');
        console.log('Available UAIDs:');
        console.table(rows);
    } catch (error) {
        console.error('Error checking UAIDs:', error);
    } finally {
        await connection.end();
    }
}

checkUAIDs(); 