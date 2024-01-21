'use client';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Head from 'next/head';
import UserMenu from '@/app/components/UserMenu';

import { Grid, Container, Paper } from '@mui/material';
import { useState } from 'react';
import ContactForm from './components/ContactForm';

import './globals.css';

export default function RootLayout({ children }) {
  const [showForm, setShowForm] = useState(false);

  const renderMain = () => {
    if (showForm) {
      return (
        <Paper sx={{ maxWidth: 680, p: 2 }}>
          <ContactForm onBack={() => setShowForm(false)} />
        </Paper>
      );
    }

    return children;
  };

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
          <AppRouterCacheProvider>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <UserMenu onCreate={() => setShowForm(true)} />
                </Grid>
                <Grid item xs={12} sm={10}>
                  {renderMain()}
                </Grid>
              </Grid>
            </Container>
          </AppRouterCacheProvider>
        </body>
      </UserProvider>
    </html>
  );
}
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />;
