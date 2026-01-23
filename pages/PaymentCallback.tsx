import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, XCircle, Loader, Home, CreditCard } from 'lucide-react';

type PaymentStatus = 'loading' | 'success' | 'failed' | 'error';

export const PaymentCallback: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, isRTL } = useLanguage();
    const [status, setStatus] = useState<PaymentStatus>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Get query params from URL
                const params = new URLSearchParams(location.search);
                const paymentId = params.get('paymentId') || params.get('Id');

                if (!paymentId) {
                    setStatus('error');
                    setMessage(isRTL ? 'معرف الدفع غير موجود' : 'Payment ID not found');
                    return;
                }

                // Call n8n webhook to verify payment status
                const response = await fetch(
                    `${import.meta.env.VITE_N8N_WEBHOOK_URL}/payment-callback?paymentId=${paymentId}`,
                    { method: 'GET' }
                );

                const data = await response.json();

                if (data.success || data.status === 'SETTLED' || data.status === 'paid') {
                    setStatus('success');
                    setMessage(isRTL ? 'تم الدفع بنجاح! تم إضافة الأرصدة إلى حسابك.' : 'Payment successful! Credits have been added to your account.');
                } else {
                    setStatus('failed');
                    setMessage(data.message || (isRTL ? 'فشل الدفع. يرجى المحاولة مرة أخرى.' : 'Payment failed. Please try again.'));
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('error');
                setMessage(isRTL ? 'خطأ في التحقق من الدفع' : 'Error verifying payment');
            }
        };

        verifyPayment();
    }, [location.search, isRTL]);

    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
                return <Loader size={64} className="animate-spin text-primary" />;
            case 'success':
                return <CheckCircle size={64} className="text-green-500" />;
            case 'failed':
            case 'error':
                return <XCircle size={64} className="text-red-500" />;
        }
    };

    const getStatusTitle = () => {
        switch (status) {
            case 'loading':
                return isRTL ? 'جارٍ التحقق من الدفع...' : 'Verifying Payment...';
            case 'success':
                return isRTL ? 'تم الدفع بنجاح!' : 'Payment Successful!';
            case 'failed':
                return isRTL ? 'فشل الدفع' : 'Payment Failed';
            case 'error':
                return isRTL ? 'خطأ' : 'Error';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'loading':
                return 'from-primary to-secondary';
            case 'success':
                return 'from-green-500 to-emerald-600';
            case 'failed':
            case 'error':
                return 'from-red-500 to-orange-500';
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-100">
                {/* Header */}
                <div className={`bg-gradient-to-br ${getStatusColor()} p-8 text-center`}>
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {getStatusIcon()}
                    </div>
                    <h1 className="text-2xl font-bold text-white">{getStatusTitle()}</h1>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <p className="text-gray-600 mb-8">{message}</p>

                    {status !== 'loading' && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                            >
                                <Home size={18} />
                                {isRTL ? 'العودة للرئيسية' : 'Go to Home'}
                            </button>

                            {(status === 'failed' || status === 'error') && (
                                <button
                                    onClick={() => navigate('/pricing')}
                                    className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <CreditCard size={18} />
                                    {isRTL ? 'إعادة المحاولة' : 'Try Again'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
