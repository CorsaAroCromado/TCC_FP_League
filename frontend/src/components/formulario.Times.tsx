import { useState, useEffect } from "react";
import { criarTime } from "../services/Inserir_times_api"; 
import { getModalidade } from "../services/Modalidades_api"; 
import { Modalidade } from "../types/Modalidade"; // Importa o type correto

export default function FormularioTime() {
  const [nome, setNome] = useState("");
  const [idModalidade, setIdModalidade] = useState<number>(0);
  const [modalidades, setModalidades] = useState<Modalidade[]>([]);

  useEffect(() => {
    async function carregarModalidades() {
      try {
        const dados = await getModalidade();
        setModalidades(dados);
      } catch (error) {
        console.error("Erro ao buscar modalidades:", error);
      }
    }
    carregarModalidades();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await criarTime({ nome, id_modalidade: idModalidade });
      alert("Time criado com sucesso!");
      setNome("");
      setIdModalidade(0);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar time. " + error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Time:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Escolha a Modalidade:</label>
        <select
          value={idModalidade}
          onChange={(e) => setIdModalidade(Number(e.target.value))}
          required
        >
          <option value="">Selecione...</option>
          {modalidades.map((modalidade) => (
            <option key={modalidade.id_modalidade} value={modalidade.id_modalidade}>
              {modalidade.nome}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Criar Time</button>
    </form>
  );
}
