import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Briefcase, Loader, ChevronRight, Building2, TrendingUp, Settings, Users, BarChart3, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Consultation: React.FC = () => {
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    email: '',
    entityName: '',
    contactPerson: '',
    mobileNumber: '',
    projectOverview: '',
    supportNeeds: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email! }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.requestConsultation({
        userId: user?.id || null, // Allow null for anonymous
        ...formData
      });
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ServiceCard = ({ title, desc, points, icon: Icon }: { title: string, desc: string, points: string[], icon: any }) => (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full flex flex-col">
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{desc}</p>
      <div className="mt-auto">
        <div className="h-px w-full bg-gray-100 mb-4"></div>
        <ul className="space-y-3">
          {points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="text-secondary mt-1.5"><CheckCircle size={14} /></span>
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-charcoal mb-4">{t('consultation.successTitle')}</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">{t('consultation.successMsg')}</p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                email: user?.email || '',
                entityName: '',
                contactPerson: '',
                mobileNumber: '',
                projectOverview: '',
                supportNeeds: ''
              });
            }}
            className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 transition-colors shadow-md"
          >
            {t('consultation.submitAnother')}
          </button>
        </div>
      </div >
    );
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-primary text-white overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center pt-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-blue-100 text-sm font-bold uppercase tracking-wider mb-6 border border-white/20">
            <Briefcase size={16} className="text-secondary" /> {t('services.forCompanies')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t('consultation.title')}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
            {t('consultation.subtitle')}
          </p>
        </div>

        {/* Decorative Blur */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{t('consultation.ourServices')}</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              title={t('consultation.service1Title')}
              desc={t('consultation.service1Desc')}
              points={t('consultation.service1Points') as unknown as string[]}
              icon={TrendingUp}
            />
            <ServiceCard
              title={t('consultation.service2Title')}
              desc={t('consultation.service2Desc')}
              points={t('consultation.service2Points') as unknown as string[]}
              icon={Settings}
            />
            <ServiceCard
              title={t('consultation.service3Title')}
              desc={t('consultation.service3Desc')}
              points={t('consultation.service3Points') as unknown as string[]}
              icon={Users}
            />
            <ServiceCard
              title={t('consultation.service4Title')}
              desc={t('consultation.service4Desc')}
              points={t('consultation.service4Points') as unknown as string[]}
              icon={BarChart3}
            />
          </div>
        </div>
      </section>

      {/* Industry Verticals */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">{t('consultation.industryVerticals')}</h2>
              <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">{t('consultation.industrySubtitle')}</p>

              <div className="flex flex-wrap justify-center gap-4">
                {(t('consultation.industries') as unknown as string[]).map((industry, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-primary transition-all duration-300 cursor-default flex items-center gap-2 group">
                    <Building2 size={18} className="text-secondary group-hover:text-primary transition-colors" />
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-primary p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{t('consultation.submitRequest')}</h2>
              <p className="text-blue-100">Let's discuss how we can help your business grow.</p>
            </div>

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('consultation.entityName')}</label>
                    <input
                      required
                      type="text"
                      placeholder={t('consultation.entityNamePlaceholder')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
                      value={formData.entityName}
                      onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('consultation.contactPerson')}</label>
                    <input
                      required
                      type="text"
                      placeholder={t('consultation.contactPersonPlaceholder')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('common.email')}</label>
                    <input
                      type="email"
                      required
                      disabled={!!user} // Only disable if logged in
                      placeholder={t('consultation.emailPlaceholder') || "Enter your email"}
                      className={`w-full border border-gray-200 rounded-xl px-5 py-4 font-medium transition-all ${user ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent'}`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('consultation.mobileNumber')}</label>
                    <input
                      required
                      type="tel"
                      placeholder={t('consultation.mobileNumberPlaceholder')}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('consultation.projectOverview')}</label>
                  <textarea
                    required
                    rows={3}
                    placeholder={t('consultation.projectOverviewPlaceholder')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none font-medium"
                    value={formData.projectOverview}
                    onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-charcoal uppercase tracking-wide">{t('consultation.supportNeeds')}</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t('consultation.supportNeedsPlaceholder')}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none font-medium"
                    value={formData.supportNeeds}
                    onChange={(e) => setFormData({ ...formData, supportNeeds: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-yellow-600 text-white font-bold py-5 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? <Loader className="animate-spin" /> : <>{t('consultation.submitRequest')} <ArrowIcon size={22} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};