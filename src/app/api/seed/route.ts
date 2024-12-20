import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Buy some milk', completed: true },
          { description: 'Pick up the kids' },
          { description: 'Do the laundry' },
        ],
      },
    },
  });

  /* await prisma.todo.createMany({
    data: [
      { description: 'Buy some milk', completed: true },
      { description: 'Pick up the kids' },
      { description: 'Do the laundry' },
    ],
  }); */

  return NextResponse.json({ message: 'seed executed' });
}
