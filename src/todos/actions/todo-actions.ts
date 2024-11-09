'use server';

import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getUserSessionServer } from '@/auth/actions/auth-actions';

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const user = await getUserSessionServer();

  if (!user) {
    throw new Error('User not found');
  }
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        userId: user.id,
      },
    });
    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({
    where: {
      completed: true,
    },
  });

  revalidatePath('/dashboard/server-todos');
};
