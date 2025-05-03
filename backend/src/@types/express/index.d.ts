declare namespace Express {
  interface Request {
    user: {
      id: number;
      tipo_usuario: 'admin' | 'capitao';
    };
  }
}


