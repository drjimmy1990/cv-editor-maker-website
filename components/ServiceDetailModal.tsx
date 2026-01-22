import React from 'react';
import { X, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface ServiceDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    service: {
        id: string;
        titleKey: string;
        descKey: string;
        howToUseKey: string;
        credits: number | string;
        image?: string;
        route: string;
        color: string;
    } | null;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, service }) => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();

    if (!isOpen || !service) return null;

    const handleUseService = () => {
        onClose();
        navigate(service.route);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with gradient */}
                <div className={`bg-gradient-to-br ${service.color} p-6 rounded-t-2xl relative`}>
                    <button
                        onClick={onClose}
                        className="absolute top-4 end-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-white">{t(service.titleKey)}</h2>
                    {service.credits !== 'contact' && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                            <Zap size={14} />
                            <span>{service.credits} {isRTL ? 'رصيد' : 'Credits'}</span>
                        </div>
                    )}
                    {service.credits === 'contact' && (
                        <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
                            <span>{isRTL ? 'تواصل معنا' : 'Contact Us'}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Image */}
                    {service.image && (
                        <div className="mb-6 rounded-xl overflow-hidden border border-gray-100">
                            <img
                                src={service.image}
                                alt={t(service.titleKey) as string}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {t(service.descKey)}
                    </p>

                    {/* How to Use Section */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h4 className="font-bold text-charcoal mb-3 flex items-center gap-2">
                            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold">?</span>
                            {isRTL ? 'كيفية الاستخدام' : 'How to Use'}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {t(service.howToUseKey)}
                        </p>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleUseService}
                        className={`w-full bg-gradient-to-r ${service.color} text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}
                    >
                        {isRTL ? 'استخدم الخدمة' : 'Use This Service'}
                        <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};
