import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLaptopCode, 
  FaBars, FaTimes, FaUserCircle, FaChevronDown, 
  FaChartLine, FaBullseye, FaCogs, FaLightbulb, 
  FaGraduationCap, FaHandsHelping, FaTools, FaQuestionCircle, FaFileAlt
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-90 border-b border-cyan-500/30">
      <div className="flex items-center justify-between h-20 w-full px-6">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FaLightbulb className="relative text-cyan-400 text-3xl animate-pulse-slow" />
          </div>
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
            CareerForge<span className="text-cyan-300">.ai</span>
          </span>/
        </Link>

        {/* Middle Section: Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavItem to="/dashboard" icon={<FaChartLine size={20} />} text="Dashboard" />
          <NavItem to="/job-search" icon={<FaLaptopCode size={20} />} text="Job Search" />
          <NavItem to="/roadmaps" icon={<FaGraduationCap size={20} />} text="Road Maps" />
          <NavItem to="/resume" icon={<FaFileAlt size={20} />} text="Resume Builder" />
          
          {/* Help & Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => setHelpOpen(!helpOpen)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
            >
              <FaHandsHelping className="text-cyan-400 text-xl" />
              <span className="text-lg whitespace-nowrap">Help & Resources</span>
              <FaChevronDown className={`text-sm transition-transform ${helpOpen ? 'rotate-180' : ''}`} />
            </button>

            {helpOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-700">
                <Link
                  to="/faq"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700/70 hover:text-white transition"
                  onClick={() => setHelpOpen(false)}
                >
                  <FaQuestionCircle className="text-cyan-400" />
                  <span>FAQ</span>
                </Link>
                <Link
                  to="/guides"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700/70 hover:text-white transition"
                  onClick={() => setHelpOpen(false)}
                >
                  <FaLightbulb className="text-yellow-400" />
                  <span>Guides & Tutorials</span>
                </Link>
                <Link
                  to="/support"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700/70 hover:text-white transition"
                  onClick={() => setHelpOpen(false)}
                >
                  <FaHandsHelping className="text-green-400" />
                  <span>Contact Support</span>
                </Link>
                <Link
                  to="/feedback"
                  className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-700/70 hover:text-white transition"
                  onClick={() => setHelpOpen(false)}
                >
                  <FaBullseye className="text-pink-400" />
                  <span>Send Feedback</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Profile Section */}
      

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cyan-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-filter backdrop-blur-md border-t border-cyan-500/30">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <MobileNavItem to="/dashboard" icon={<FaChartLine />} text="Dashboard" setIsOpen={setIsOpen} />
            <MobileNavItem to="/job-search" icon={<FaLaptopCode />} text="Job Search" setIsOpen={setIsOpen} />
          <MobileNavItem to="/roadmaps" icon={<FaGraduationCap />} text="Road Maps" setIsOpen={setIsOpen} />
            <MobileNavItem to="/resume" icon={<FaFileAlt />} text="Resume Builder" setIsOpen={setIsOpen} />
            
            <div className="border-t border-gray-700 pt-3 mt-2">
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2 px-3">Profile</h3>
              <MobileNavItem to="/profile" icon={<FaUserCircle />} text="User Profile" setIsOpen={setIsOpen} />
              <MobileNavItem to="/goals" icon={<FaBullseye />} text="Career Goals" setIsOpen={setIsOpen} />
              <MobileNavItem to="/skills" icon={<FaTools />} text="Skills" setIsOpen={setIsOpen} />
              <MobileNavItem to="/settings" icon={<FaCogs />} text="Settings" setIsOpen={setIsOpen} />
            </div>

            <div className="border-t border-gray-700 pt-3 mt-2">
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-wider mb-2 px-3">Help & Resources</h3>
              <MobileNavItem to="/faq" icon={<FaQuestionCircle />} text="FAQ" setIsOpen={setIsOpen} />
              <MobileNavItem to="/guides" icon={<FaLightbulb />} text="Guides & Tutorials" setIsOpen={setIsOpen} />
              <MobileNavItem to="/support" icon={<FaHandsHelping />} text="Contact Support" setIsOpen={setIsOpen} />
              <MobileNavItem to="/feedback" icon={<FaBullseye />} text="Send Feedback" setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// NavItem Component for desktop
const NavItem: React.FC<{ to: string; icon: JSX.Element; text: string }> = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 group text-gray-300 hover:text-white transition-all duration-300"
  >
    <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
      {icon}
    </span>
    <span className="text-lg font-medium group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.6)] whitespace-nowrap">
      {text}
    </span>
    <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 w-0 group-hover:w-full transition-all duration-300"></div>
  </Link>
);

// MobileNavItem Component with TypeScript interface
interface MobileNavItemProps {
  to: string;
  icon: JSX.Element;
  text: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, icon, text, setIsOpen }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-gray-800/70 transition-colors"
    onClick={() => setIsOpen(false)}
  >
    <span className="text-cyan-400 text-lg">
      {icon}
    </span>
    <span className="text-gray-200 font-medium">
      {text}
    </span>
  </Link>
);

export default Navbar;