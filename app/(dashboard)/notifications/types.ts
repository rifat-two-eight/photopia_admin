export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'user' | 'report' | 'payment' | 'subscription' | 'alert' | 'success';
    isUnread: boolean;
}

export interface NotificationStat {
    label: string;
    value: number;
    icon: 'user' | 'flag' | 'card' | 'crown';
}
