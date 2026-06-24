'use client';

import React from 'react';
import { ProjectIdea, useDeleteProjectIdeaMutation } from '@/lib/store/api/projectIdeasApi';
import { Edit2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectIdeasTableProps {
  ideas: ProjectIdea[];
  onEdit: (id: string) => void;
}

export default function ProjectIdeasTable({ ideas, onEdit }: ProjectIdeasTableProps) {
  const [deleteIdea] = useDeleteProjectIdeaMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E7000B',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteIdea(id).unwrap();
        toast.success('Project idea deleted successfully');
      } catch (error) {
        toast.error('Failed to delete project idea');
      }
    }
  };

  if (ideas.length === 0) {
    return (
      <Card className="py-0 shadow-sm overflow-hidden border border-gray-100">
        <CardContent className="p-12 text-center text-gray-500 italic text-sm">
          No project ideas found. Create one to get started!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0 shadow-sm overflow-hidden border border-gray-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12 w-20">Order</th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">Title</th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">Link Text</th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">Subcategory</th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {ideas.map((idea) => (
                <tr key={idea._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 h-16">
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-gray-100 text-gray-800 rounded-full border border-gray-200">
                      {idea.order || 0}
                    </span>
                  </td>
                  <td className="px-6 h-16">
                    <span className="text-sm font-medium text-gray-900 line-clamp-1">{idea.title}</span>
                  </td>
                  <td className="px-6 h-16">
                    <span className="text-sm text-gray-600 line-clamp-1">{idea.linkText}</span>
                  </td>
                  <td className="px-6 h-16">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">{idea.subCategoryId?.name}</span>
                      <Badge variant="secondary" className="w-fit text-[10px] bg-gray-100 text-gray-600 font-normal border-gray-200">
                        {idea.subCategoryId?.theme || 'OTHER'}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 h-16">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(idea._id)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(idea._id)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
