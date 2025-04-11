import dotenv from "dotenv";
dotenv.config();

import express from "express";
import pessoasRoutes from "./routes/pessoas.routes";

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use("/pessoas", pessoasRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Funcionando" });
});

app.listen(parseInt(port), () => {
  console.log(`Backend rodando na porta ${port}`);
});
