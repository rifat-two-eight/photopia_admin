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
    [key: string]: string | number | undefined;
}

export interface BookingStatus {
    status: string;
    count: number;
    percentage: number;
}

export interface ConversionMetrics {
    months: string[];
    bookings: number[];
    conversionRate: number[];
    profileViews: number[];
    totalProfileViews: number;
    totalBookings: number;
    averageConversionRate: number;
}

export interface ServiceBreakdownItem {
    serviceType: string;
    bookings: number;
    avgPrice: number;
    grossRevenue: number;
    commission: number;
    netRevenue: number;
}

export interface TopProviderItem {
    rank: number;
    name: string;
    bookings: number;
    rating: number;
    revenue: number;
    country: string;
}

export interface GrowthServiceItem {
    name: string;
    bookings: number;
    growthPercentage: number;
}

export interface AdvancedAnalyticsResponse {
    summary: {
        totalBookings: { count: number; percentageChange: number };
        grossRevenue: { amount: number; percentageChange: number };
        netRevenue: { amount: number; percentageChange: number; commission: number };
        conversionRate: { rate: number; percentageChange: number };
    };
    breakdownByService: ServiceBreakdownItem[];
    revenueTrends: {
        months: string[];
        categories: { name: string; data: number[] }[];
    };
    bookingStatusDistribution: BookingStatus[];
    profileToBookingConversion: ConversionMetrics;
    topPerformingProviders: TopProviderItem[];
    highestGrowthServices: GrowthServiceItem[];
}
