const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'team'
});

connection.connect(function(err) {
    if (err) throw err;
});

const allDepartments = connection.promise().query('SELECT * from departments')
    .then( ([rows,fields]) => {
        console.log(rows);
    })
    .catch(console.log)

const allRoles = connection.promise().query('SELECT * from roles')
    .then( ([rows,fields]) => {
        console.log(rows);
    })
    .catch(console.log)

const allEmployees = connection.promise().query('SELECT * from employees')
    .then( ([rows,fields]) => {
        console.log(rows);
    })
    .catch(console.log)
    .then( () => connection.end());

module.exports = allDepartments;
module.exports = allRoles;
module.exports = allEmployees;