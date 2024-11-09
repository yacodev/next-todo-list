//export const dynamic = 'auto';

import prisma from '@/app/lib/prisma';
import React from 'react';
import { TodosGrid, NewTodo } from '@/todos';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Todos list',
  description: 'SEO Title',
};

export default async function ResTodoPage() {
  const user = await getUserSessionServer();
  if (!user) {
    redirect('/api/auth/signin');
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
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
