'use client';

import { useProjects } from '@/hooks/useProjects';
import { FaCheckCircle, FaArchive } from 'react-icons/fa';
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
          className="flex flex-col border border-black/20 rounded-xl shadow-sm hover:shadow-xl bg-white transition-all duration-300 overflow-hidden"
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
            <h3 className="text-xl font-bold text-black mb-2">
              {project.title}
            </h3>

            {/* Mô tả */}
            <p className="text-gray-700 line-clamp-3">
              {project.short_description}
            </p>

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

            {/* Nút hành động */}
            <div className="mt-5 flex gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Xem Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 rounded-lg border border-red-600 text-red-600 font-medium hover:bg-red-50 transition-colors"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
