import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, AlertTriangle, AlertOctagon, MessageSquare, 
  X, Ban, Archive, CheckCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ModerationReportDetailResponse, Priority, Status } from '../types';
import axiosInstance from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';

interface ReportDetailProps {
  reportId: string;
  onBack: () => void;
}

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

const getPriorityBadgeStyle = (priority: Priority) => {
  const p = priority?.toLowerCase();
  switch (p) {
    case 'high': return 'bg-red-50 text-red-700 hover:bg-red-50 border-red-100';
    case 'medium': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'low': return 'bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-100';
    default: return 'bg-gray-50 text-gray-700';
  }
};

const getStatusBadgeStyle = (status: Status) => {
  const s = status?.toLowerCase();
  switch (s) {
    case 'pending': return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
    case 'under_review': return 'bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-100';
    case 'resolved': return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100';
    default: return 'bg-gray-50 text-gray-700';
  }
};

const formatStatusLabel = (status: Status) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getReportIcon = (title: string) => {
  const t = title?.toLowerCase() || '';
  if (t.includes('fraud')) {
    return (
      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
      <MessageSquare className="w-6 h-6 text-amber-500" />
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

export const ReportDetail: React.FC<ReportDetailProps> = ({ reportId, onBack }) => {
  const [data, setData] = useState<ModerationReportDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse<ModerationReportDetailResponse>>(`/dashboard/moderation-reports/${reportId}`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch report details");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred while fetching details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [reportId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-md p-10">
        <p className="text-red-500 font-medium mb-4">{error || "No data found"}</p>
        <Button onClick={onBack} variant="outline">Back to Moderation</Button>
      </div>
    );
  }

  const { report, userHistory, relatedReports, moderationLog } = data;

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
                {getReportIcon(report.title)}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{report.title}</h2>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className={getPriorityBadgeStyle(report.priority)}>
                      {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)} Priority
                    </Badge>
                    <Badge variant="secondary" className={getStatusBadgeStyle(report.status)}>
                      {formatStatusLabel(report.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Report Description</p>
                  <p className="text-sm text-gray-900">{report.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported User</p>
                    <p className="font-medium text-gray-900">{report.reportedUser.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Reported By</p>
                    <p className="font-medium text-gray-900">{report.reportedBy.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Report Date</p>
                    <p className="font-medium text-gray-900">{formatDate(report.date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Report ID</p>
                    <p className="font-medium text-gray-900">{report.reportId}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Reported Content</p>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600">
                      {report.reportedContent || "No content preview available."}
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
                  <span className="text-xs font-normal">Issue Warning</span>
                </Button>
                <Button className="bg-[#F54900] hover:bg-orange-600 text-white h-auto py-3 flex-col gap-1">
                  <X className="w-5 h-5 mb-1" />
                  <span className="text-xs font-normal">Remove Content</span>
                </Button>
                <Button className="bg-[#E7000B] hover:bg-red-700 text-white h-auto py-3 flex-col gap-1">
                  <AlertOctagon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-normal">Block User</span>
                </Button>
                <Button className="bg-[#4B5563] hover:bg-gray-700 text-white h-auto py-3 flex-col gap-1">
                  <Archive className="w-5 h-5 mb-1" />
                  <span className="text-xs font-normal">Archive</span>
                </Button>
              </div>

              <Button className="w-full bg-[#00A040] hover:bg-emerald-700 text-white shadow-sm">
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
                {moderationLog.map((log, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-blue-500 rounded-full z-10 box-content -ml-[3.5px]">
                      <div className="w-2 h-2 bg-blue-500 rounded-full m-1.5" />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5">By: {log.by}</p>
                        {log.details && (
                          <p className="text-sm text-gray-500 mt-2">{log.details}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(log.timestamp)}</span>
                    </div>
                  </div>
                ))}
                {moderationLog.length === 0 && <p className="text-sm text-gray-500 italic">No moderation actions recorded yet.</p>}
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
                  <p className="text-xl font-medium text-gray-900">{userHistory.totalReports}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Warnings Issued</p>
                  <p className="text-xl font-medium text-orange-500">{userHistory.warningsIssued}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Age</p>
                  <p className="text-lg font-medium text-gray-900">{userHistory.accountAge}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Status</p>
                  <p className="text-lg font-medium text-emerald-600">{userHistory.accountStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Reports */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Related Reports</h3>
              <div className="space-y-3">
                {relatedReports.map((related, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-sm font-medium text-gray-900">Similar content</span>
                       <span className="text-xs text-gray-500">{formatDate(related.date)}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {formatStatusLabel(related.status)}
                    </Badge>
                  </div>
                ))}
                {relatedReports.length === 0 && <p className="text-sm text-gray-500">No related reports found.</p>}
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
                <Button className="w-full bg-white border border-gray-600 hover:bg-gray-50 text-black">
                  Contact Reported User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

