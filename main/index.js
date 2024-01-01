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
            case 'add role':
                await addRole();
                break;
            case 'update employee role':
                await updateEmployeeRole();
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
    const results = await db.query('SELECT * FROM department;');
    const data = results[0];
    console.log('Retrieved data:', data);
    const arrOfArr = data.map(row => Object.values(row));
    console.log(table(arrOfArr));

    await inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to go back to the main menu?',
        default: true, 
    });

    await init();
};

const viewAllEmployees = async () => {
    try {
        const results = await db.query('SELECT * FROM employee;');
        const data = results[0];
        const arrOfArr = data.map(row => Object.values(row));
        console.log(table(arrOfArr));
    } catch (error) {
        console.error('Error viewing employees:', error);
    } finally {
        await init();
    }
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
            type: 'list',
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

        const [rolesResult] = await db.query('SELECT role_id FROM roles WHERE title = ?;', [employeeInfo.role]);
        const roleId = rolesResult[0].role_id;

      
        const [managerResult] = await db.query('SELECT employee_id FROM employee WHERE first_name = ? AND last_name = ?;', [employeeInfo.manager.split(' ')[0], employeeInfo.manager.split(' ')[1]]);
        const managerId = managerResult[0].employee_id;

        
        const [departmentResult] = await db.query('SELECT department_id FROM department WHERE department_name = ?;', [employeeInfo.department]);
        const departmentId = departmentResult[0].department_id;
    
        await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES (?, ?, ?, ?, ?);', [
            employeeInfo.firstName,
            employeeInfo.lastName,
            roleId,
            managerId,
            departmentId,
        ]);

        console.log(`Employee "${employeeInfo.firstName} ${employeeInfo.lastName}" added successfully.`);
        await init();

    } catch (error) {
        console.error('Error adding employee:', error);
    }
};

const viewAllRoles = async () => {
    try {
        const [results] = await db.query('SELECT * FROM roles;');
        console.table(results);

        console.log('All Roles:');
        for (const role of results) {
            console.log(`Role ID: ${role.role_id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        }
    } catch (error) {
        console.error('Error viewing roles:', error);
    } finally {
        await init();
    }
};

const updateEmployeeRole = async () => {
    try {
       
        const employeeInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee whose role you want to update:',
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'Select the new role for the employee:',
                choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
            },
        ]);

       
        const [newRoleResult] = await db.query('SELECT role_id FROM roles WHERE title = ?;', [employeeInfo.newRole]);
        const newRoleId = newRoleResult[0].role_id;

        await db.query('UPDATE employee SET role_id = ? WHERE employee_id = ?;', [newRoleId, employeeInfo.employeeId]);

        console.log(`Employee role updated successfully.`);
    } catch (error) {
        console.error('Error updating employee role:', error);
    } finally {
       
        await init();
    }
};

const addRole = async () => {
    const roleInfo = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
        },
        {
            type: 'list',
            name: 'department',
            message: 'Choose the department for the role:',
            choices: ['Engineering', 'Sales', 'Finance', 'Legal'], 
        },
    ]);

    try {
        
        const [departmentResult] = await db.query('SELECT department_id FROM departments WHERE department_name = ?;', [roleInfo.department]);
        const departmentId = departmentResult[0].department_id;

       
        await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', [
            roleInfo.title,
            roleInfo.salary,
            departmentId,
        ]);

        console.log(`Role "${roleInfo.title}" added successfully.`);
    } catch (error) {
        console.error('Error adding role:', error);
    }
};

init();

 
    
