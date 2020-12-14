const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'team'
});

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Connected!');
//     connection.query('CREATE DATABASE team', function (err , result) {
//         if (err) throw err;
//         console.log('Database created');
//     });
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log('Connected!');
//     var sql = 'CREATE TABLE departments (id INT PRIMARY KEY, name VARCHAR(30) NOT NULL)';
//     connection.query(sql, function (err , result) {
//         if (err) throw err;
//         console.log('Table created');
//     });
// });

const allDepartments = () => {
    connection.promise().query('SELECT * from departments')
    .then( ([rows,fields]) => {
        console.log(rows);
        console.table[rows];
    })
    .catch(console.log)
    .then( () => connection.end());
} 

const allRoles = () => {
    connection.promise().query('SELECT * from roles')
    .then( ([rows,fields]) => {
        console.log(rows);
        console.table[rows];
    })
    .catch(console.log)
    .then( () => connection.end());
}

const allEmployees = () => {
    connection.promise().query('SELECT * from employees')
    .then( ([rows,fields]) => {
        console.log(rows);
        console.table[rows];
    })
    .catch(console.log)
    .then( () => connection.end());
}

module.exports = allDepartments;
module.exports = allRoles;
module.exports = allEmployees;