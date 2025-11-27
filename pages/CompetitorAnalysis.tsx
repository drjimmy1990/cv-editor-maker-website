import React, { useState } from 'react';
import { Search, TrendingUp, Star, ThumbsUp, AlertTriangle } from 'lucide-react';
import { compareBusinesses } from '../services/geminiService';
import { ComparisonResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const CompetitorAnalysis: React.FC = () => {
  const [linkA, setLinkA] = useState('');
  const [linkB, setLinkB] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const { t } = useLanguage();

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkA || !linkB) return;
    setLoading(true);
    setResult(null);
    const data = await compareBusinesses(linkA, linkB);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">{t('analysis.title')}</h1>
        <p className="text-gray-600">{t('analysis.subtitle')}</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-10">
        <form onSubmit={handleCompare} className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">{t('analysis.businessA')}</label>
            <input
              type="text"
              value={linkA}
              onChange={(e) => setLinkA(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          
          <div className="flex justify-center pb-2">
            <div className="bg-gray-100 rounded-full p-2 text-gray-500 font-bold text-sm">VS</div>
          </div>

          <div>
             <label className="block text-sm font-medium text-charcoal mb-1">{t('analysis.businessB')}</label>
            <input
              type="text"
              value={linkB}
              onChange={(e) => setLinkB(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 mt-4 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-yellow-600 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? t('analysis.comparing') : <><Search size={18} /> {t('analysis.compareNow')}</>}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-fadeIn border-t-4 border-secondary">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-secondary" size={24} />
              <h3 className="text-xl font-bold text-charcoal">{t('analysis.resultTitle')}</h3>
            </div>
          </div>
          
          <div className="p-8 grid gap-8">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
              <span className="text-sm text-blue-600 uppercase tracking-wider font-bold">{t('analysis.predictedLeader')}</span>
              <div className="text-3xl font-bold text-primary mt-2">{result.winner}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="text-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-charcoal">{t('analysis.ratingGap')}</h4>
                    <p className="text-gray-600 text-sm">{result.ratingGap}</p>
                  </div>
                </div>
                 <div className="flex items-start gap-3">
                  <ThumbsUp className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-charcoal">{t('analysis.sentiment')}</h4>
                    <p className="text-gray-600 text-sm">{result.sentimentSummary}</p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-5 border border-orange-100">
                <div className="flex items-center gap-2 mb-2 text-orange-800 font-bold">
                  <AlertTriangle size={18} /> {t('analysis.recommendation')}
                </div>
                <p className="text-sm text-orange-900 leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};