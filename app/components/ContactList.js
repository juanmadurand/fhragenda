import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, IconButton } from '@mui/material';

import { useContacts } from '@/app/utils/hooks';
import { stringAvatar } from '../utils/ui';
import { Delete, Edit } from '@mui/icons-material';
import { useSWRConfig } from 'swr';
import { blue, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

export default function ContactList() {
  const [page, setPage] = useState(0);
  const [hoveredId, setHovered] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { contacts, isLoading, error } = useContacts();
  const router = useRouter();

  const { mutate } = useSWRConfig();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleDelete = async id => {
    // setLoading(true);
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      mutate('/api/contacts');
    } catch (err) {
      console.log('err', err);
      // setLoading(false);
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
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 170 }}>Name</TableCell>
              <TableCell style={{ minWidth: 170 }}>Email</TableCell>
              <TableCell style={{ minWidth: 170 }}>Phone</TableCell>
              <TableCell style={{ width: 100 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    onMouseEnter={() => setHovered(row.id)}
                    onMouseLeave={() => console.log('out')}
                    onClick={() => router.push(`/contact/${row.id}`)}
                    key={row.email}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar {...stringAvatar(`${row.first_name} ${row.last_name}`)} />

                        <Box sx={{ ml: 2 }}>
                          {row.first_name} {row.last_name}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          visibility: hoveredId === row.id ? 'visible' : 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <IconButton sx={{ color: blue[400] }}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ color: red[400] }}
                          onClick={() => handleDelete(row.id)}>
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
