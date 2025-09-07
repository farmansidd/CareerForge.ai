import React from 'react';
import Navbar from './Navbar';

const MainLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto ">
        {children}
      </main>
      
    </div>
  );
};

export default MainLayout;
