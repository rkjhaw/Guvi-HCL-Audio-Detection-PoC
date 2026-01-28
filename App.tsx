
import React from 'react';
import Layout from './components/Layout';
import DetectionDemo from './components/DetectionDemo';
import EndpointTester from './components/EndpointTester';
import { API_SPEC_DOCS, MOCK_API_ENDPOINT, SUPPORTED_LANGUAGES } from './constants';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div id="overview" className="mb-12">
        <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="bg-blue-500/30 text-blue-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              HCL AI Challenge 2024
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Voice Detection POC <br/><span className="text-blue-400">Rest API Framework</span>
            </h2>
            <p className="text-lg text-blue-100 opacity-90 mb-8 leading-relaxed">
              Detect synthetic vs human speech across five major languages. This portal provides the official testing interface to validate your API's request/response structure and accuracy.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-[10px] font-bold opacity-60 uppercase">Auth Method</span>
                 <span className="font-semibold">x-api-key</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-[10px] font-bold opacity-60 uppercase">Mime Type</span>
                 <span className="font-semibold">audio/mp3</span>
               </div>
               <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                 <span className="block text-[10px] font-bold opacity-60 uppercase">Max Latency</span>
                 <span className="font-semibold">1500ms</span>
               </div>
            </div>
          </div>
          <div className="absolute top-1/2 right-12 transform -translate-y-1/2 hidden lg:block opacity-10">
             <i className="fas fa-waveform text-[250px]"></i>
          </div>
        </div>
      </div>

      {/* Detection Demo Section */}
      <DetectionDemo />

      {/* Tester Tool Section */}
      <EndpointTester />

      {/* Documentation Section */}
      <section id="docs" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 scroll-mt-24">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-8 border-b pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <i className="fas fa-terminal"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Business Specification</h3>
                <p className="text-xs text-slate-500">API Request & Response Standards</p>
              </div>
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('prefill-tester'))}
              className="text-xs font-bold text-white bg-slate-900 px-4 py-2 rounded-lg"
            >
              Copy Demo URL
            </button>
          </div>
          
          <div className="space-y-8">
             <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Endpoint</h4>
                <div className="flex items-center bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-sm group">
                  <span className="text-blue-600 font-bold mr-3">POST</span>
                  <span className="text-slate-600 flex-grow truncate">https://your-submission-url.api/v1/detect</span>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Required Headers</h4>
                   <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-[11px] space-y-2 border border-slate-800">
                      <p><span className="text-indigo-400">"Content-Type"</span>: "application/json"</p>
                      <p><span className="text-indigo-400">"x-api-key"</span>: <span className="text-emerald-400">"YOUR_KEY"</span></p>
                   </div>
                </div>
                <div>
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">JSON Request Body</h4>
                   <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-[11px] border border-slate-800">
                      <p className="text-slate-500">{"{"}</p>
                      <p className="pl-4"><span className="text-indigo-400">"audio_base64"</span>: "string",</p>
                      <p className="pl-4"><span className="text-indigo-400">"language"</span>: "string",</p>
                      <p className="pl-4"><span className="text-indigo-400">"format"</span>: "mp3"</p>
                      <p className="text-slate-500">{"}"}</p>
                   </div>
                </div>
             </div>

             <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Supported Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <span key={lang} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                      {lang}
                    </span>
                  ))}
                </div>
             </div>

             <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start space-x-4">
               <div className="bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0">
                 <i className="fas fa-exclamation-triangle text-sm"></i>
               </div>
               <div className="text-sm">
                 <p className="font-bold text-amber-900 mb-1">Strict Rules</p>
                 <p className="text-amber-800 leading-relaxed">
                   API must return <code className="bg-amber-100 px-1 rounded">AI_GENERATED</code> or <code className="bg-amber-100 px-1 rounded">HUMAN</code>. 
                   Confidence must be a float between 0.0 and 1.0. 
                   Hard-coding results will result in immediate disqualification.
                 </p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 h-fit sticky top-24">
           <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
             <i className="fas fa-check-circle text-emerald-500"></i>
             <span>Evaluation Criteria</span>
           </h3>
           <ul className="space-y-6">
              <li className="space-y-1">
                 <p className="text-xs font-bold text-slate-500 uppercase">01. Accuracy</p>
                 <p className="text-sm">Consistent detection across all 5 languages.</p>
              </li>
              <li className="space-y-1">
                 <p className="text-xs font-bold text-slate-500 uppercase">02. Stability</p>
                 <p className="text-sm">API must handle concurrent evaluation requests.</p>
              </li>
              <li className="space-y-1">
                 <p className="text-xs font-bold text-slate-500 uppercase">03. Response Time</p>
                 <p className="text-sm">End-to-end processing should be under 1.5 seconds.</p>
              </li>
              <li className="space-y-1">
                 <p className="text-xs font-bold text-slate-500 uppercase">04. Format Compliance</p>
                 <p className="text-sm">Correct handling of Base64 MP3 and x-api-key headers.</p>
              </li>
           </ul>
        </div>
      </section>
    </Layout>
  );
};

export default App;
