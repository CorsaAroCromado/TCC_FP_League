// types/Modalidade.ts
export type Modalidade = {
    id_modalidade: number;
    nome: string;
    sexo?: "masculino" | "feminino" | "misto"; // restringi como string union
    id_evento: number;  // FK para Evento
  };
  