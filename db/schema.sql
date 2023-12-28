DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL 
);

CREATE TABLE role (
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT AUTO_INCREMENT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT AUTO_INCREMENT,
    manager_id INT,
    department_id INT AUTO_INCREMENT, 
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id),
    FOREIGN KEY (department_id) REFERENCES department(department_id) 
);