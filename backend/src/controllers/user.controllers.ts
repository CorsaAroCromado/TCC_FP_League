import { Request, Response } from "express";
import { getClient } from "../config/database";
import bcrypt from "bcrypt";

export async function inserirU(req: Request, res: Response){
  try {
    const { nome, rm, senha, tipo_usuario, data_criacao } = req.body;

    console.log(nome, rm, data_criacao);
    
    const client = await getClient();

    const sql1 = `
    SELECT * FROM Usuarios WHERE rm = $1
    `;
    
    // Verifica se o usuário já existe
    const ExistClient = await client.query(sql1, [rm]);
    
    // Se o usuário já existir, retorna um erro e encerra a função
    if (ExistClient.rows.length > 0) {
      client.release(); // Libera o cliente antes de retornar
      res.status(400).json({ error: "Usuário já existe" });
    }
    else{
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);
  
    const sql = `
      INSERT INTO Usuarios (nome, rm, senha, tipo_usuario, data_criacao)
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    await client.query(sql, [nome, rm, hashedPassword, tipo_usuario, data_criacao]);
    client.release();

    res.status(201).json({ message: "Usuário inserido com sucesso" });
    console.log("Cadastro realizado");
    }
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    res.status(500).json({ error: "Erro ao inserir usuário" });
  }
}