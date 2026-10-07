export type Role = 'ADMIN' | 'AGENT';

export interface User {
  username: string;
  password: string;
  role?: Role; // optional: the wrong-password user has no role
}

export interface Lead {
  name: string;
  email: string;
  company: string;
  status: string;
}
