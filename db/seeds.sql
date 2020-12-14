INSERT INTO departments (id, name)
VALUES
    (1, 'Finance'),
    (2, 'Design'),
    (3, 'Engineering');

INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, 'Accountant', 80000, 1),
    (2, 'CFO', 250000, 1),
    (3, 'Junior Designer', 75000, 2),
    (4, 'Senior Designer', 100000, 2),
    (5, 'Engineer', 130000, 3),
    (6, 'Engineering Manager', 120000, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Jeff', 'Meyer', 1, 2),
    (2, 'Maria', 'Martinez', 2, null),
    (3, 'Kara', 'Clark', 3, 5),
    (4, 'Nathan', 'Stevens', 3, 5),
    (5, 'Tim', 'Waterloo', 4, null),
    (6, 'Ronald', 'Jenkins', 5, 10),
    (7, 'Christine', 'Arnoldson', 5, 10),
    (8, 'MaryAnn', 'Rodriguez', 5, 10),
    (9, 'Hermione', 'Welch', 5, 10),
    (10, 'Zoe', 'Smithsonian', 5, null);