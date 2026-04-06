export type TransactionStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';
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
export interface PaymentStatsApiResponse {
    totalRevenue: {
        amount: number;
        percentageChange: number;
    };
    commissionsEarned: {
        amount: number;
        averageRate: number;
    };
    subscriptions: {
        amount: number;
        activeSubscribers: number;
    };
    refunds: {
        amount: number;
        refundRequests: number;
    };
    trends: {
        commissions: number[];
        totalTransactions: number[];
        months: string[];
    };
    categories: {
        category: string;
        amount: number;
    }[];
}
export interface RecentTransactionItem {
    id: string;
    transactionId: string;
    user: {
        id: string;
        name: string;
    };
    type: TransactionType;
    amount: number;
    commission: number;
    date: string;
    status: TransactionStatus;
}

export interface TransactionDetailApiResponse {
    transaction: {
        id: string;
        transactionId: string;
        user: {
            id: string;
            name: string;
        };
        type: TransactionType;
        amount: number;
        commission: number;
        date: string;
        status: TransactionStatus;
        paymentMethod: string;
        baseAmount: number;
        providerReceives: number;
        cardholderName: string;
        expiryDate: string;
        invoiceNumber: string;
    };
    paymentHistory: {
        status: string;
        amount: number;
        timestamp: string;
    }[];
    commissionSummary: {
        platformFee: number;
        earnings: number;
    };
    serviceDetails: {
        type: string;
        date: string;
        location: string;
        duration: string;
    };
}
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface TransactionsResponse {
    success: boolean;
    data: RecentTransactionItem[];
    meta: PaginationMeta;
}
