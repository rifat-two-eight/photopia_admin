import React from 'react';
import { Button } from '@/components/ui/button';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const UserPagination: React.FC<UserPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  // Calculate showing range
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-gray-500">
        Showing {totalItems > 0 ? end : 0} of {totalItems} users
      </p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={isActive 
                ? "bg-gray-900 hover:bg-gray-800 text-white" 
                : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
              }
            >
              {page}
            </Button>
          );
        })}
        <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
