-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema foodini
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema foodini
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `foodini` DEFAULT CHARACTER SET utf8mb3 ;
USE `foodini` ;

-- -----------------------------------------------------
-- Table `foodini`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`clients` (
  `idClient` INT NOT NULL AUTO_INCREMENT,
  `ClientName` VARCHAR(45) NOT NULL,
  `ClientNumber` INT NOT NULL,
  `ClientEmail` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idClient`),
  UNIQUE INDEX `ClientEmail_UNIQUE` (`ClientEmail` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodini`.`restaurents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`restaurents` (
  `idRestaurent` INT NOT NULL AUTO_INCREMENT,
  `restaurentName` VARCHAR(45) NOT NULL,
  `restaurentAddress` VARCHAR(100) NOT NULL,
  `restaurentNumber` INT NOT NULL,
  `restaurentImage` LONGTEXT NOT NULL,
  `restaurentDescription` LONGTEXT NULL DEFAULT NULL,
  `restaurentSpecialite` VARCHAR(45) NULL DEFAULT NULL,
  `restaurentMenu` LONGTEXT NULL DEFAULT NULL,
  `restaurentTiming` VARCHAR(45) NULL DEFAULT NULL,
  `restaurentEmail` VARCHAR(255) NOT NULL,
  `restaurentPassword` LONGTEXT NOT NULL,
  `restaurentRates` INT NULL DEFAULT NULL,
  `restaurentsNumberRates` VARCHAR(45) NULL DEFAULT NULL,
  `restaurentsMatricule` VARCHAR(255) NOT NULL,
  `restaurentsStatus` ENUM('active', 'banned', 'pending', 'validated') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`idRestaurent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodini`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`posts` (
  `idPosts` INT NOT NULL AUTO_INCREMENT,
  `PostsImage` LONGTEXT NOT NULL,
  `PostsDescription` LONGTEXT NULL DEFAULT NULL,
  `category` ENUM('pizza', 'sandwich', 'plat', 'burger') NOT NULL,
  `price` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `restaurent_idRestaurent` INT NOT NULL,
  PRIMARY KEY (`idPosts`),
  INDEX `fk_Posts_restaurent1_idx` (`restaurent_idRestaurent` ASC) VISIBLE,
  CONSTRAINT `fk_Posts_restaurent1`
    FOREIGN KEY (`restaurent_idRestaurent`)
    REFERENCES `foodini`.`restaurents` (`idRestaurent`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodini`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `commentsBody` LONGTEXT NULL DEFAULT NULL,
  `commented_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `posts_idPosts` INT NOT NULL,
  `clients_idClient` INT NULL,
  `restaurents_idRestaurent` INT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  INDEX `fk_comments_clients1_idx` (`clients_idClient` ASC) VISIBLE,
  INDEX `fk_comments_restaurents1_idx` (`restaurents_idRestaurent` ASC) VISIBLE,
  CONSTRAINT `fk_comments_clients1`
    FOREIGN KEY (`clients_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`),
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`),
  CONSTRAINT `fk_comments_restaurents1`
    FOREIGN KEY (`restaurents_idRestaurent`)
    REFERENCES `foodini`.`restaurents` (`idRestaurent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodini`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`likes` (
  `idlikes` INT NOT NULL AUTO_INCREMENT,
  `liked` TINYINT NOT NULL DEFAULT '0',
  `Client_idClient` INT NOT NULL,
  `posts_idPosts` INT NOT NULL,
  PRIMARY KEY (`idlikes`, `Client_idClient`, `posts_idPosts`),
  INDEX `fk_likes_Client1_idx` (`Client_idClient` ASC) VISIBLE,
  INDEX `fk_likes_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  CONSTRAINT `fk_likes_Client1`
    FOREIGN KEY (`Client_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`),
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `foodini`.`reservations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `foodini`.`reservations` (
  `idreservations` INT NOT NULL AUTO_INCREMENT,
  `reservationsStatus` ENUM('confirmed', 'rejected', 'pending', 'cancelled') NULL DEFAULT 'pending',
  `clients_idClient` INT NOT NULL,
  `posts_idPosts` INT NOT NULL,
  PRIMARY KEY (`idreservations`, `clients_idClient`, `posts_idPosts`),
  INDEX `fk_reservations_clients1_idx` (`clients_idClient` ASC) VISIBLE,
  INDEX `fk_reservations_posts1_idx` (`posts_idPosts` ASC) VISIBLE,
  CONSTRAINT `fk_reservations_clients1`
    FOREIGN KEY (`clients_idClient`)
    REFERENCES `foodini`.`clients` (`idClient`),
  CONSTRAINT `fk_reservations_posts1`
    FOREIGN KEY (`posts_idPosts`)
    REFERENCES `foodini`.`posts` (`idPosts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
