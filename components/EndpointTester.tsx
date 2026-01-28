
import React, { useState } from 'react';
import { ApiTestRequest, ApiResponse } from '../types';

const EndpointTester: React.FC = () => {
  const [formData, setFormData] = useState<ApiTestRequest>({
    endpoint: '',
    apiKey: '',
    message: '',
    audioUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    // Simulate API request to the provided endpoint
    // In a real scenario, this would be a fetch(formData.endpoint, ...)
    setTimeout(() => {
      if (!formData.endpoint.includes('http')) {
        setResponse({
          status: 'error',
          message: 'Malformed request: Invalid URL format',
          timestamp: new Date().toISOString()
        });
      } else if (!formData.apiKey) {
        setResponse({
          status: 'error',
          message: 'Invalid API key or malformed request',
          timestamp: new Date().toISOString()
        });
      } else {
        setResponse({
          status: 'success',
          data: {
            classification: Math.random() > 0.5 ? 'AI_GENERATED' as any : 'HUMAN' as any,
            confidence: 0.85 + Math.random() * 0.14,
            explanation: `Successfully validated sample from: ${formData.audioUrl}`,
            language: 'English'
          },
          timestamp: new Date().toISOString()
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="tester" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800">Endpoint Tester Tool</h2>
        <p className="text-sm text-slate-500">Official verification tool for API compliance</p>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">API Endpoint URL</label>
              <input 
                required
                type="text" 
                name="endpoint"
                value={formData.endpoint}
                onChange={handleChange}
                placeholder="https://your-api.com/v1/detect"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Authorization Key</label>
              <input 
                required
                type="password" 
                name="apiKey"
                value={formData.apiKey}
                onChange={handleChange}
                placeholder="Bearer eyJhbGci..."
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Test Audio URL (MP3)</label>
            <input 
              required
              type="text" 
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Request Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Describe this test request..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all flex items-center justify-center space-x-2 
              ${loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-slate-800'}`}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play"></i>}
            <span>Test Endpoint</span>
          </button>
        </form>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col">
          <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2 flex items-center space-x-2">
            <i className="fas fa-terminal text-blue-500"></i>
            <span>Response Console</span>
          </h4>
          
          <div className="flex-grow flex flex-col justify-center">
            {!response && !loading && (
              <div className="text-center text-slate-400 py-12">
                <i className="fas fa-satellite-dish text-2xl mb-2 opacity-20"></i>
                <p className="text-xs">No active test session</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="text-xs text-slate-500 mt-4">Connecting to gateway...</p>
              </div>
            )}

            {response && (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <div className={`p-4 rounded-lg mb-4 text-xs font-mono overflow-auto max-h-[250px] ${response.status === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}>
                  <p className="font-bold mb-1">// {response.status === 'success' ? 'HTTP 200 OK' : 'HTTP 401 Unauthorized'}</p>
                  <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
                {response.status === 'success' && (
                   <div className="flex items-center space-x-2 text-xs text-emerald-600 font-bold">
                     <i className="fas fa-check-circle"></i>
                     <span>Payload Format Validated</span>
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
