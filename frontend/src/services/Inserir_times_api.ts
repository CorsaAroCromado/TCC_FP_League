const API_URL = import.meta.env.VITE_API_URL;

export async function criarTime(time: { nome: string; id_modalidade: number }) {
  const response = await fetch(`${API_URL}/times`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(time),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar time");
  }
}
