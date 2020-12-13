const inquirer = require ('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'team'
});

// function to prompt user for what they would like to do
const newAction = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                {name: 'View All Departments', value: 'viewdepts'},
                {name: 'View All Roles', value: 'viewroles'},
                {name: 'View All Employees', value: 'viewemployees'},
                {name: 'Add a Department', value: 'adddept'},
                {name: 'Add a Role', value: 'addrole'},
                {name: 'Add an Employee', value: 'addemployee'},
                {name: 'Update an Employee Role', value: 'updateemployee'},
                {name: "I'm done building my team for now", value: 'exit'}
            ]
        }
    ]);
};

// function to facilitate adding a department
const addDepartment = () => {
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

// loop that creates new team member based on user input or exits the application if user chooses to exit
const viewDataLoop = () => {
    return newAction().then(({ action }) => {
        //console.log(action)
        if (action === 'exit') {
            console.log('Goodbye!');
            return;
        }
        if (action === 'viewdepts') {
            console.log('Current Departments:');
            return viewDataLoop();
            // Likely insert cTable here
        }
        if (action === 'viewroles') {
            console.log('Current Roles:');
            return viewDataLoop();
            // Likely insert cTable here
        }
        if (action === 'viewemployees') {
            console.log('Current Employees:');
            return viewDataLoop();
            // Likely insert cTable here
        }
    })
    // FROM OLD PROJECT push new employee to teamMembers array after creation, then go back to employeeCreationLoop
}


// prompt for what user wants to do
// IF they choose to view something from the database, enter a loop to figure out what to show
// ELSE IF they choose to add or update someone, enter a loop to figure out which prompt loop to enter

viewDataLoop();