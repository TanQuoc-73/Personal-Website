// app/project/page.tsx
import ProjectList from "@/components/ProjectList";

export default function ProjectPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Title + mô tả */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          My <span className="text-red-600">Projects</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Đây là các dự án mình đã thực hiện hoặc đang phát triển.  
          Bạn có thể xem chi tiết để tìm hiểu về công nghệ, tính năng và kết quả.
        </p>
      </div>

      {/* Danh sách dự án */}
      <section className="mt-10">
        <ProjectList/>
      </section>
    </main>
  );
}
