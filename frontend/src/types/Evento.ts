// types/Evento.ts
export type Evento = {
    id_evento: number;
    nome: string;
    descricao?: string;     // TEXT pode ser opcional
    data_inicio: string;    // Date em formato ISO string
    data_fim: string;       // Date em formato ISO string
    local: string;
  };
  