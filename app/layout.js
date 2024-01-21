'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Head from 'next/head';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <UserProvider>
        <body>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </UserProvider>
    </html>
  );
}
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;
