import React, { useState, useEffect } from 'react';
import AI from '../assets/AI.jpg';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, FaStar, 
  FaGithub, FaLinkedin, FaTwitter,
  FaLaptopCode, FaBrain, FaTrophy, FaRoad, FaChartLine, FaBullseye
} from 'react-icons/fa';

const LandingPage: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const headline = "Navigate Your Future with AI-Powered Career Planning";
  const subheadline = "From skill tracking to personalized career plans — your career growth starts here.";

  useEffect(() => {
    if (currentIndex < headline.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + headline[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      
      return () => clearTimeout(timeout);
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, headline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Glass Header */}
      <header className="sticky top-0 z-50 bg-slate-900/20 backdrop-blur-2xl border-b border-cyan-500/20 shadow-lg">
        <div className="container mx-auto px-4  flex justify-between items-center">
          {/* Header content commented out as in original */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content - Enhanced spacing and typography */}
            <div className="lg:w-1/2 space-y-8 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  {typedText}
                </span>
                {showCursor && <span className="ml-1 animate-pulse text-cyan-400">|</span>}
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                {subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/register" 
                  className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-cyan-500/30 hover:shadow-2xl"
                >
                  Get Started 
                  <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a 
                  href="#features" 
                  className="group flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105"
                >
                  <span>Explore Features</span>
                </a>
              </div>
            </div>

            {/* Right Section - Enhanced with better spacing and professional layout */}
          <div className="lg:w-1/2 flex items-center justify-center lg:justify-end w-full min-h-[500px]">
  <img 
    src={AI} 
    alt="AI Illustration"
    className='AI min-w-[auto] '
  />
</div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-blue-900/30 to-purple-900/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Your Career Growth in <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">3 Simple Steps</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1}
              icon={<FaBullseye />}
              title="Set Career Goals"
              description="Define where you want to be in your career journey"
            />
            <StepCard 
              number={2}
              icon={<FaChartLine />}
              title="Assess Your Skills"
              description="Discover your strengths and identify skill gaps"
            />
            <StepCard 
              number={3}
              icon={<FaRoad />}
              title="Follow Your Roadmap"
              description="Get a personalized roadmap to your dream job"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Powerful Features to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Accelerate Your Career</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to take control of your professional development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="AI Career Recommendations"
              description="Smart suggestions based on your skills, interests, and market trends"
              icon={<FaBrain />}
            />
            <FeatureCard 
              title="Skill Gap Analysis"
              description="Identify exactly what you're missing for your dream role"
              icon={<FaTrophy />}
            />
            <FeatureCard 
              title="AI Resume Builder"
              description="Create optimized resumes tailored to your target industry"
              icon={<FaLaptopCode />}
            />
            <FeatureCard 
              title="Progress Dashboard"
              description="Visualize your growth and track milestones"
              icon={<FaChartLine />}
            />
            <FeatureCard 
              title="Job Search"
              description="Discover opportunities that align with your skillset"
              icon={<FaLaptopCode />}
            />
             <FeatureCard 
              title="Personalized Roadmaps"
              description="Get a step-by-step guide to your career goals"
              icon={<FaRoad />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-purple-900/30 to-blue-900/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Success <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Stories</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial 
              name="Michael Torres"
              role="Product Manager at InnovateCo"
              content="The skill gap analysis revealed exactly what I needed to move into leadership. I got promoted within 6 months of using CareerForge."
              stars={5}
              img="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <Testimonial 
              name="Priya Sharma"
              role="Data Scientist at DataWorks"
              content="I doubled my salary by following the AI-generated career path. The learning recommendations were perfectly tailored to my goals."
              stars={5}
              img="https://randomuser.me/api/portraits/women/44.jpg"
            />
             <Testimonial 
              name="James Brown"
              role="Software Engineer at TechSolutions"
              content="The resume builder helped me land my dream job at a FAANG company. The AI suggestions were spot on!"
              stars={5}
              img="https://randomuser.me/api/portraits/men/46.jpg"
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-r from-cyan-700/30 to-blue-800/30 backdrop-filter backdrop-blur-lg rounded-3xl p-12 border border-cyan-500/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your career journey starts <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">today</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Don't just dream about your ideal career - plan it, build it, and achieve it with AI-powered guidance.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg
                        hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/30"
            >
              Start Free Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-filter backdrop-blur-lg border-t border-cyan-500/10 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-cyan-500 w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="text-gray-900 font-bold text-sm">CF</div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                  CareerForge<span className="text-cyan-300">.ai</span>
                </span>
              </div>
              <div className="flex space-x-4">
                <a href="#!" className="text-gray-400 hover:text-cyan-400 transition">
                  <FaLinkedin size={20} />
                </a>
                <a href="#!" className="text-gray-400 hover:text-cyan-400 transition">
                  <FaTwitter size={20} />
                </a>
                <a href="#!" className="text-gray-400 hover:text-cyan-400 transition">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-gray-400 uppercase text-sm font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#!" className="hover:text-cyan-400 transition">About</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Careers</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Blog</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase text-sm font-bold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#!" className="hover:text-cyan-400 transition">Help Center</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Tutorials</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Community</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase text-sm font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#!" className="hover:text-cyan-400 transition">Privacy</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Terms</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Cookies</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-400 uppercase text-sm font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li><a href="#!" className="hover:text-cyan-400 transition">Support</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Sales</a></li>
                  <li><a href="#!" className="hover:text-cyan-400 transition">Feedback</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CareerForge.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Step Card Component
const StepCard: React.FC<{ number: number; icon: React.ReactNode; title: string; description: string }> = 
  ({ number, icon, title, description }) => (
    <div className="group bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 text-cyan-400">{icon}</div>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
          {number}
        </div>
        <h3 className="text-xl font-bold group-hover:text-cyan-300 transition-colors">{title}</h3>
      </div>
      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
    </div>
  );

// Feature Card Component
const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = 
  ({ title, description, icon }) => (
    <div className="group bg-slate-800/20 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 text-cyan-400">{icon}</div>
      <h3 className="text-xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
    </div>
  );

// Testimonial Component
const Testimonial: React.FC<{ name: string; role: string; content: string; stars: number; img: string }> = 
  ({ name, role, content, stars, img }) => (
    <div className="group bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex mb-6">
        {[...Array(stars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300" style={{animationDelay: `${i * 0.1}s`}} />
        ))}
      </div>
      <p className="text-slate-300 italic mb-6 leading-relaxed group-hover:text-white transition-colors">"{content}"</p>
      <div className="flex items-center">
        <img src={img} alt={name} className="w-14 h-14 rounded-full mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300"/>
        <div>
          <div className="font-bold group-hover:text-cyan-300 transition-colors">{name}</div>
          <div className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">{role}</div>
        </div>
      </div>
    </div>
  );

export default LandingPage;
