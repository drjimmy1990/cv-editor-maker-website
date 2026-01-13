import React from 'react';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Pricing: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

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
            const price = t(`pricing.${tier.key}.price`);
            const credits = t(`pricing.${tier.key}.credits`);

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
                      <span className="text-4xl font-extrabold text-charcoal">{price}</span>
                      <span className="text-gray-500">{t('pricing.currency')}</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 text-primary px-4 py-2 rounded-full">
                      <Zap size={16} />
                      <span className="font-bold">{credits}</span>
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

                  <button className={`w-full py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 ${tier.btnColor}`}>
                    {t(`pricing.${tier.key}.btn`)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};