import { useEffect, useState } from "react";
import { getEventos } from "../../services/Evento_api";
import { Evento } from "../../types/Evento";
import EventoCard from "../../components/EventoCard";

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getEventos();
      setEventos(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Eventos</h1>
      {eventos.map(evento => (
        <EventoCard key={evento.id_evento} evento={evento} />
      ))}
    </div>
  );
}
