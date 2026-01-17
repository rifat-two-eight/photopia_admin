export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Under Review' | 'Resolved';

export interface ModerationStat {
    label: string;
    value: string;
    color?: string; // For the value color (e.g. red for Pending)
}

export interface ActivityLog {
    id: string;
    action: string;
    by: string;
    detail?: string;
    date: string;
}

export interface RelatedReport {
    id: string;
    reason: string;
    date: string;
    status: 'resolved' | 'warning issued' | 'pending';
}

export interface Report {
    id: string;
    type: 'Fraud' | 'Offensive' | 'Spam' | 'Other';
    priority: Priority;
    status: Status;
    description: string; // "User is requesting payments..."
    reportedUser: string;
    reportedBy: string;
    date: string;
    reportId: string; // e.g. #RPT-001
    contentPreview?: string;
    userHistory: {
        totalReports: number;
        warningsIssued: number;
        accountAge: string;
        accountStatus: 'Active' | 'Suspended' | 'Banned';
    };
    relatedReports?: RelatedReport[];
    logs?: ActivityLog[];
}
