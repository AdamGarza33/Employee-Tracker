# Employee Tracker

## Fully Functional app written in Node.js, mysql2

This is a command-line application designed to manage employee data within a company. It is built using Node.js and utilizes SQL to store and manipulate data.

## Table of Contents

1. [Title](#project-title)
2. [Description](#description)
3. [Table of Contents](#table-of-contents)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Credits](#credits)
8. [Tests](#tests)


## Installation

To use this program, you'll need to have Node.js and MySQL installed on your computer. Once you've done that, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and run npm install to install the necessary dependencies.
3. Set up your MySQL database by running the SQL schema file in the db folder.
4. Create a .env file in the root directory and add your MySQL credentials in the following format:

* DB_HOST=localhost
* DB_PORT=3306
* DB_USER=root
* DB_PASS=yourpassword
* DB_NAME=employee_db

Replace the values with your own MySQL credentials.

## Usage

[Walkthrough video](https://drive.google.com/file/d/1LVwFcD5Q-mE4FlIxMwyiG9Zu_unxDDTm/view?usp=share_link)

To start the program, navigate to the project directory and run npm start. This will launch the application in the command line interface.

Once the program is running, you can use the arrow keys to navigate the menu and perform various actions. Here are the available options:

* View All Employees: displays a table of all employees, including their names, roles, salaries, and departments.
* View All Employees by Department: allows you to view a table of employees by department.
* View All Employees by Manager: allows you to view a table of employees by manager.
* Add Employee: allows you to add a new employee to the database.
* Remove Employee: allows you to remove an employee from the database.
* Update Employee Role: allows you to update an employee's role in the database.
* Update Employee Manager: allows you to update an employee's manager in the database.

## Credits

This program was written by Stephen Castillo as part of a coding bootcamp project. It was built using Node.js, MySQL, and the following NPM packages:

* inquirer
* mysql2
* console.table



## Tests

There are no tests for this repo at this time.
