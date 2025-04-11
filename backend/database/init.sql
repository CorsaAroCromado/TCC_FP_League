CREATE TABLE pessoas (
    uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,  -- Identificador único
    nome VARCHAR(100) NOT NULL,  -- Nome da pessoa
    email VARCHAR(150) UNIQUE NOT NULL,  -- Email único
    senha TEXT NOT NULL,  -- Senha (criptografada no backend)
    criado_em TIMESTAMP DEFAULT now()  -- Data de criação do registro
);
