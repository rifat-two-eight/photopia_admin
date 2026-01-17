import React from 'react';
import { Eye, AlertTriangle, MessageSquare, AlertOctagon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Report, Priority, Status } from '../types';

interface ReportListProps {
  reports: Report[];
  onReview: (report: Report) => void;
}

const getPriorityBadgeStyle = (priority: Priority) => {
  switch (priority) {
    case 'High': return 'bg-red-50 text-red-700 hover:bg-red-50 border-red-100';
    case 'Medium': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'Low': return 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100';
    default: return '';
  }
};

const getStatusBadgeStyle = (status: Status) => {
  if (status === 'Pending') return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
  return '';
};

const getReportIcon = (type: Report['type']) => {
  switch (type) {
    case 'Fraud':
      return (
        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>
      );
    case 'Offensive':
      return (
        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-amber-500" />
        </div>
      );
    case 'Spam':
      return (
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-500" />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
          <AlertOctagon className="w-5 h-5 text-gray-500" />
        </div>
      );
  }
};

export const ReportList: React.FC<ReportListProps> = ({ reports, onReview }) => {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {getReportIcon(report.type)}
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-base font-semibold text-gray-900">{report.type} Report</h3>
                  <Badge variant="secondary" className={`font-medium ${getPriorityBadgeStyle(report.priority)}`}>
                    {report.priority} Priority
                  </Badge>
                  <Badge variant="secondary" className={`font-medium ${getStatusBadgeStyle(report.status)}`}>
                    {report.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">
                  {report.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported User</p>
                    <p className="font-medium text-gray-900">{report.reportedUser}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported By</p>
                    <p className="font-medium text-gray-900">{report.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{report.date}</p>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Button 
                  onClick={() => onReview(report)}
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
