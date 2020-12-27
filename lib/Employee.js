const { connect } = require('../connections');

class Employee {
    static async getAll() {
        const connection = await connect()
        const employeeManagerQuery = 'SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, CONCAT_WS(\' \', manager.first_name, manager.last_name) AS manager_name from employees LEFT JOIN employees AS manager on employees.manager_id = manager.id'
        const [rows] = await connection.query(`SELECT employee_manager.id, first_name, last_name, roles.title, manager_name FROM (${employeeManagerQuery}) AS employee_manager LEFT JOIN roles ON employee_manager.role_id = roles.id`)
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