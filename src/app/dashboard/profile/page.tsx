'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('Profilepage');
  }, []);

  return (
    <div>
      <h1> Page profile</h1>
      <hr />
      <div className='flex flex-col'>
        <span> {session?.user?.name ?? 'no name'}</span>
        <span>{session?.user?.email ?? 'no email'}</span>
        <span>{session?.user?.image ?? 'no image'}</span>
        <span>{session?.user?.id ?? 'no UUID'}</span>
        <span>{session?.user?.roles?.join(',') ?? 'no -roles'}</span>
      </div>
    </div>
  );
}
