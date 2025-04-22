-- Script para que dropa as tabelas quando criar o Postgresql
DROP TABLE IF EXISTS Resultado, Partidas, Jogador_Times, Jogadores, Times, Modalidade, Evento CASCADE;

-- Tabela: Evento
CREATE TABLE Evento (
    id_evento SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    local VARCHAR(100) NOT NULL
);

-- Tabela: Modalidade
CREATE TABLE Modalidade (
    id_modalidade SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sexo VARCHAR(10),  -- Pode ser 'masculino', 'feminino', 'misto'
    id_evento INT NOT NULL,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento) ON DELETE CASCADE
);

-- Tabela: Times
CREATE TABLE Times (
    id_time SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_modalidade INT NOT NULL,
    FOREIGN KEY (id_modalidade) REFERENCES Modalidade(id_modalidade) ON DELETE CASCADE
);

-- Tabela: Jogadores
CREATE TABLE Jogadores (
    id_jogador SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    rm VARCHAR(20) UNIQUE,
    idade INT,
    sexo VARCHAR(10)
);

-- Tabela Associativa: Jogador_Times
CREATE TABLE Jogador_Times (
    id_jogador INT,
    id_time INT,
    PRIMARY KEY (id_jogador, id_time),
    FOREIGN KEY (id_jogador) REFERENCES Jogadores(id_jogador) ON DELETE CASCADE,
    FOREIGN KEY (id_time) REFERENCES Times(id_time) ON DELETE CASCADE
);

-- Tabela: Partidas
CREATE TABLE Partidas (
    id_partida SERIAL PRIMARY KEY,
    fase VARCHAR(20),  -- Ex: oitavas, quartas, semi, final
    data_hora TIMESTAMP NOT NULL,
    id_modalidade INT NOT NULL,
    id_time1 INT NOT NULL,
    id_time2 INT NOT NULL,
    FOREIGN KEY (id_modalidade) REFERENCES Modalidade(id_modalidade),
    FOREIGN KEY (id_time1) REFERENCES Times(id_time),
    FOREIGN KEY (id_time2) REFERENCES Times(id_time)
);

-- Tabela: Resultado
CREATE TABLE Resultado (
    id_resultado SERIAL PRIMARY KEY,
    id_partida INT UNIQUE NOT NULL,
    pontuacao_time1 INT,
    pontuacao_time2 INT,
    vencedor INT,  -- FK para Time
    FOREIGN KEY (id_partida) REFERENCES Partidas(id_partida),
    FOREIGN KEY (vencedor) REFERENCES Times(id_time)
);
