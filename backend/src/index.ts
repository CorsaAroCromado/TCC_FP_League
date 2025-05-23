import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser"
import pessoasRoutes from "./routes/pessoas.routes";
import partidasRoutes from "./routes/partidas.routes";
import eventosRoutes from "./routes/eventos.routes";
import timesRoutes from "./routes/times.routes";
import modalidadeRoutes from "./routes/modalidade.routes";
import userRoutes from "./routes/user.routes"; // Ajuste o caminho conforme necessário
const app = express();
const port = process.env.PORT || "3000";


app.use(cors({
  origin: "https://laughing-memory-69vpp6jx6vx6crg5g-5173.app.github.dev"
}));

app.use(express.json());
app.use(cookieParser());


app.use("/users", userRoutes); 
app.use("/pessoas", pessoasRoutes);
app.use("/evento", partidasRoutes);     
app.use("/eventos", eventosRoutes);
app.use("/times", timesRoutes);
app.use("/modalidade", modalidadeRoutes); 


app.get("/", (_req, res) => {
  res.json({ message: "API está rodando" });
});

app.listen(parseInt(port), () => {
  console.log(`Backend rodando na porta ${port}`);
});
