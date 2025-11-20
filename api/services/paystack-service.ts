import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

interface InitializeTransactionRequest {
  email: string;
  amount: number;
  reference: string;
  callback_url?: string;
  metadata?: any;
}

interface InitializeTransactionResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface VerifyTransactionResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    status: 'success' | 'failed' | 'abandoned';
    paid_at: string;
    channel: string;
    currency: string;
    metadata?: any;
  };
}

export class PaystackService {
  private static async makeRequest(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: any
  ): Promise<any> {
    const url = `${PAYSTACK_BASE_URL}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Paystack API error');
    }

    return data;
  }

  static async initializeTransaction(
    request: InitializeTransactionRequest
  ): Promise<InitializeTransactionResponse> {
    const amountInKobo = Math.round(request.amount * 100);

    const payload = {
      email: request.email,
      amount: amountInKobo,
      reference: request.reference,
      callback_url: request.callback_url,
      metadata: request.metadata,
    };

    return this.makeRequest('/transaction/initialize', 'POST', payload);
  }

  static async verifyTransaction(reference: string): Promise<VerifyTransactionResponse> {
    return this.makeRequest(`/transaction/verify/${reference}`);
  }

  static verifyWebhookSignature(payload: string, signature: string): boolean {
    const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET || '';
    const hash = crypto
      .createHmac('sha512', webhookSecret)
      .update(payload)
      .digest('hex');

    return hash === signature;
  }

  static async createTransferRecipient(
    accountNumber: string,
    bankCode: string,
    name: string
  ): Promise<any> {
    const payload = {
      type: 'nuban',
      name,
      account_number: accountNumber,
      bank_code: bankCode,
      currency: 'NGN',
    };

    return this.makeRequest('/transferrecipient', 'POST', payload);
  }

  static async initiateTransfer(
    recipientCode: string,
    amount: number,
    reason: string,
    reference: string
  ): Promise<any> {
    const amountInKobo = Math.round(amount * 100);

    const payload = {
      source: 'balance',
      amount: amountInKobo,
      recipient: recipientCode,
      reason,
      reference,
    };

    return this.makeRequest('/transfer', 'POST', payload);
  }

  static async createSubscription(
    customerEmail: string,
    planCode: string,
    authorization: string
  ): Promise<any> {
    const payload = {
      customer: customerEmail,
      plan: planCode,
      authorization,
    };

    return this.makeRequest('/subscription', 'POST', payload);
  }

  static async disableSubscription(
    subscriptionCode: string,
    emailToken: string
  ): Promise<any> {
    const payload = {
      code: subscriptionCode,
      token: emailToken,
    };

    return this.makeRequest('/subscription/disable', 'POST', payload);
  }
}
