import { Modalidade } from "../types/Modalidade";

const API_URL = import.meta.env.VITE_API_URL;

export async function getModalidade(): Promise<Modalidade[]> {
  const response = await fetch(`${API_URL}/Modalidade`); //o endpoint correto é /modalidade
  const data = await response.json();
  return data;
}