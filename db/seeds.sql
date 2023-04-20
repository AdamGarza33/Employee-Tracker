-- insert new records in the tables

INSERT INTO departments (departments_name)
VALUES
('Design'),
('Marketing'),
('Engineering (Tech)'),
('Sales'),
('Finance'),
('Business Strategy'),
('Legal');

INSERT INTO roles (departments_name, job_title, salary)
VALUES
('UX Artist', 45000, 1),
('Sales Associate', 25500, 4),
('Corportate Attorney', 130000, 7),
('Software Engineer', 80000, 3),
('Junior Developer', 45000, 3),
('Financial Planner', 90000, 5),
('Business Strategist', 150000, 6),
('Director of Marketing', 200000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Ileesa', 'Ramirez', 2, 2),
('Margarita', 'Flores', 1, 1),
('Rodolpho', 'Silva', 4, 3),
('Marcus', 'Rashford', 3, 1),
('Alejandro', 'Garnacho', 6, 3),
('Mario', 'Gotze', 5, 1),
('Erling', 'Haaland', 7, 1);