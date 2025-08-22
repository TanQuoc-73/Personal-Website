import { FaGithub, FaLinkedin, FaTwitter, FaDev, FaStackOverflow, FaMedium } from 'react-icons/fa';
import { SiHashnode, SiDevpost } from 'react-icons/si';

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
              Where I share my projects, skills, and professional services.
            </p>
          </div>

          {/* Developer Profiles */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-400">Developer Profiles</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://stackoverflow.com/users/youruserid" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaStackOverflow className="w-5 h-5" />
                  <span>Stack Overflow</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://dev.to/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaDev className="w-5 h-5" />
                  <span>DEV Community</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Blog */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-400">Social & Blog</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaTwitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://medium.com/@yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <FaMedium className="w-5 h-5" />
                  <span>Medium</span>
                </a>
              </li>
            </ul>
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
