import 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
    role: string;
  }
}