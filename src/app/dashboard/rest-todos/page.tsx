import prisma from '@/app/lib/prisma';
import React from 'react';
import { TodosGrid, NewTodo } from '@/todos';

export const metadata = {
  title: 'Todos list',
  description: 'SEO Title',
};

export default async function ResTodoPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: 'asc',
    },
  });

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
