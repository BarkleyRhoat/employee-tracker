DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
department_idid INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL 
);

CREATE TABLE roles(
roles_id INT PRIMARY KEY AUTO_INCREMENT
title VARCHAR(30),
salary DECIMAL,
department_id INT.
FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employees(
employees_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,

FOREIGN KEY (role_id) REFERENCES role(role_id),
FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);