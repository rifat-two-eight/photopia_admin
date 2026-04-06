export interface MetricWithChange {
    amount?: number;
    count?: number;
    rate?: number;
    hours?: number;
    change: number;
}

export interface MainMetrics {
    gmv: MetricWithChange;
    newBookings: MetricWithChange;
    netRevenue: MetricWithChange;
    conversionRate: MetricWithChange;
    activeCreators: MetricWithChange;
    activeCustomers: MetricWithChange;
    supportTickets: MetricWithChange;
    avgResponseTime: MetricWithChange;
}

export interface TrendingItem {
    month: string;
    value: number;
}

export interface GeographicPerformanceItem {
    city: string;
    bookings: number;
    revenue: number | string;
    growth: number | string;
}

export interface MarketplaceHealth {
    creatorCustomerRatio: string;
    matchRate: number;
    avgProjectValue: number;
    completionRate: number;
}

export interface CountryRankingItem {
    country: string;
    revenue: number | string;
    growth: number | string;
    rankCurrent: number;
    rankPrev1: number;
    rankPrev2: number;
}

export interface AcquisitionChannelItem {
    channel: string;
    users: number;
    cac: number;
}

export interface RetentionEngagement {
    intervals: string[];
    retentionRate: number[];
    usageFrequency: number[];
}

export interface DetailedDashboardStats {
    mainMetrics: MainMetrics;
    gmvTrending: TrendingItem[];
    netRevenueTrending: TrendingItem[];
    geographicPerformance: GeographicPerformanceItem[];
    marketplaceHealth: MarketplaceHealth;
    countryRanking: CountryRankingItem[];
    acquisitionByChannel: AcquisitionChannelItem[];
    retentionEngagement: RetentionEngagement;
}

export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}
