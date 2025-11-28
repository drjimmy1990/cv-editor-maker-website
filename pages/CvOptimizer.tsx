import React, { useState, useRef, useEffect } from 'react';
import { Upload, Send, Download, FileText, X, ExternalLink, RefreshCw, Loader, MessageSquare } from 'lucide-react';
import { api } from '../services/api';
import { ChatMessage } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const CvOptimizer: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();

  // --- State Management ---
  const [file, setFile] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null); // URL or Base64 Data URI
  const [currentText, setCurrentText] = useState<string>(''); // Source text/HTML for the AI
  const [sessionId, setSessionId] = useState<string>(''); // Database Session ID from n8n

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Effects ---

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup memory when component unmounts or preview changes
  useEffect(() => {
    return () => {
      // Only revoke blob URLs, not data URIs
      if (pdfPreview && !pdfPreview.startsWith('data:')) {
        URL.revokeObjectURL(pdfPreview);
      }
    };
  }, [pdfPreview]);

  // --- Handlers ---

  // 1. File Upload & Session Initialization
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (!user) {
        alert("You must be logged in to upload a CV.");
        return;
      }

      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a PDF file.');
        return;
      }

      setFile(selectedFile);
      setIsProcessingFile(true);

      // Show local preview immediately (Blob URL)
      const objectUrl = URL.createObjectURL(selectedFile);
      setPdfPreview(objectUrl);

      try {
        // Send to n8n to parse text and create DB session
        const response = await api.parseCv(selectedFile, user.id);

        setCurrentText(response.text);
        setSessionId(response.sessionId);

        // Add initial AI greeting
        setMessages([{
          id: 'init',
          sender: 'ai',
          content: `I've analyzed **${selectedFile.name}**. I'm ready to help you optimize it. You can ask me to rewrite sections or just ask for advice.`,
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error(error);
        alert("Failed to analyze the PDF text. Please try again.");
        setFile(null);
        setPdfPreview(null);
      } finally {
        setIsProcessingFile(false);
      }
    }
  };

  // Reset the session
  const handleClearFile = () => {
    if (confirm("Are you sure? This will lose your current session.")) {
      setFile(null);
      setPdfPreview(null);
      setCurrentText('');
      setSessionId('');
      setMessages([]);
    }
  };

  // 2. Chat & Optimize Loop
  const handleSend = async () => {
    if (!input.trim() || loading || !sessionId) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Add temporary loading indicator
      setMessages(prev => [...prev, {
        id: 'loading',
        sender: 'ai',
        content: 'Thinking...',
        timestamp: new Date(),
        isSystem: true
      }]);

      // Call n8n Intelligent Agent
      const result = await api.optimizeCv(sessionId, currentText, userMsg.content);

      // Remove loading indicator
      setMessages(prev => prev.filter(m => m.id !== 'loading'));

      // --- LOGIC: Handle Response Type ---

      // 1. Always add the text response
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        content: result.message || "Request processed.",
        timestamp: new Date()
      }]);

      // 2. IF it was a PDF Update, refresh the preview and state
      if (result.type === 'pdf_update' && result.pdfBase64) {
        // Update the source text for the NEXT loop
        setCurrentText(result.optimizedText);
        // Update the visual preview
        setPdfPreview(`data:application/pdf;base64,${result.pdfBase64}`);
      }
      // ELSE (chat_message): Keep the old PDF preview, do not change currentText

    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== 'loading'));
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'ai',
        content: "I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        isSystem: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Finalize & Download (UPDATED)
  const handleDownloadFinal = async () => {
    // Check for sessionId instead of user/text, as per new logic
    if (!sessionId) {
      alert("No active session found.");
      return;
    }

    setIsFinalizing(true);
    try {
      // ✅ Updated to match api.ts: only send sessionId
      const result = await api.finalizeCv(sessionId);

      // Open the permanent URL in new tab
      if (result.downloadUrl) {
        window.open(result.downloadUrl, '_blank');
      } else {
        alert("Error: Download URL not received.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save the final PDF.");
    } finally {
      setIsFinalizing(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-background">

      {/* LEFT COLUMN: PDF Viewer */}
      <div className={`w-full md:w-1/2 border-r border-gray-200 bg-gray-100 flex flex-col ${isRTL ? 'border-l border-r-0' : ''}`}>

        {/* Toolbar */}
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
                title="Reset Session"
              >
                <X size={18} />
              </button>
            )}
            {pdfPreview && (
              <button
                onClick={handleDownloadFinal}
                disabled={isFinalizing}
                className="bg-secondary hover:bg-teal-600 text-white px-4 py-1.5 rounded-md text-sm font-bold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
              >
                {isFinalizing ? <Loader size={16} className="animate-spin" /> : <Download size={16} />}
                <span className="hidden sm:inline">Save & Download</span>
              </button>
            )}
          </div>
        </div>

        {/* Viewer Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-200/50 overflow-hidden relative">
          {!file ? (
            // Upload State
            <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 m-4 max-w-sm">
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
                  Select Document
                </button>
              </div>
            </div>
          ) : isProcessingFile ? (
            // Loading State
            <div className="text-center">
              <Loader size={40} className="animate-spin text-primary mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Extracting text from your CV...</p>
            </div>
          ) : (
            // PDF Preview State
            <div className="w-full h-full bg-gray-300 relative">
              {pdfPreview && (
                <iframe
                  src={`${pdfPreview}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-none"
                  title="CV Preview"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Chat Interface */}
      <div className="w-full md:w-1/2 flex flex-col bg-white border-l border-gray-200">

        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
          <h2 className="font-semibold text-charcoal flex items-center gap-2">
            <MessageSquare size={18} className="text-secondary" />
            AI Editor Assistant
          </h2>
          <div className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border shadow-sm">
            Status: {loading ? <span className="text-orange-500">Working...</span> : <span className="text-green-500">Ready</span>}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isProcessingFile && (
            <div className="text-center text-gray-400 mt-20 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={24} className="text-gray-300" />
              </div>
              <p>Upload your CV to start the optimization loop.</p>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm shadow-sm leading-relaxed
                ${msg.sender === 'user'
                    ? `bg-primary text-white ${isRTL ? 'rounded-bl-none' : 'rounded-br-none'}`
                    : `bg-gray-100 text-charcoal ${isRTL ? 'rounded-br-none' : 'rounded-bl-none'} ${msg.isSystem ? 'italic text-gray-500 border border-gray-200' : ''}`}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <input
              type="text"
              disabled={!file || loading || isProcessingFile}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={file ? "Example: 'Rewrite the summary to be more punchy'" : "Upload a file first..."}
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 transition-shadow"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="bg-primary text-white p-3 rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {loading ? <Loader size={20} className="animate-spin" /> : <Send size={20} className={isRTL ? 'rotate-180' : ''} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};