import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Pricing: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const tiers = [
    {
      key: 'free',
      color: 'border-gray-200',
      btnColor: 'bg-charcoal text-white hover:bg-black',
    },
    {
      key: 'pro',
      color: 'border-secondary shadow-xl scale-105',
      btnColor: 'bg-secondary text-white hover:bg-teal-600',
      popular: true
    },
    {
      key: 'enterprise',
      color: 'border-gray-200',
      btnColor: 'bg-white text-primary border-2 border-primary hover:bg-blue-50',
    }
  ];

  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">{t('pricing.title')}</h2>
          <p className="mt-4 text-xl text-gray-600">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier) => {
            const features = t(`pricing.${tier.key}.features`);
            
            return (
              <div 
                key={tier.key}
                className={`bg-white rounded-2xl p-8 border-2 ${tier.color} relative transition-transform`}
              >
                {tier.popular && (
                  <div className="absolute top-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-charcoal">{t(`pricing.${tier.key}.name`)}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-charcoal">{t(`pricing.${tier.key}.price`)}</span>
                  {tier.key !== 'enterprise' && tier.key !== 'free' && (
                     <span className="text-gray-500 ms-1">{t(`pricing.${tier.key}.period`)}</span>
                  )}
                </div>
                
                <ul className="mt-8 space-y-4">
                  {Array.isArray(features) ? features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ms-3 text-base text-gray-600">{feature}</p>
                    </li>
                  )) : (
                    <li className="text-sm text-gray-400 italic">Features could not be loaded.</li>
                  )}
                </ul>

                <button className={`mt-8 w-full py-3 px-6 rounded-xl font-bold transition-colors ${tier.btnColor}`}>
                  {t(`pricing.${tier.key}.btn`)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};