import { useState } from 'react';

import { ApiError } from '@/lib';

export const useAPI = <T>(request: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const callAPI = async () => {
    try {
      setIsPending(true);

      const result = await request();

      setData(result);
      setIsPending(false);

      return result;
    } catch (error) {
      setError(ApiError.fromError(error));

      throw error;
    }
  };

  const resetState = () => {
    setError(null);
    setIsPending(false);
    setData(undefined);
  };

  return {
    callAPI,
    resetState,
    isPending,
    error,
    data,
  };
};
