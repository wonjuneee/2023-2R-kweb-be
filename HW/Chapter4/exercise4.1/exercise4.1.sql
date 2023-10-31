CREATE TABLE `students` (
    `name` VARCHAR(20) NOT NULL,
    `admission_year` INT NOT NULL,
    `major` VARCHAR(50) NOT NULL,
    `major_number` INT NOT NULL,
    `unique_number` INT NOT NULL,
    `phone_number` VARCHAR(11) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `cumulative_credits` INT NOT NULL DEFAULT 0,
    `average_score` FLOAT NOT NULL DEFAULT 0.0,
    `enrollment` TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;