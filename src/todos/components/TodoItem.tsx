'use client';

import { Todo } from '@prisma/client';
import { startTransition, useOptimistic } from 'react';
import styles from './Todo.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface TodoItemProps {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      //toggleTodoOptimistic(!todoOptimistic.completed);
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      console.error('Error toggling todo', error);
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed));
    }
  };
  return (
    <div
      className={
        todoOptimistic.completed ? styles.todoDone : styles.todoPending
      }
    >
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
        <div
          onClick={() =>
            //toggleTodo(todoOptimistic.id, !todoOptimistic.completed)
            onToggleTodo()
          }
          className={`
            flex p-2 rounded-md cursor-pointer
            hover:bg-opacity-60
            ${todoOptimistic.completed ? 'bg-blue-100' : 'bg-red-100'}
          `}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className='text-center sm:text-left'>
          {todoOptimistic.description}
        </div>
      </div>
    </div>
  );
};
