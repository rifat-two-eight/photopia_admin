"use client"
import React, { useState } from 'react';
import { ModerationStats } from './components/ModerationStats';
import { ModerationFilters } from './components/ModerationFilters';
import { ReportList } from './components/ReportList';
import { ReportDetail } from './components/ReportDetail';
import { Report, ModerationStat } from './types';
import { Button } from '@/components/ui/button';

const ModerationPage = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stats: ModerationStat[] = [
    { label: 'Pending Reports', value: '3', color: 'text-red-600' },
    { label: 'Under Review', value: '2', color: 'text-orange-500' },
    { label: 'Resolved Today', value: '1', color: 'text-green-600' },
    { label: 'Total Reports', value: '6' }
  ];

  const reports: Report[] = [
    {
      id: '1',
      type: 'Fraud',
      priority: 'High',
      status: 'Pending',
      description: 'User is requesting payments outside of the platform and not delivering services.',
      reportedUser: 'John Doe',
      reportedBy: 'Jane Smith',
      date: '2024-12-20 14:30',
      reportId: '#RPT-001',
      userHistory: {
        totalReports: 3,
        warningsIssued: 1,
        accountAge: '8 months',
        accountStatus: 'Active'
      },
      relatedReports: [
        { id: 'rel1', reason: 'Similar content', date: '2024-12-15', status: 'resolved' },
        { id: 'rel2', reason: 'Same user reported', date: '2024-12-10', status: 'warning issued' }
      ],
      logs: [
        { id: 'log1', action: 'Report received', by: 'System', detail: 'Automated report flagged', date: '2024-12-20 14:30' },
        { id: 'log2', action: 'Under review', by: 'Admin User', detail: 'Case assigned for review', date: '2024-12-20 15:30' }
      ]
    },
    {
      id: '2',
      type: 'Offensive',
      priority: 'Medium',
      status: 'Pending',
      description: 'Portfolio contains offensive imagery that violates community guidelines.',
      reportedUser: 'Alex Johnson',
      reportedBy: 'Emily Davis',
      date: '2024-12-20 09:45',
      reportId: '#RPT-002',
      userHistory: {
        totalReports: 1,
        warningsIssued: 0,
        accountAge: '2 months',
        accountStatus: 'Active'
      }
    },
    {
      id: '3',
      type: 'Spam',
      priority: 'Low',
      status: 'Pending',
      description: 'Repeatedly posting promotional content in inappropriate places.',
      reportedUser: 'Chris Lee',
      reportedBy: 'Michael Chen',
      date: '2024-12-19 16:20',
      reportId: '#RPT-003',
      userHistory: {
        totalReports: 5,
        warningsIssued: 2,
        accountAge: '1 year',
        accountStatus: 'Suspended'
      }
    }
  ];

  if (selectedReport) {
    return (
      <ReportDetail 
        report={selectedReport} 
        onBack={() => setSelectedReport(null)} 
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

      <ModerationStats stats={stats} />

      <div className="space-y-4">
        <ModerationFilters 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ReportList 
          reports={reports} 
          onReview={setSelectedReport} 
        />

        {/* Pagination - Matching the design */}
        <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-500">Showing 3 of 6 reports</p>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200">
                    Previous
                </Button>
                <Button size="sm" className="bg-[#1C1C1E] hover:bg-gray-800 text-white">
                    1
                </Button>
                <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200">
                    2
                </Button>
                <Button variant="outline" size="sm" className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200">
                    Next
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;
