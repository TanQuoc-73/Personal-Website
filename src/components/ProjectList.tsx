'use client';

import { useProjects, type ProjectsQuery } from '@/hooks/useProjects';
import { FaCheckCircle, FaArchive, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import { useEffect, useMemo, useState } from 'react';
import { ProjectModal } from '@/components/ProjectModal';
import {Category} from '@/types/categories';
import type { Project } from '@/types/project';


type ProjectStatus = 'in-progress' | 'completed' | 'archived';

interface ProjectListProps {
  initialFilters?: ProjectsQuery;
  showAdminActions?: boolean;
  categories?: Category[];
  onCategoryFilter?: (categoryId: string) => void;
}

export default function ProjectList({ 
  initialFilters = {}, 
  showAdminActions = false, 
  categories = [],
  onCategoryFilter 
}: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Manage filters internally
  const [search, setSearch] = useState<string>(initialFilters.search ?? '');
  const [categoryId, setCategoryId] = useState<string | undefined>(initialFilters.categoryId);
  const [status, setStatus] = useState<ProjectStatus | undefined>(initialFilters.status as ProjectStatus | undefined);
  const [isFeatured, setIsFeatured] = useState<boolean | undefined>(initialFilters.isFeatured);
  // Pagination: default limit 6 for 3 rows x 2 columns
  const [page, setPage] = useState<number>(initialFilters.page ?? 1);
  const [limit, setLimit] = useState<number>(initialFilters.limit ?? 6);

  const filters = useMemo<ProjectsQuery>(
    () => ({
      search: search.trim() || undefined,
      categoryId,
      status,
      isFeatured,
      page,
      limit,
      sortBy: 'created_at',
      sortOrder: 'desc',
    }),
    [search, categoryId, status, isFeatured, page, limit]
  );

  const { projects, isLoading, error, count } = useProjects(filters);

  // Reset page on filter changes
  useEffect(() => {
    setPage(1);
  }, [search, categoryId, status, isFeatured, limit]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleDeleteProject = async (project: Project, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering project click
    
    if (!confirm('Delete this project?')) return;
    
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      // simple refresh
      window.location.reload();
    } catch (e) {
      alert((e as any).message ?? 'Delete failed');
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
      
      {/* Filter inputs */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white flex-grow min-w-[200px] placeholder:text-white/50"
        />

        <select
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white"
          value={categoryId || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white"
          value={status || ''}
          onChange={(e) => setStatus((e.target.value as ProjectStatus) || undefined)}
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="archived">Archived</option>
        </select>

        <label className="inline-flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={!!isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked ? true : undefined)}
            className="rounded border-white/30 bg-black/20 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
          />
          <span>Featured</span>
        </label>

        <select
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
        >
          {[6, 10, 12, 16, 20].map((n) => (
            <option key={n} value={n}>
              {n}/page
            </option>
          ))}
        </select>
      </div>

      {/* Projects list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-white/80">Loading projects...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-white/80">No projects found.</p>
        </div>
      ) : (
        <>
          {typeof count === 'number' && (
            <div className="text-white/80 text-sm mb-2">
              {count} project{count !== 1 ? 's' : ''} found
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative flex flex-col rounded-2xl border border-white/20 bg-black/30 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 overflow-hidden cursor-pointer hover:opacity-90"
                onClick={() => handleProjectClick(project)}
              >
                {project.featured_image_url && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={project.featured_image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  
                  {/* Category badge - check if categories property exists */}
                  {(project as any).categories && (
                    <div className="mb-3">
                      <span 
                        className="inline-block px-3 py-1 text-xs font-medium rounded-full border"
                        style={{
                          backgroundColor: `${(project as any).categories.color || '#3b82f6'}20`,
                          color: (project as any).categories.color || '#93c5fd',
                          borderColor: `${(project as any).categories.color || '#3b82f6'}40`
                        }}
                      >
                        {(project as any).categories.name}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-white/90 line-clamp-3 flex-grow leading-relaxed">
                    {project.short_description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                        <span>Demo</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {project.status === 'completed' && (
                      <FaCheckCircle
                        title="Completed"
                        className="text-green-400 text-lg"
                      />
                    )}
                    {project.status === 'in-progress' && (
                      <MdOutlinePending
                        title="In Progress"
                        className="text-yellow-400 text-lg"
                      />
                    )}
                    {project.status === 'archived' && (
                      <FaArchive
                        title="Archived"
                        className="text-gray-400 text-lg"
                      />
                    )}
                    <span className="text-sm font-medium text-white/90 capitalize">
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>

                  {showAdminActions && (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="px-3 py-1.5 rounded-lg border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 transition-colors text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Edit
                      </a>
                      <button
                        className="px-3 py-1.5 rounded-lg border border-red-500/50 text-red-400 bg-red-800/10 hover:bg-red-800/20 hover:border-red-500 transition-colors text-sm"
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
          {typeof count === 'number' && count > 0 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="text-white/70 text-sm">
                Page {page} of {Math.max(1, Math.ceil(count / limit))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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