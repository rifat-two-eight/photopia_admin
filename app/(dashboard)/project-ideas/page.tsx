'use client';

import React, { useState } from 'react';
import { useGetProjectIdeasQuery } from '@/lib/store/api/projectIdeasApi';
import ProjectIdeasTable from './components/ProjectIdeasTable';
import IdeaFormModal from './components/IdeaFormModal';
import { Plus, Search } from 'lucide-react';

export default function ProjectIdeasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIdeaId, setEditingIdeaId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetProjectIdeasQuery({
    searchTerm,
    page,
    limit: 10,
    sortBy: 'order',
    sortOrder: 'asc'
  });

  const handleEdit = (id: string) => {
    setEditingIdeaId(id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingIdeaId(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIdeaId(null);
  };

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Project Ideas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage inspirational ideas and prompts for users
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Project Idea
        </button>
      </div>

      <div className="space-y-6 pt-4">
        {/* Navigation & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-2">
          <div className="flex-1" />
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 pointer-events-none">
            <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin mb-4" />
            <p className="text-gray-400 text-sm animate-pulse">Loading project ideas...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-500">
            Failed to load project ideas.
          </div>
        ) : (
          <ProjectIdeasTable
            ideas={data?.data?.data || []}
            onEdit={handleEdit}
          />
        )}
      </div>

      <IdeaFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editingIdeaId={editingIdeaId}
      />
    </div>
  );
}
