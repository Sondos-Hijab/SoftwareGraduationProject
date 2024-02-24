CREATE database softwareDB;
CREATE TABLE user (
  userID int NOT NULL AUTO_INCREMENT,
  name varchar(800) NOT NULL,
  password varchar(1000) NOT NULL,
  email varchar(800) NOT NULL,
  PRIMARY KEY (userID)
)
CREATE TABLE refreshtoken (
  tokenID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  token varchar(5000) NOT NULL,
  userName varchar(200) NOT NULL,
  PRIMARY KEY (tokenID),
  KEY fk_refreshtoken_user (user_id),
  CONSTRAINT fk_refreshtoken_user FOREIGN KEY (user_id) REFERENCES user (userID) ON DELETE CASCADE,
  CONSTRAINT refreshtoken_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (userID)
)