import React from 'react';

const PortfolioPage = () => {
  const pdfUrl = '/resume.pdf'; // Place your resume.pdf in the /public folder

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">

        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden mb-8">
          <div className="p-6 flex justify-between items-center bg-gray-700/50">
            <h2 className="text-2xl font-semibold">My Resume</h2>
            <a
              href={pdfUrl}
              download
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:brightness-110 transition duration-300 transform hover:scale-105"
            >
              Download PDF
            </a>
          </div>
          <div className="w-full h-[80vh]">
            <iframe
              src={pdfUrl}
              title="Resume"
              width="100%"
              height="100%"
              className="border-none"
            />
          </div>
        </div>

        <div className="text-center">
            <a href="/" className="text-purple-400 hover:text-pink-500 transition-colors duration-300">
                &larr; Back to Home
            </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
