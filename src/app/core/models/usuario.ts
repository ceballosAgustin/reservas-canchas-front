import Rol from "./rol";

export default interface Usuario {
  idUsuario: number;
  email: string;
  clave: string;
  nombre: string;
  apellido: string;
  roles: Rol[];
  admin?: boolean;
  usuarioHabilitado: boolean;
}
