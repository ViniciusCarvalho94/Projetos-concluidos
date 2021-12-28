CREATE VIEW estatisticas_musicais AS
    SELECT 
        (SELECT 
                COUNT(ID)
            FROM
                cancoes) AS cancoes,
        (SELECT 
                COUNT(ID)
            FROM
                artista) AS artistas,
        COUNT(ID) AS albuns
    FROM
        album;
