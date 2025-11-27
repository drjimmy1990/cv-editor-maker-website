import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { en } from '../locales/en';
import { ar } from '../locales/ar';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (path: string) => any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  // Helper to access nested object properties by string path "nav.home"
  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = lang === 'en' ? en : ar;
    
    for (const key of keys) {
      if (current === undefined || current === null) return path;
      if (current[key] === undefined) return path; // Fallback to key if missing
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};