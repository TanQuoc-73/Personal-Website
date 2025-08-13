// app/project/page.tsx
import ProjectList from "@/components/ProjectList";

export default function ProjectPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title + mô tả */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          My <span className="text-red-600">Projects</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the projects I've worked on. Use the filters to navigate through different technologies and categories.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search projects by name or technology..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <aside className="lg:w-1/4 p-6 bg-gray-50 rounded-lg shadow-sm h-fit">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Category</h4>
              <ul className="space-y-1">
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">Web Development</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">Mobile Apps</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">UI/UX Design</span></label></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Technology</h4>
              <ul className="space-y-1">
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">React</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">Next.js</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-gray-600">Vue.js</span></label></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Content - Project List */}
        <section className="lg:w-3/4">
          <ProjectList />
        </section>
      </div>
    </main>
  );
}
