export interface JwtPayloadType {
  userId: number | string;
  email: string;
}

export interface JwtPayloadValidType extends JwtPayloadType {
  exp: number;
  iat: number;
}
