import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, BarChart2, Users, MapPin, CheckCircle, Mail, Phone, ChevronRight, ArrowLeft, PenTool, Activity, MessageCircle, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { useSystemConfig } from '../hooks/useSystemConfig';

interface ServiceInfo {
  id: string;
  titleKey: string;
  descKey: string;
  howToUseKey: string;
  credits: number | string;
  image?: string;
  route: string;
  color: string;
  category: 'individuals' | 'companies' | 'other';
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch About section image from system_config (editable from admin panel)
  const { value: aboutImageUrl } = useSystemConfig(
    'about_image_url',
    'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop'
  );

  const services: ServiceInfo[] = [
    {
      id: 'cv_optimizer',
      titleKey: 'services.cvOptTitle',
      descKey: 'services.cvOptDesc',
      howToUseKey: 'services.cvOptHowTo',
      credits: 10,
      route: '/services/cv-optimizer',
      color: 'from-blue-500 to-indigo-600',
      category: 'individuals',
    },
    {
      id: 'cv_creator',
      titleKey: 'services.cvCreatorTitle',
      descKey: 'services.cvCreatorDesc',
      howToUseKey: 'services.cvCreatorHowTo',
      credits: 15,
      route: '/services/cv-creator',
      color: 'from-teal-500 to-emerald-600',
      category: 'individuals',
    },
    {
      id: 'competitor_analysis',
      titleKey: 'services.compAnalysisTitle',
      descKey: 'services.compAnalysisDesc',
      howToUseKey: 'services.compAnalysisHowTo',
      credits: 20,
      route: '/services/competitor-analysis',
      color: 'from-purple-500 to-violet-600',
      category: 'companies',
    },
    {
      id: 'business_analyzer',
      titleKey: 'services.singleBusinessTitle',
      descKey: 'services.singleBusinessDesc',
      howToUseKey: 'services.businessAnalyzerHowTo',
      credits: 15,
      route: '/services/business-analyzer',
      color: 'from-orange-500 to-amber-600',
      category: 'companies',
    },
    {
      id: 'consultation',
      titleKey: 'services.expertConsultTitle',
      descKey: 'services.expertConsultDesc',
      howToUseKey: 'services.consultationHowTo',
      credits: 'contact',
      route: '/services/consultation',
      color: 'from-green-500 to-teal-600',
      category: 'companies',
    },
    {
      id: 'coming_soon',
      titleKey: 'services.comingSoonTitle',
      descKey: 'services.comingSoonDesc',
      howToUseKey: 'services.comingSoonHowTo',
      credits: 'coming_soon',
      route: '',
      color: 'from-gray-400 to-gray-500',
      category: 'other',
    },
  ];

  const individualsServices = services.filter(s => s.category === 'individuals');
  const companiesServices = services.filter(s => s.category === 'companies' || s.category === 'other');

  const openServiceModal = (service: ServiceInfo) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const icons: Record<string, React.ReactNode> = {
    cv_optimizer: <PenTool size={28} />,
    cv_creator: <Users size={28} />,
    competitor_analysis: <BarChart2 size={28} />,
    business_analyzer: <Activity size={28} />,
    consultation: <MessageCircle size={28} />,
    coming_soon: <CheckCircle size={28} />,
  };
  const hoverColors: Record<string, string> = {
    cv_optimizer: 'group-hover:text-primary',
    cv_creator: 'group-hover:text-secondary',
    competitor_analysis: 'group-hover:text-purple-600',
    business_analyzer: 'group-hover:text-orange-600',
    consultation: 'group-hover:text-green-600',
    coming_soon: 'group-hover:text-gray-600',
  };
  const textColors: Record<string, string> = {
    cv_optimizer: 'text-primary',
    cv_creator: 'text-secondary',
    competitor_analysis: 'text-purple-600',
    business_analyzer: 'text-orange-600',
    consultation: 'text-green-600',
    coming_soon: 'text-gray-500',
  };

  const renderServiceCard = (service: ServiceInfo) => {
    const isComingSoon = service.id === 'coming_soon';
    return (
      <div
        key={service.id}
        className={`group bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all duration-300 ${isComingSoon ? 'opacity-70 cursor-default' : 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer'}`}
      >
        <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-5 ${isComingSoon ? '' : 'group-hover:scale-110'} transition-transform`}>
          {icons[service.id]}
        </div>
        <h3 className={`text-xl font-bold text-charcoal mb-2 ${hoverColors[service.id]} transition-colors`}>{t(service.titleKey)}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t(service.descKey)}</p>

        {isComingSoon ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200">
              {t('common.comingSoon')}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 mt-auto">
            <button
              onClick={(e) => { e.stopPropagation(); openServiceModal(service); }}
              className={`flex items-center gap-1 ${textColors[service.id]} font-semibold text-sm hover:underline`}
            >
              <Info size={14} />
              {t('common.viewDetails')}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(service.route); }}
              className={`flex items-center gap-1 bg-gradient-to-r ${service.color} text-white text-xs font-bold px-3 py-1.5 rounded-full hover:shadow-md transition-all`}
            >
              {isRTL ? 'استخدم' : 'Use'}
              <ArrowIcon size={12} />
            </button>
          </div>
        )}
      </div>
    );
  };

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
                    src={aboutImageUrl}
                    alt="Riyadh Skyline"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 start-6 text-white">
                    <p className="font-bold text-lg flex items-center gap-2"><MapPin size={18} className="text-secondary" /> {t('footer.location')}</p>
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
                        <p className="text-xs text-gray-500 uppercase font-semibold">{t('contact.emailLabel')}</p>
                        <p className="font-medium text-charcoal">support@optimization.sa</p>
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
                        <p className="text-xs text-gray-500 uppercase font-semibold">{t('contact.callUs')}</p>
                        <p className="font-medium text-charcoal" dir="ltr">{t('common.phoneNumber')}</p>
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

      {/* Services Summary Section */}
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

          {/* For Individuals Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal">{t('services.forIndividuals')}</h3>
                <p className="text-sm text-gray-500">{t('services.forIndividualsDesc')}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {individualsServices.map((service) => renderServiceCard(service))}
            </div>
          </div>

          {/* For Companies Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <BarChart2 size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal">{t('services.forCompanies')}</h3>
                <p className="text-sm text-gray-500">{t('services.forCompaniesDesc')}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companiesServices.map((service) => renderServiceCard(service))}
            </div>
          </div>

          {/* View All Services Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 bg-primary hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1"
            >
              {t('common.viewAllServices')} <ArrowIcon size={20} />
            </button>
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

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};