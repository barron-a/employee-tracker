const inquirer = require ('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// function to prompt user for what they would like to do
const promptAction = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role'
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
            validate: deptName => {
                if (deptName) {
                    return true;
                } else {
                    console.log("Please enter the name of the new department");
                    return false;
                }
            }
        }
    ]);
};

// function to facilitate adding a role
const promptRole = () => {
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
            type: 'input',
            name: 'manager',
            message: "What is the employee's role?",
            validate: empRole => {
                if (empRole) {
                    return true;
                } else {
                    console.log("Please enter the employee's role");
                    return false;
                }
            }
        }
    ]);
};


promptAction();