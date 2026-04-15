export interface Category {
  _id: string;
  name: string;
  theme: string;
  type: 'category' | 'subcategory';
  parent?: string | Category;
  isActive: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  order?: number;
  metadata?: {
    icon?: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CategoryStats {
  totalThemes: number;
  totalCategories: number;
  totalSubcategories: number;
  activeItems: number;
}

export interface CategoryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    data: Category[];
  };
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface ThemeOption {
  id: string;
  name: string;
  icon: any;
}
