import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-4 bg-gray-900 text-white text-center">
      <div className="flex justify-center space-x-4">
        {/* GitHub */}
        <a
          href="https://github.com/Pavan-personal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-3xl hover:text-gray-400 transition-colors duration-300" />
        </a>
        {/* Twitter */}
        <a
          href="https://x.com/Mithabhashi__"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="text-3xl hover:text-blue-400 transition-colors duration-300" />
        </a>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/pavan-kumar-anupoju-351b12247/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-3xl hover:text-blue-600 transition-colors duration-300" />
        </a>
      </div>
      <p className="mt-4 text-sm">
        &copy; Pavan Kumar Anupoju
      </p>
    </footer>
  );
}

export default Footer;
