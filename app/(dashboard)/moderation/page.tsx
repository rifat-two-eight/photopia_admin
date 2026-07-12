"use client"
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { ModerationStats } from './components/ModerationStats';
import { ModerationFilters } from './components/ModerationFilters';
import { ReportList } from './components/ReportList';
import { ReportDetail } from './components/ReportDetail';
import { ModerationStat, ModerationStatsApiResponse, ModerationReportItem } from './types';
import { Button } from '@/components/ui/button';

const ModerationPage = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statsData, setStatsData] = useState<ModerationStatsApiResponse | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [reports, setReports] = useState<ModerationReportItem[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const currentReports = reports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingStats(true);
        setIsLoadingReports(true);
        const [statsRes, reportsRes] = await Promise.all([
          axiosInstance.get('/dashboard/moderation-stats'),
          axiosInstance.get('/dashboard/moderation-reports')
        ]);

        if (statsRes.data.success) {
          setStatsData(statsRes.data.data);
        }
        if (reportsRes.data.success) {
          setReports(reportsRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching moderation data:", error);
      } finally {
        setIsLoadingStats(false);
        setIsLoadingReports(false);
      }
    };
    fetchData();
  }, []);

  const stats: ModerationStat[] = [
    { label: 'Pending Reports', value: statsData?.pendingReports.toString() || '0', color: 'text-red-600' },
    { label: 'Under Review', value: statsData?.underReview.toString() || '0', color: 'text-orange-500' },
    { label: 'Resolved Today', value: statsData?.resolvedToday.toString() || '0', color: 'text-green-600' },
    { label: 'Total Reports', value: statsData?.totalReports.toString() || '0' }
  ];

  if (selectedReportId) {
    return (
      <ReportDetail 
        reportId={selectedReportId} 
        onBack={() => setSelectedReportId(null)} 
      />
    );
  }

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Content Moderation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage reported content and user behavior
        </p>
      </div>

      <ModerationStats stats={stats} loading={isLoadingStats} />

      <div className="space-y-4">
        <ModerationFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ReportList 
          reports={currentReports} 
          onReview={setSelectedReportId} 
          loading={isLoadingReports}
        />

        {/* Pagination */}
        {reports.length > 0 && (
          <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-gray-500">
                Showing {Math.min(reports.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(reports.length, currentPage * itemsPerPage)} of {reports.length} reports
              </p>
              <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                      Previous
                  </Button>
                  <Button size="sm" className="bg-[#1C1C1E] hover:bg-gray-800 text-white">
                      {currentPage}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-sm"
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                      Next
                  </Button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ModerationPage;

