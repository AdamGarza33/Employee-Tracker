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

