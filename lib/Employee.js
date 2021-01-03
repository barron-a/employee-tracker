const { connect } = require('../db/connection');

class Employee {
    static async getAll() {
        const connection = await connect()
        const employeeManagerQuery = 'SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, CONCAT_WS(\' \', manager.first_name, manager.last_name) AS manager_name from employees LEFT JOIN employees AS manager on employees.manager_id = manager.id'
        const [rows] = await connection.query(`SELECT employee_manager.id, first_name, last_name, roles.title, manager_name FROM (${employeeManagerQuery}) AS employee_manager LEFT JOIN roles ON employee_manager.role_id = roles.id`)
        return rows;
    }

    static async addNew({firstName, lastName, role, manager}) {
        const connection = await connect();
        const [rows] = await connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [firstName, lastName, role, manager]);
        return rows;
    }

    static async updateEmployee({id, role}) {
        const connection = await connect();
        const [rows] = await connection.query(`UPDATE employees SET ? WHERE ?`, [{role_id: role}, {id:id}]);
        return rows;
    }

    constructor(firstName, lastName, role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getRole() {
        return this.role
    }
}

module.exports = Employee;