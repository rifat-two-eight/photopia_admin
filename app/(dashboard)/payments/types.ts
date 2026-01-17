export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
export type TransactionType = 'Payment' | 'Subscription' | 'Refund';

export interface PaymentStat {
    label: string;
    value: string;
    change?: string; // e.g. "+12.3%"
    trend?: 'up' | 'down' | 'neutral';
    subtext?: string;
    chartData?: { value: number }[]; // For sparklines
}

export interface PaymentHistoryItem {
    status: string; // "Payment initiated", "Payment processing"
    date: string;
    amount: string;
}

export interface Transaction {
    id: string; // TXN-001
    user: string;
    userEmail?: string;
    type: TransactionType;
    amount: string; // €249.00
    commission: string; // €12.45
    date: string;
    status: TransactionStatus;

    // Detail view fields
    paymentMethod?: string; // Credit Card ****4242
    cardHolder?: string;
    expiry?: string;
    invoiceNumber?: string;

    serviceDetails?: {
        type: string; // Wedding Photography
        date: string;
        location: string;
        duration: string;
    };

    breakdown?: {
        baseAmount: string;
        commissionRate: string; // 5.0%
        commissionAmount: string;
        providerReceives: string;
    };

    history?: PaymentHistoryItem[];
}
