const inquirer = require ('inquirer');
const mysql = require('mysql2/promise');
const cTable = require('console.table');

const Department = require('./lib/Department');
const Role = require('./lib/Role');
const Employee = require('./lib/Employee');

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
const  choiceLoop = () => {
    return newAction().then(({ choice }) => {
        if (choice === 'viewDepts' || choice === 'viewRoles' || choice === 'viewEmployees') {
            console.log('View Options:');
            return viewLoop();
        }
        if (choice === 'addDept' || choice === 'addRole' || choice === 'addEmployee') {
            console.log('Creation Options');
            return creationLoop();
        }
        else {
            console.log('Goodbye!');
            return;
        }
    })
}

// loop that allows user to view data about the departments, roles, or employees
const viewLoop = () => {
    return newAction().then(({ view }) => {
        //console.log(action)
        if (view === 'exit') {
            console.log('Returning to Main Menu');
            return choiceLoop();
        }
        if (view === 'viewDepts') {
            console.log('Current Departments:');
            return viewDataLoop();
            // Likely insert cTable here
        }
        if (view === 'viewRoles') {
            console.log('Current Roles:');
            return viewDataLoop();
            // Likely insert cTable here
        }
        if (view === 'viewEmployees') {
            console.log('Current Employees:');
            return viewDataLoop();
            // Likely insert cTable here
        }
    })
    // FROM OLD PROJECT push new employee to teamMembers array after creation, then go back to employeeCreationLoop
}

// loop that allows user to create new departments, roles, and employees
const creationLoop = () => {
    return newAction().then(({ action }) => {
        //console.log(action);
        if (action === 'exit') {
            console.log('Returning to Main Menu');
            return choiceLoop();
        }
        if (action === 'addDept') {
            console.log('Adding New Department');
            return addDepartment().then(answers => {
                return new Department()
            })
        }
        if (action === 'addRole') {
            console.log('Adding New Role');
            return addRole().then(answers => {
                return new Role()
            })
        }
        if (action === 'addEmployee') {
            console.log('Adding New Employee');
            return addEmployee().then(answers => {
                return new Employee()
            })
        }
        if (action === 'updateEmployee') {
            console.log('Updating Employee');
            return updateEmployee().then(answers => {
                return new Employee()
            })
        }
    })
}


// prompt for what user wants to do
// IF they choose to view something from the database, enter a loop to figure out what to show
// ELSE IF they choose to add or update someone, enter a loop to figure out which prompt loop to enter

//viewLoop();
//creationLoop();
choiceLoop();