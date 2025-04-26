// types/Resultado.ts
export type Resultado = {
    id_resultado: number;
    id_partida: number;
    pontuacao_time1?: number;   // pode ser NULL
    pontuacao_time2?: number;   // pode ser NULL
    vencedor?: number;          // pode ser NULL
  };
  