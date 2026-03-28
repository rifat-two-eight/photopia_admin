export type Priority = 'High' | 'Medium' | 'Low' | 'low' | 'medium' | 'high';
export type Status = 'Pending' | 'Under Review' | 'Resolved' | 'pending' | 'under_review' | 'resolved';

export interface ModerationReportItem {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    reportedUser: {
        id: string;
        name: string;
    };
    reportedBy: {
        id: string;
        name: string;
    };
    date: string;
}

export interface ModerationReportDetailResponse {
    report: {
        id: string;
        reportId: string;
        title: string;
        description: string;
        priority: Priority;
        status: Status;
        reportedUser: {
            id: string;
            name: string;
        };
        reportedBy: {
            id: string;
            name: string;
        };
        date: string;
        reportedContent: string;
    };
    userHistory: {
        totalReports: number;
        warningsIssued: number;
        accountAge: string;
        accountStatus: string;
    };
    relatedReports: any[];
    moderationLog: {
        action: string;
        by: string;
        details: string;
        timestamp: string;
    }[];
}

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
export interface ModerationStatsApiResponse {
    pendingReports: number;
    underReview: number;
    resolvedToday: number;
    totalReports: number;
}
