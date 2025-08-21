'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProjectList from '@/components/ProjectList';
import SkillList from '@/components/SkillList';
import { Modal } from '@/components/ui/modal';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function AdminPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Redirect non-admin users away from admin UI
    if (profile && profile.role !== 'admin') {
      router.replace('/');
    }
  }, [profile, router]);

  return (
    <main className="min-h-screen bg-transparent py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">
            Manage content, projects, skills and contact messages.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Responsive */}
          <aside className="xl:col-span-1">
            <div className="bg-black/50 backdrop-blur border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-3 mb-6">
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full justify-start bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300"
                  variant="outline"
                >
                  ➕ Create New Project
                </Button>
                
                <Link href="/admin/skills/new" className="block">
                  <Button 
                    className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-gray-200"
                    variant="outline"
                  >
                    ⚡ Add Skill
                  </Button>
                </Link>
                
                <Link href="/admin/categories" className="block">
                  <Button 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                    variant="ghost"
                  >
                    🗂️ Manage Categories
                  </Button>
                </Link>
                
                <Link href="/admin/contact-messages" className="block">
                  <Button 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
                    variant="ghost"
                  >
                    📨 Contact Messages
                  </Button>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wider">
                  Navigation
                </h4>
                <nav className="space-y-2">
                  <a href="#skills" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    → Skills
                  </a>
                  <a href="#projects" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    → Projects
                  </a>
                  <a href="#experiences" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    → Experiences
                  </a>
                  <a href="#blogs" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    → Blog Posts
                  </a>
                  <a href="#contacts" className="block text-sm text-gray-400 hover:text-white transition-colors">
                    → Contact Messages
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="xl:col-span-3 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500/10 via-black/20 to-black/30 backdrop-blur border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-400 font-medium">Projects</h3>
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    📁
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">Manage your projects</p>
              </div>

              <div className="bg-gradient-to-br from-white/5 via-black/20 to-black/30 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Skills</h3>
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">Update your skills</p>
              </div>

              <div className="bg-gradient-to-br from-gray-500/10 via-black/20 to-black/30 backdrop-blur border border-gray-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-300 font-medium">Messages</h3>
                  <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                    📨
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">View contact messages</p>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-8">
              {/* Skills Section */}
              <div id="skills" className="bg-black/30 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Skills Management</h2>
                  <Link href="/admin/skills/new">
                    <Button size="sm" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white">
                      Add Skill
                    </Button>
                  </Link>
                </div>
                <SkillList adminView={true} />
              </div>
              
              {/* Projects Section */}
              <div id="projects" className="bg-black/30 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Project Management</h2>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Create New
                  </Button>
                </div>
                <ProjectList adminView={true} />
              </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-6">
              <div id="experiences" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Work Experience</h3>
                  <Button variant="outline" size="sm" disabled className="border-white/10 text-gray-400">
                    Coming Soon
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Manage work experience entries - Interface under development.
                </p>
              </div>

              <div id="blogs" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Blog Posts</h3>
                  <Button variant="outline" size="sm" disabled className="border-white/10 text-gray-400">
                    Coming Soon
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Manage blog articles - Interface under development.
                </p>
              </div>

              <div id="contacts" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Contact Messages</h3>
                  <Link href="/admin/contact-messages">
                    <Button variant="outline" size="sm" className="border-white/10 text-white hover:bg-white/5">
                      View All
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-400 text-sm">
                  View and respond to customer contact messages.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Modal */}
        <Modal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Project"
        >
          <ProjectForm onClose={() => setIsCreateModalOpen(false)} />
        </Modal>
      </div>
    </main>
  );
}