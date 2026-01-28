
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow-lg border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-microchip text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">GUVI HCL</h1>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Voice Detection POC</p>
            </div>
          </div>
          <nav className="flex space-x-6 text-sm font-medium">
            <a href="#overview" className="hover:text-blue-400 transition-colors">Overview</a>
            <a href="#engine" className="hover:text-blue-400 transition-colors">Detection Engine</a>
            <a href="#tester" className="hover:text-blue-400 transition-colors">Endpoint Tester</a>
            <a href="#docs" className="hover:text-blue-400 transition-colors">API Docs</a>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2024 Guvi HCL Hackathon Submission. Developed by Senior AI Architect.
          </p>
          <div className="mt-2 flex justify-center space-x-4 grayscale opacity-60">
             <img src="https://picsum.photos/id/1/40/20" alt="HCL Logo" className="h-4" />
             <img src="https://picsum.photos/id/2/40/20" alt="Guvi Logo" className="h-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
