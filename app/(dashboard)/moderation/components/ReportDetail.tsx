import React from 'react';
import { 
  ArrowLeft, AlertTriangle, AlertOctagon, MessageSquare, 
  X, Ban, Archive, CheckCircle, Smartphone 
} from 'lucide-react'; // Smartphone isn't used, but CheckCircle is.
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Report, Priority, Status } from '../types';

interface ReportDetailProps {
  report: Report;
  onBack: () => void;
}

const getPriorityBadgeStyle = (priority: Priority) => {
  switch (priority) {
    case 'High': return 'bg-red-50 text-red-700 hover:bg-red-50 border-red-100';
    case 'Medium': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'Low': return 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100';
    default: return '';
  }
};

const getReportIcon = (type: Report['type']) => {
  switch (type) {
    case 'Fraud':
      return (
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
      );
    case 'Offensive':
      return (
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-amber-500" />
        </div>
      );
    // ... other cases
    default: return null;
  }
};

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, onBack }) => {
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-gray-600 hover:text-gray-900 -ml-2 hover:bg-transparent px-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Content Moderation
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Info Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                {getReportIcon(report.type)}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{report.type} Report</h2>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className={getPriorityBadgeStyle(report.priority)}>
                      {report.priority} Priority
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
                      {report.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Report Description</p>
                  <p className="text-sm text-gray-900">{report.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported User</p>
                    <p className="text-sm font-medium text-gray-900">{report.reportedUser}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported By</p>
                    <p className="text-sm font-medium text-gray-900">{report.reportedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Report Date</p>
                    <p className="text-sm font-medium text-gray-900">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Report ID</p>
                    <p className="text-sm font-medium text-gray-900">{report.reportId}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Reported Content</p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600">
                      "Content preview would appear here. This could be text, images, or other media that was reported."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Make Decision Card */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Make Decision</h3>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                <Button className="bg-[#D08700] hover:bg-amber-600 text-white h-auto py-3 flex-col gap-1">
                  <AlertTriangle className="w-5 h-5 mb-1" />
                  <span className="text-xs">Issue Warning</span>
                </Button>
                <Button className="bg-[#F54900] hover:bg-orange-600 text-white h-auto py-3 flex-col gap-1">
                  <X className="w-5 h-5 mb-1" />
                  <span className="text-xs">Remove Content</span>
                </Button>
                <Button className="bg-[#E7000B] hover:bg-red-700 text-white h-auto py-3 flex-col gap-1">
                  <AlertOctagon className="w-5 h-5 mb-1" />
                  <span className="text-xs">Block User</span>
                </Button>
                <Button className="bg-[#4B5563] hover:bg-gray-700 text-white h-auto py-3 flex-col gap-1">
                  <Archive className="w-5 h-5 mb-1" />
                  <span className="text-xs">Archive</span>
                </Button>
              </div>

              <Button className="w-full bg-[#00A040] hover:bg-emerald-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                No Action Required - Close Report
              </Button>
            </CardContent>
          </Card>

          {/* Moderation Log */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">Moderation Log</h3>
              <div className="relative pl-2 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
                {report.logs?.map((log, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full z-10 box-content -ml-[3.5px]">
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1.5" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5">By: {log.by}</p>
                        {log.detail && (
                          <p className="text-sm text-gray-500 mt-2">{log.detail}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{log.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* User History */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-6">User History</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Reports</p>
                  <p className="text-xl font-medium text-gray-900">{report.userHistory.totalReports}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Warnings Issued</p>
                  <p className="text-xl font-medium text-orange-500">{report.userHistory.warningsIssued}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Age</p>
                  <p className="text-lg font-medium text-gray-900">{report.userHistory.accountAge}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Status</p>
                  <p className="text-lg font-medium text-green-600">{report.userHistory.accountStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Reports */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Related Reports</h3>
              <div className="space-y-3">
                {report.relatedReports?.map((related, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-medium text-gray-900">Similar content</span>
                       <span className="text-xs text-gray-500">{related.date}</span>
                    </div>
                    <Badge variant="secondary" className={
                      related.status === 'resolved' ? 'bg-green-50 text-green-700' : 
                      related.status === 'warning issued' ? 'bg-green-50 text-green-700' : ''
                    }>
                      {related.status === 'warning issued' ? 'warning issued' : 'resolved'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex gap-4 flex-col">
                <Button className="w-full bg-[#1C1C1E] hover:bg-gray-800 text-white">
                Contact Reporter
              </Button>
              <Button className="w-full bg-white border border-gray-600 hover:bg-gray-200 text-black">
                Contact Provider
              </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
