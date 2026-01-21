import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { en } from '../locales/en';
import { ar } from '../locales/ar';
import { supabase } from '../services/supabaseClient';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (path: string) => any;
  isRTL: boolean;
  refreshTranslations: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  // Initialize with static content for instant load (Performance Strategy)
  const [translations, setTranslations] = useState({ en, ar });

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Initial fetch of dynamic content
    refreshTranslations();
  }, []);

  const refreshTranslations = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error || !data) return;

      // Deep clone static translations to avoid mutation
      const newTranslations = {
        en: JSON.parse(JSON.stringify(en)),
        ar: JSON.parse(JSON.stringify(ar))
      };

      // Merge DB content over static content
      data.forEach((item: any) => {
        if (item.lang === 'en' || item.lang === 'ar') {
          setNestedValue(newTranslations[item.lang as Language], item.key, item.value);
        }
      });

      setTranslations(newTranslations);
    } catch (err) {
      console.error("Error loading dynamic content:", err);
    }
  };

  const setNestedValue = (obj: any, path: string, value: string) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  // Helper to access nested object properties by string path
  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = translations[lang];

    for (const key of keys) {
      if (current === undefined || current === null) return path;
      if (current[key] === undefined) return path; // Fallback to key if missing
      current = current[key];
    }

    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, isRTL: lang === 'ar', refreshTranslations }}>
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