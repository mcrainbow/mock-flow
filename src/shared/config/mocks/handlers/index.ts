// src/mocks/handlers/index.ts
import { authHandlers } from './auth.handlers';
import { userHandler } from './users.handlers';

export const handlers = [...authHandlers, ...userHandler];
