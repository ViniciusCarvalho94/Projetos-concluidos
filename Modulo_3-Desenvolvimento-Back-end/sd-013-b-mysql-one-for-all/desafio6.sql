CREATE VIEW faturamento_atual AS
    SELECT 
        CONCAT(MIN(p.VALOR), '.00') AS `faturamento_minimo`,
        CONCAT(MAX(p.VALOR)) AS `faturamento_maximo`,
        CONCAT(ROUND(AVG(p.VALOR), 1), '0') AS `faturamento_medio`,
        CONCAT((SELECT VALOR FROM plano WHERE ID = 2) + (SELECT VALOR FROM plano WHERE ID = 3)) AS `faturamento_total`
    FROM
        plano AS p
            JOIN
        usuario AS u ON p.ID = u.PLANO_ID;
