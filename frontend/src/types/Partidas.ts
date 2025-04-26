// types/Partidas.ts
export type Partida = {
    id_partida: number;
    fase?: string;     // pode ser NULL (então opcional)
    data_hora: string; // TIMESTAMP → ISO string
    id_modalidade: number;
    id_time1: number;
    id_time2: number;
  };
  