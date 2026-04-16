import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Trash2,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Category } from '../types';

interface CategoryTableProps {
  categories: Category[];
  subcategories: Record<string, Category[]>;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onFetchSubcategories: (categoryId: string) => void;
  onAddSubcategory: (category: Category) => void;
}

export const CategoryTable = ({
  categories,
  subcategories,
  onEdit,
  onDelete,
  onToggleStatus,
  onFetchSubcategories,
  onAddSubcategory
}: CategoryTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    // Auto-fetch subcategories for any newly loaded category to get the count
    categories.forEach(category => {
      if (!subcategories[category._id]) {
        onFetchSubcategories(category._id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);
  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
      if (!subcategories[id]) {
        onFetchSubcategories(id);
      }
    }
    setExpandedRows(newExpanded);
  };

  const getStatusBadgeClass = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
  };

  return (
    <Card className="py-0 shadow-sm overflow-hidden border border-gray-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-100">
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Category Name
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Theme
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Status
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Subcategories
                </th>
                <th className="text-left px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider h-12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {categories.map((category) => (
                <React.Fragment key={category._id}>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 h-16">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleRow(category._id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {expandedRows.has(category._id) ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="px-6 h-16">
                      <Badge variant="secondary" className="font-normal bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
                        {category.theme || 'No theme'}
                      </Badge>
                    </td>
                    <td className="px-6 h-16">
                      <Badge
                        variant="secondary"
                        onClick={() => onToggleStatus(category._id)}
                        className={`font-normal cursor-pointer transition-colors ${getStatusBadgeClass(category.isActive)}`}
                      >
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 h-16 text-sm text-gray-500">
                      {subcategories[category._id] !== undefined
                        ? `${subcategories[category._id].length} items`
                        : <span className="animate-pulse">Loading...</span>}
                    </td>
                    <td className="px-6 h-16">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAddSubcategory(category)}
                          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          title="Add Subcategory"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(category)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(category._id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Subcategories */}
                  {expandedRows.has(category._id) && (
                    <tr className="bg-gray-50/30">
                      <td colSpan={5} className="px-12 py-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span>Subcategories for {category.name}</span>
                          </div>

                          {!subcategories[category._id] ? (
                            <div className="text-center py-4 text-xs text-gray-400 animate-pulse font-medium">Loading subcategories...</div>
                          ) : subcategories[category._id].length === 0 ? (
                            <div className="text-center py-4 text-xs text-gray-500 italic">No subcategories found</div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {subcategories[category._id].map((sub) => (
                                <div
                                  key={sub._id}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all group/sub"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${sub.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                                  </div>
                                  <div className="flex items-center gap-1 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => onEdit(sub)}
                                      className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => onDelete(sub._id)}
                                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500 italic text-sm">
                    No categories found for this theme.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
