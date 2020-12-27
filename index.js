const inquirer = require ('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = require('./connections');
const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

// function to prompt user for what they would like to do
const newAction = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {name: 'View All Departments', value: 'viewDepts'},
                {name: 'View All Roles', value: 'viewRoles'},
                {name: 'View All Employees', value: 'viewEmployees'},
                {name: 'Add a Department', value: 'addDept'},
                {name: 'Add a Role', value: 'addRole'},
                {name: 'Add an Employee', value: 'addEmployee'},
                {name: 'Update an Employee Role', value: 'updateEmployee'},
                {name: "I'm done building my team for now", value: 'exit'}
            ]
        }
    ]);
};

// function to facilitate adding a department
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'What is the name of the department?',
            choices: [

            ]
        }
    ]);
};

// function to facilitate adding a role
const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
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
            type: 'input',
            name: 'department',
            message: 'Which department does this role belong to?',
            validate: roleDept => {
                if (roleDept) {
                    return true;
                } else {
                    console.log("Please enter the department this role belongs in");
                    return false;
                }
            }
        }
    ]);
};

// function to facilitate adding an employee
const addEmployee = () => {
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
            type: 'input',
            name: 'role',
            message: "What is the employee's role?",
            validate: empRole => {
                if (empRole) {
                    return true;
                } else {
                    console.log("Please enter the employee's role");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: [
                // managers array
            ]
        }
    ]);
};

// loop to prompt user for which CRUD method they would like to access
const choiceLoop = () => {
    return newAction().then(({ choice }) => {
        if (choice === 'exit') {
            return;
        }
        if (choice === 'viewDepts') {
            console.log('Departments:');
            return Department.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'viewRoles') {
            console.log('Roles:');
            return Role.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'viewEmployees') {
            console.log('Employees:');
            return Employee.getAll().then(console.table).then(choiceLoop);
        }
        if (choice === 'addDept') {
            console.log('Adding Department');
            return addDepartment().then(answers => {
                return new Department(answers.name)
            });
        }
        // if (choice === 'addRole') {
        //     console.log('Adding Role');
        //     return addRole().then(answers => {
        //         return new Role(answers.name, answers.salary, answers.department)
        //     });
        // }
        if (choice === 'addRole') {
            console.log('Adding Role');
            return addRole().then(answers => {
                return Role.save().then(choiceLoop);
            });
        }
        if (choice === 'addEmployee') {
            console.log('Adding Employee');
            return addEmployee().then(answers => {
                return new Employee(answers.firstName, answers.lastName, answers.role, answers.manager)
            });
        }
        else {
            console.log('Updating an Employee');
        }
    })
}

choiceLoop();