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
export async function login(req: Request, res: Response) {
  try {
    const { rm, senha } = req.body;
    const client = await getClient();

    const sql = `SELECT * FROM Usuarios WHERE rm = $1`;
    const result = await client.query(sql, [rm]);

    if (result.rows.length === 0) {
      client.release();
      res.status(401).json({ message: "Login ou senha incorretos" });
    }else{

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      client.release();
      res.status(401).json({ message: "Login ou senha incorretos" });
    }else{

    client.release();

    const payload = {
      id: usuario.id_usuario,
      tipo_usuario: usuario.tipo_usuario,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "30s" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
    console.log("Refresh token gerado:", refreshToken);

    // Armazena o refresh token no cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // só funciona com HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    res.status(200).json({
      message: "Login realizado com sucesso",
      accessToken,
    });
  }
}
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro ao realizar login" });
  }
}

export function logout(req: Request, res: Response) {
  if (!req.cookies.refreshToken) {
    res.sendStatus(204);
  }else{
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  }).json({
    message: "Logout realizado com sucesso",
  });
}
 
}

export async function mostradados(req: Request, res: Response) { //vai mostrar os dados do usuario logado passando pelo middleware
    res.status(200).json({
      id: req.user.id,
      tipo_usuario: req.user.tipo_usuario,
    });   
}
export function refreshToken(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (!token){
    res.sendStatus(401);
  }else{

  jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }else{
    const payload = {
      id: user.id,
      tipo_usuario: user.tipo_usuario,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m"
    });

    res.json({ accessToken: newAccessToken });
  }
  });
}
}