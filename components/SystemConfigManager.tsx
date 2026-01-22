import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useLanguage } from '../context/LanguageContext';
import { Save, Plus, Trash2, Lock, Globe, AlertCircle, RefreshCw } from 'lucide-react';

interface ConfigItem {
    key: string;
    value: string;
    description: string;
    group_name: string;
    is_secret: boolean;
    updated_at: string;
}

export const SystemConfigManager: React.FC = () => {
    const { t } = useLanguage();
    const [configs, setConfigs] = useState<ConfigItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [newItem, setNewItem] = useState<Partial<ConfigItem>>({ group_name: 'general', is_secret: false });
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('system_config')
                .select('*')
                .order('group_name', { ascending: true })
                .order('key', { ascending: true });

            if (error) throw error;
            setConfigs(data || []);
        } catch (err: any) {
            console.error('Error fetching config:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (item: ConfigItem) => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from('system_config')
                .upsert({
                    key: item.key,
                    value: item.value,
                    description: item.description,
                    group_name: item.group_name,
                    is_secret: item.is_secret,
                });

            if (error) throw error;
            // No need to refetch if we just update local state sensibly, but refresh is safer
            await fetchConfigs();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (key: string) => {
        if (!confirm(t('admin.confirmDelete') || 'Are you sure?')) return;
        try {
            const { error } = await supabase.from('system_config').delete().eq('key', key);
            if (error) throw error;
            setConfigs(prev => prev.filter(c => c.key !== key));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCreate = async () => {
        if (!newItem.key || !newItem.value) return;
        setIsSaving(true);
        try {
            const { error } = await supabase.from('system_config').insert([newItem]);
            if (error) throw error;
            setNewItem({ group_name: 'general', is_secret: false, key: '', value: '', description: '' });
            setShowAddForm(false);
            await fetchConfigs();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">{t('common.loading')}</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[800px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h2 className="font-bold text-charcoal flex items-center gap-2">
                    <Globe size={20} className="text-primary" />
                    {t('admin.systemConfig') || "System Configuration"}
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all"
                >
                    <Plus size={16} /> {t('admin.addVariable') || "Add Variable"}
                </button>
            </div>

            {error && <div className="bg-red-50 p-4 text-red-600 flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}

            <div className="flex-1 overflow-auto p-6">
                {showAddForm && (
                    <div className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100 animate-slideUp">
                        <h3 className="font-bold mb-4 text-primary">New System Variable</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Key (Unique)</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded font-mono text-sm"
                                    placeholder="e.g. price_basic_credits"
                                    value={newItem.key || ''}
                                    onChange={e => setNewItem({ ...newItem, key: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Group</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded text-sm"
                                    placeholder="e.g. pricing"
                                    value={newItem.group_name || ''}
                                    onChange={e => setNewItem({ ...newItem, group_name: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Value</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded font-mono text-sm"
                                    placeholder="Value..."
                                    value={newItem.value || ''}
                                    onChange={e => setNewItem({ ...newItem, value: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea
                                    className="w-full p-2 border rounded text-sm"
                                    rows={2}
                                    placeholder="What is this for?"
                                    value={newItem.description || ''}
                                    onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isSecret"
                                    checked={newItem.is_secret}
                                    onChange={e => setNewItem({ ...newItem, is_secret: e.target.checked })}
                                />
                                <label htmlFor="isSecret" className="text-sm font-medium flex items-center gap-1">
                                    <Lock size={12} /> Secret (Admin Only)
                                </label>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-bold text-sm">Cancel</button>
                            <button onClick={handleCreate} disabled={!newItem.key || !newItem.value} className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow-sm hover:bg-blue-700 disabled:opacity-50">Create</button>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {configs.map(item => (
                        <ConfigRow key={item.key} item={item} onSave={handleSave} onDelete={handleDelete} />
                    ))}
                    {configs.length === 0 && !loading && (
                        <div className="text-center py-10 text-gray-400">No configuration variables found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ConfigRow: React.FC<{ item: ConfigItem, onSave: (i: ConfigItem) => void, onDelete: (k: string) => void }> = ({ item, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [edited, setEdited] = useState(item);

    const handleSaveLocal = () => {
        onSave(edited);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-lg border-2 border-primary/20 shadow-sm animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="text-xs text-gray-400 font-bold">KEY</label>
                        <div className="font-mono font-bold text-gray-700">{item.key}</div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 font-bold">GROUP</label>
                        <input className="w-full border rounded px-2 py-1 text-sm module-input" value={edited.group_name} onChange={e => setEdited({ ...edited, group_name: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-400 font-bold">VALUE</label>
                        <input className="w-full border rounded px-2 py-1 font-mono text-sm" value={edited.value} onChange={e => setEdited({ ...edited, value: e.target.value })} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-xs text-gray-400 font-bold">DESCRIPTION</label>
                        <input className="w-full border rounded px-2 py-1 text-sm" value={edited.description || ''} onChange={e => setEdited({ ...edited, description: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked={edited.is_secret} onChange={e => setEdited({ ...edited, is_secret: e.target.checked })} />
                        <label className="text-sm">Is Secret?</label>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm font-bold text-gray-500">Cancel</button>
                    <button onClick={handleSaveLocal} className="px-3 py-1 text-sm font-bold bg-primary text-white rounded">Save</button>
                </div>
            </div>
        )
    }

    return (
        <div className="group bg-white p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all flex justify-between items-start">
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{item.group_name}</span>
                    {item.is_secret && <Lock size={12} className="text-amber-500" />}
                    <h4 className="font-mono font-bold text-charcoal">{item.key}</h4>
                </div>
                <p className="text-gray-800 font-medium break-all mb-1 font-mono text-sm bg-gray-50 inline-block px-2 py-1 rounded">{item.is_secret ? '••••••••' : item.value}</p>
                {item.description && <p className="text-gray-500 text-sm italic">{item.description}</p>}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-primary transition-colors">
                    <RefreshCw size={16} />
                </button>
                <button onClick={() => onDelete(item.key)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};
