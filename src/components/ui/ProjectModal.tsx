'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/project';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={project.title}
    >
        
        <div className="space-y-6">
          {project.featured_image_url && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={project.featured_image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {project.status === 'completed' ? 'Đã hoàn thành' : 'Đang phát triển'}
              </span>
              {project.is_featured && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                  Nổi bật
                </span>
              )}
            </div>
            
            {project.short_description && (
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {project.short_description}
              </p>
            )}
            
            {project.description && (
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            )}
            
            <div className="flex flex-wrap gap-4 pt-4">
              {project.github_url && (
                <Button asChild variant="outline">
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Xem mã nguồn
                  </a>
                </Button>
              )}
              
              {project.demo_url && (
                <Button asChild>
                  <a 
                    href={project.demo_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Xem demo
                  </a>
                </Button>
              )}
            </div>
            
            {(project.start_date || project.end_date) && (
              <div className="pt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>Thời gian: {project.start_date} - {project.end_date || 'Hiện tại'}</p>
              </div>
            )}
          </div>
        </div>
    </Modal>
  );
}
