import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export const useContacts = () => {
  const { data, error, isLoading } = useSWR('/api/contacts', fetcher);

  return { contacts: data?.length ? data : [], error: error || data?.error, isLoading };
};
