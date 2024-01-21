import { Grid, IconButton, Paper, TextField } from '@mui/material';
import { useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoadingButton } from '@mui/lab';
import { useSWRConfig } from 'swr';

function ContactForm({ onBack }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          test_bro: 123,
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
    <Paper component="form" sx={{ maxWidth: 680, p: 2 }} onSubmit={handleSubmit}>
      <IconButton onClick={onBack} aria-label="back">
        <ArrowBackIosIcon />
      </IconButton>
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
          loading={loading}>
          Add Contact
        </LoadingButton>
      </Grid>
    </Paper>
  );
}

export default ContactForm;
