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

  const BackBtn = (
    <IconButton onClick={() => router.push('/')} aria-label="back">
      <ArrowBackIosIcon />
    </IconButton>
  );

  const renderBody = () => {
    if (isLoading) {
      return (
        <Box>
          {BackBtn}
          <CircularProgress />
        </Box>
      );
    }

    if (!contact) {
      return (
        <Box>
          {BackBtn}
          Not Found
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {BackBtn}
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
      {renderBody()}
    </Paper>
  );
}
