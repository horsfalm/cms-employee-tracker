INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Finance"),
       ("HR"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000, 1),
       ("Sales Lead", 75000, 1),
       ("Sales Representative", 55000, 1),
       ("Finance Manager", 90500, 2),
       ("Finance Lead", 70000, 2),
       ("Finance Representative", 50000, 2),
       ("HR Manager", 80000, 3),
       ("HR Lead", 65000, 3),
       ("HR Representative", 40000, 3),
       ("Ops Manager", 110000, 4),
       ("Ops Lead", 90000, 4),
       ("Ops Representative", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Simms", 1, NULL),
       ("Lucy", "Spence", 2, 1),
       ("Ben", "McMahon", 3, 1),
       ("Kacey", "Kelly", 4, NULL),
       ("Luke", "Webb", 5, 4),
       ("Henry", "de Wilde", 6, 4),
       ("Elise", "Hickey", 7, NULL),
       ("Matt", "Flanagan", 8, 7),
       ("Rob", "Edwin", 9, 7),
       ("Rebecca", "Harris", 10, NULL),
       ("Jon", "Maekitalo", 11, 10),
       ("Joel", "Smith", 12, 10),
       ("Cameron", "Connell", 12, 10)
