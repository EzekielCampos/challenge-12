INSERT INTO department (name)
VALUES
('Accounting'),
('Human Resources'),
('Research and Development'),
('Marketing');


INSERT INTO role(title, salary, department_id)
VALUES('Budget Analyst', 80000, 1),
('Financial Controller', 10000, 1),
('Chief Human Resource Officer', 90000, 2),
('Recruiter', 60000, 2),
('Engineer', 90000, 3),
('Marketing Analyst', 70000, 4),
('Content Marketer', 65000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Paul', 'Atreides', 2, NULL),
('Edmond', 'Dantes', 1, 2),
('Victor', 'Dalamau', 3, NULL),
('John', 'Gable', 4, 3),
('Ada', 'Lovelace', 5, NULL),
('Miranda', 'Locke', 6, NULL),
('Rene', 'Duma', 7, NULL);

