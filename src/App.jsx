import React, { useState } from 'react';
import Theory from './pages/Theory.jsx';
import Visualization from './pages/Visualization.jsx';
import { BookOpen, Play, Menu, X, Shield, Code, ChevronRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('theory');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      id: 'theory',
      name: 'Theory',
      icon: BookOpen,
      description: 'Learn the concepts',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'visualization',
      name: 'Visualization',
      icon: Play,
      description: 'Interactive simulation',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Banker's Algorithm
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Deadlock Avoidance System</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
                      ${isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-white/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-2xl">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300
                      ${isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{item.name}</div>
                        <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="relative">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          {currentPage === 'theory' && <Theory />}
          {currentPage === 'visualization' && <Visualization />}
        </div>
      </main>

      <footer className="relative z-10 bg-white/50 backdrop-blur-sm border-t border-white/20 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-700 font-semibold">Banker's Algorithm Simulator</p>
                <p className="text-gray-500 text-sm">Educational Resource Management Tool</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-600 text-sm">
                Built for understanding operating system concepts
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Deadlock avoidance made simple
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;