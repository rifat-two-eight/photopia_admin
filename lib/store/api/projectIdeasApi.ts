import { baseApi } from './baseApi';

export interface Subcategory {
  _id: string;
  name: string;
  theme: string;
  parent: string;
  type: string;
}

export interface SubcategoryResponse {
  success: boolean;
  statusCode: number;
  data: {
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: Subcategory[];
  };
}

export interface ProjectIdea {
  _id: string;
  title: string;
  linkText: string;
  subCategoryId: {
    _id: string;
    name: string;
    theme: string;
  };
  order: number;
  createdAt: string;
}

export interface ProjectIdeaResponse {
  success: boolean;
  statusCode: number;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    data: ProjectIdea[];
  };
}

export interface CreateProjectIdeaPayload {
  title: string;
  linkText: string;
  subCategoryId: string;
  order?: number;
}

export interface UpdateProjectIdeaPayload {
  title?: string;
  linkText?: string;
  subCategoryId?: string;
  order?: number;
}

export const projectIdeasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectIdeas: builder.query<ProjectIdeaResponse, { searchTerm?: string; page?: number; limit?: number; sortBy?: string; sortOrder?: string }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.searchTerm) queryParams.append('searchTerm', params.searchTerm);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
        
        return `/project-ideas?${queryParams.toString()}`;
      },
      providesTags: ['ProjectIdeas'],
    }),
    
    getIdeaSubcategories: builder.query<SubcategoryResponse, void>({
      query: () => '/category?type=subcategory&isActive=true&limit=100',
      providesTags: ['Categories'],
    }),

    createProjectIdea: builder.mutation<{ success: boolean }, CreateProjectIdeaPayload>({
      query: (body) => ({
        url: '/project-ideas',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ProjectIdeas'],
    }),

    updateProjectIdea: builder.mutation<{ success: boolean }, { id: string; body: UpdateProjectIdeaPayload }>({
      query: ({ id, body }) => ({
        url: `/project-ideas/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['ProjectIdeas'],
    }),

    deleteProjectIdea: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/project-ideas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProjectIdeas'],
    }),
  }),
});

export const {
  useGetProjectIdeasQuery,
  useGetIdeaSubcategoriesQuery,
  useCreateProjectIdeaMutation,
  useUpdateProjectIdeaMutation,
  useDeleteProjectIdeaMutation,
} = projectIdeasApi;
