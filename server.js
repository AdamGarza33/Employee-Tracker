// Dependencies
const inquirer = require("inquirer");
const db = require('./db/connections');
const cTable = require('console.table');
const { async } = require("rxjs");



// Start server after DB connection


// Start the prompt functions
async function startPrompt() {
    let keepPrompting = true;
    while (keepPrompting) {
    let answer = await inquirer.prompt([{
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Update An Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee', 'quit'],
            loop: true, 
            waitUserInput: true

    }]);
        switch (answer.menu) {
            case 'View All Departments':
               await viewAllDepartments();
                break;
            case 'View All Roles':
                await  viewAllRoles();
                break;
            case 'View All Employees':
                await  viewAllEmployees();
                break;
            case 'Add A Department':
                await  addDepartment();
                break;
            case 'Add A Role':
                await addRole();
                break;
            case 'Add An Employee':
                await addEmployee();
                break;
            case 'Update An Employee Role':
                await  updateEmployeeRole();
                break;
            case 'Update An Employee Manager':
                await updateEmployeeManager();
                break;
            case 'Delete Department':
                await  deleteDepartment();
                break;
            case 'Delete Role':
                await  deleteRole();
                break;
            case 'Delete Employee':
                await  deleteEmployee();
                break;
                default: console.log('closing');
                keepPrompting = false;
                break;
        }
    }
};

// View all departments

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
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
    const sql = `SELECT * FROM role`;
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
                employee.first_name,
                employee.last_name,
                role.title AS job_title,
                department.department_name,
                role.salary,
                CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee AS manager ON employee.manager_id = manager.id
                ORDER By employee.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
        startPrompt();
    });
};

// Add departments
 async function addDepartment() {
   await inquirer.prompt(
        {
            name: "department_name",
            type: "input",
            message: "Please enter the name of the department you want to add to the database."
        }
    ).then((answer) => {

    const sql = `INSERT INTO department (department_name)
                VALUES (?)`;
    const params = [answer.department_name];
    db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log('The new department entered has been added successfully to the database.');
    

        
    });
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        console.table(result);
    
    });
});
};

// Add a role
async function addRole() {
    await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the title of role you want to add to the database."
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary associated with the role you want to add to the database. (no dots, space or commas)"
        },
        {
            name: "department_id",
            type: "number",
            message: "Please enter the department's id associated with the role you want to add to the database."
        }
    ]).then(response => {
        db.execute("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, response.department_id], 
        function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');

            
        });
        db.query(`SELECT * FROM role`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                
            }
            console.table(result);
        
        });
});
};

// Add employees
async function addEmployee() {
    await inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want to add to the database."
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter the last name of the employee you want to add to the database."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the role id associated with the employee you want to add to the database. Enter ONLY numbers."
        },
        {
            name: "manager_id",
            type: "number",
            message: "Please enter the manager's id associated with the employee you want to add to the database. Enter ONLY numbers."
        }

    ]).then(function (response) {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first_name, response.last_name, response.role_id, response.manager_id], function (err, data) {
            if (err) throw err;
            console.log('The new employee entered has been added successfully to the database.');
  
        });
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                startPrompt();
            }
            console.table(result);
            startPrompt();
        });
});
};

// Update employee role
async function updateEmployeeRole() {
    await inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want update in the database."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the new role number id associated with the employee you want to update in the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log('The new role entered has been added successfully to the database.');
        });
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                startPrompt();
            }
            console.table(result);
            startPrompt();
        });
});
};

// Update employee manager
async function updateEmployeeManager() {
    await inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want update in the database."
        },
        {
            name: "manager_id",
            type: "number",
            message: "Please enter the new manager's id number associated with the employee you want to update in the database. Enter ONLY numbers."
        }
    ]).then(function (response) {
        db.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [response.manager_id, response.first_name], function (err, data) {
            if (err) throw err;
            console.log("The new manager's id entered has been added successfully to the database.");
        });
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message })
                startPrompt();
            }
            console.table(result);
            startPrompt();
        });
});
};

// Call to start app
(async () => {
    await startPrompt();
})();