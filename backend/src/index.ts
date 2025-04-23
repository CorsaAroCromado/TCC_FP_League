import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';

import pessoasRoutes from "./routes/pessoas.routes";
import partidasRoutes from "./routes/partidas.routes";
import eventosRoutes from "./routes/eventos.routes";

const app = express();
const port = process.env.PORT || "3000";

// 🔓 Libera CORS para uso no Vite / Codespaces
app.use(cors({
  origin: "https://laughing-memory-69vpp6jx6vx6crg5g-5173.app.github.dev"
}));

app.use(express.json());

// 🌐 Suas rotas com prefixos padronizados
app.use("/pessoas", pessoasRoutes);
app.use("/evento", partidasRoutes);     // <- mudou!
app.use("/eventos", eventosRoutes);

// Rota simples de teste
app.get("/", (_req, res) => {
  res.json({ message: "API está rodando 🔥" });
});

app.listen(parseInt(port), () => {
  console.log(`Backend rodando na porta ${port}`);
});
