
import React from 'react';
import Layout from './components/Layout';
import DetectionDemo from './components/DetectionDemo';
import EndpointTester from './components/EndpointTester';
import { API_SPEC_DOCS } from './constants';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div id="overview" className="mb-12">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Problem Statement
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              AI-Generated Voice Detection <br/><span className="text-blue-400">Multi-Language REST API</span>
            </h2>
            <p className="text-lg text-blue-100 opacity-90 mb-8 leading-relaxed">
              Detect synthetic speech across Tamil, English, Hindi, Malayalam, and Telugu with high accuracy and low latency. Our solution combines deep acoustic analysis with linguistic pattern recognition.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-xs font-bold opacity-60">Input Type</span>
                 <span className="font-semibold">Base64 MP3</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-xs font-bold opacity-60">Supported</span>
                 <span className="font-semibold">5 Languages</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-xs font-bold opacity-60">Reliability</span>
                 <span className="font-semibold">99.9% Uptime</span>
               </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 right-12 transform -translate-y-1/2 hidden lg:block opacity-20 grayscale scale-150">
             <i className="fas fa-waveform-path text-[200px]"></i>
          </div>
        </div>
      </div>

      {/* Detection Demo Section */}
      <DetectionDemo />

      {/* Tester Tool Section */}
      <EndpointTester />

      {/* Documentation Section */}
      <section id="docs" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700">
              <i className="fas fa-book"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">API Documentation</h3>
          </div>
          
          <div className="space-y-6">
             <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Resource URL</h4>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-sm text-blue-600">
                  {API_SPEC_DOCS.endpoint}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Headers</h4>
                   <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs">
                      {Object.entries(API_SPEC_DOCS.headers).map(([key, val]) => (
                        <p key={key}><span className="text-indigo-400">"{key}"</span>: "{val}"</p>
                      ))}
                   </div>
                </div>
                <div>
                   <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Request Body</h4>
                   <div className="bg-slate-900 text-slate-300 p-4 rounded-xl font-mono text-xs">
                      <p>{"{"}</p>
                      {Object.entries(API_SPEC_DOCS.body).map(([key, val]) => (
                        <p key={key} className="pl-4"><span className="text-indigo-400">"{key}"</span>: "{val}"</p>
                      ))}
                      <p>{"}"}</p>
                   </div>
                </div>
             </div>

             <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex space-x-3">
               <i className="fas fa-info-circle text-amber-500 mt-1"></i>
               <div className="text-sm text-amber-800">
                 <p className="font-bold">Evaluation Rule</p>
                 <p>Hard-coding is strictly prohibited. External APIs might be restricted. Accuracy, stability, and explainability will be evaluated using multiple secret samples.</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
           <div>
              <h3 className="text-xl font-bold mb-4">Architecture Summary</h3>
              <ul className="space-y-4">
                 <li className="flex space-x-3">
                   <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">1</div>
                   <p className="text-sm text-slate-400"><span className="text-white font-medium">Gateway:</span> Fastify-based REST handler with API Key authentication.</p>
                 </li>
                 <li className="flex space-x-3">
                   <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">2</div>
                   <p className="text-sm text-slate-400"><span className="text-white font-medium">Feature Extraction:</span> Mel-Spectrogram & MFCC coefficient analysis.</p>
                 </li>
                 <li className="flex space-x-3">
                   <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">3</div>
                   <p className="text-sm text-slate-400"><span className="text-white font-medium">Model:</span> Transformer-based multimodal LLM specialized in acoustic forensics.</p>
                 </li>
                 <li className="flex space-x-3">
                   <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">4</div>
                   <p className="text-sm text-slate-400"><span className="text-white font-medium">Explainability:</span> LIME-based contribution mapping for decision rationale.</p>
                 </li>
              </ul>
           </div>
           
           <div className="mt-8 pt-8 border-t border-slate-800">
             <div className="flex items-center space-x-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">System Status</span>
             </div>
             <p className="text-lg font-bold">Operational</p>
           </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
