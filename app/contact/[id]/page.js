'use client';

import { useContact } from '@/app/utils/hooks';
import { Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import ContactAvatar from '@/app/components/ContactAvatar';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ContactDetails from '@/app/components/ContactDetails';
import ContactHistory from '@/app/components/ContactHistory';

export default function ContactPage({ params }) {
  const { contact, isLoading } = useContact(params.id);

  const router = useRouter();

  const renderBody = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (!contact) {
      return 'Not found';
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ContactAvatar contact={contact} size={60} />

          <Typography variant="h5" sx={{ ml: 2 }}>
            {contact.first_name} {contact.last_name}
          </Typography>
        </Box>
        <ContactDetails contact={contact} />

        <ContactHistory contact={contact} />
      </Box>
    );
  };

  return (
    <Paper square={false} variant="outlined" sx={{ p: 3 }}>
      <IconButton onClick={() => router.push('/')} aria-label="back">
        <ArrowBackIosIcon />
      </IconButton>
      {renderBody()}
    </Paper>
  );
}
