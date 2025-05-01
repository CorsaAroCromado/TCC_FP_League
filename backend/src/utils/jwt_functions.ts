import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

export function gerarToken(payload: object): string {   // Gerar o token
  return jwt.sign(payload, secret, { expiresIn: "2h" });
}

export function verificarToken(token: string): any {    // Verificar o token
  return jwt.verify(token, secret);
}
