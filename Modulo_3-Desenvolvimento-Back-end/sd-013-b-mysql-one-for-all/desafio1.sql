DROP DATABASE IF EXISTS SpotifyClone;
CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE plano (
    ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(60) NOT NULL,
    VALOR DOUBLE NOT NULL,
    PRIMARY KEY (ID)
)  ENGINE=INNODB;

CREATE TABLE usuario (
    ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(60) NOT NULL,
    IDADE INT NOT NULL,
    PLANO_ID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (PLANO_ID) REFERENCES plano (ID)
)  ENGINE=INNODB;

CREATE TABLE artista (
    ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(60) NOT NULL,
    PRIMARY KEY (ID)
)  ENGINE=INNODB;

CREATE TABLE usuario_artista (
    USUARIO_ID INT NOT NULL,
    ARTISTA_ID INT NOT NULL,
    CONSTRAINT PRIMARY KEY (USUARIO_ID , ARTISTA_ID),
    FOREIGN KEY (USUARIO_ID) REFERENCES usuario (ID),
    FOREIGN KEY (ARTISTA_ID) REFERENCES artista (ID)
)  ENGINE=INNODB;

CREATE TABLE album (
    ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(100) NOT NULL,
    ARTISTA_ID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ARTISTA_ID) REFERENCES artista (ID)
)  ENGINE=INNODB;

CREATE TABLE cancoes (
    ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(60) NOT NULL,
    ARTISTA_ID INT NOT NULL,
    ALBUM_ID INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ARTISTA_ID) REFERENCES artista (ID),
    FOREIGN KEY (ALBUM_ID) REFERENCES album (ID)
)  ENGINE=INNODB;

CREATE TABLE usuario_cancoes (
    USUARIO_ID INT NOT NULL,
    CANCOES_ID INT NOT NULL,
    CONSTRAINT PRIMARY KEY (USUARIO_ID , CANCOES_ID),
    FOREIGN KEY (USUARIO_ID) REFERENCES usuario (ID),
    FOREIGN KEY (CANCOES_ID) REFERENCES cancoes (ID)
)  ENGINE=INNODB;

INSERT INTO plano (NOME, VALOR) VALUES
('gratuito', 0.00),
('universitário', 5.99),
('familiar', 7.99);

INSERT INTO usuario (NOME, IDADE, PLANO_ID) VALUES
('Thati', 23, 1),
('Cintia', 35, 3),
('Bill', 20, 2),
('Roger', 45, 1);

INSERT INTO artista (NOME) VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

INSERT INTO usuario_artista (USUARIO_ID, ARTISTA_ID) VALUES
(1, 1),
(1, 4),
(1, 3),
(2, 1),
(2, 3),
(3, 2),
(3, 1),
(4, 4);

INSERT INTO album (NOME, ARTISTA_ID) VALUES
('Envious', 1),
('Exuberant', 1),
('Hallowed Steam', 2),
('Incandescent', 3),
('Temporary Culture', 4);

INSERT INTO cancoes (NOME, ALBUM_ID, ARTISTA_ID) VALUES
('Soul For Us', 1, 1),
('Reflections Of Magic', 1, 1),
('Dance With Her Own', 1, 1),
('Troubles Of My Inner Fire', 2, 1),
('Time Fireworks', 2, 1),
('Magic Circus', 3, 2),
('Honey, So Do I', 3, 2),
("Sweetie, Let's Go Wild", 3, 2),
('She Knows', 3, 2),
('Fantasy For Me', 4, 3),
('Celebration Of More', 4, 3),
('Rock His Everything', 4, 3),
('Home Forever', 4, 3),
('Diamond Power', 4, 3),
("Honey, Let's Be Silly", 4, 3),
('Thang Of Thunder', 5, 4),
('Words Of Her Life', 5, 4),
('Without My Streets', 5, 4);

INSERT INTO usuario_cancoes (USUARIO_ID, CANCOES_ID) VALUES
(1, 1),
(1, 6),
(1, 14),
(1, 16),
(2, 13),
(2, 17),
(2, 2),
(2, 15),
(3, 4),
(3, 16),
(3, 6),
(4, 3),
(4, 18),
(4, 11);