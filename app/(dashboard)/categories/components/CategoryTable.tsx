import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Edit2, 
  Trash2, 
  MoreVertical, 
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-3">Category Name</th>
            <th className="px-6 py-3">Theme</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Subcategories</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <React.Fragment key={category._id}>
              <tr className="bg-white border hover:bg-gray-50/80 transition-colors group rounded-xl shadow-sm">
                <td className="px-6 py-4 rounded-l-xl">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleRow(category._id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedRows.has(category._id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {category.theme}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => onToggleStatus(category._id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
                      category.isActive 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {category.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {category.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subcategories[category._id]?.length || 0} items
                </td>
                <td className="px-6 py-4 text-right rounded-r-xl">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onAddSubcategory(category)}
                      className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-gray-100 rounded-lg"
                      title="Add Subcategory"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onEdit(category)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDelete(category._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Expanded Subcategories */}
              {expandedRows.has(category._id) && (
                <tr>
                  <td colSpan={5} className="px-8 pb-4">
                    <div className="bg-gray-50/50 rounded-xl border border-dashed border-gray-200 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-400 uppercase">
                        <span>Subcategories for {category.name}</span>
                        <button 
                          onClick={() => onAddSubcategory(category)}
                          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          Add New
                        </button>
                      </div>
                      
                      {!subcategories[category._id] ? (
                        <div className="text-center py-4 text-gray-400 text-sm italic">Loading...</div>
                      ) : subcategories[category._id].length === 0 ? (
                        <div className="text-center py-4 text-gray-400 text-sm italic">No subcategories found</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {subcategories[category._id].map((sub) => (
                            <div 
                              key={sub._id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm group/sub"
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${sub.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => onEdit(sub)}
                                  className="p-1.5 text-gray-400 hover:text-blue-500 rounded hover:bg-gray-50"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => onDelete(sub._id)}
                                  className="p-1.5 text-gray-400 hover:text-red-500 rounded hover:bg-gray-50"
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
              <td colSpan={5} className="text-center py-12 text-gray-500 italic">
                No categories found for this theme.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
