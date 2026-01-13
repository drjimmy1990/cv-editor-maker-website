import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare } from 'lucide-react';

const RefundPolicy: React.FC = () => {
    const { t, isRTL } = useLanguage();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={32} className="text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-primary mb-3">{t('refundPolicy.title')}</h1>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg mb-8">
                        {t('refundPolicy.content')}
                    </p>

                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mt-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-amber-500 p-2 rounded-full text-white flex-shrink-0">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-charcoal mb-2">{t('refundPolicy.complaintsNote') || 'لديك شكوى؟'}</h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {t('refundPolicy.complaintsNoteDesc') || 'في حال وجود شكوى، يمكن للعميل تقديم شكوى رسمية وسيتم التعامل معها حسب سياسة الشكاوى المعتمدة.'}
                                </p>
                                <Link
                                    to="/complaints"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-blue-800 text-white font-medium px-5 py-2 rounded-lg transition-colors"
                                >
                                    {t('refundPolicy.complaintsLink')}
                                    <span className={isRTL ? 'rotate-180' : ''}>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Services */}
            <div className="mt-8 text-center">
                <Link to="/#services" className="text-primary font-medium hover:underline">
                    ← {t('common.back')} {t('nav.services')}
                </Link>
            </div>
        </div>
    );
};

export default RefundPolicy;
