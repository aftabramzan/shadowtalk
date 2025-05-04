const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net',
  user: 'root',
  password: 'DvOaFEEahZudDBXyLLWCKGjMleRcmLDz',
  database: 'railway',
  port: 36187
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('✅ MySQL connected!');
});

// Remember to close the connection when done
// connection.end();
