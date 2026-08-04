export type SubscriptionStatus = 'Active' | 'Cancelled' | 'Expired';

export interface SubscriptionStat {
    label: string;
    value: string;
    change?: string;
    count?: string;
    subtext?: string;
    icon?: string;
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
    userId?: string;
    name: string;
    email: string;
    plan: string;
    status: SubscriptionStatus | string;
    startDate: string;
    nextBilling: string;
    totalRevenue: string | number;
    avatar?: string;
    profile?: string;
}

export interface SubscriptionStatsApiResponse {
    totalProvider: {
        count: number;
        percentageChange: number;
    };
    monthlyRevenue: {
        amount: number;
        percentageChange: number;
    };
    premiumSubscribers: {
        count: number;
        pricePerMonth: number;
    };
    noSubscribers: {
        count: number;
    };
    subscriberGrowth: {
        months: string[];
        premium: number[];
        noSubscription: number[];
    };
    revenueDistribution: {
        premium: number;
        noSubscription: number;
    };
    activePlan: {
        id?: string;
        name: string;
        price: number;
        features: string[];
        subscribers: number;
        monthlyRevenue: number;
    };
}
