import { Request, Response } from "express";
import { getClient } from "../config/database";

export async function inserirTime(req: Request, res: Response) {
  try {
    const { nome, id_modalidade } = req.body;
    const client = await getClient();

    const sql = `
      INSERT INTO Times (nome, id_modalidade)
      VALUES ($1, $2)
    `;
    await client.query(sql, [nome, id_modalidade]);
    client.release();

    res.status(201).json({ message: "Time inserido com sucesso" });
  } catch (error) {
    console.error("Erro ao inserir time:", error);
    res.status(500).json({ error: "Erro ao inserir time" });
  }
}
