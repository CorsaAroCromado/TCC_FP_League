-- Evento
INSERT INTO Evento (nome, descricao, data_inicio, data_fim, local)
VALUES ('Copa Quadrinha 2025', 'Competição entre turmas do FP', '2025-07-01', '2025-07-10', 'Quadrinha');

-- Modalidade
INSERT INTO Modalidade (nome, sexo, id_evento) VALUES
  ('Futsal', 'masculino', (SELECT id_evento FROM Evento WHERE nome = 'Copa Quadrinha 2025'));

-- Times
INSERT INTO Times (nome, id_modalidade) VALUES
  ('Manquinhos', (SELECT id_modalidade FROM Modalidade WHERE nome = 'Futsal')),
  ('Canelas Secas', (SELECT id_modalidade FROM Modalidade WHERE nome = 'Futsal'));

-- Jogadores
INSERT INTO Jogadores (nome, rm, idade, sexo) VALUES
  ('Gustavo Bernardo', 'RM4001', 18, 'masculino'),
  ('Diego Maradona', 'RM4002', 18, 'masculino'),
  ('Carlos Alberto', 'RM4003', 17, 'masculino'),
  ('Hugo Souza', 'RM4004', 17, 'masculino'),
  ('João Otávio', 'RM5001', 19, 'masculino'),
  ('João Pedro Maia', 'RM5002', 18, 'masculino'),
  ('LucasInutilismo', 'RM5003', 17, 'masculino'),
  ('Matheus CagaTronco', 'RM5004', 17, 'masculino');

-- Jogador_Times
INSERT INTO Jogador_Times (id_jogador, id_time) VALUES
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM4001'), (SELECT id_time FROM Times WHERE nome = 'Manquinhos')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM4002'), (SELECT id_time FROM Times WHERE nome = 'Manquinhos')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM4003'), (SELECT id_time FROM Times WHERE nome = 'Manquinhos')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM4004'), (SELECT id_time FROM Times WHERE nome = 'Manquinhos')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM5001'), (SELECT id_time FROM Times WHERE nome = 'Canelas Secas')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM5002'), (SELECT id_time FROM Times WHERE nome = 'Canelas Secas')),   
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM5003'), (SELECT id_time FROM Times WHERE nome = 'Canelas Secas')),
  ((SELECT id_jogador FROM Jogadores WHERE rm = 'RM5004'), (SELECT id_time FROM Times WHERE nome = 'Canelas Secas'));

-- Partida
INSERT INTO Partidas (fase, data_hora, id_modalidade, id_time1, id_time2)
VALUES (
  'final',
  '2025-07-10 16:00:00',
  (SELECT id_modalidade FROM Modalidade WHERE nome = 'Futsal'),
  (SELECT id_time FROM Times WHERE nome = 'Manquinhos'),
  (SELECT id_time FROM Times WHERE nome = 'Canelas Secas')
);

-- Resultado
INSERT INTO Resultado (id_partida, pontuacao_time1, pontuacao_time2, vencedor)
VALUES (
  (SELECT id_partida FROM Partidas WHERE fase = 'final' AND id_modalidade = (SELECT id_modalidade FROM Modalidade WHERE nome = 'Futsal')),
  2,
  10,
  (SELECT id_time FROM Times WHERE nome = 'Canelas Secas')
);
