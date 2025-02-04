import * as ReactQuery from '@tanstack/react-query';

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 15 * 1000, // 15s
      gcTime: 15 * 60 * 1000, // 15min; garbage collection time
    },
  },
});

export default queryClient;