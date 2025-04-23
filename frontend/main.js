const listaEventos = document.getElementById("lista-eventos");

async function carregarEventos() {
  try {
    const response = await fetch("https://laughing-memory-69vpp6jx6vx6crg5g-3000.app.github.dev/eventos");
    const eventos = await response.json();

    eventos.forEach(evento => {
      const li = document.createElement("li");

            // Formatar as datas
      const dataInicio = new Date(evento.data_inicio);
      const dataFim = new Date(evento.data_fim);

      // Função para formatar a data
      const formatarData = (data) => {
        return data.toLocaleString("pt-BR", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      li.innerHTML = `
        <strong>${evento.nome}</strong><br>
        ${evento.descricao}<br>
        De ${ formatarData(dataInicio)}<br> Até ${ formatarData(dataFim)} <br>
        Local: ${evento.local}
      `;
      listaEventos.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
    listaEventos.innerHTML = "<li>Erro ao carregar eventos</li>";
  }
}

carregarEventos();
