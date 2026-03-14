export interface Activity {
    type: string;
    message: string;
    timestamp: string;
}

export interface Payment {
    service?: string;
    date?: string;
    amount?: string;
    // The current API returns an empty array, so we keep it flexible
}

export interface User {
    _id: string;
    name: string;
    email: string;
    profile: string;
    phone: string;
    interest: string[];
    status: 'active' | 'inactive' | 'suspended';
    verified: boolean;
    location: {
        type: string;
        coordinates: number[];
    };
    subscribe: boolean;
    isStripeConnected: boolean;
    trialUsed: boolean;
    roles: string[];
    activeRole: string;
    timezone: string;
    isOnboardingComplete: boolean;
    settings: {
        pushNotification: boolean;
        emailNotification: boolean;
        locationService: boolean;
        profileStatus: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface UserDetailStats {
    user: {
        id: string;
        name: string;
        email: string;
        profile: string;
        phone: string;
        address: string;
        status: 'active' | 'inactive' | 'suspended';
        joinedDate: string;
    };
    statistics: {
        totalRevenue: number;
        completedJobs: number;
        averageRating: number;
        responseTime: string;
    };
    activityHistory: Activity[];
    recentPayments: Payment[];
}

export interface Stat {
    label: string;
    value: string | number;
    highlight?: boolean;
}

export interface UserStatsResponse {
    success: boolean;
    message: string;
    data: {
        totalUsers: number;
        providers: number;
        activeThisMonth: number;
        suspended: number;
    };
}

export interface UsersResponse {
    success: boolean;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: User[];
}

export interface UserDetailStatsResponse {
    success: boolean;
    message: string;
    data: UserDetailStats;
}
