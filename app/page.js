'use client';

import UserMenu from '@/app/components/UserMenu';
import ContactList from '@/app/components/ContactList';

import { Grid, Container } from '@mui/material';
import { useState } from 'react';
import ContactForm from './components/ContactForm';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const renderMain = () => {
    if (showForm) {
      return <ContactForm onBack={() => setShowForm(false)} />;
    }

    return <ContactList />;
  };

  return (
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
  );
}
