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
    <main className="min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-300 mt-2">Quản lý nội dung, dự án, kỹ năng và tin nhắn liên hệ.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-4 sticky top-24">
              <div className="text-sm text-gray-300 font-medium">Quick Actions</div>
              <div className="flex flex-col gap-2">
                <Link href="/admin/projects/new">
                  <Button variant="ghost" className="w-full text-left">➕ Create Project</Button>
                </Link>
                <Link href="/admin/skills/new">
                  <Button variant="ghost" className="w-full text-left">➕ Create Skill</Button>
                </Link>
                <Link href="/admin/categories">
                  <Button variant="ghost" className="w-full text-left">🗂️ Manage Categories</Button>
                </Link>
                <Link href="/admin/contact-messages">
                  <Button variant="ghost" className="w-full text-left">📨 Contact Messages</Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="text-xs text-gray-400 mb-2">Admin Links</div>
                <nav className="flex flex-col gap-2">
                  <a href="#projects" className="text-sm text-gray-200 hover:text-red-400">Projects</a>
                  <a href="#skills" className="text-sm text-gray-200 hover:text-red-400">Skills</a>
                  <a href="#experiences" className="text-sm text-gray-200 hover:text-red-400">Experiences</a>
                  <a href="#blogs" className="text-sm text-gray-200 hover:text-red-400">Blogs</a>
                  <a href="#contacts" className="text-sm text-gray-200 hover:text-red-400">Contacts</a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="lg:col-span-3 space-y-6">
            {/* Overview cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl p-4 bg-black/30 border border-white/10 shadow-md">
                <div className="text-sm text-gray-300">Projects</div>
                <div className="text-2xl font-bold text-white mt-2">—</div>
                <div className="text-sm text-gray-400 mt-1">Quickly manage your projects</div>
              </div>
              <div className="rounded-2xl p-4 bg-black/30 border border-white/10 shadow-md">
                <div className="text-sm text-gray-300">Skills</div>
                <div className="text-2xl font-bold text-white mt-2">—</div>
                <div className="text-sm text-gray-400 mt-1">Create or update skill items</div>
              </div>
              <div className="rounded-2xl p-4 bg-black/30 border border-white/10 shadow-md">
                <div className="text-sm text-gray-300">Contact Messages</div>
                <div className="text-2xl font-bold text-white mt-2">—</div>
                <div className="text-sm text-gray-400 mt-1">View incoming messages</div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Dự án</h2>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                      Tạo dự án mới
                    </Button>
                  </div>
                  <ProjectList adminView={true} />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Kỹ năng</h2>
                    <Link href="/admin/skills/new">
                      <Button>Thêm kỹ năng</Button>
                    </Link>
                  </div>
                  <SkillList adminView={true} />
                </div>
              </div>

              <Modal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)}
                title="Tạo dự án mới"
              >
                <ProjectForm onClose={() => setIsCreateModalOpen(false)} />
              </Modal>
            </div>

            {/* Placeholder sections */}
            <div id="experiences" className="rounded-2xl p-6 bg-black/20 border border-white/5 text-gray-300">
              <h3 className="font-semibold text-white mb-2">Experiences</h3>
              <p className="text-sm">Manage experience entries (create/edit/delete) — UI will be added here.</p>
            </div>

            <div id="blogs" className="rounded-2xl p-6 bg-black/20 border border-white/5 text-gray-300">
              <h3 className="font-semibold text-white mb-2">Blogs</h3>
              <p className="text-sm">Manage blog posts — UI will be added here.</p>
            </div>

            <div id="contacts" className="rounded-2xl p-6 bg-black/20 border border-white/5 text-gray-300">
              <h3 className="font-semibold text-white mb-2">Contacts</h3>
              <p className="text-sm">View and respond to contact messages — UI will be added here.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
