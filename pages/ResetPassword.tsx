import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ResetPassword: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { user } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Security check: If accessed without an active session, redirect to login
    useEffect(() => {
        // We give a small delay to allow session to restore from the hash fragment
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                // Ideally should verify if we are in the middle of a recovery flow
                // But for now, if no session, we can't update password.
                // However, Supabase recovery link automatically sets the session.
                navigate('/login');
            }
        };
        checkSession();
    }, [navigate]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (err: any) {
            setError(err.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 text-center animate-fadeIn">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-charcoal mb-4">Password Updated!</h2>
                    <p className="text-gray-600 mb-6">
                        Your password has been changed successfully. You will be redirected to the home page shortly.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary font-bold hover:underline"
                    >
                        Go to Home Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-primary mb-2">Set New Password</h2>
                    <p className="text-gray-500">
                        Please enter your new password below.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm mb-6 flex items-start gap-3">
                        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : "Update Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};
