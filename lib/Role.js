class Role {
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