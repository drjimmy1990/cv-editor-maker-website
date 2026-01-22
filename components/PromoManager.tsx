import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Trash2, Tag, Calendar, Users as UsersIcon, Percent, DollarSign } from 'lucide-react';

interface PromoCode {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    max_usage: number | null;
    current_usage: number;
    expires_at: string | null;
    is_active: boolean;
}

export const PromoManager: React.FC = () => {
    const { t } = useLanguage();
    const [promos, setPromos] = useState<PromoCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState<Partial<PromoCode>>({
        discount_type: 'percentage',
        is_active: true,
        max_usage: null
    });

    useEffect(() => {
        fetchPromos();
    }, []);

    const fetchPromos = async () => {
        const { data } = await supabase.from('promo_codes').select('*').order('created_at', { ascending: false });
        if (data) setPromos(data);
        setLoading(false);
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        await supabase.from('promo_codes').update({ is_active: !current }).eq('id', id);
        fetchPromos();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently delete this code?')) return;
        await supabase.from('promo_codes').delete().eq('id', id);
        fetchPromos();
    };

    const handleCreate = async () => {
        if (!newItem.code || !newItem.discount_value) return;

        const { error } = await supabase.from('promo_codes').insert([newItem]);
        if (error) {
            alert(error.message);
            return;
        }
        setShowAddForm(false);
        setNewItem({ discount_type: 'percentage', is_active: true, max_usage: null, code: '', discount_value: 0 });
        fetchPromos();
    };

    if (loading) return <div className="p-8 text-center">{t('common.loading')}</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[800px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-charcoal flex items-center gap-2">
                    <Tag size={20} className="text-primary" />
                    Promo Codes
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
                >
                    <Plus size={16} /> New Code
                </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {showAddForm && (
                    <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 animate-slideUp">
                        <h3 className="font-bold mb-4 text-primary">Create New Promo Code</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Code</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded font-mono uppercase font-bold"
                                    placeholder="SUMMER2026"
                                    value={newItem.code || ''}
                                    onChange={e => setNewItem({ ...newItem, code: e.target.value.toUpperCase() })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Discount Type</label>
                                <select
                                    className="w-full p-2 border rounded bg-white"
                                    value={newItem.discount_type}
                                    onChange={e => setNewItem({ ...newItem, discount_type: e.target.value as any })}
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Rate (SAR)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    placeholder="e.g. 20"
                                    value={newItem.discount_value || ''}
                                    onChange={e => setNewItem({ ...newItem, discount_value: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Uses (Null = Unlimited)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    placeholder="Unlimited"
                                    value={newItem.max_usage || ''}
                                    onChange={e => setNewItem({ ...newItem, max_usage: e.target.value ? parseInt(e.target.value) : null })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expires At</label>
                                <input
                                    type="datetime-local"
                                    className="w-full p-2 border rounded"
                                    value={newItem.expires_at || ''}
                                    onChange={e => setNewItem({ ...newItem, expires_at: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-500 font-bold text-sm">Cancel</button>
                            <button onClick={handleCreate} className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm">Create Promo</button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {promos.map(promo => (
                        <div key={promo.id} className={`p-4 rounded-xl border flex justify-between items-center transition-all ${promo.is_active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-xl text-primary font-mono tracking-wider">{promo.code}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${promo.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {promo.is_active ? 'ACTIVE' : 'INACTIVE'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        {promo.discount_type === 'percentage' ? <Percent size={14} /> : <DollarSign size={14} />}
                                        {promo.discount_value}{promo.discount_type === 'percentage' ? '%' : ' SAR'}
                                    </span>
                                    <span className="flex items-center gap-1" title="Usage / Limit">
                                        <UsersIcon size={14} />
                                        {promo.current_usage} / {promo.max_usage || '∞'}
                                    </span>
                                    {promo.expires_at && (
                                        <span className="flex items-center gap-1 text-orange-600">
                                            <Calendar size={14} />
                                            {new Date(promo.expires_at).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggleActive(promo.id, promo.is_active)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${promo.is_active ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                                >
                                    {promo.is_active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => handleDelete(promo.id)} className="p-2 text-gray-400 hover:text-red-500">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {promos.length === 0 && !loading && (
                        <div className="text-center py-12 text-gray-400">No promo codes active. Create one to start.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
