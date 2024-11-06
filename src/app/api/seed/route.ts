import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: 'Buy some milk', completed: true },
      { description: 'Pick up the kids' },
      { description: 'Do the laundry' },
    ],
  });

  return NextResponse.json({ message: 'seed executed' });
}
