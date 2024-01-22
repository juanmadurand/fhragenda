import { useState } from 'react';
import { useContacts, useIsMobile } from '@/app/utils/hooks';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, IconButton } from '@mui/material';
import { Delete, Print } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import ContactAvatar from './ContactAvatar';

export default function ContactList() {
  const [page, setPage] = useState(0);
  const [hoveredId, setHovered] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { contacts, isLoading, error } = useContacts();
  const router = useRouter();
  const isMobile = useIsMobile();

  const { mutate } = useSWRConfig();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    // TODO: Replace with a modal
    if (!window.confirm('Are you sure?')) {
      return;
    }

    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      mutate('/api/contacts');
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          onMouseLeave={() => setHovered(null)}
          stickyHeader
          data-cy="contacts-table"
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Name</TableCell>
              <TableCell style={{ minWidth: 170 }}>Email</TableCell>
              <TableCell style={{ minWidth: 170 }}>Phone</TableCell>
              <TableCell style={{ width: 100 }}>
                <IconButton onClick={() => window.print()}>
                  <Print />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.length === 0 && (
              <TableRow>
                <TableCell data-cy="contacts-empty" colSpan={4}>
                  No contacts yet
                </TableCell>{' '}
              </TableRow>
            )}

            {contacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(contact => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    onMouseEnter={() => setHovered(contact.id)}
                    onMouseLeave={() => console.log('out')}
                    onClick={() => router.push(`/contact/${contact.id}`)}
                    data-cy="contact-row"
                    key={contact.email}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ContactAvatar contact={contact} />

                        <Box sx={{ ml: 2 }}>
                          {contact.first_name} {contact.last_name}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          visibility:
                            isMobile || hoveredId === contact.id ? 'visible' : 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <IconButton
                          sx={{ color: red[400] }}
                          onClick={e => handleDelete(e, contact.id)}
                          data-cy="contact-delete">
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
