'use client';

import { useProjects } from '@/hooks/useProjects';
import { FaCheckCircle, FaArchive, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';

export default function ProjectList() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative flex flex-col rounded-2xl border border-white/20 bg-black/20 backdrop-blur-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 overflow-hidden"
        >
          {/* Ảnh dự án */}
          {project.featured_image_url && (
            <img
              src={project.featured_image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}

          {/* Nội dung */}
          <div className="flex flex-col flex-1 p-5">
            {/* Tiêu đề */}
            <h3 className="text-xl font-bold text-white mb-2">
              {project.title}
            </h3>

            {/* Mô tả */}
            <p className="text-gray-300 line-clamp-3 flex-grow">
              {project.short_description}
            </p>

            {/* Links */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
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
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            {/* Trạng thái với icon */}
            <div className="flex items-center gap-2 mt-3">
              {project.status === 'completed' && (
                <FaCheckCircle
                  title="Hoàn thành"
                  className="text-green-600 text-lg"
                />
              )}
              {project.status === 'in-progress' && (
                <MdOutlinePending
                  title="Đang thực hiện"
                  className="text-yellow-500 text-lg"
                />
              )}
              {project.status === 'archived' && (
                <FaArchive
                  title="Đã lưu trữ"
                  className="text-gray-500 text-lg"
                />
              )}
              <span className="text-sm font-medium text-gray-600 capitalize">
                {project.status.replace('-', ' ')}
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
