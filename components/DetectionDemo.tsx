
import React, { useState, useRef } from 'react';
import { analyzeVoice } from '../services/geminiService';
import { DetectionResult, Classification } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

const DetectionDemo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const toBase64 = (file: File): Promise<string> => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });

  const runDetection = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const base64 = await toBase64(file);
      const data = await analyzeVoice(base64);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="engine" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">AI Detection Engine</h2>
          <p className="text-sm text-slate-500">Live demonstration of the detection logic</p>
        </div>
        <div className="flex space-x-2">
          {SUPPORTED_LANGUAGES.map(lang => (
            <span key={lang} className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tighter">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                 onClick={() => fileInputRef.current?.click()}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="audio/mp3,audio/wav"
              />
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-upload text-xl"></i>
              </div>
              <h3 className="font-semibold text-slate-700">
                {file ? file.name : "Select Voice Sample (MP3)"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Upload a recording to analyze patterns</p>
            </div>

            <button 
              disabled={!file || isAnalyzing}
              onClick={runDetection}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-3 
                ${!file || isAnalyzing ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'}`}
            >
              {isAnalyzing ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Analyzing Waveforms...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-shield-virus"></i>
                  <span>Run Detection Scan</span>
                </>
              )}
            </button>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex items-start space-x-3 text-rose-700 text-sm">
                <i className="fas fa-exclamation-circle mt-0.5"></i>
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-xl p-6 text-slate-300 font-mono text-sm relative min-h-[300px]">
            <div className="absolute top-4 right-4 flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <h4 className="text-slate-500 mb-4 border-b border-slate-800 pb-2">SCAN_RESULT.JSON</h4>
            
            {!result && !isAnalyzing && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
                <i className="fas fa-code text-3xl"></i>
                <p>Awaiting engine output...</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in duration-500">
                <p className="text-blue-400">{"{"}</p>
                <div className="pl-4">
                  <p><span className="text-indigo-300">"classification"</span>: <span className={result.classification === Classification.AI_GENERATED ? 'text-amber-400' : 'text-emerald-400'}>"{result.classification}"</span>,</p>
                  <p><span className="text-indigo-300">"confidence"</span>: <span className="text-orange-300">{result.confidence.toFixed(4)}</span>,</p>
                  <p><span className="text-indigo-300">"language"</span>: <span className="text-emerald-300">"{result.language}"</span>,</p>
                  <p><span className="text-indigo-300">"explanation"</span>: <span className="text-slate-400">"{result.explanation.substring(0, 100)}..."</span>,</p>
                  <p><span className="text-indigo-300">"metadata"</span>: {"{"}</p>
                  <div className="pl-4">
                    <p><span className="text-indigo-300">"detectedArtifacts"</span>: <span className="text-slate-400">{JSON.stringify(result.metadata?.detectedArtifacts)}</span></p>
                  </div>
                  <p>{"}"}</p>
                </div>
                <p className="text-blue-400">{"}"}</p>

                <div className={`mt-6 p-4 rounded-lg border flex items-center justify-between ${result.classification === Classification.AI_GENERATED ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20'}`}>
                   <div>
                     <p className="text-[10px] uppercase font-bold text-slate-500">Final Verdict</p>
                     <p className={`font-bold ${result.classification === Classification.AI_GENERATED ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {result.classification === Classification.AI_GENERATED ? 'SYNTHETIC_SPEECH' : 'NATURAL_SPEECH'}
                     </p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] uppercase font-bold text-slate-500">Confidence</p>
                     <p className="font-bold text-slate-200">{(result.confidence * 100).toFixed(1)}%</p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetectionDemo;
