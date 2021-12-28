CREATE VIEW historico_reproducao_usuarios AS
    SELECT 
        u.NOME AS `usuario`, c.NOME AS `nome`
    FROM
        cancoes AS c
            JOIN
        usuario_cancoes AS uc ON c.ID = uc.CANCOES_ID
            JOIN
        usuario AS u ON uc.USUARIO_ID = u.ID
    ORDER BY `usuario` , `nome`;
