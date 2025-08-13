// app/project/page.tsx
import ProjectList from "@/components/ProjectList";

export default function ProjectPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


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
        <aside className="lg:w-1/4 p-6 bg-black/30 backdrop-blur-lg rounded-lg shadow-sm h-fit">
          <h3 className="text-xl font-bold text-white mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Category</h4>
              <ul className="space-y-1">
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">Web Development</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">Mobile Apps</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">UI/UX Design</span></label></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Technology</h4>
              <ul className="space-y-1">
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">React</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">Next.js</span></label></li>
                <li><label className="flex items-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-red-600 rounded" /> <span className="ml-2 text-white">Vue.js</span></label></li>
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
