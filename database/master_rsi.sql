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
('ahmed', '$2b$10$kxfQZ8rmhngAvyqS9nVca.1pgPWRMyluo/SweXMQ4oQ00cZXMf8MS', 'Ahmed', 14, 16, 15.0, -7.6192, 33.5731),
('sara', '$2b$10$78hwFfPwdPUZjdpEZbAcVOHQ.CJBBgR8vXz3LN.DQPB1eCO/h46fO', 'Sara', 12, 13, 12.5, -5.0078, 34.0209),
('anouar', '$2b$10$Lt7XsACri2ZXeY4V1dMzAePQDqPu.C.3XIxNeQN/c8dygeILKj6Iy', 'Anouar', 10, 11, 10.5, -8.0083, 31.6295),
('amine', '$2b$10$8TsLtkPeoWYdKfA/yv6l2.SfDqX55/cgp0V7BA660Fk4PwTNSIgY6', 'Amine', 15, 13, 14.0, -4.0083, 30.4278),
('badr', '$2b$10$.fUsuT5nddH.WW91u72L0OSQdP8gbPY/CIR70gv1VxaXu8qaNUb/O', 'Badr', 16, 15, 15.5, -6.8498, 34.0);
