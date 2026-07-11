'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import {
  useCreateProjectIdeaMutation,
  useUpdateProjectIdeaMutation,
  useGetIdeaSubcategoriesQuery,
  useGetProjectIdeasQuery
} from '@/lib/store/api/projectIdeasApi';

interface IdeaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingIdeaId: string | null;
}

export default function IdeaFormModal({ isOpen, onClose, editingIdeaId }: IdeaFormModalProps) {
  const [title, setTitle] = useState('');
  const [linkText, setLinkText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [order, setOrder] = useState<number>(0);

  const [createIdea, { isLoading: isCreating }] = useCreateProjectIdeaMutation();
  const [updateIdea, { isLoading: isUpdating }] = useUpdateProjectIdeaMutation();
  
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } = useGetIdeaSubcategoriesQuery(undefined, { skip: !isOpen });

  // Fetch all to find the editing one (ideally we should have a getById or use the cached list)
  const { data: projectIdeasData } = useGetProjectIdeasQuery(
    { limit: 100 }, 
    { skip: !isOpen || !editingIdeaId }
  );

  useEffect(() => {
    if (isOpen) {
      if (editingIdeaId && projectIdeasData?.data?.data) {
        const idea = projectIdeasData.data.data.find(i => i._id === editingIdeaId);
        if (idea) {
          setTimeout(() => {
            setTitle(idea.title);
            setLinkText(idea.linkText);
            setSelectedTheme(idea.subCategoryId?.theme || '');
            setSubCategoryId(idea.subCategoryId?._id || '');
            setOrder(idea.order);
          }, 0);
        }
      } else {
        // Reset form
        setTimeout(() => {
          setTitle('');
          setLinkText('');
          setSelectedTheme('');
          setSubCategoryId('');
          setOrder(0);
        }, 0);
      }
    }
  }, [isOpen, editingIdeaId, projectIdeasData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !linkText || !subCategoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingIdeaId) {
        await updateIdea({
          id: editingIdeaId,
          body: { title, linkText, subCategoryId, order }
        }).unwrap();
        toast.success('Project idea updated successfully');
      } else {
        await createIdea({
          title, linkText, subCategoryId, order
        }).unwrap();
        toast.success('Project idea created successfully');
      }
      onClose();
    } catch {
      toast.error('Failed to save project idea');
    }
  };

  const isSubmitting = isCreating || isUpdating;
  
  // Extract all subcategories
  const allSubcategories = subcategoriesData?.data?.data || [];
  
  // Extract unique themes to act as "Categories"
  const themes = Array.from(new Set(allSubcategories.map(sub => sub.theme || 'OTHER')));
  
  // Filter subcategories by the selected theme
  const filteredSubcategories = selectedTheme 
    ? allSubcategories.filter(sub => (sub.theme || 'OTHER') === selectedTheme)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIdeaId ? 'Edit Project Idea' : 'Create Project Idea'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Title / Question <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Are you planning a wedding? 💍"
              maxLength={80}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
            <div className="text-xs text-right text-gray-400">
              {title.length}/80
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Link Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              placeholder="e.g. See our packages"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedTheme}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                  setSubCategoryId(''); // Clear subcategory when theme changes
                }}
                disabled={isLoadingSubcategories}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white disabled:bg-gray-50"
              >
                <option value="" disabled>Select Category</option>
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                disabled={!selectedTheme || isLoadingSubcategories}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="" disabled>Select Subcategory</option>
                {filteredSubcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
              placeholder="e.g. 1"
              min="0"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-black/90 transition-colors disabled:opacity-70 flex items-center shadow-sm active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Idea'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
