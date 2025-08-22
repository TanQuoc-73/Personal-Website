'use client';

import { Modal } from '@/components/ui/modal';
import { Project } from '@/types/project';
import { FaCheckCircle, FaArchive, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import { MdOutlinePending } from 'react-icons/md';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/20 bg-black/30 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Featured Image */}
          {project.featured_image_url && (
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src={project.featured_image_url}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Status and Featured Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              {project.status === 'completed' && (
                <FaCheckCircle className="text-green-400 text-sm" />
              )}
              {project.status === 'in-progress' && (
                <MdOutlinePending className="text-yellow-400 text-sm" />
              )}
              {project.status === 'archived' && (
                <FaArchive className="text-gray-400 text-sm" />
              )}
              <span className="text-sm font-medium text-white capitalize">
                {project.status === 'completed' ? 'Completed' : 
                 project.status === 'in-progress' ? 'In Progress' : 'Archived'}
              </span>
            </div>
            
            {project.is_featured && (
              <div className="px-3 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30">
                <span className="text-sm font-medium text-yellow-300">Featured</span>
              </div>
            )}
          </div>
          
          {/* Short Description */}
          {project.short_description && (
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-lg text-white/90 leading-relaxed">
                {project.short_description}
              </p>
            </div>
          )}
          
          {/* Full Description */}
          {project.description && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
                Description
              </h3>
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-white/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: project.description }} 
                />
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 hover:border-white/30"
              >
                <FaGithub className="w-5 h-5" />
                <span className="font-medium">View Source</span>
              </a>
            )}
            
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                <span className="font-medium">Live Demo</span>
              </a>
            )}
          </div>
          
          {/* Project Timeline */}
          {(project.start_date || project.end_date) && (
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-sm font-medium">Timeline:</span>
                <span className="text-sm">
                  {project.start_date} - {project.end_date || 'Present'}
                </span>
              </div>
            </div>
          )}

          {/* Additional info can be added here if needed */}
        </div>
      </div>
    </div>
  );
}