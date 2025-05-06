import { Request, Response } from "express";
import { getClient } from "../config/database";
import { Pessoa } from "../@types/pessoa.model";

export async function selectPessoas(_req: Request, res: Response) {
  try {
    const client = await getClient();
    const result = await client.query("SELECT * FROM pessoas");
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pessoas" });
  }
}

export async function selectPessoa(req: Request, res: Response) {
  try {
    const uuid = req.params.uuid;
    const client = await getClient();
    const result = await client.query("SELECT * FROM pessoas WHERE uuid=$1", [uuid]);
    client.release();
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar pessoa" });
  }
}

export async function insertPessoa(req: Request, res: Response) {
  try {
    const pessoa: Pessoa = req.body;
    const client = await getClient();
    const sql = "INSERT INTO pessoas(nome, email, senha) VALUES ($1, $2, $3)";
    const values = [pessoa.nome, pessoa.email, pessoa.senha];
    await client.query(sql, values);
    client.release();
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao inserir pessoa" });
  }
}

export async function updatePessoa(req: Request, res: Response) {
  try {
    const uuid = req.params.uuid;
    const pessoa: Pessoa = req.body;
    const client = await getClient();
    const sql = "UPDATE pessoas SET nome=$1, email=$2, senha=$3 WHERE uuid=$4";
    const values = [pessoa.nome, pessoa.email, pessoa.senha, uuid];
    await client.query(sql, values);
    client.release();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar pessoa" });
  }
}

export async function deletePessoa(req: Request, res: Response) {
  try {
    const uuid = req.params.uuid;
    const client = await getClient();
    await client.query("DELETE FROM pessoas WHERE uuid=$1", [uuid]);
    client.release();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar pessoa" });
  }
}
