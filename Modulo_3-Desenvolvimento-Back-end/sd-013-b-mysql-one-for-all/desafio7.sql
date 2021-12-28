CREATE VIEW perfil_artistas AS
    SELECT 
        ar.NOME AS artista,
        al.NOME AS album,
        COUNT(ua.USUARIO_ID) AS seguidores
    FROM
        artista AS ar
            JOIN
        album AS al ON ar.ID = al.ARTISTA_ID
            JOIN
        usuario_artista AS ua ON ar.ID = ua.ARTISTA_ID
    GROUP BY artista, album
    ORDER BY seguidores DESC , artista;
