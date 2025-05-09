'use server';

import type { Task } from '../types';

/**
 * Añade una tarea en el servidor.
 * Este archivo se ejecuta en el Server, por eso puede tener 'use server' arriba.
 */
export async function addTask(formData: FormData): Promise<Task> {
    const entry = formData.get('task');
    if (!entry || typeof entry !== 'string') {
        throw new Error('El campo "task" debe ser un texto');
    }

    // Simula retraso de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        id: Date.now(),
        text: entry,
        status: 'confirmed',
    };
}
