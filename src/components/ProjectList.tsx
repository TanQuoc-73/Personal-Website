'use client';

import { useProjects, type ProjectsQuery } from '@/hooks/useProjects';
import { FaCheckCircle, FaArchive, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  initialFilters?: ProjectsQuery;
  categories?: { id: string; name: string }[];
};

export default function ProjectList({ initialFilters = {}, categories = [], showAdminActions = false }: Props & { showAdminActions?: boolean }) {
  // Manage filters internally
  const [search, setSearch] = useState<string>(initialFilters.search ?? '');
  const [categoryId, setCategoryId] = useState<string | undefined>(initialFilters.categoryId);
  const [status, setStatus] = useState<string | undefined>(initialFilters.status);
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

  return (
    <div className="space-y-6">
      {/* Filter inputs */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white flex-grow min-w-[200px]"
        />

        <select
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white"
          value={categoryId || ''}
          onChange={(e) => setCategoryId(e.target.value || undefined)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="px-3 py-2 rounded border border-white/30 bg-black/20 text-white"
          value={status || ''}
          onChange={(e) => setStatus(e.target.value || undefined)}
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
          />
          <span>Featured</span>
        </label>
      </div>

      {/* Projects list */}
      {isLoading ? (
        <p>Loading projects...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-white/80">No projects found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {typeof count === 'number' && (
              <div className="col-span-full text-white/80 text-sm mb-2">{count} project(s)</div>
            )}
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl border border-white/20 bg-black/30 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 overflow-hidden"
              >
                {project.featured_image_url && (
                  <img
                    src={project.featured_image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="flex flex-col flex-1 p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white line-clamp-3 flex-grow">{project.short_description}</p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-white transition-colors"
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
                        className="flex items-center gap-2 text-white hover:text-white transition-colors"
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
                        className="text-green-600 text-lg"
                      />
                    )}
                    {project.status === 'in-progress' && (
                      <MdOutlinePending
                        title="In Progress"
                        className="text-yellow-500 text-lg"
                      />
                    )}
                    {project.status === 'archived' && (
                      <FaArchive
                        title="Archived"
                        className="text-gray-500 text-lg"
                      />
                    )}
                    <span className="text-sm font-medium text-white capitalize">
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>

                  {showAdminActions && (
                    <div className="flex items-center gap-2 mt-4">
                      <a
                        href={`/admin/projects/${project.id}`}
                        className="px-3 py-1 rounded border border-white/20 text-white/90 bg-white/5 hover:bg-white/10"
                      >
                        Edit
                      </a>
                      <button
                        className="px-3 py-1 rounded border border-red-500 text-red-400 bg-red-800/10 hover:bg-red-800/20"
                        onClick={async () => {
                          if (!confirm('Delete this project?')) return;
                          try {
                            const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
                            if (!res.ok) throw new Error('Delete failed');
                            // simple refresh
                            window.location.reload();
                          } catch (e) {
                            alert((e as any).message ?? 'Delete failed');
                          }
                        }}
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
            <div className="flex items-center justify-between mt-6 space-x-2">
              <div className="text-white/70 text-sm">
                Page {page} / {Math.max(1, Math.ceil(count / limit))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-1 rounded border border-white/20 text-white/90 disabled:opacity-50"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                >
                  Prev
                </button>
                <button
                  className="px-3 py-1 rounded border border-white/20 text-white/90 disabled:opacity-50"
                  onClick={() => {
                    const totalPages = Math.max(1, Math.ceil(count / limit));
                    setPage((p) => Math.min(totalPages, p + 1));
                  }}
                  disabled={page >= Math.max(1, Math.ceil(count / limit))}
                >
                  Next
                </button>
                <select
                  className="ml-2 bg-transparent border border-white/20 text-white/90 rounded px-2 py-1"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {[6, 10, 12, 16, 20].map((n) => (
                    <option key={n} value={n} className="bg-black">
                      {n}/page
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
