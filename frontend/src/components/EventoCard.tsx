import styles from '../styles/EventoCard.module.css';
import { Evento } from '../types/Evento';

type Props = {
  evento: Evento;
};

export default function EventoCard({ evento }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{evento.nome}</h2>
      <p>{evento.descricao}</p>
      <p>
        De {evento.data_inicio} até {evento.data_fim}
      </p>
      <p>Local: {evento.local}</p>
    </div>
  );
}
