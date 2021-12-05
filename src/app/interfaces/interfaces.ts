export interface RespuestaUsuario {
  ok: boolean;
  pagina: number;
  usuarios: Usuarios[];
}

export interface Usuarios{

  id: number;
  nombre: string;
  email: string;
  telefono: string;
  password: string;
  horario: string;
  sede: string;
  seccion: string;
  avatar: string;
}

export interface Asitencias  {
  id: number;
  nombre: string;
  email: string;
  password: string;
  horario: string;
  sede: string;
  telefono: string;
  seccion: string;
}


export interface Docentes{

  id: number;  
  seccion: string;
  asignatura: string;
  docente: string;
  correo: string;
  avatar: string;
}