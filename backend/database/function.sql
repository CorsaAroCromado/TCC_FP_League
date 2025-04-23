CREATE OR REPLACE FUNCTION partidas_por_evento(nome_evento TEXT)
RETURNS TABLE (
    fase VARCHAR(20),
    data_hora TIMESTAMP,
    time1 VARCHAR(100),
    time2 VARCHAR(100),
    placar1 INT,
    placar2 INT,
    vencedor VARCHAR(100)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    P.fase,
    P.data_hora,
    T1.nome,
    T2.nome,
    R.pontuacao_time1,
    R.pontuacao_time2,
    V.nome
  FROM Partidas P
  JOIN Times T1 ON P.id_time1 = T1.id_time
  JOIN Times T2 ON P.id_time2 = T2.id_time
  LEFT JOIN Resultado R ON P.id_partida = R.id_partida
  LEFT JOIN Times V ON R.vencedor = V.id_time
  JOIN Modalidade M ON P.id_modalidade = M.id_modalidade
  JOIN Evento E ON M.id_evento = E.id_evento
  WHERE E.nome = nome_evento;
END;
$$ LANGUAGE plpgsql;
