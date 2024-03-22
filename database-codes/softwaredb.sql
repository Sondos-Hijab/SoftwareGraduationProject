CREATE database softwareDB;

CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(800) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `email` varchar(800) NOT NULL,
  PRIMARY KEY (`userID`)
)

CREATE TABLE `userprofile` (
  `userProfileID` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(800) NOT NULL,
  `bio` varchar(1800) DEFAULT NULL,
  `picture` blob,
  PRIMARY KEY (`userProfileID`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`)
) 

CREATE TABLE `business` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `adminName` varchar(800) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `email` varchar(800) NOT NULL,
  `name` varchar(800) NOT NULL,
  `location` varchar(300) NOT NULL,
  `phoneNumber` int NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `picture` blob,
  PRIMARY KEY (`adminID`)
) 

ALTER TABLE `softwaredb`.`business` 
CHANGE COLUMN `phoneNumber` `phoneNumber` BIGINT NOT NULL ;

CREATE TABLE `refreshtoken` (
  `tokenID` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `token` varchar(5000) NOT NULL,
  `userName` varchar(200) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `adminName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`tokenID`),
  KEY `fk_refreshtoken_user` (`user_id`),
  KEY `fk_refreshtoken_admin` (`admin_id`),
  CONSTRAINT `fk_refreshtoken_admin` FOREIGN KEY (`admin_id`) REFERENCES `business` (`adminID`) ON DELETE CASCADE,
  CONSTRAINT `fk_refreshtoken_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`) ON DELETE CASCADE,
  CONSTRAINT `refreshtoken_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`)
) 

CREATE TABLE `post` (
  `postID` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` blob,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postID`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `business` (`adminID`)
)

CREATE TABLE `feedback` (
  `feedbackID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(800) NOT NULL,
  `user_id` int NOT NULL,
  `businessName` varchar(800) NOT NULL,
  `admin_id` int NOT NULL,
  `text` varchar(2000) NOT NULL,
  `picture` blob,
  `rate1` float DEFAULT NULL,
  `rate2` float DEFAULT NULL,
  `rate3` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedbackID`),
  KEY `fk_user_id` (`user_id`),
  KEY `fk_admin_id` (`admin_id`),
  CONSTRAINT `fk_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `business` (`adminID`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`userID`) ON DELETE CASCADE
) 