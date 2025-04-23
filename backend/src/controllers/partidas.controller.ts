import { Request, Response } from "express";
import { getClient } from "../config/database";

export async function getPartidasPorEvento(req: Request, res: Response) {
  try {
    const { nomeEvento } = req.params;
    const client = await getClient();

    const result = await client.query(
      "SELECT * FROM partidas_por_evento($1)",
      [nomeEvento]
    );

    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar partidas por evento:", error);
    res.status(500).json({ error: "Erro ao buscar partidas" });
  }
}
