import Cancha from "./cancha";
import Usuario from "./usuario";

export default interface Reserva {
  id: number;
  usuario: Usuario;
  cancha: Cancha;
  fechaHora: Date;
}
