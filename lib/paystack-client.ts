export interface PaystackConfig {
  publicKey: string;
}

export class PaystackClient {
  private config: PaystackConfig;

  constructor(config: PaystackConfig) {
    this.config = config;
  }

  async loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Paystack can only be loaded in browser'));
        return;
      }

      if ((window as any).PaystackPop) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  }

  async initializePayment(config: {
    email: string;
    amount: number;
    reference: string;
    onSuccess: (reference: any) => void;
    onCancel: () => void;
  }): Promise<void> {
    await this.loadScript();

    const handler = (window as any).PaystackPop.setup({
      key: this.config.publicKey,
      email: config.email,
      amount: Math.round(config.amount * 100),
      ref: config.reference,
      onClose: config.onCancel,
      callback: (response: any) => {
        config.onSuccess(response);
      },
    });

    handler.openIframe();
  }
}

export const paystackClient = new PaystackClient({
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
});
