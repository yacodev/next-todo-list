import React from 'react';
import { WidgetItem } from '@/components';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log('session', session);

  if (!session) {
    redirect('./api/auth/signin');
  }

  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      <WidgetItem title='user connected server side'>
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.email}</span>

          <div>{JSON.stringify(session)}</div>
        </div>
      </WidgetItem>
    </div>
  );
}
