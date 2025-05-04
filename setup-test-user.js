const mysql = require('mysql2/promise');

async function setupTestUser() {
    const connection = await mysql.createConnection({
        host: 'ballast.proxy.rlwy.net',
        port: 36187,
        user: 'root',
        password: 'DvOaFEEahZudDBXyLLWCKGjMleRcmLDz',
        database: 'railway'
    });

    try {
        // Start transaction
        await connection.beginTransaction();

        try {
            let uaid;

            // Check if user already exists
            const [existingUser] = await connection.execute(
                'SELECT UAID FROM UserAuthentication WHERE Email = ?',
                ['test@example.com']
            );

            if (existingUser.length > 0) {
                uaid = existingUser[0].UAID;
                console.log('Using existing user with UAID:', uaid);
            } else {
                // Create new UserAuthentication record
                const [authResult] = await connection.execute(
                    'INSERT INTO UserAuthentication (Username, Email, Password, ConfirmPassword, Username_visibility) VALUES (?, ?, ?, ?, ?)',
                    ['testuser', 'test@example.com', 'hashed_password', 'hashed_password', 'visible']
                );
                uaid = authResult.insertId;
                console.log('Created new user with UAID:', uaid);
            }

            // Check if Users record exists
            const [existingUserData] = await connection.execute(
                'SELECT UAID FROM Users WHERE UAID = ?',
                [uaid]
            );

            if (existingUserData.length === 0) {
                // Create Users record
                await connection.execute(
                    `INSERT INTO Users (
                        First_Name, Last_Name, Middle_Name, Age, Country, City,
                        Anonymous_name, Postal_Code, UAID, Name_visibility, PersonalInfo_visibility
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        'John', 'Doe', 'Robert', 25, 'USA', 'New York',
                        'Anonymous123', '10001', uaid, 'visible', 'visible'
                    ]
                );
            }

            // Check if UserProfileImage record exists
            const [existingImage] = await connection.execute(
                'SELECT UAID FROM UserProfileImage WHERE UAID = ?',
                [uaid]
            );

            if (existingImage.length === 0) {
                // Create UserProfileImage record
                const dummyImage = Buffer.from('dummy_image_data');
                await connection.execute(
                    'INSERT INTO UserProfileImage (UAID, Real_Image, Hide_Image, Profile_visibility) VALUES (?, ?, ?, ?)',
                    [uaid, dummyImage, dummyImage, 'visible']
                );
            }

            // Commit transaction
            await connection.commit();

            // Verify the created records
            const [userData] = await connection.execute(
                `SELECT u.First_Name, u.Last_Name, ui.Real_Image
                 FROM Users u
                 JOIN UserAuthentication ua ON u.UAID = ua.UAID
                 JOIN UserProfileImage ui ON ua.UAID = ui.UAID
                 WHERE ua.UAID = ?`,
                [uaid]
            );

            console.log('User data:', userData[0]);

        } catch (error) {
            // Rollback transaction on error
            await connection.rollback();
            throw error;
        }
    } catch (error) {
        console.error('Error setting up test user:', error);
    } finally {
        await connection.end();
    }
}

setupTestUser(); 