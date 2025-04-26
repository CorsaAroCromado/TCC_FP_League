// types/Jogadores.ts
export type Jogador = {
    id_jogador: number;
    nome: string;
    rm?: string;     // pode ser NULL (então opcional)
    idade?: number;  // também pode ser opcional
    sexo?: "masculino" | "feminino"; // restringi como union
  };
  