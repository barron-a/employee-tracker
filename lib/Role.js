const { connect } = require('../connection');

class Role {
    static async getAll() {
        const connection = await connect()
        const [rows] = await connection.query('SELECT roles.id, title, salary, name AS department_name from roles LEFT JOIN departments on roles.department_id = departments.id');
        return rows;
    }

    async save() {
        const connection = await connect();
        const [rows] = await connection.query('INSERT INTO roles (id, title, salary, department_id) VALUES (?,?,?,?)');
        return rows;
    }

    constructor(title, salary, parentDept) {
        this.title = title;
        this.salary = salary;
        this.parentDept = parentDept;
    }

    getTitle() {
        return this.title;
    }

    getSalary() {
        return this.Salary;
    }

    getParentDept() {
        return this.parentDept
    }
}

module.exports = Role;