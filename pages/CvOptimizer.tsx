import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, Download, FileText, X, ExternalLink, Eye } from 'lucide-react';
import { supabase } from '../services/mockSupabase';
import { sendCvChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const CvOptimizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(0);
  const { t, isRTL } = useLanguage();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(u => {
      if (u) setCredits(u.creditsChat);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Clean up preview URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Strict PDF check
      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }

      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      setMessages([{
        id: 'init',
        sender: 'ai',
        content: `I've analyzed ${selectedFile.name}. Ready to optimize.`,
        timestamp: new Date()
      }]);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!input.trim() || credits <= 0) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const replyText = await sendCvChatMessage(history, userMsg.content);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      content: replyText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
    
    supabase.db.updateCredits('chat', -1);
    setCredits(prev => prev - 1);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* Left: Document Viewer */}
      <div className={`w-full md:w-1/2 border-r border-gray-200 bg-gray-100 flex flex-col ${isRTL ? 'border-l border-r-0' : ''}`}>
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10 shrink-0">
          <h2 className="font-semibold text-charcoal flex items-center gap-2 overflow-hidden">
            <FileText size={18} className="text-primary shrink-0" />
            <span className="truncate max-w-[200px]">{file ? file.name : t('cv.title')}</span>
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            {file && (
              <button 
                onClick={handleClearFile}
                className="text-gray-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                title="Remove file"
              >
                <X size={18} />
              </button>
            )}
            {previewUrl && (
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-primary p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {file && (
               <button className="bg-accent hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                 <Download size={16} /> <span className="hidden sm:inline">{t('cv.finalDownload')}</span>
               </button>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center bg-gray-200/50 overflow-hidden relative">
          {!file ? (
            <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 m-4">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">{t('cv.uploadTitle')}</h3>
              <p className="text-gray-500 text-sm mb-6">PDF Only (Max 5MB)</p>
              <div className="relative">
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={handleFileUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm pointer-events-none">
                  Browse Files
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-300 relative">
               {/* Object Tag with Fallback Content for restricted environments */}
               {previewUrl && (
                 <object
                   key={previewUrl}
                   data={previewUrl}
                   type="application/pdf"
                   width="100%"
                   height="100%"
                   className="w-full h-full"
                 >
                   <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white/80 backdrop-blur-sm m-4 rounded-xl shadow-lg border border-white">
                      <div className="bg-blue-50 p-4 rounded-full mb-4">
                        <FileText size={48} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-charcoal mb-2">{file.name}</h3>
                      <p className="text-gray-500 mb-6 max-w-xs text-sm">
                        Your browser or environment is preventing inline PDF preview. You can still view it in a new tab.
                      </p>
                      <a 
                        href={previewUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-primary text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                      >
                         <Eye size={18} /> Open PDF Viewer
                      </a>
                   </div>
                 </object>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Chat Interface */}
      <div className="w-full md:w-1/2 flex flex-col bg-white border-l border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
          <h2 className="font-semibold text-charcoal">{t('cv.chatTitle')}</h2>
          <div className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border shadow-sm">
            {t('cv.credits')}: <span className={`font-bold ${credits < 5 ? 'text-red-500' : 'text-secondary'}`}>{credits}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
             <div className="text-center text-gray-400 mt-20 px-6">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-gray-300 ml-1" />
               </div>
               <p>Upload a document to start the analysis.</p>
             </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-sm leading-relaxed
                ${msg.sender === 'user' 
                  ? `bg-primary text-white ${isRTL ? 'rounded-bl-none' : 'rounded-br-none'}` 
                  : `bg-gray-100 text-charcoal ${isRTL ? 'rounded-br-none' : 'rounded-bl-none'}`}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-gray-100 rounded-2xl px-5 py-3 shadow-sm flex items-center gap-2 text-gray-500 text-sm">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              disabled={!file || loading || credits <= 0}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={credits > 0 ? t('cv.placeholderActive') : t('cv.placeholderNoCredits')}
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition-shadow"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || loading || credits <= 0}
              className="bg-secondary text-white p-3 rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-secondary transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Send size={20} className={isRTL ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};