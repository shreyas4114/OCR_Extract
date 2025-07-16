"use client";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
            >
              OCR<span className="font-extrabold">Extract</span>
            </Link>
            <p className="mt-4 text-base text-gray-600 max-w-md">
              Extract key details from Aadhaar and PAN cards with our secure OCR engine. Convert scanned documents to usable data effortlessly.
            </p>
            <div className="mt-6 flex space-x-6">
              {/* Social icons */}
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                {/* Facebook Icon */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92..." />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06..."
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 tracking-wider uppercase">
              What We Extract
            </h3>
            <ul className="mt-4 space-y-4">
              <li><span className="text-base text-gray-600">Name</span></li>
              <li><span className="text-base text-gray-600">Date of Birth</span></li>
              <li><span className="text-base text-gray-600">Aadhaar Number</span></li>
              <li><span className="text-base text-gray-600">PAN Number</span></li>
              <li><span className="text-base text-gray-600">Father's Name (from PAN)</span></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Upload Document
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Security & Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {new Date().getFullYear()} OCRExtract. Built for secure and seamless document data extraction.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
