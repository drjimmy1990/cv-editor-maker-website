import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/mockSupabase';
import { useLanguage } from '../context/LanguageContext';
import { User, Shield } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async (role: 'user' | 'admin') => {
    // We update the mock supabase to return the requested role
    await supabase.auth.signIn(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">{t('auth.loginTitle')}</h2>
          <p className="text-gray-500">{t('auth.loginSubtitle')}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('user')}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-secondary text-charcoal hover:text-secondary font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md"
          >
            <div className="bg-gray-100 p-2 rounded-full"><User size={20} /></div>
            {t('auth.simUser')}
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">{t('common.or')}</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            <div className="bg-white/10 p-2 rounded-full"><Shield size={20} /></div>
            {t('auth.simAdmin')}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          {t('auth.noAccount')} <a href="#" className="text-secondary font-bold hover:underline">{t('auth.signUp')}</a>
        </div>
      </div>
    </div>
  );
};