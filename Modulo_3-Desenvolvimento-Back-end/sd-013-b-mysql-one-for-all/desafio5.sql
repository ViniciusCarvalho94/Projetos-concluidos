CREATE VIEW top_2_hits_do_momento AS
    SELECT 
        c.NOME AS `cancao`, COUNT(uc.CANCOES_ID) AS `reproducoes`
    FROM
        cancoes AS c
            JOIN
        usuario_cancoes AS uc ON c.ID = uc.CANCOES_ID
            JOIN
        usuario AS u ON uc.USUARIO_ID = u.ID
    GROUP BY `cancao`
    ORDER BY `reproducoes` DESC , `cancao`
    LIMIT 2;
