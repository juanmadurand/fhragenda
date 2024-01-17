'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
