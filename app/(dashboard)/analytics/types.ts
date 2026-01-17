export interface AnalyticsStat {
    label: string;
    value: string;
    change: string;
    positive: boolean;
    icon?: 'calendar' | 'dollar' | 'trend' | 'target';
}

export interface ServiceData {
    type: string;
    bookings: number;
    avgPrice: string;
    grossRevenue: string;
    commission: string;
    netRevenue: string;
}

export interface ProviderPerformance {
    rank: number;
    name: string;
    bookings: number;
    rating: number;
    earnings: string;
}

export interface GrowthService {
    name: string;
    bookings: number;
    growth: string;
}

export interface MonthData {
    month: string;
    Wedding?: number;
    Portrait?: number;
    Event?: number;
    Commercial?: number;
    Product?: number;
    RealEstate?: number;
}
