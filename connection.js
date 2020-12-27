const mysql = require('mysql2/promise');

const connectionPromise = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'team'
});

module.exports = {
    connect: () => {
        return connectionPromise;
    },
    end: async () => {
        const connection = await connectionPromise;
        connection.end()
    }
}