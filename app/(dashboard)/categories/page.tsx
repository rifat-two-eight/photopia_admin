"use client"

import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { 
  Plus, 
  Search, 
  Camera,
  Video,
  Edit3
} from 'lucide-react';

import { CategoryStats } from './components/CategoryStats';
import { ThemeTabs } from './components/ThemeTabs';
import { CategoryTable } from './components/CategoryTable';
import { CategoryPagination } from './components/CategoryPagination';
import { Category, ThemeOption, CategoryResponse, CategoryStatsResponse } from './types';

const CategoryManagement = () => {
  const [selectedTheme, setSelectedTheme] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, Category[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [stats, setStats] = useState([
    { label: 'Total Themes', value: '3' },
    { label: 'Total Categories', value: '...' },
    { label: 'Total Subcategories', value: '...' }
  ]);

  const themes: ThemeOption[] = [
    { id: 'PHOTOGRAPHY', name: 'Photography', icon: Camera },
    { id: 'VIDEOGRAPHY', name: 'Videography', icon: Video },
    { id: 'EDITING & POST-PRODUCTION', name: 'Post-Production', icon: Edit3 },
  ];

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchCategoryStats = async () => {
    try {
      const response = await axiosInstance.get<CategoryStatsResponse>('/dashboard/category-stats');
      if (response.data.success) {
        const { totalCategories, totalSubCategories } = response.data.data;
        setStats([
          { label: 'Total Themes', value: '3' },
          { label: 'Total Categories', value: totalCategories.toLocaleString() },
          { label: 'Total Subcategories', value: totalSubCategories.toLocaleString() }
        ]);
      }
    } catch (error: any) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: any = { 
        type: 'category', 
        limit: 10,
        page: currentPage,
        searchTerm: debouncedSearch
      };
      if (selectedTheme !== 'ALL') {
        params.theme = selectedTheme;
      }
      
      const response = await axiosInstance.get<CategoryResponse>('/category', { params });
      if (response.data.success) {
        setCategories(Array.isArray(response.data.data.data) ? response.data.data.data : []);
        setTotalPages(response.data.data.meta.totalPages || 1);
        setTotalItems(response.data.data.meta.total || 0);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }, [selectedTheme, currentPage, debouncedSearch]);

  useEffect(() => {
    fetchCategoryStats();
    fetchCategories();
  }, [fetchCategories]);

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await axiosInstance.get<CategoryResponse>(`/category`, {
        params: { parent: categoryId, type: 'subcategory', limit: 100 }
      });
      if (response.data.success) {
        setSubcategories(prev => ({
          ...prev,
          [categoryId]: Array.isArray(response.data.data.data) ? response.data.data.data : []
        }));
      }
    } catch (error: any) {
      toast.error("Failed to fetch subcategories");
    }
  };

  const handleAddCategory = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Category',
      html:
        `<div class="space-y-4 pt-4 text-left">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select id="swal-theme" class="w-full p-2 border rounded-md">
              <option value="PHOTOGRAPHY">Photography</option>
              <option value="VIDEOGRAPHY">Videography</option>
              <option value="EDITING & POST-PRODUCTION">Post-Production</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input id="swal-name" class="w-full p-2 border rounded-md" placeholder="e.g. Wedding Photography">
          </div>
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Category',
      confirmButtonColor: '#1E1E1E',
      preConfirm: () => {
        const theme = (document.getElementById('swal-theme') as HTMLSelectElement).value;
        const name = (document.getElementById('swal-name') as HTMLInputElement).value;
        if (!name) {
          Swal.showValidationMessage('Category name is required');
          return false;
        }
        return { theme, name, type: 'category' };
      }
    });

    if (formValues) {
      try {
        const response = await axiosInstance.post('/category', formValues);
        if (response.data.success) {
          toast.success("Category added successfully");
          fetchCategories();
          fetchCategoryStats();
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to add category");
      }
    }
  };

  const handleAddSubcategory = async (parent: Category) => {
    const { value: subName } = await Swal.fire({
      title: `Add Subcategory to ${parent.name}`,
      input: 'text',
      inputLabel: 'Subcategory Name',
      inputPlaceholder: 'e.g. Traditional Wedding',
      showCancelButton: true,
      confirmButtonText: 'Add Subcategory',
      confirmButtonColor: '#1E1E1E',
      inputValidator: (value) => {
        if (!value) return 'You need to enter a name!';
      }
    });

    if (subName) {
      try {
        const response = await axiosInstance.post('/category', {
          name: subName,
          parent: parent._id,
          theme: parent.theme,
          type: 'subcategory'
        });
        if (response.data.success) {
          toast.success("Subcategory added successfully");
          fetchSubcategories(parent._id);
          fetchCategoryStats();
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to add subcategory");
      }
    }
  };

  const handleEdit = async (item: Category) => {
    const { value: newName } = await Swal.fire({
      title: `Edit ${item.name}`,
      input: 'text',
      inputLabel: 'Name',
      inputValue: item.name,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#1E1E1E'
    });

    if (newName && newName !== item.name) {
      try {
        const response = await axiosInstance.patch(`/category/${item._id}`, { name: newName });
        if (response.data.success) {
          toast.success("Updated successfully");
          fetchCategories();
          if (item.parent) {
            const parentId = typeof item.parent === 'string' ? item.parent : item.parent._id;
            fetchSubcategories(parentId);
          }
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to update");
      }
    }
  };

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
        const response = await axiosInstance.delete(`/category/${id}`);
        if (response.data.success) {
          toast.success("Deleted successfully");
          fetchCategories();
          fetchCategoryStats();
          // Also clear from subcategories state if it was a subcategory
          Object.keys(subcategories).forEach(parentId => {
            if (subcategories[parentId].some(s => s._id === id)) {
              fetchSubcategories(parentId);
            }
          });
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete");
      }
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await axiosInstance.patch(`/category/${id}/toggle-status`);
      if (response.data.success) {
        toast.success("Status updated");
        fetchCategories();
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 bg-white -my-3 p-5 lg:p-10 rounded-xl shadow-md min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 -mt-4">Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize themes, categories, and subcategories for the platform
          </p>
        </div>
        <button 
          onClick={handleAddCategory}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 transition-all shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <CategoryStats stats={stats} />

      <div className="space-y-6 pt-4">
        {/* Navigation & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-2">
          <ThemeTabs 
            selectedTheme={selectedTheme} 
            onThemeChange={(theme) => {
              setSelectedTheme(theme);
              setCurrentPage(1); 
            }} 
            themes={themes} 
          />
          
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Table */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 pointer-events-none">
             <div className="w-8 h-8 border-4 border-black/10 border-t-black rounded-full animate-spin mb-4" />
             <p className="text-gray-400 text-sm animate-pulse">Loading categories...</p>
          </div>
        ) : (
          <>
            <CategoryTable 
              categories={categories}
              subcategories={subcategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onFetchSubcategories={fetchSubcategories}
              onAddSubcategory={handleAddSubcategory}
            />
            
            <CategoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={10}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
