// src/components/Footer.js
import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-red-600 p-4 mt-8">
      <div className="container mx-auto flex justify-end">
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <FaInstagram className="text-2xl hover:text-gray-400" />
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <FaFacebook className="text-2xl hover:text-gray-400" />
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
          <FaLinkedin className="text-2xl hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
