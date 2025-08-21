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
          <p className="text-gray-300">
            Quản lý nội dung, dự án, kỹ năng và tin nhắn liên hệ.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Responsive */}
          <aside className="xl:col-span-1">
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              
              <div className="space-y-3 mb-6">
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full justify-start bg-red-600/20 hover:bg-red-600/30 border-red-500/20 text-red-400"
                  variant="outline"
                >
                  ➕ Tạo dự án mới
                </Button>
                
                <Link href="/admin/skills/new" className="block">
                  <Button 
                    className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/20 text-blue-400"
                    variant="outline"
                  >
                    ⚡ Thêm kỹ năng
                  </Button>
                </Link>
                
                <Link href="/admin/categories" className="block">
                  <Button 
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    🗂️ Quản lý danh mục
                  </Button>
                </Link>
                
                <Link href="/admin/contact-messages" className="block">
                  <Button 
                    className="w-full justify-start"
                    variant="ghost"
                  >
                    📨 Tin nhắn liên hệ
                  </Button>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs text-gray-400 font-medium mb-3 uppercase tracking-wider">
                  Điều hướng
                </h4>
                <nav className="space-y-2">
                  <a href="#projects" className="block text-sm text-gray-300 hover:text-red-400 transition-colors">
                    → Dự án
                  </a>
                  <a href="#skills" className="block text-sm text-gray-300 hover:text-red-400 transition-colors">
                    → Kỹ năng
                  </a>
                  <a href="#experiences" className="block text-sm text-gray-300 hover:text-red-400 transition-colors">
                    → Kinh nghiệm
                  </a>
                  <a href="#blogs" className="block text-sm text-gray-300 hover:text-red-400 transition-colors">
                    → Blog
                  </a>
                  <a href="#contacts" className="block text-sm text-gray-300 hover:text-red-400 transition-colors">
                    → Liên hệ
                  </a>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="xl:col-span-3 space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur border border-red-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-red-400 font-medium">Dự án</h3>
                  <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                    📁
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">Quản lý dự án của bạn</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-blue-400 font-medium">Kỹ năng</h3>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">Cập nhật kỹ năng</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-green-400 font-medium">Tin nhắn</h3>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    📨
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">—</div>
                <p className="text-gray-400 text-sm">Xem tin nhắn liên hệ</p>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-8">
              {/* Skills Section */}
              <div id="skills" className="bg-black/30 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Kỹ năng</h2>
                  <Link href="/admin/skills/new">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Thêm kỹ năng
                    </Button>
                  </Link>
                </div>
                <SkillList adminView={true} />
              </div>
              
              {/* Projects Section */}
              <div id="projects" className="bg-black/30 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Dự án</h2>
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Tạo mới
                  </Button>
                </div>
                <ProjectList adminView={true} />
              </div>
            </div>

            {/* Additional Sections */}
            <div className="space-y-6">
              <div id="experiences" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Kinh nghiệm làm việc</h3>
                  <Button variant="outline" size="sm" disabled>
                    Sắp ra mắt
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Quản lý thông tin kinh nghiệm làm việc - Giao diện đang được phát triển.
                </p>
              </div>

              <div id="blogs" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Bài viết Blog</h3>
                  <Button variant="outline" size="sm" disabled>
                    Sắp ra mắt
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Quản lý các bài viết blog - Giao diện đang được phát triển.
                </p>
              </div>

              <div id="contacts" className="bg-black/20 backdrop-blur border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-lg">Tin nhắn liên hệ</h3>
                  <Link href="/admin/contact-messages">
                    <Button variant="outline" size="sm">
                      Xem tất cả
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-400 text-sm">
                  Xem và phản hồi các tin nhắn liên hệ từ khách hàng.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Modal */}
        <Modal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)}
          title="Tạo dự án mới"
        >
          <ProjectForm onClose={() => setIsCreateModalOpen(false)} />
        </Modal>
      </div>
    </main>
  );
}