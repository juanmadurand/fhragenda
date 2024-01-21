import { Box, IconButton, Paper, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import { useState } from 'react';
import { Close, Edit } from '@mui/icons-material';
import { indigo } from '@mui/material/colors';
import ContactForm from './ContactForm';
import { useSWRConfig } from 'swr';

const ContactField = ({ icon, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
      {icon}
      <Box sx={{ ml: 2 }}>{children}</Box>
      {hovered && 'hv'}
    </Box>
  );
};

export default function ContactDetails({ contact }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { mutate } = useSWRConfig();
  const renderBody = () => {
    if (showEditForm) {
      return (
        <Box sx={{ my: 2 }}>
          <ContactForm
            contact={contact}
            onBack={() => {
              mutate(`/api/contact/${contact.id}`);
              mutate(`/api/contact/${contact.id}/history`);
              setShowEditForm(false);
            }}
          />
          <IconButton
            sx={{ position: 'absolute', right: 10, top: 10 }}
            onClick={() => setShowEditForm(false)}>
            <Close />
          </IconButton>
        </Box>
      );
    }

    return (
      <>
        <ContactField icon={<BadgeIcon />}>
          {contact.first_name} {contact.last_name}
        </ContactField>
        <ContactField icon={<EmailIcon />}>{contact.email}</ContactField>
        <ContactField icon={<PhoneIcon />}>{contact.phone}</ContactField>

        <IconButton
          sx={{ position: 'absolute', right: 10, top: 10 }}
          onClick={() => setShowEditForm(true)}>
          <Edit />
        </IconButton>
      </>
    );
  };

  return (
    <Paper
      square={false}
      sx={{
        mt: 2,
        py: 1,
        px: 2,
        backgroundColor: indigo[50],
        position: 'relative',
        maxWidth: 480,
      }}>
      <Typography variant="h6">Contact details</Typography>
      {renderBody()}
    </Paper>
  );
}
