import React, { useState } from 'react';
import { api } from '../services/api';
import { CheckCircle, MessageCircle, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Complaints: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', complaint: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t, isRTL } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.submitComplaint({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                complaint: formData.complaint,
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Submission failed:", error);
            alert(t('complaints.errorMsg') || "Failed to submit complaint. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-2">{t('complaints.successTitle')}</h2>
                <p className="text-gray-600 mb-6">{t('complaints.successMsg')}</p>
                <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', complaint: '' }); }}
                    className="text-primary font-medium hover:underline"
                >
                    {t('complaints.submitAnother') || 'تقديم شكوى أخرى'}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-primary mb-3">{t('complaints.title')}</h1>
                <p className="text-gray-600 text-lg">{t('complaints.subtitle')}</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Form Section */}
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-charcoal mb-2">{t('complaints.name')}</label>
                            <input
                                required
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-charcoal mb-2">{t('complaints.email')}</label>
                            <input
                                required
                                type="email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-charcoal mb-2">{t('complaints.phone')}</label>
                            <input
                                type="tel"
                                dir="ltr"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-charcoal mb-2">{t('complaints.complaint')}</label>
                            <textarea
                                required
                                rows={5}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                                value={formData.complaint}
                                onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3.5 rounded-lg shadow-lg transition-all flex justify-center items-center gap-2"
                        >
                            {loading ? t('common.loading') : t('complaints.submit')}
                        </button>
                    </form>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                    {/* WhatsApp Card */}
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-green-500 p-3 rounded-full text-white">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-charcoal mb-2">{t('complaints.whatsappTitle')}</h3>
                                <p className="text-gray-600 text-sm mb-3">{t('complaints.whatsappDesc')}</p>
                                <a
                                    href="https://wa.me/966544800072"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    dir="ltr"
                                    className="text-green-600 font-bold text-lg hover:underline"
                                >
                                    {t('complaints.whatsappNumber')}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Response Time Card */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-500 p-3 rounded-full text-white">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-charcoal mb-2">{t('complaints.responseTime')}</h3>
                                <p className="text-gray-600 text-sm">{t('complaints.responseTimeDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Processing Time Card */}
                    <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                        <div className="flex items-start gap-4">
                            <div className="bg-amber-500 p-3 rounded-full text-white">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-charcoal mb-2">{t('complaints.processingTime')}</h3>
                                <p className="text-gray-600 text-sm">{t('complaints.processingTimeDesc')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Refund Policy Link */}
                    <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                        <h4 className="font-bold text-charcoal mb-2">{t('refundPolicy.title')}</h4>
                        <p className="text-gray-600 text-sm mb-3">
                            {t('refundPolicy.shortDesc') || 'اطلع على سياسة الاسترجاع والاستبدال الخاصة بنا.'}
                        </p>
                        <Link to="/refund-policy" className="text-primary font-medium hover:underline">
                            {t('common.viewDetails')} →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complaints;
