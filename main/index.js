const { table } = require('table');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

let db = null;

const init = async () => {
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db'
    });

    console.log(`Connected to the employee_db database.`);

    // Use inquirer prompts
    const action = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'

        ],
    });

    switch (action.action) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all employees':
            await viewAllEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        // Add cases for other choices
    }

    db.end(); // Close the database connection when done
};

const viewAllDepartments = async () => {
    const results = await db.query('SELECT * FROM department;');
    const data = results[0];
    const arrOfArr = data.map(row => Object.values(row));
    console.log(table(arrOfArr));
};

const viewAllEmployees = async () => {
    // Implement logic for viewing all employees
};

const addDepartment = async () => {
    const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
    });

    // Implement logic to add a department to the database using departmentName.name
};

init();

 
    
//     // TODO use inquirer if you want

//   // use prepared_statement
//   // const objInput = {
//   //   // must match database column and values
//   //   name: "Nelson"
//   // }
//   // const idata = await db.query("INSERT INTO island SET ?", objInput)

//   const results = await db.query("SELECT * FROM department;");

//   // get data from results
//   const data = results[0];
//   console.log(data);

//   const arrOfArr = data.map( row => Object.values(row));
//   //print table
//   console.log(table(arrOfArr));
// }
// init();