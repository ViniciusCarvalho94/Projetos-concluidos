CREATE VIEW cancoes_premium AS
    SELECT 
        c.NOME AS `nome`, COUNT(uc.USUARIO_ID) AS `reproducoes`
    FROM
        cancoes AS c
            JOIN
        usuario_cancoes AS uc ON c.ID = uc.CANCOES_ID
            JOIN
        usuario AS u ON uc.USUARIO_ID = u.ID AND u.PLANO_ID <> 1
    GROUP BY `nome`
    ORDER BY `nome`;
