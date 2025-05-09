// src/app/types.ts

/** Una tarea confirmada por el servidor */
export interface Task {
    id: number;
    text: string;
    status: 'optimistic' | 'confirmed';
}

/** Una tarea añadida de forma optimista en UI */
export interface OptimisticTask {
    text: string;
    status: 'optimistic';
}
