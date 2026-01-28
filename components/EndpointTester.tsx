
import React, { useState, useEffect } from 'react';
import { ApiTestRequest, ApiResponse } from '../types';
import { MOCK_API_ENDPOINT, SUPPORTED_LANGUAGES } from '../constants';

const EndpointTester: React.FC = () => {
  const [formData, setFormData] = useState<ApiTestRequest>({
    endpoint: '',
    apiKey: '',
    language: 'English',
    audioUrl: '',
    audioFormat: 'mp3'
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const handlePrefill = (e: any) => {
      setFormData({
        endpoint: MOCK_API_ENDPOINT,
        apiKey: 'hcl_secret_key_778899',
        language: 'Tamil',
        audioUrl: 'https://drive.google.com/sample_voice_1.mp3',
        audioFormat: 'mp3'
      });
      document.getElementById('tester')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('prefill-tester', handlePrefill);
    return () => window.removeEventListener('prefill-tester', handlePrefill);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    // Simulated latency
    const latency = 1200;

    setTimeout(() => {
      if (!formData.endpoint.startsWith('http')) {
        setResponse({
          status: 'error',
          message: 'Invalid Endpoint URL: Must start with http:// or https://',
          timestamp: new Date().toISOString()
        });
      } else if (formData.apiKey.length < 5) {
        setResponse({
          status: 'error',
          message: 'Invalid API key or malformed request',
          timestamp: new Date().toISOString()
        });
      } else {
        setResponse({
          status: 'success',
          request_payload: {
            audio_base64: "SUQzBAAAAAAA...[truncated]...",
            language: formData.language,
            format: "mp3"
          },
          data: {
            classification: 'HUMAN' as any,
            confidence: 0.9824,
            explanation: `Analysis successful for ${formData.language} sample. Rhythmic patterns and frequency distribution confirm authentic human vocalization.`,
            language: formData.language
          },
          timestamp: new Date().toISOString()
        });
      }
      setLoading(false);
    }, latency);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="tester" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12 scroll-mt-24">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Endpoint Tester Tool</h2>
          <p className="text-sm text-slate-500">HCL Compliance Verification System</p>
        </div>
        <div className="flex space-x-2">
          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold uppercase">Ready</span>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
              Endpoint URL <span className="text-rose-500 ml-1">*</span>
            </label>
            <input 
              required
              type="text" 
              name="endpoint"
              value={formData.endpoint}
              onChange={handleChange}
              placeholder="https://your-api.com/v1/detect"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                x-api-key <span className="text-rose-500 ml-1">*</span>
              </label>
              <input 
                required
                type="text" 
                name="apiKey"
                value={formData.apiKey}
                onChange={handleChange}
                placeholder="Enter your unique HCL API key"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                Language <span className="text-rose-500 ml-1">*</span>
              </label>
              <select 
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center">
                Audio URL <span className="text-rose-500 ml-1">*</span>
              </label>
              <input 
                required
                type="text" 
                name="audioUrl"
                value={formData.audioUrl}
                onChange={handleChange}
                placeholder="Direct Link to MP3 File"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Format</label>
              <input 
                readOnly
                type="text" 
                value="mp3"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-500 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Request Body Preview</h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-[10px] text-slate-600">
              <p>{"{"}</p>
              <p className="pl-4">"audio_base64": "..." <span className="text-slate-300 italic">// Dynamic Base64</span>,</p>
              <p className="pl-4">"language": "{formData.language}",</p>
              <p className="pl-4">"format": "mp3"</p>
              <p>{"}"}</p>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-100
              ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-microchip"></i>}
            <span>Run Compliance Test</span>
          </button>
        </form>

        <div className="lg:col-span-2 flex flex-col h-full">
           <div className="bg-slate-900 rounded-2xl p-6 flex-grow flex flex-col min-h-[500px] border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Output</span>
                </div>
                {response && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${response.status === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {response.status === 'success' ? 'Passed' : 'Failed'}
                  </span>
                )}
              </div>

              {!response && !loading && (
                <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
                  <i className="fas fa-terminal text-4xl text-slate-800 mb-4"></i>
                  <p className="text-slate-500 text-sm font-sans">Awaiting connection to remote endpoint...</p>
                </div>
              )}

              {loading && (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-400 text-xs mt-4 font-mono">POST /v1/detect-voice...</p>
                </div>
              )}

              {response && (
                <div className="flex-grow flex flex-col font-mono text-[11px] overflow-hidden">
                   <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-auto flex-grow mb-4 custom-scrollbar">
                      <pre className="text-blue-400">{JSON.stringify(response, null, 2)}</pre>
                   </div>
                   {response.status === 'success' && (
                     <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                       <p className="text-blue-400 font-sans font-bold flex items-center">
                         <i className="fas fa-check-double mr-2"></i>
                         Structure Validated
                       </p>
                       <p className="text-[10px] text-slate-500 mt-1 font-sans">API successfully returned the required Classification & Confidence metrics.</p>
                     </div>
                   )}
                </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default EndpointTester;
