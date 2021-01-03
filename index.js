const inquirer = require('inquirer');
const mysql = require('mysql2');
const colors = require('colors');
const logo = require('asciiart-logo');
const db = require('./db/connection');
require('console.table');

const {end} = require('./db/connection');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');
const Choices = require('inquirer/lib/objects/choices');

// function to prompt user for what they would like to do
const newAction = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                { name: 'View All Departments', value: 'viewDepts' },
                { name: 'View All Roles', value: 'viewRoles' },
                { name: 'View All Employees', value: 'viewEmployees' },
                { name: 'Add a Department', value: 'addDept' },
                { name: 'Add a Role', value: 'addRole' },
                { name: 'Add an Employee', value: 'addEmployee' },
                { name: 'Update an Employee Role', value: 'updateEmployeeRole' },
                { name: "I'm done building my team for now", value: 'exit' }
            ]
        }
    ]);
};

// function to facilitate adding a department
const promptDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        }
    ]);
};

// function to facilitate adding a role
const promptRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the new role?',
            validate: roleName => {
                if (roleName) {
                    return true;
                } else {
                    console.log("Please enter the name of the new role");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the annual salary for this role?',
            validate: roleSalary => {
                if (roleSalary) {
                    return true;
                } else {
                    console.log("Please enter a numeric salary for this role");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department does this role belong to?',
            choices: async () => {
                const departments = await Department.getAll();
                return departments.map(({ id, name }) => ({ name:name, value:id }))
            }
        }
    ]);
};

// function to facilitate adding an employee
const promptEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: async () => {
                const roles = await Role.getAll();
                return roles.map(({ id, title }) => ({ name: title, value: id }))
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: async () => {
                const managers = await Employee.getAll();
                return managers.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))
            }
        }
    ]);
};

const promptUpdateEmployeeRole = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: "Which employee would you like to update?",
            choices: async () => {
                const employees = await Employee.getAll();
                return employees.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))
            }
        },
        {
            type: 'list',
            name: 'role',
            message: "What should the employee's new role be?",
            choices: async () => {
                const roles = await Role.getAll();
                return roles.map(({ id, title }) => ({ name: title, value: id }))
            }
        }
    ]);
};
// loop to prompt user for which CRUD method they would like to access
const choiceLoop = () => {
    return newAction().then(async ({ choice }) => {
        if (choice === 'updateEmployeeRole') {
            console.log('\n');
            console.log('========== Updating Employee Role =========='.bold);
            const answers = await promptUpdateEmployeeRole();
            await Employee.updateEmployee(answers)
            console.log(`Updated!`);
            console.log('\n');
            return choiceLoop();
        }
        if (choice === 'viewDepts') {
            console.log('\n');
            console.log('Departments:'.bold);
            return Department.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'viewRoles') {
            console.log('\n');
            console.log('Roles:'.bold);
            return Role.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'viewEmployees') {
            console.log('\n');
            console.log('Employees:'.bold);
            return Employee.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'addDept') {
            console.log('\n');
            console.log('========== Adding Department =========='.bold);
            const answers = await promptDepartment();
            await Department.addNew(answers)
            console.log(`New department "${answers.name}" has been added to the database`);
            console.log('\n');
            return choiceLoop();
        }
        if (choice === 'addRole') {
            console.log('\n');
            console.log('========== Adding Role =========='.bold);
            const answers = await promptRole();
            await Role.addNew(answers)
            console.log(`New role "${answers.title}" has been added to the database`);
            console.log('\n');
            return choiceLoop();
        }
        if (choice === 'addEmployee') {
            console.log('\n');
            console.log('========== Adding Employee =========='.bold);
            const answers = await promptEmployee();
            await Employee.addNew(answers)
            console.log(`New employee "${answers.firstName} ${answers.lastName}" has been added to the database`);
            console.log('\n');
            return choiceLoop();
        }
        else {
            console.log('Goodbye');
        }
    })
}

console.log(
    logo({
        name: 'Employee Tracker'
    })
    .render()
);

choiceLoop().then(end);