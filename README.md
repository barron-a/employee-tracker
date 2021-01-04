# Employee Tracker

---

## Table of Contents

- [Description](#description)
- [Images](#images)
- [Installation](#installation)
- [Using the App](#usage)
- [Technologies](#technologies)
- [References](#references)
- [Author Info](#author-info)
- [Links](#links)

---

## Description
Employee Tracker is a command line application that displays formatted tables with information about your company's departments, roles, and employees. The application also utilizes user input to add new departments, roles, and employees to the team, and allows users to update employee roles.</br>

When adding a department, users will be prompted for:</br>

* Department Name

When adding a role, users will be prompted for:</br>

* Title
* Salary
* Parent Department

When adding an employee, users will be prompted for:</br>

* First Name
* Last Name
* Role
* Manager

When updating an employee role, users will be prompted for:</br>

* Employee To Update
* New Role

---

## Images

### Starting Application from CLI
![Command to Start Application](/assets/images/application_start.jpg)

### Viewing Data
![Examples of Departments, Roles and Employees](/assets/images/data_in_table_view.jpg)

### Adding An Employee
![Example of new Employee](/assets/images/adding_employee.jpg)

---

## Installation
Clone the repository from https://github.com/barron-a/employee-tracker
Navigate to the cloned repository and run 'npm install' to install required packages and dependencies

---

## Usage
To use this application, navigate to the cloned folder from your Terminal and run 'npm start' from the command line. You will be prompted with a logo and a series of questions. When you choose "I'm done building and viewing my team for now" from the command line, the application will exit.

### Video Demo
Please visit the following link for a [video demo](https://drive.google.com/file/d/11qQAXghlNbNnvlXT4091s4ThV-NEQYB8/view)

---

## Technologies

- JavaScript
- Node.js
- Inquirer
- Express
- SQL
- MySQL2
- Console.table
- Jest

---

## References

- Utilized [Inquirer](https://www.npmjs.com/package/inquirer) via NPM for user prompts
- Utilized [MySQL2](https://www.npmjs.com/package/mysql2) via NPM for database interactivity
- Utilized [Colors](https://www.npmjs.com/package/colors) via NPM to bold certain headers
- Utilized [Asciiart-logo](https://www.npmjs.com/package/asciiart-logo) via NPM for the application logo

---

## Author Info
- Code written by Adam Barron

---

## Links

### Link to GitHub Repository
https://github.com/barron-a/employee-tracker


[Back To The Top](#Employee-Tracker)
