// Dependencies

const express = require('express');
const inquirer = require("inquirer");
const mysql = require('mysql2/promise');
const db = require('./db/connection');
const cTable = require('console.table');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Response for any request not found
app.use((req, res) => {
    res.status(404).end();
});

// Connect db
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {});
});

// Prompt functions
function startPrompt() {
    inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Update An Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee'], 

    }).then( answer => {
        switch (answer.menu) {
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            case 'Update An Employee Manager':
                updateEmployeeManager();
                break;
            case 'Delete A Department':
                deleteDepartment();
                break;
            case 'Delete A Role':
                deleteRole();
                break;
            case 'Delete An Employee':
                deleteEmployee();
                break;
        }
    })
 };

 // View departments
function viewAllDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};

// View all roles
function viewAllRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
        startPrompt();
    });
};


// View all employees
function viewAllEmployees() {
    const sql = `SELECT employee.id,
                employees.first_name,
                employees.last_name,
                roles.title AS job_title,
                departments.departments_name,
                roles.salary,
                CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.departments_id = departments.id
                LEFT JOIN employees AS manager ON employees.manager_id = manager.id
                ORDER By employees.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startPrompt();
    });
};


// Add departments
function addDepartment() {
    inquirer.prompt([
        {
            name: "departments_name",
            type: "input",
            message: "Please enter the name of the department you want to add to the database."
        }
    ]).then((answer) => {

    const sql = `INSERT INTO departments (department_name)
                VALUES (?)`;
    const params = [answer.department_name];
    db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log('The new department entered has been added successfully to the database.');

        db.query(`SELECT * FROM departments`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return;
            }
            console.table(result);
            startPrompt();
        });
    });
});
};