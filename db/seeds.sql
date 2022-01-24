INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Operations'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Director', 100000, 1),
    ('Associate', 80000, 2),
    ('Analyst', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Jones', 1, NULL),
    ('Jenny', 'Smith', 2, 1),
    ('Junior', 'Davis', 3, 1);