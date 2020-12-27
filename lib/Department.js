const { connect } = require('../connection');

class Department {
    static async getAll() {
        const connection = await connect()
        const [rows] = await connection.query('SELECT * from departments')
        return rows;
    }
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

module.exports = Department;