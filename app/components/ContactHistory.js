import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, Paper, Typography } from '@mui/material';
import { useContactHistory } from '../utils/hooks';
import { indigo } from '@mui/material/colors';

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
        <Box key={h.id}>
          On {h.created_at}, {h.field} changed from {h.old_value} to {h.new_value}
        </Box>
      ))}
    </Paper>
  );
}
