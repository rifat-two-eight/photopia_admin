import React from 'react';
import { Button } from '@/components/ui/button';

interface PaymentsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  showingFrom: number;
  showingTo: number;
  onPageChange: (page: number) => void;
}

export const PaymentsPagination: React.FC<PaymentsPaginationProps> = ({
  currentPage,
  totalPages,
  showingFrom,
  showingTo,
  totalItems,
  onPageChange
}) => {
  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-sm text-gray-500">
        Showing {showingFrom} to {showingTo} of {totalItems} transactions
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
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            size="sm"
            onClick={() => onPageChange(i + 1)}
            className={currentPage === i + 1 
              ? "bg-[#1C1C1E] hover:bg-gray-800 text-white" 
              : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-sm"
            }
          >
            {i + 1}
          </Button>
        ))}
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
