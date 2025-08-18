// src/infrastructure/store/types.ts
import { store } from './store';

export type RootStateT = ReturnType<typeof store.getState>;
export type AppDispatchT = typeof store.dispatch;