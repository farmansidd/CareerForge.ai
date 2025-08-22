import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg mt-12">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} CareerForge AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
