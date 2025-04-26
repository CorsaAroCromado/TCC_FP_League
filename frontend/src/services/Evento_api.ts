import { Evento } from "../types/Evento";

const API_URL = "https://laughing-memory-69vpp6jx6vx6crg5g-3000.app.github.dev";

export async function getEventos(): Promise<Evento[]> {
  const response = await fetch(`${API_URL}/eventos`); //o endpoint correto é /eventos
  const data = await response.json();
  return data;
}