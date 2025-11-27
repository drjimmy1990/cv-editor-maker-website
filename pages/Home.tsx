import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, BarChart2, Users, MapPin, CheckCircle, Mail, Phone, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Handle Hash Scrolling (e.g., /#services) on mount or hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure layout is stable
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-primary text-white overflow-hidden min-h-[650px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 backdrop-blur-md px-4 py-2 rounded-full text-blue-100 text-sm font-semibold mb-8 border border-blue-700/50">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              {t('home.heroTag')}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] font-sans tracking-tight whitespace-pre-line">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light max-w-2xl">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/services')}
                className="bg-accent hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex items-center justify-center gap-2 min-w-[180px]"
              >
                {t('common.getStarted')} <ArrowIcon size={20} className={isRTL ? 'rotate-0' : ''} />
              </button>
              <button 
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-4 px-8 rounded-full transition-colors min-w-[160px]"
              >
                {t('common.learnMore')}
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute end-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-background scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-secondary"></span>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">{t('nav.about')}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 leading-tight">
                {t('home.aboutTitle')}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                {t('home.aboutText1')}
              </p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t('home.aboutText2')}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg text-primary mt-1"><CheckCircle size={20} /></div>
                  <div>
                    <h5 className="font-bold text-charcoal">{t('home.bilingual')}</h5>
                    <p className="text-sm text-gray-500 mt-1">Native English & Arabic</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg text-primary mt-1"><CheckCircle size={20} /></div>
                  <div>
                    <h5 className="font-bold text-charcoal">{t('home.realtime')}</h5>
                    <p className="text-sm text-gray-500 mt-1">Powered by Gemini 2.5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Contact / Map Card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-teal-50 rounded-2xl transform rotate-2"></div>
              <div className="relative bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                 {/* Map Image Placeholder */}
                 <div className="h-72 relative bg-slate-200">
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                      alt="Dubai Map Visual" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 start-6 text-white">
                      <p className="font-bold text-lg flex items-center gap-2"><MapPin size={18} className="text-secondary" /> Dubai Internet City</p>
                      <p className="text-sm text-gray-200">Innovation Hub, Building 3</p>
                    </div>
                 </div>
                 {/* Contact Details */}
                 <div className="p-8 grid gap-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer">
                       <div className="flex items-center gap-4">
                         <div className="bg-white p-2 rounded-full shadow-sm text-primary group-hover:text-secondary transition-colors">
                           <Mail size={20} />
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 uppercase font-semibold">Email Us</p>
                           <p className="font-medium text-charcoal">info@growthnexus.com</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className={`text-gray-400 group-hover:text-primary ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group cursor-pointer">
                       <div className="flex items-center gap-4">
                         <div className="bg-white p-2 rounded-full shadow-sm text-primary group-hover:text-secondary transition-colors">
                           <Phone size={20} />
                         </div>
                         <div>
                           <p className="text-xs text-gray-500 uppercase font-semibold">Call Us</p>
                           <p className="font-medium text-charcoal" dir="ltr">+971 4 123 4567</p>
                         </div>
                       </div>
                       <ChevronRight size={16} className={`text-gray-400 group-hover:text-primary ${isRTL ? 'rotate-180' : ''}`} />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Summary Section (Categorized) */}
      <section id="services" className="bg-gray-50 py-24 relative overflow-hidden scroll-mt-16">
        <div className="absolute top-0 start-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute top-0 start-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">{t('home.tailoredTitle')}</h2>
            <p className="text-gray-600 text-lg">
              {t('home.tailoredSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Individuals Column */}
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 w-full bg-secondary"></div>
              <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                   <div className="p-4 bg-blue-50 rounded-2xl text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                     <Users size={32} />
                   </div>
                   <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">{t('services.forIndividuals')}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-charcoal mb-4">{t('services.indTitle')}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {t('services.hubSubtitleInd')}
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-secondary" /> <span>{t('services.cvOptTitle')}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/services?category=individuals')}
                    className="w-full mt-8 py-3 rounded-xl border-2 border-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all flex justify-center items-center gap-2"
                  >
                     {t('common.viewDetails')} <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Companies Column */}
            <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-2 w-full bg-primary"></div>
              <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                   <div className="p-4 bg-blue-50 rounded-2xl text-charcoal group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                     <BarChart2 size={32} />
                   </div>
                   <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">{t('services.forCompanies')}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-charcoal mb-4">{t('services.compTitle')}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                   {t('services.hubSubtitleComp')}
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-primary" /> <span>{t('services.compAnalysisTitle')}</span>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/services?category=companies')}
                    className="w-full mt-8 py-3 rounded-xl border-2 border-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all flex justify-center items-center gap-2"
                  >
                    {t('common.viewDetails')} <ArrowIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-blue-100 mb-8 text-lg">{t('home.ctaSubtitle')}</p>
          <button 
            onClick={() => navigate('/services')}
            className="bg-white text-primary font-bold py-4 px-12 rounded-full hover:bg-gray-100 transition-transform hover:scale-105 shadow-xl"
          >
            {t('home.ctaButton')}
          </button>
        </div>
      </section>
    </div>
  );
};