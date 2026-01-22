import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { CheckoutModal } from '../components/CheckoutModal';

export const Pricing: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{ id: string, name: string, price: number } | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({
    basic: 49,
    pro: 99,
    premium: 199
  });
  const [packageCredits, setPackageCredits] = useState<Record<string, number>>({
    basic: 500,
    pro: 1500,
    premium: 4000,
  });
  const [creditCosts, setCreditCosts] = useState<Record<string, number>>({
    cv_optimizer: 10,
    cv_creator: 15,
    competitor_analysis: 20,
    business_analyzer: 15,
  });

  useEffect(() => {
    fetchPrices();
    fetchPackageCredits();
    fetchCreditCosts();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('system_config')
        .select('key, value')
        .in('key', ['price_basic', 'price_pro', 'price_premium']);

      if (error) throw error;

      if (data) {
        const newPrices: Record<string, number> = { ...prices };
        data.forEach(item => {
          // keys are like 'price_basic', we want 'basic'
          const tier = item.key.replace('price_', '');
          if (newPrices[tier] !== undefined) {
            newPrices[tier] = Number(item.value);
          }
        });
        setPrices(newPrices);
      }
    } catch (err) {
      console.error("Error fetching prices:", err);
    }
  };

  const fetchPackageCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('system_config')
        .select('key, value')
        .in('key', ['credits_basic', 'credits_pro', 'credits_premium']);

      if (error) throw error;

      if (data) {
        const newCredits: Record<string, number> = { ...packageCredits };
        data.forEach(item => {
          const tier = item.key.replace('credits_', '');
          if (newCredits[tier] !== undefined) {
            newCredits[tier] = Number(item.value);
          }
        });
        setPackageCredits(newCredits);
      }
    } catch (err) {
      console.error("Error fetching package credits:", err);
    }
  };

  const fetchCreditCosts = async () => {
    try {
      const { data, error } = await supabase
        .from('system_config')
        .select('key, value')
        .in('key', ['credits_cv_optimizer', 'credits_cv_creator', 'credits_competitor_analysis', 'credits_business_analyzer']);

      if (error) throw error;

      if (data) {
        const newCosts: Record<string, number> = { ...creditCosts };
        data.forEach(item => {
          const service = item.key.replace('credits_', '');
          if (newCosts[service] !== undefined) {
            newCosts[service] = Number(item.value);
          }
        });
        setCreditCosts(newCosts);
      }
    } catch (err) {
      console.error("Error fetching credit costs:", err);
    }
  };

  const handlePurchase = (tierKey: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const pkgName = t(`pricing.${tierKey}.name`);

    setSelectedPackage({
      id: tierKey,
      name: typeof pkgName === 'string' ? pkgName : tierKey,
      price: prices[tierKey] || 0
    });
    setIsCheckoutOpen(true);
  };

  const tiers = [
    {
      key: 'basic',
      icon: <Zap size={24} />,
      color: 'border-gray-200',
      btnColor: 'bg-charcoal text-white hover:bg-black',
      gradient: 'from-gray-500 to-gray-700',
    },
    {
      key: 'pro',
      icon: <Star size={24} />,
      color: 'border-secondary shadow-xl',
      btnColor: 'bg-secondary text-white hover:bg-teal-600',
      popular: true,
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      key: 'premium',
      icon: <Crown size={24} />,
      color: 'border-primary',
      btnColor: 'bg-primary text-white hover:bg-blue-800',
      gradient: 'from-blue-600 to-indigo-700',
    }
  ];

  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Credit Display */}
        {user && (
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl shadow-lg">
              <Zap size={28} className="text-yellow-300" />
              <div className="text-start">
                <p className="text-sm text-blue-100">{t('pricing.credits')}</p>
                <p className="text-3xl font-bold">{user?.credits_cv ?? 0}</p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">{t('pricing.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('pricing.subtitle')}</p>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">{t('pricing.flexNote')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-8">
          {tiers.map((tier) => {
            const features = t(`pricing.${tier.key}.features`);

            return (
              <div
                key={tier.key}
                className={`bg-white rounded-2xl overflow-hidden border-2 ${tier.color} relative transition-transform hover:shadow-xl flex flex-col`}
              >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${tier.gradient} text-white p-6 text-center relative`}>
                  {tier.popular && (
                    <div className="absolute top-2 start-1/2 transform -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {isRTL ? 'الأكثر شعبية' : 'Most Popular'}
                    </div>
                  )}
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full ${tier.popular ? 'mt-6' : 'mt-0'} mb-3`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold">{t(`pricing.${tier.key}.name`)}</h3>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold text-charcoal">{prices[tier.key]}</span>
                      <span className="text-gray-500">{t('pricing.currency')}</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full">
                      <Zap size={16} />
                      <span className="font-bold">{packageCredits[tier.key].toLocaleString()}</span>
                      <span className="text-sm">{t('pricing.credits')}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {Array.isArray(features) ? features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="ms-3 text-sm text-gray-600">{feature}</p>
                      </li>
                    )) : (
                      <li className="text-sm text-gray-400 italic">Features could not be loaded.</li>
                    )}
                  </ul>

                  <button
                    onClick={() => handlePurchase(tier.key)}
                    className={`w-full py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 ${tier.btnColor}`}
                  >
                    {t(`pricing.${tier.key}.btn`)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credit Usage Breakdown Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-primary mb-3">{isRTL ? 'استخدام الأرصدة' : 'Credit Usage'}</h3>
            <p className="text-gray-500">{isRTL ? 'كم يكلف كل استخدام للخدمة' : 'How many credits each service uses'}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-start px-6 py-4 text-sm font-bold text-charcoal uppercase tracking-wide">{isRTL ? 'الخدمة' : 'Service'}</th>
                  <th className="text-end px-6 py-4 text-sm font-bold text-charcoal uppercase tracking-wide">{isRTL ? 'التكلفة' : 'Cost'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-primary"><Zap size={16} /></div>
                      <span className="font-medium text-charcoal">{isRTL ? 'تحسين السيرة الذاتية' : 'CV Optimization'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-primary font-bold px-3 py-1 rounded-full text-sm">
                      <Zap size={14} /> {creditCosts.cv_optimizer} {isRTL ? 'رصيد' : 'Credits'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-secondary"><Star size={16} /></div>
                      <span className="font-medium text-charcoal">{isRTL ? 'إنشاء سيرة ذاتية' : 'CV Creation'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <span className="inline-flex items-center gap-1 bg-teal-100 text-secondary font-bold px-3 py-1 rounded-full text-sm">
                      <Zap size={14} /> {creditCosts.cv_creator} {isRTL ? 'رصيد' : 'Credits'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><Crown size={16} /></div>
                      <span className="font-medium text-charcoal">{isRTL ? 'تحليل المنافسين' : 'Competitor Analysis'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-600 font-bold px-3 py-1 rounded-full text-sm">
                      <Zap size={14} /> {creditCosts.competitor_analysis} {isRTL ? 'رصيد' : 'Credits'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600"><Check size={16} /></div>
                      <span className="font-medium text-charcoal">{isRTL ? 'تحليل الأعمال' : 'Business Analysis'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full text-sm">
                      <Zap size={14} /> {creditCosts.business_analyzer} {isRTL ? 'رصيد' : 'Credits'}
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-green-50/50 transition-colors bg-green-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><Check size={16} /></div>
                      <span className="font-medium text-charcoal">{isRTL ? 'استشارة الخبراء' : 'Expert Consultation'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-end">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                      {isRTL ? 'تواصل معنا' : 'Contact Us'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            {isRTL ? 'قد تختلف التكاليف. تحقق من تفاصيل الخدمة للحصول على أحدث المعلومات.' : 'Costs may vary. Check service details for the latest information.'}
          </p>
        </div>
      </div>

      {selectedPackage && user && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          userId={user.id}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          originalPrice={selectedPackage.price}
          currency={t('pricing.currency')}
        />
      )}
    </div>
  );
};