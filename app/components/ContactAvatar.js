import { Avatar } from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function ContactAvatar({ contact, size = 40 }) {
  const name = `${contact.first_name} ${contact.last_name}`;
  return (
    <Avatar sx={{ bgcolor: stringToColor(name), width: size, height: size }}>
      {name.split(' ')[0][0]}
      {name.split(' ')[1][0]}
    </Avatar>
  );
}
