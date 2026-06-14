CREATE DATABASE IF NOT EXISTS master_rsi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE master_rsi;

CREATE TABLE IF NOT EXISTS etudiants (
  id int(4) NOT NULL AUTO_INCREMENT,
  login varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  pass varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  nom varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  note1 int(4) NOT NULL,
  note2 int(4) NOT NULL,
  moyenne float NOT NULL,
  longitude float NOT NULL,
  latitude float NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS images (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  type varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  size int(4) NOT NULL,
  bin_img longblob NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO etudiants (login, pass, nom, note1, note2, moyenne, longitude, latitude) VALUES
('ahmed', SHA2('ahmed123', 256), 'Ahmed', 14, 16, 15.0, -7.6192, 33.5731),
('sara', SHA2('sara123', 256), 'Sara', 12, 13, 12.5, -5.0078, 34.0209),
('anouar', SHA2('anouar123', 256), 'Anouar', 10, 11, 10.5, -8.0083, 31.6295),
('amine', SHA2('amine123', 256), 'Amine', 15, 13, 14.0, -4.0083, 30.4278),
('badr', SHA2('badr123', 256), 'Badr', 16, 15, 15.5, -6.8498, 34.0);
