const { connect } = require('../db/connection');

class Department {
    static async getAll() {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * from departments')
        return rows;
    }

    static async addNew({name}) {
        const connection = await connect()
        const [rows] = await connection.query(`INSERT INTO departments (name) VALUES (?)`, name);
        return rows;
    }

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

module.exports = Department;