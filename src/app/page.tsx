'use client';

import {JSX, useOptimistic} from 'react';
import { useFormStatus } from 'react-dom';

import type { OptimisticTask } from './types';
import { addTask } from './actions/addTask';

/**
 * Props de TaskList.
 */
interface TaskListProps {
  tasks: OptimisticTask[];
}

// --- Componente Principal ---
export default function TaskManager(): JSX.Element {
  // Estado optimista: lista de OptimisticTask
  const [optimisticTasks, updateOptimistic] = useOptimistic<
      OptimisticTask[],
      string
  >(
      [],
      (state, newTaskText) => [
        ...state,
        { text: newTaskText, status: 'optimistic' },
      ]
  );

  /**
   * Manejador de envío del formulario.
   * @param formData FormData con los campos del form.
   */
  const handleSubmit = async (formData: FormData): Promise<void> => {
    const entry = formData.get('task');
    if (!entry || typeof entry !== 'string') {
      throw new Error('El campo "task" debe ser un texto');
    }
    updateOptimistic(entry);
    await addTask(formData);
  };

  return (
      <div>
        <form action={handleSubmit}>
          <input
              name="task"
              type="text"
              placeholder="Nueva tarea"
              required
          />
          <SubmitButton />
        </form>

        <TaskList tasks={optimisticTasks} />
      </div>
  );
}

// --- Botón de envío con estado de formulario ---
function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
      <button type="submit" disabled={pending}>
        {pending ? 'Agregando...' : 'Agregar Tarea'}
      </button>
  );
}

// --- Lista de tareas ---
function TaskList({ tasks }: TaskListProps): JSX.Element {
  return (
      <ul>
        {tasks.map((task, idx) => (
            <li
                key={idx}
                className={task.status === 'optimistic' ? 'opacity-50' : ''}
            >
              {task.text}
            </li>
        ))}
      </ul>
  );
}
