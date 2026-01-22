import React from 'react';
import { X, Zap, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface InsufficientCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
    requiredCredits: number;
    currentCredits: number;
    serviceName: string;
}

export const InsufficientCreditsModal: React.FC<InsufficientCreditsModalProps> = ({
    isOpen,
    onClose,
    requiredCredits,
    currentCredits,
    serviceName,
}) => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();
    const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

    if (!isOpen) return null;

    const handleBuyCredits = () => {
        onClose();
        navigate('/pricing');
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 rounded-t-2xl relative text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 end-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {t('common.insufficientCreditsTitle')}
                    </h2>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-600 text-center mb-6">
                        {t('common.insufficientCreditsMsg')}
                    </p>

                    {/* Credits Comparison */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500">{t('common.yourCredits')}</span>
                            <span className="font-bold text-red-500 flex items-center gap-1">
                                <Zap size={14} /> {currentCredits}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{t('common.requiredCredits')}</span>
                            <span className="font-bold text-primary flex items-center gap-1">
                                <Zap size={14} /> {requiredCredits}
                            </span>
                        </div>
                        <div className="border-t border-gray-200 mt-3 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">{t('common.youNeed')}</span>
                                <span className="font-bold text-orange-500 flex items-center gap-1">
                                    <Zap size={14} /> +{Math.max(0, requiredCredits - currentCredits)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handleBuyCredits}
                            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={18} />
                            {t('common.buyMoreCredits')}
                            <ArrowIcon size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-100 text-gray-600 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all"
                        >
                            {t('common.maybeLater')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
