export interface UserPayload {
  sub: string;
  fullName: string;
  email: string;
  iat?: number;
  exp?: number;
}
