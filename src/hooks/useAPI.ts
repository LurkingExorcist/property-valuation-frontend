import { useState } from 'react';

export const useAPI = <T>(request: () => Promise<T>) => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(false);

  const callAPI = async () => {
    try {
      setIsPending(true);

      const result = await request();

      setData(result);

      return result;
    } finally {
      setIsPending(false);
    }
  };

  const resetState = () => {
    setIsPending(false);
    setData(undefined);
  };

  return {
    callAPI,
    resetState,
    isPending,
    data,
  };
};
