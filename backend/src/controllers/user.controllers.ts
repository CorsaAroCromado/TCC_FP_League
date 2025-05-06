import { Request, Response } from "express";
import { getClient } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export async function inseriruser(req: Request, res: Response){ //vai inserir o usuario no banco de dados
  try {
    const { nome, rm, senha, tipo_usuario, data_criacao } = req.body;

    console.log(nome, rm, data_criacao);
    
    const client = await getClient();

    const sql1 = `
    SELECT * FROM Usuarios WHERE rm = $1
    `;
    
    
    const ExistClient = await client.query(sql1, [rm]);
    
   
    if (ExistClient.rows.length > 0) {
      client.release(); 
      res.status(400).json({ error: "Usuário já existe" });
    }
    else{
    
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
export async function login(req: Request, res: Response) { //vai gerar o JsonWebToken
  try {
    const { rm, senha } = req.body;
    const client = await getClient();

    const sql = `SELECT * FROM Usuarios WHERE rm = $1`;
    const result = await client.query(sql, [rm]);

    if (result.rows.length === 0) {
      client.release();
      res.status(401).json({ message: "Login ou senha incorretos" });
      console.log("Login ou senha incorretos");
    } else {
      const usuario = result.rows[0];
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        client.release();
        res.status(401).json({ message: "Login ou senha incorretos" });
        console.log("Login ou senha incorretos");
      } else {
        client.release();

        const token = jwt.sign(
          {
            id: usuario.id_usuario,
            tipo_usuario: usuario.tipo_usuario,
          },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        res.status(200).json({
          message: "Login realizado com sucesso",
          token: token,
        });
        console.log("Login realizado com sucesso");
      }
    }
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
}

export async function mostradados(req: Request, res: Response) { //vai mostrar os dados do usuario logado passando pelo middleware
    res.status(200).json({
      id: req.user.id,
      tipo_usuario: req.user.tipo_usuario,
    });   
}
