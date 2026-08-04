import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
  onExport?: () => void;
  isExporting?: boolean;
}

export const PaymentsFilters: React.FC<PaymentsFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter = 'all',
  onStatusFilterChange,
  onExport,
  isExporting,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-10 border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-300"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`h-10 gap-2 border-gray-200 text-gray-700 ${showFilters ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="h-10 gap-2 bg-white border-gray-200 text-gray-700"
              onClick={onExport}
              disabled={isExporting}
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange?.(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
