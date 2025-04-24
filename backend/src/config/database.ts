import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

(async () => {
  const client = await pool.connect();
  console.log("Criou a pool de conexão");
  const res = await client.query("SELECT now()");
  console.log("NÃO ESQUEÇA DE ABRIR A PORTA 3000 PÚBLICA");
  console.log(res.rows[0]);
  client.release();
})();
