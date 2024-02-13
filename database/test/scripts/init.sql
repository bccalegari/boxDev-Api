-- -----------------------------------------------------
-- Schema boxDevTest
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS `boxDevTest` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `boxDevTest`;

-- -----------------------------------------------------
-- Table `fileType`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `fileType` (
  `idFileType` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  CONSTRAINT `fileType_idFileType_PK` PRIMARY KEY (`idFileType`)
);

-- -----------------------------------------------------
-- Table `file`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `file` (
  `idFile` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `size` DOUBLE NOT NULL,
  `idFileType` INT NOT NULL,
  `externalId` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `key` VARCHAR(150),
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME,
  `deletedAt` DATETIME,
  CONSTRAINT `file_idFile_PK` PRIMARY KEY (`idFile`),
  CONSTRAINT `file_idFileType_FK` FOREIGN KEY (`idFileType`)
    REFERENCES `fileType` (`idFileType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Trigger `file_key_before_insert`
-- -----------------------------------------------------

DELIMITER //

CREATE TRIGGER `file_key_before_insert` BEFORE INSERT ON `file`
FOR EACH ROW BEGIN
  SET NEW.`key` = CONCAT(BIN_TO_UUID(NEW.`externalId`, true), '-', NEW.`name`);
END; //

DELIMITER ;

-- -----------------------------------------------------
-- Trigger `file_key_before_update`
-- -----------------------------------------------------

DELIMITER //

CREATE TRIGGER `file_key_before_update` BEFORE UPDATE ON `file`
FOR EACH ROW BEGIN
  SET NEW.`key` = CONCAT(BIN_TO_UUID(NEW.`externalId`, true), '-', NEW.`name`);
  SET NEW.`updatedAt` = CURRENT_TIMESTAMP;
END; //

DELIMITER ;

-- -----------------------------------------------------
-- Event `file_event_delete_old_files`
-- -----------------------------------------------------

DELIMITER //

CREATE EVENT `file_event_delete_old_files` ON SCHEDULE EVERY 1 HOUR STARTS CURRENT_TIMESTAMP()
  ON COMPLETION NOT PRESERVE
DO BEGIN
  DELETE FROM `file` WHERE `deletedAt` < DATE_SUB(NOW(), INTERVAL 1 HOUR);
END; //

DELIMITER ;

-- -----------------------------------------------------
-- Data for table `fileType`
-- -----------------------------------------------------

INSERT INTO `fileType` (`name`) 
  VALUES ('image/jpeg'), ('image/png'), ('audio/mpeg'), ('video/mpeg'), ('video/mp4'), ('video/webm');

-- -----------------------------------------------------
-- Data for table `file`
-- -----------------------------------------------------

INSERT INTO `file` (`name`, `size`, `idFileType`) 
  VALUES ('testImage.jpg', 0.4, 1);