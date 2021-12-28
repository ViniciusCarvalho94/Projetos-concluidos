DELIMITER $$
CREATE PROCEDURE albuns_do_artista(IN nomeArtista VARCHAR(50))
BEGIN
SELECT ar.NOME AS `artista`, al.NOME AS `album` FROM artista 
AS ar INNER JOIN album AS al ON ar.ID = al.ARTISTA_ID
WHERE ar.NOME = nomeArtista;
END $$
DELIMITER ;
