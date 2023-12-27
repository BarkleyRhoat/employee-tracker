INSERT INTO department (department_name) VALUES 
    ("Sales"),
    ("Engineering"), 
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id) VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id) VALUES 
    ("John", "Doe", 1, NULL, 1),
    ("Mike", "Chan", 2, 1, 1),
    ("Ashley", "Rodriguez", 4, NULL, 2),
    ("Kevin", "Tupik", 6, 3, 3),
    ("Kunal", "Singh", 8, NULL, 2),
    ("Malia", "Brown", 8, 5, 3),
    ("Sarah", "Lourd", 7, NULL, 4),
    ("Tom", "Allen", 6, 7, 3);

