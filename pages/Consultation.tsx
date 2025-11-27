import React, { useState, useEffect } from 'react';
import { supabase } from '../services/mockSupabase';
import { CheckCircle, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Consultation: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
     supabase.auth.getUser().then(u => {
       if (u && u.email) {
         setFormData(prev => ({ ...prev, email: u.email }));
       }
     });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.db.createConsultation({
      userId: 'user-123',
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: 'pending'
    });
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal mb-2">{t('consultation.successTitle')}</h2>
        <p className="text-gray-600 mb-6">{t('consultation.successMsg')}</p>
        <button 
          onClick={() => { setSubmitted(false); setFormData(prev => ({...prev, subject: '', message: ''})); }}
          className="text-primary font-medium hover:underline"
        >
          {t('consultation.submitAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
          <Briefcase size={14} /> {t('services.forCompanies')}
        </div>
        <h1 className="text-3xl font-bold text-primary mb-2">{t('consultation.title')}</h1>
        <p className="text-gray-600">{t('consultation.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-charcoal mb-2">{t('common.email')}</label>
          <input
            required
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder={t('consultation.emailNote')}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-charcoal mb-2">{t('consultation.subject')}</label>
          <input
            required
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-charcoal mb-2">{t('consultation.message')}</label>
          <textarea
            required
            rows={6}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all flex justify-center items-center gap-2"
        >
          {loading ? t('consultation.submitting') : t('consultation.submitRequest')}
        </button>
      </form>
    </div>
  );
};