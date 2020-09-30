DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`description` TEXT(65535) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
	`updated_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`department_id` INT(10) UNSIGNED NOT NULL,
	`first_name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`last_name` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`salary` DECIMAL(10,2) NULL DEFAULT NULL,
	`created_at` DATETIME NOT NULL DEFAULT current_timestamp(),
	`updated_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `department_fk` (`department_id`) USING BTREE,
	CONSTRAINT `department_fk` FOREIGN KEY (`department_id`) REFERENCES `chessable_hr_task`.`departments` (`id`) ON UPDATE RESTRICT ON DELETE RESTRICT
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

