import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Chip, Paper, Tooltip, Typography } from '@mui/material';
import { useContactHistory } from '../utils/hooks';
import { grey, indigo } from '@mui/material/colors';
import moment from 'moment';

export default function ContactHistory({ contact }) {
  const { events, isLoading } = useContactHistory(contact.id);

  if (isLoading || !events?.length) {
    return null;
  }

  return (
    <Paper square={false} sx={{ mt: 2, py: 1, px: 2, backgroundColor: indigo[50] }}>
      <Typography variant="h6">
        <CalendarTodayIcon />
        Contact History
      </Typography>
      {events.map(h => (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }} key={h.id}>
          <Tooltip title={`${moment.utc(h.created_at).local().format('l LT')}`}>
            <Chip label={`${moment.utc(h.created_at).local().fromNow(true)} ago`} />
          </Tooltip>
          <Box ml={1}>
            {h.field} changed from{' '}
            <Typography color={grey[600]} variant="subtitle">
              {h.old_value}
            </Typography>{' '}
            to{' '}
            <Typography fontWeight={500} variant="subtitle">
              {h.new_value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}
