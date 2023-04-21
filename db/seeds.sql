-- insert new records in the tables

INSERT INTO department (department_name)
VALUES
('Design'),
('Marketing'),
('Engineering (Tech)'),
('Sales'),
('Finance'),
('Business Strategy'),
('Legal');

INSERT INTO `role` (title, salary, department_id)
VALUES
('UX Artist', 45000, 1),
('Sales Associate', 25500, 4),
('Corportate Attorney', 130000, 7),
('Software Engineer', 80000, 3),
('Junior Developer', 45000, 3),
('Financial Planner', 90000, 5),
('Business Strategist', 150000, 6),
('Director of Marketing', 200000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Ileesa', 'Ramirez', 2, NULL),
('Margarita', 'Flores', 1, NULL),
('Rodolpho', 'Silva', 4, NULL),
('Marcus', 'Rashford', 3, NULL),
('Alejandro', 'Garnacho', 6, NULL),
('Mario', 'Gotze', 5, 1),
('Erling', 'Haaland', 7, 1);