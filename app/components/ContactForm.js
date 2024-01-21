import { Grid, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoadingButton } from '@mui/lab';
import { useSWRConfig } from 'swr';

function ContactForm({ onBack, contact }) {
  const isEdition = !!contact;
  const [firstName, setFirstName] = useState(contact?.first_name || '');
  const [lastName, setLastName] = useState(contact?.last_name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact' + (isEdition ? `/${contact.id}` : ''), {
        method: isEdition ? 'PUT' : 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        }),
      });

      mutate('/api/contacts');
      onBack();
    } catch (err) {
      console.log('err', err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isEdition && (
        <IconButton onClick={onBack} aria-label="back">
          <ArrowBackIosIcon />
        </IconButton>
      )}
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextField
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          {' '}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="tel"
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            fullWidth
            required
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
          sx={{ mt: 2 }}
          fullWidth>
          {isEdition ? 'Edit' : 'Add'} Contact
        </LoadingButton>
      </Grid>
    </form>
  );
}

export default ContactForm;
