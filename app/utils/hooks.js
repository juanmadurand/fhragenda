import { useMediaQuery } from '@mui/material';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useContacts = () => {
  const { data, error, isLoading } = useSWR('/api/contacts', fetcher);

  return { contacts: data?.length ? data : [], error: error || data?.error, isLoading };
};

export const useContact = id => {
  const { data, error: errorMsg, isLoading } = useSWR(`/api/contact/${id}`, fetcher);

  const error = errorMsg || data?.error;

  return { contact: !error && data, error, isLoading };
};

export const useContactHistory = id => {
  const { data, error, isLoading } = useSWR(`/api/contact/${id}/history`, fetcher);

  return { events: data?.length ? data : [], error: error || data?.error, isLoading };
};

export const useIsMobile = () => useMediaQuery('(max-width:600px)');
