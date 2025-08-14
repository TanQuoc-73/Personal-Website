export default function Footer() {
  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-red-600 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo / Brand */}
          <div>
            <h2 className="text-2xl font-bold text-red-500">MyPortfolio</h2>
            <p className="text-gray-300 mt-2">
              Nơi tôi chia sẻ các dự án, kỹ năng và dịch vụ chuyên nghiệp.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-400">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-red-500 transition">About Me</a></li>
              <li><a href="/portfolio" className="hover:text-red-500 transition">Portfolio</a></li>
              <li><a href="/services" className="hover:text-red-500 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-red-500 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-400">Kết nối</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-500 transition">🌐</a>
              <a href="#" className="hover:text-red-500 transition">🐦</a>
              <a href="#" className="hover:text-red-500 transition">📸</a>
              <a href="#" className="hover:text-red-500 transition">💼</a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} MyPortfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
