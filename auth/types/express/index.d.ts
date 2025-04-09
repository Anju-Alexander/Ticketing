// types/express/index.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    jwt?: string;
  }
}
