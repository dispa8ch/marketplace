'use client';

import { useState } from 'react';
import { paystackClient } from '../paystack-client';

interface UsePaystackOptions {
  email: string;
  amount: number;
  reference: string;
  onSuccess: (reference: any) => void;
  onCancel?: () => void;
}

export function usePaystack() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (options: UsePaystackOptions) => {
    try {
      setIsLoading(true);
      setError(null);

      await paystackClient.initializePayment({
        email: options.email,
        amount: options.amount,
        reference: options.reference,
        onSuccess: options.onSuccess,
        onCancel: () => {
          setIsLoading(false);
          options.onCancel?.();
        },
      });
    } catch (err: any) {
      setError(err.message || 'Payment initialization failed');
      setIsLoading(false);
    }
  };

  return {
    initializePayment,
    isLoading,
    error,
  };
}
