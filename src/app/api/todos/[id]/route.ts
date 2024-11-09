import prisma from '@/app/lib/prisma';
import { getUserSessionServer } from '@/auth/actions/auth-actions';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string) => {
  const user = await getUserSessionServer();
  if (!user) {
    return null;
  }
  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });
  if (todo?.userId !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);
  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
  }

  try {
    const { completed, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        completed,
        description,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
