import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Grid,
  Container,
  Paper,
  CircularProgress,
  Button,
  Typography,
} from '@mui/material';

import UserMenu from '@/app/components/UserMenu';
import ContactForm from '@/app/components/ContactForm';

export default function MainLayout({ children }) {
  const [showForm, setShowForm] = useState(false);
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <CircularProgress />;
  }
  console.log('user', user);
  if (!user) {
    return (
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Contacts App
          </Typography>
          <Button href="/api/auth/login" variant="contained">
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <UserMenu onCreate={() => setShowForm(true)} />
        </Grid>
        <Grid item xs={12} sm={9}>
          {showForm ? (
            <Paper sx={{ maxWidth: 680, p: 2 }}>
              <ContactForm onBack={() => setShowForm(false)} />
            </Paper>
          ) : (
            children
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
