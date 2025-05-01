import { Evento } from "../types/Evento";

const API_URL = import.meta.env.VITE_API_URL;

export async function getEventos(): Promise<Evento[]> {
  const response = await fetch(`${API_URL}/eventos`); //o endpoint correto é /eventos
  const data = await response.json();
  return data;
}