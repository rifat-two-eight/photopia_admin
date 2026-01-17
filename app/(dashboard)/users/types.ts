export interface Activity {
    type: string;
    detail: string;
    date: string;
}

export interface Payment {
    service: string;
    date: string;
    amount: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Premium' | 'User' | 'Provider';
    roleColor: 'yellow' | 'blue' | 'purple';
    status: 'Active' | 'Inactive' | 'Suspended';
    statusColor: 'green' | 'gray' | 'red';
    joinDate: string;
    activity: string;
    phone?: string;
    location?: string;
    totalRevenue?: string;
    completedJobs?: number;
    avgRating?: number;
    responseTime?: string;
    activityHistory?: Activity[];
    recentPayments?: Payment[];
}

export interface Stat {
    label: string;
    value: string;
    highlight?: boolean;
}
