import React from 'react';
import { Eye, AlertTriangle, MessageSquare, AlertOctagon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ModerationReportItem, Priority, Status } from '../types';
import { Skeleton } from '@/components/ui/skeleton';

interface ReportListProps {
  reports: ModerationReportItem[];
  onReview: (reportId: string) => void;
  loading?: boolean;
}

const getPriorityBadgeStyle = (priority: Priority) => {
  const p = priority.toLowerCase();
  switch (p) {
    case 'high': return 'bg-red-50 text-red-700 hover:bg-red-50 border-red-100';
    case 'medium': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'low': return 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100';
    default: return '';
  }
};

const getStatusBadgeStyle = (status: Status) => {
  const s = status.toLowerCase();
  switch (s) {
    case 'pending': return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
    case 'under_review': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'resolved': return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100';
    default: return '';
  }
};

const formatStatusLabel = (status: Status) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getReportIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('fraud')) {
    return (
      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-500" />
      </div>
    );
  }
  if (t.includes('offensive') || t.includes('report') || t.includes('spam')) {
    return (
      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
        <MessageSquare className="w-5 h-5 text-amber-500" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
      <AlertOctagon className="w-5 h-5 text-gray-500" />
    </div>
  );
};

const formatDate = (isoStr: string) => {
  try {
    return new Date(isoStr).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoStr;
  }
};

export const ReportList: React.FC<ReportListProps> = ({ reports, onReview, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border border-gray-100 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="p-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <p className="text-gray-500">No moderation reports found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {getReportIcon(report.title)}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
                  <Badge variant="secondary" className={`font-medium ${getPriorityBadgeStyle(report.priority)}`}>
                    {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)} Priority
                  </Badge>
                  <Badge variant="secondary" className={`font-medium ${getStatusBadgeStyle(report.status)}`}>
                    {formatStatusLabel(report.status)}
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                  {report.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported User</p>
                    <p className="font-medium text-gray-900">{report.reportedUser.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported By</p>
                    <p className="font-medium text-gray-900">{report.reportedBy.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{formatDate(report.date)}</p>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  onClick={() => onReview(report.id)}
                  className="bg-[#1C1C1E] hover:bg-gray-800 text-white gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

