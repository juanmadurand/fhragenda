'use  client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = () => {
  const { user, isLoading } = useUser();

  const handleFetchContacts = async () => {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();

    console.log('contacts', contacts);
  };

  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      {!isLoading && user && <div>Hello {user.name}</div>}
      {!isLoading && !user && <a href="/api/auth/login">Log in</a>}
      {user && (
        <>
          <button type="button" onClick={handleFetchContacts}>
            Fetch contacts
          </button>
          <a href="/api/auth/logout">Logout</a>
        </>
      )}
    </p>
  );
};

export default NavBar;
