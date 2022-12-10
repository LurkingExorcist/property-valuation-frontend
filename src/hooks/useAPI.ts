import { useCallback, useState } from 'react';

import { useErrorHandler } from './useErrorHandler';

export const useAPI = <T>(request: () => Promise<T>, initialValue?: T) => {
  const [data, setData] = useState<T | undefined>(initialValue);
  const [isPending, setIsPending] = useState(false);
  const handleError = useErrorHandler();

  const callAPI = useCallback(async () => {
    try {
      setIsPending(true);

      const result = await request();

      setData(result);

      return result;
    } catch (error) {
      handleError(error);
    } finally {
      setIsPending(false);
    }
  }, [request, handleError]);

  const resetState = useCallback(() => {
    setIsPending(false);
    setData(undefined);
  }, []);

  return {
    callAPI,
    resetState,
    isPending,
    data,
  };
};
