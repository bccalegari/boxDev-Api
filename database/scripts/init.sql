-- -----------------------------------------------------
-- Schema boxDev
-- -----------------------------------------------------

CREATE DATABASE IF NOT EXISTS `boxDev` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `boxDev`;

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
  CONSTRAINT `file_idFile_PK` PRIMARY KEY (`idFile`),
  CONSTRAINT `file_idFileType_FK` FOREIGN KEY (`idFileType`)
    REFERENCES `fileType` (`idFileType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Trigger `file_key_after_insert`
-- -----------------------------------------------------

DELIMITER //

CREATE TRIGGER `file_key_after_insert` BEFORE INSERT ON `file`
FOR EACH ROW BEGIN
  SET NEW.`key` = CONCAT(BIN_TO_UUID(NEW.`externalId`, true), '-', NEW.`name`);
END; //

DELIMITER ;

-- -----------------------------------------------------
-- Data for table `fileType`
-- -----------------------------------------------------

INSERT INTO `fileType` (`name`) 
  VALUES ('image/jpeg'), ('image/png'), ('audio/mpeg'), ('video/mpeg'), ('video/mp4'), ('video/webm');