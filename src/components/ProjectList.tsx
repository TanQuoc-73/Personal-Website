'use client';

import Image from 'next/image';
import { useProjects, type ProjectsQuery } from '@/hooks/useProjects';
import { FaCheckCircle, FaArchive, FaGithub, FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import { useEffect, useMemo, useState } from 'react';
import { ProjectModal } from '@/components/ProjectModal';
import { Category } from '@/types/categories';
import type { Project } from '@/types/project';

type ProjectStatus = 'in-progress' | 'completed' | 'archived' | string;

// Sử dụng lại kiểu Category từ API
interface ProjectWithCategory extends Omit<Project, 'categories'> {
  categories?: {
    id: string;
    name: string;
    color?: string;  // Cho phép color là optional
  };
}

interface ProjectListProps {
  initialFilters?: ProjectsQuery;
  showAdminActions?: boolean;
  showCategoryFilter?: boolean;
  categories?: Category[];
  onCategoryFilter?: (categoryId: string) => void;
}

export default function ProjectList({ 
  initialFilters = {}, 
  showAdminActions = false, 
  showCategoryFilter = true,
  categories: initialCategories = [],
  onCategoryFilter 
}: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectWithCategory | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  // Manage filters internally
  const [search, setSearch] = useState<string>(initialFilters.search ?? '');
  const [categoryId, setCategoryId] = useState<string | undefined>(initialFilters.categoryId);
  // Chuyển đổi status từ string sang kiểu ProjectStatus
  const [status, setStatus] = useState<ProjectStatus | undefined>(initialFilters.status);
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(initialFilters.isFeatured);
  // Pagination: default limit 6 for 3 rows x 2 columns
  const [page, setPage] = useState<number>(initialFilters.page ?? 1);
  const [limit, setLimit] = useState<number>(initialFilters.limit ?? 6);

  const filters = useMemo<ProjectsQuery>(
    () => ({
      search: search.trim() || undefined,
      categoryId,
      status: status as 'in-progress' | 'completed' | 'archived' | undefined,
      isFeatured,
      page,
      limit,
      sortBy: 'created_at',
      sortOrder: 'desc',
    }),
    [search, categoryId, status, isFeatured, page, limit]
  );

  // Fetch categories if not provided
  useEffect(() => {
    if (showCategoryFilter && categories.length === 0) {
      const fetchCategories = async () => {
        try {
          setIsLoadingCategories(true);
          const response = await fetch('/api/categories');
          const data = await response.json();
          if (data.success) {
            setCategories(data.data);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        } finally {
          setIsLoadingCategories(false);
        }
      };

      fetchCategories();
    }
  }, [showCategoryFilter, categories.length]);

  const { 
    projects, 
    isLoading, 
    error, 
    count,
    updateProject
  } = useProjects(filters);
  
  // Chuyển đổi dữ liệu projects sang đúng kiểu ProjectWithCategory
  const projectsWithCategories = useMemo<ProjectWithCategory[]>(() => {
    if (!projects) return [];
    return projects.map(project => ({
      ...project,
      categories: project.categories ? {
        id: project.categories.id,
        name: project.categories.name,
        color: project.categories.color
      } : undefined
    }));
  }, [projects]);

  // Reset page on filter changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryId, status, isFeatured, limit]);

  const handleProjectClick = (project: ProjectWithCategory) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleToggleFeatured = async (project: ProjectWithCategory, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering project click
    
    if (!confirm('Toggle featured status for this project?')) return;
    
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'PATCH', body: JSON.stringify({ is_featured: !project.is_featured }) });
      if (!res.ok) throw new Error('Toggle failed');
      // simple refresh
      window.location.reload();
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Toggle failed');
      alert(error.message);
    }
  };

  const handleDeleteProject = async (project: ProjectWithCategory, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering project click
    
    if (!confirm('Delete this project?')) return;
    
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      // simple refresh
      window.location.reload();
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Delete failed');
      alert(error.message);
    }
  };

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId || undefined);
    if (onCategoryFilter) {
      onCategoryFilter(newCategoryId);
    }
  };

  return (
    <div className="space-y-6">
      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={handleCloseModal} 
      />
      
      {/* Search and Filter Controls */}
      <div className="rounded-2xl border border-white/20 bg-black/30 backdrop-blur-lg p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[250px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-white/50 text-sm" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-black/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-black/30 transition-all duration-200 backdrop-blur-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          {showCategoryFilter && (
            <div className="relative min-w-[200px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <FaFilter className="text-white/50 text-sm" />
              </div>
              <select
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/20 bg-black/20 text-white focus:border-white/40 focus:bg-black/30 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer"
                value={categoryId || ''}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="" className="bg-gray-800">All Categories</option>
                {isLoadingCategories ? (
                  <option className="bg-gray-800">Loading...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.id} className="bg-gray-800">
                      {category.name}
                    </option>
                  ))
                )}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Status Filter */}
          <div className="relative">
            <select
              className="pl-4 pr-10 py-3 rounded-xl border border-white/20 bg-black/20 text-white focus:border-white/40 focus:bg-black/30 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer min-w-[150px]"
              value={status || ''}
              onChange={(e) => setStatus((e.target.value as ProjectStatus) || undefined)}
            >
              <option value="" className="bg-gray-800">All Status</option>
              <option value="completed" className="bg-gray-800">Completed</option>
              <option value="in-progress" className="bg-gray-800">In Progress</option>
              <option value="archived" className="bg-gray-800">Archived</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Featured Toggle */}
          <label className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl border border-white/20 bg-black/20 hover:bg-black/30 transition-all duration-200 backdrop-blur-sm">
            <input
              type="checkbox"
              checked={!!isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked ? true : undefined)}
              className="w-4 h-4 rounded border-2 border-white/30 bg-transparent checked:bg-red-500 checked:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:ring-offset-0 transition-colors"
            />
            <span className="text-white/90 text-sm font-medium">Featured</span>
          </label>
          
          {/* Items per page */}
          <div className="relative">
            <select
              className="pl-4 pr-10 py-3 rounded-xl border border-white/20 bg-black/20 text-white focus:border-white/40 focus:bg-black/30 transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              {[6, 10, 12, 16, 20].map((n) => (
                <option key={n} value={n} className="bg-gray-800">
                  {n}/page
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Projects list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/30 border-t-white"></div>
            <span className="text-white/80 text-lg">Loading projects...</span>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        </div>
      ) : projectsWithCategories.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-white/50 text-6xl mb-4">📂</div>
            <p className="text-white/80 text-lg">No projects found</p>
            <p className="text-white/60 text-sm mt-2">Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        <>
          {/* Results count */}
          {typeof count === 'number' && (
            <div className="flex items-center justify-between">
              <div className="text-white/70 text-sm">
                Showing <span className="text-white font-semibold">{projectsWithCategories.length}</span> of{' '}
                <span className="text-white font-semibold">{count}</span> project{count !== 1 ? 's' : ''}
              </div>
            </div>
          )}
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projectsWithCategories.map((project) => (
              <div 
                key={project.id} 
                className="group relative flex flex-col rounded-2xl border border-white/20 bg-black/30 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 overflow-hidden cursor-pointer hover:scale-[1.02] hover:bg-black/40"
                onClick={() => handleProjectClick(project)}
              >
                {/* Featured indicator */}
                {project.is_featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-sm">
                      <span className="text-xs font-bold text-white">★ Featured</span>
                    </div>
                  </div>
                )}

                {project.featured_image_url && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.featured_image_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      {project.status === 'completed' && (
                        <FaCheckCircle title="Completed" className="text-green-400 text-lg" />
                      )}
                      {project.status === 'in-progress' && (
                        <MdOutlinePending title="In Progress" className="text-yellow-400 text-lg" />
                      )}
                      {project.status === 'archived' && (
                        <FaArchive title="Archived" className="text-gray-400 text-lg" />
                      )}
                    </div>
                  </div>
                  
                  {/* Category badge */}
                  {project.categories && (
                    <div className="mb-3">
                      <span 
                        className="inline-block px-3 py-1.5 text-xs font-semibold rounded-full border backdrop-blur-sm"
                        style={{
                          backgroundColor: `${project.categories.color || '#ef4444'}15`,
                          color: project.categories.color || '#fca5a5',
                          borderColor: `${project.categories.color || '#ef4444'}40`
                        }}
                      >
                        {project.categories.name}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-white/80 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
                    {project.short_description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-600/80 to-red-600/80 text-white text-xs font-medium hover:bg-red-600 hover:to-red-600 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          <span>Demo</span>
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="text-xs" />
                          <span>Code</span>
                        </a>
                      )}
                    </div>

                    <div className="text-xs text-white/60 capitalize font-medium">
                      {project.status?.replace('-', ' ') || 'N/A'}
                    </div>
                  </div>

                  {showAdminActions && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="px-4 py-2 rounded-lg border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Edit
                      </a>
                      <button
                        className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 bg-red-800/10 hover:bg-red-500/10 hover:border-red-500 transition-colors text-sm font-medium"
                        onClick={(e) => handleDeleteProject(project, e)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {typeof count === 'number' && count > limit && (
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              <div className="text-white/70 text-sm">
                Page <span className="text-white font-semibold">{page}</span> of{' '}
                <span className="text-white font-semibold">{Math.max(1, Math.ceil(count / limit))}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="px-6 py-3 rounded-xl border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm font-medium"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                <div className="hidden md:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, Math.ceil(count / limit)) }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === page;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-red-600 text-white border border-red-500'
                            : 'border border-white/20 text-white/70 bg-white/5 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  className="px-6 py-3 rounded-xl border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm font-medium"
                  onClick={() => {
                    const totalPages = Math.max(1, Math.ceil(count / limit));
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                  disabled={page >= Math.max(1, Math.ceil(count / limit))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}