'use  client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
const UserMenu = ({ onCreate }) => {
  const { user, isLoading } = useUser();

  const renderBody = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (!user) {
      return (
        <Button href="/api/auth/login" variant="contained">
          Login
        </Button>
      );
    }

    return (
      <Paper sx={{ p: 2 }}>
        <Typography className="flex-center" variant="h6" gutterBottom>
          <ContactsIcon />
          Contacts
        </Typography>
        <Box>Hello {user.name}</Box>
        <Button onClick={onCreate}>Create contact</Button>
        <Button href="/api/auth/logout" variant="outlined">
          Logout
        </Button>
      </Paper>
    );
  };

  return <Paper>{renderBody()}</Paper>;
};

export default UserMenu;
