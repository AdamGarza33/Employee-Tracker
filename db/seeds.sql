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

