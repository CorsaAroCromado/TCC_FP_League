import { Request, Response } from "express";
import { getClient } from "../config/database";

export async function getEvento(req: Request, res: Response) {
  try {
    const client = await getClient();

    const result = await client.query(
      "SELECT * FROM Evento"
    );

    client.release();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao eventos:", error);
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }  
}
  
