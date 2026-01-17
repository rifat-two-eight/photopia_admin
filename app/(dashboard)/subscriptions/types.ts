export type SubscriptionStatus = 'Active' | 'Cancelled' | 'Expired';

export interface SubscriptionStat {
    label: string;
    value: string;
    change?: string;
    count?: string;
    subtext?: string;
    icon?: any; // Lucide icon
    color?: string;
}

export interface PlanFeature {
    id: string;
    text: string;
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    features: PlanFeature[];
    stats: {
        subscribers: number;
        monthlyRevenue: number;
    };
}

export interface Subscriber {
    id: string;
    name: string;
    email: string;
    plan: 'Premium' | 'Basic';
    status: SubscriptionStatus;
    startDate: string;
    nextBilling: string;
    totalRevenue: string;
    avatar?: string;
}
