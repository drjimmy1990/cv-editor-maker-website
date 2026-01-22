import React, { useState } from 'react';
import { X, Loader, ShieldCheck, Tag } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    packageId: string;
    packageName: string;
    originalPrice: number;
    currency?: string;
    onSuccess?: (redirectUrl: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    userId,
    packageId,
    packageName,
    originalPrice,
    currency = 'SAR',
    onSuccess
}) => {
    const { t, isRTL } = useLanguage();
    const [promoCode, setPromoCode] = useState('');
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [promoError, setPromoError] = useState<string | null>(null);
    const [discountDetails, setDiscountDetails] = useState<{
        code: string;
        discountAmount: number;
        newTotal: number;
        id: string;
    } | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        setIsApplyingPromo(true);
        setPromoError(null);
        setDiscountDetails(null);

        try {
            const result = await api.validatePromoCode(promoCode.trim(), userId, originalPrice);

            if (result && result.valid) {
                setDiscountDetails({
                    code: promoCode,
                    discountAmount: originalPrice - result.final_price,
                    newTotal: result.final_price,
                    id: result.promo_id
                });
            } else {
                setPromoError(result?.message || t('checkout.invalidPromo'));
            }
        } catch (err: any) {
            setPromoError(err.message || t('checkout.validateError'));
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        setPaymentError(null);

        try {
            const payload = {
                userId,
                amount: discountDetails ? discountDetails.newTotal : originalPrice,
                type: 'credits_purchase',
                packageId,
                promoCode: discountDetails?.code,
            };

            const response = await api.initiatePayment(payload);

            // Handle n8n response which might be an array or object
            console.log("RAW RESPONSE:", response);
            const data = Array.isArray(response) ? response[0] : response;
            console.log("RESOLVED DATA:", data);

            const targetUrl = data?.redirect_url || data?.redirectUrl;
            console.log("TARGET URL:", targetUrl);

            if (targetUrl) {
                if (onSuccess) {
                    onSuccess(targetUrl);
                } else {
                    window.location.href = targetUrl;
                }
            } else {
                setPaymentError(t('checkout.noRedirect'));
            }
        } catch (err: any) {
            setPaymentError(err.message || t('checkout.paymentFailed'));
        } finally {
            setIsProcessing(false);
        }
    };

    const finalPrice = discountDetails ? discountDetails.newTotal : originalPrice;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{t('checkout.title')}</h2>
                        <p className="text-sm text-slate-500 mt-1">{t('checkout.subtitle')}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center text-slate-700">
                            <span className="font-medium">{packageName}</span>
                            <span className="font-semibold">{originalPrice} {currency}</span>
                        </div>

                        {discountDetails && (
                            <div className="flex justify-between items-center text-emerald-600 text-sm">
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> {t('checkout.discount')} ({discountDetails.code})
                                </span>
                                <span dir="ltr">- {discountDetails.discountAmount} {currency}</span>
                            </div>
                        )}

                        <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between items-center">
                            <span className="font-bold text-slate-800">{t('checkout.total')}</span>
                            <span className="font-bold text-xl text-primary">{finalPrice} {currency}</span>
                        </div>
                    </div>

                    {/* Promo Code Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">{t('checkout.promoCode')}</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder={t('checkout.promoPlaceholder') || "Enter code"}
                                className="flex-1 rounded-lg border-slate-200 focus:border-primary focus:ring-primary text-sm p-2 border"
                                disabled={!!discountDetails}
                            />
                            {discountDetails ? (
                                <button
                                    onClick={() => {
                                        setDiscountDetails(null);
                                        setPromoCode('');
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                    {t('checkout.remove')}
                                </button>
                            ) : (
                                <button
                                    onClick={handleApplyPromo}
                                    disabled={!promoCode.trim() || isApplyingPromo}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                                >
                                    {isApplyingPromo ? <Loader className="w-4 h-4 animate-spin" /> : t('checkout.apply')}
                                </button>
                            )}
                        </div>
                        {promoError && (
                            <p className="text-xs text-red-500 mt-2">{promoError}</p>
                        )}
                        {discountDetails && (
                            <p className="text-xs text-emerald-600 mt-2">{t('checkout.couponSuccess')}</p>
                        )}
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{t('checkout.securedBy')}</span>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-primary hover:bg-blue-700 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                {t('checkout.processing')}
                            </>
                        ) : (
                            <>{t('checkout.pay')} {finalPrice} {currency}</>
                        )}
                    </button>
                    {paymentError && (
                        <div className="text-center">
                            <p className="text-xs text-red-500 mt-1">{paymentError}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
