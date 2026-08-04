'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import {
  ProjectIdea,
  useCreateProjectIdeaMutation,
  useUpdateProjectIdeaMutation,
  useGetIdeaCategoriesQuery,
  useGetIdeaSubcategoriesQuery,
} from '@/lib/store/api/projectIdeasApi';

interface IdeaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingIdea: ProjectIdea | null;
}

const THEMES = [
  { id: 'PHOTOGRAPHY', name: 'Photography' },
  { id: 'VIDEOGRAPHY', name: 'Videography' },
  { id: 'EDITING AND POST-PRODUCTION', name: 'Editing and Post Production' },
];

/** Align DB theme variants with dashboard theme ids */
function normalizeTheme(theme?: string | null): string {
  if (!theme) return '';
  const upper = theme.trim().toUpperCase();
  if (upper === 'PHOTOGRAPHY' || upper === 'PHOTO') return 'PHOTOGRAPHY';
  if (upper === 'VIDEOGRAPHY' || upper === 'VIDEO') return 'VIDEOGRAPHY';
  if (
    upper === 'EDITING AND POST-PRODUCTION' ||
    upper === 'EDITING AND POST PRODUCTION' ||
    upper === 'EDITING' ||
    upper === 'POST-PRODUCTION' ||
    upper === 'POST PRODUCTION'
  ) {
    return 'EDITING AND POST-PRODUCTION';
  }
  return theme.trim();
}

function extractParentId(idea: ProjectIdea): string {
  const parent = idea.subCategoryId?.parent;
  if (!parent) return '';
  if (typeof parent === 'object' && parent !== null) {
    return parent._id || '';
  }
  return String(parent);
}

function extractTheme(idea: ProjectIdea): string {
  const fromSub = normalizeTheme(idea.subCategoryId?.theme);
  if (fromSub) return fromSub;
  const parent = idea.subCategoryId?.parent;
  if (typeof parent === 'object' && parent !== null) {
    return normalizeTheme((parent as { theme?: string }).theme);
  }
  return '';
}

export default function IdeaFormModal({
  isOpen,
  onClose,
  editingIdea,
}: IdeaFormModalProps) {
  const [title, setTitle] = useState('');
  const [linkText, setLinkText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [order, setOrder] = useState<number>(0);

  const [createIdea, { isLoading: isCreating }] = useCreateProjectIdeaMutation();
  const [updateIdea, { isLoading: isUpdating }] = useUpdateProjectIdeaMutation();

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetIdeaCategoriesQuery(undefined, { skip: !isOpen });
  const { data: subcategoriesData, isLoading: isLoadingSubcategories } =
    useGetIdeaSubcategoriesQuery(selectedCategoryId, {
      skip: !isOpen || !selectedCategoryId,
    });

  useEffect(() => {
    if (!isOpen) return;

    if (editingIdea) {
      setTitle(editingIdea.title || '');
      setLinkText(editingIdea.linkText || '');
      setSelectedTheme(extractTheme(editingIdea));
      setSelectedCategoryId(extractParentId(editingIdea));
      setSubCategoryId(editingIdea.subCategoryId?._id || '');
      setOrder(editingIdea.order ?? 0);
    } else {
      setTitle('');
      setLinkText('');
      setSelectedTheme('');
      setSelectedCategoryId('');
      setSubCategoryId('');
      setOrder(0);
    }
  }, [isOpen, editingIdea]);

  const allCategories = categoriesData?.data?.data || [];
  const filteredCategories = useMemo(() => {
    if (!selectedTheme) return [];
    const list = allCategories.filter(
      (cat) => normalizeTheme(cat.theme) === selectedTheme,
    );
    // Keep current parent category selectable while editing (inactive / theme drift)
    const parent = editingIdea?.subCategoryId?.parent;
    if (selectedCategoryId && !list.some((c) => c._id === selectedCategoryId)) {
      const parentName =
        typeof parent === 'object' && parent !== null
          ? parent.name
          : 'Current category';
      list.unshift({
        _id: selectedCategoryId,
        name: parentName || 'Current category',
        theme: selectedTheme,
        parent: '',
        type: 'category',
      });
    }
    return list;
  }, [allCategories, selectedTheme, selectedCategoryId, editingIdea]);

  const filteredSubcategories = subcategoriesData?.data?.data || [];

  // Keep current subcategory visible even if API list is briefly empty/stale
  const subcategoryOptions = useMemo(() => {
    const list = [...filteredSubcategories];
    const currentId = editingIdea?.subCategoryId?._id;
    const currentName = editingIdea?.subCategoryId?.name;
    if (
      currentId &&
      subCategoryId === currentId &&
      !list.some((s) => s._id === currentId)
    ) {
      list.unshift({
        _id: currentId,
        name: currentName || 'Current subcategory',
        theme: editingIdea?.subCategoryId?.theme || selectedTheme,
        parent: selectedCategoryId,
        type: 'subcategory',
      });
    }
    return list;
  }, [
    filteredSubcategories,
    editingIdea,
    subCategoryId,
    selectedCategoryId,
    selectedTheme,
  ]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !linkText.trim() || !subCategoryId) {
      toast.error('Please fill in theme, category, subcategory and required fields');
      return;
    }
    if (!selectedTheme || !selectedCategoryId) {
      toast.error('Please select theme and category');
      return;
    }

    try {
      if (editingIdea?._id) {
        await updateIdea({
          id: editingIdea._id,
          body: {
            title: title.trim(),
            linkText: linkText.trim(),
            subCategoryId,
            order,
          },
        }).unwrap();
        toast.success('Project idea updated — home page will use the new subcategory');
      } else {
        await createIdea({
          title: title.trim(),
          linkText: linkText.trim(),
          subCategoryId,
          order,
        }).unwrap();
        toast.success('Project idea created successfully');
      }
      onClose();
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string } })?.data?.message ||
        'Failed to save project idea';
      toast.error(message);
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {editingIdea ? 'Edit Project Idea' : 'Create Project Idea'}
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
            <div className="text-xs text-right text-gray-400">{title.length}/80</div>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Theme <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={selectedTheme}
              onChange={(e) => {
                setSelectedTheme(e.target.value);
                setSelectedCategoryId('');
                setSubCategoryId('');
              }}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white"
            >
              <option value="" disabled>
                Select Theme
              </option>
              {THEMES.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSubCategoryId('');
                }}
                disabled={!selectedTheme || isLoadingCategories}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white disabled:bg-gray-50"
              >
                <option value="" disabled>
                  {isLoadingCategories
                    ? 'Loading...'
                    : filteredCategories.length === 0
                      ? 'No categories for this theme'
                      : 'Select Category'}
                </option>
                {filteredCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {selectedTheme &&
                !isLoadingCategories &&
                filteredCategories.length === 0 && (
                  <p className="text-xs text-amber-600">
                    No active categories under {selectedTheme}. Add them in
                    Categories first.
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subcategory <span className="text-red-500">*</span>
              </label>
              <select
                key={`sub-${selectedCategoryId}`}
                required
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                disabled={!selectedCategoryId || isLoadingSubcategories}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="" disabled>
                  {isLoadingSubcategories
                    ? 'Loading...'
                    : subcategoryOptions.length === 0
                      ? 'No subcategories'
                      : 'Select Subcategory'}
                </option>
                {subcategoryOptions.map((sub) => (
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
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              placeholder="e.g. 1"
              min={0}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
            />
            <p className="text-xs text-gray-400">
              Changing subcategory updates home “Project Ideas” immediately after
              save (pull-to-refresh / reopen home on the app).
            </p>
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
