DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
department_id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role(
role_id INT PRIMARY KEY AUTO_INCREMENT
title VARCHAR(30),
salary DECIMAL,
department_id INT.
FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee(
employee_id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,

FOREIGN KEY (role_id) REFERENCES role(role_id),
FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);