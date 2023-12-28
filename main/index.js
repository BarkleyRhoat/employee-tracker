const { table } = require('table');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

let db = null;

const init = async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'employee_db'
        });

        console.log(`Connected to the employee_db database.`);

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

        switch (action.action.toLowerCase()) {
            case 'view all departments':
                await viewAllDepartments();
                break;
            case 'view all employees':
                await viewAllEmployees();
                break;
            case 'view all roles':
                await viewAllRoles();
                break;
            case 'add department':
                await addDepartment();
                break;
            case 'add employee':
                await addEmployee();
                break;
            case 'quit':
                process.exit();
                break;
            default:
                console.log('Invalid choice. Please choose a valid option.');
        }
    } catch (error) {
        console.error('Error initializing application:', error);
    } finally {
        // Close the database connection when done
        if (db) {
            db.end();
        }
    }
};



const viewAllDepartments = async () => {
    const results = await db.query('SELECT * FROM departments;');
    const data = results[0];
    console.log('Retrieved data:', data);
    const arrOfArr = data.map(row => Object.values(row));
    console.log(table(arrOfArr));
};

const viewAllEmployees = async () => {
    const results = await db.query('SELECT * FROM employees;');
    const data = results[0];
    const arrOfArr = data.map(row => Object.values(row));
    console.log(table(arrOfArr))
    
};

const addDepartment = async () => {
    const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
    });
    
    try {
        await db.query('INSERT INTO department (department_name) VALUES (?);', [departmentName.name]);
        
        console.log(`Department "${departmentName.name}" added successfully.`);

    } catch (error) {

        console.error('Error adding department:', error);
    }
};
const addEmployee = async () => {
    const employeeInfo = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the new employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the new employee\'s last name?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: ['None', 'John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown'],
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the employee\'s department?',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
        },
    ]);

    try {
    
        await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES (?, ?, ?, ?, ?);', [
            employeeInfo.firstName,
            employeeInfo.lastName,
            employeeInfo.role,
            employeeInfo.manager,
            employeeInfo.department,
        ]);

        console.log(`Employee "${employeeInfo.firstName} ${employeeInfo.lastName}" added successfully.`);
    } catch (error) {
        console.error('Error adding employee:', error);
    }
};


init();

 
    
