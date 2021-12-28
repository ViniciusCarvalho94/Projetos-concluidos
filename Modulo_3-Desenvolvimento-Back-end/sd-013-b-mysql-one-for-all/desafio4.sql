CREATE VIEW top_3_artistas AS
    SELECT 
        a.NOME AS `artista`, COUNT(uc.USUARIO_ID) AS `seguidores`
    FROM
        artista AS a
            JOIN
        usuario_artista AS uc ON a.ID = uc.ARTISTA_ID
    GROUP BY `artista`
    ORDER BY `seguidores` DESC , `artista`
    LIMIT 3;
