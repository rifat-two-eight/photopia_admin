import React from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const PaymentsFilters: React.FC<PaymentsFiltersProps> = ({
  searchQuery,
  onSearchChange,
}) => {
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
            <Button variant="outline" className="h-10 gap-2 bg-white border-gray-200 text-gray-700">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="h-10 gap-2 bg-white border-gray-200 text-gray-700">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
