import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useContacts = () => {
  const { data, error, isLoading } = useSWR('/api/contacts', fetcher);

  return { contacts: data?.length ? data : [], error: error || data?.error, isLoading };
};

export const useContact = id => {
  const { data, error, isLoading } = useSWR(`/api/contact/${id}`, fetcher);

  return { contact: data, error: error || data?.error, isLoading };
};

export const useContactHistory = id => {
  const { data, error, isLoading } = useSWR(`/api/contact/${id}/history`, fetcher);

  return { events: data?.length ? data : [], error: error || data?.error, isLoading };
};
