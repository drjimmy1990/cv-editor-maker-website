import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Save, Search, Check, AlertCircle, Globe, Loader } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { en } from '../locales/en';
import { ar } from '../locales/ar';

interface ContentItem {
    key: string;
    lang: string;
    value: string;
    section: string;
}

export const ContentEditor: React.FC = () => {
    console.log("ContentEditor mounting...");
    const [activeSection, setActiveSection] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dbContent, setDbContent] = useState<Record<string, { en: string; ar: string }>>({});
    const [staticContent, setStaticContent] = useState<Record<string, { en: string; ar: string }>>({});
    const [staticKeys, setStaticKeys] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState<Record<string, boolean>>({});

    const { refreshTranslations, t } = useLanguage();

    useEffect(() => {
        fetchContent();
        parseStaticKeys();
    }, []);

    // Use flat loop to find all keys and values in static files
    const parseStaticKeys = () => {
        const keys: string[] = [];
        const staticMap: Record<string, { en: string; ar: string }> = {};

        // Helper to traverse and populate map
        const traverse = (obj: any, prefix = '', lang: 'en' | 'ar') => {
            for (const k in obj) {
                if (typeof obj[k] === 'string') {
                    const key = prefix + k;
                    if (!staticMap[key]) staticMap[key] = { en: '', ar: '' };
                    staticMap[key][lang] = obj[k];

                    if (lang === 'en') keys.push(key); // Only push keys once
                } else if (typeof obj[k] === 'object' && obj[k] !== null) {
                    traverse(obj[k], prefix + k + '.', lang);
                }
            }
        };

        traverse(en, '', 'en');
        traverse(ar, '', 'ar');

        setStaticKeys(keys);
        setStaticContent(staticMap);
    };

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('site_content')
                .select('*');

            if (error) throw error;

            // Group by key
            const contentMap: Record<string, { en: string; ar: string }> = {};
            if (data) {
                data.forEach((item: ContentItem) => {
                    if (!contentMap[item.key]) {
                        contentMap[item.key] = { en: '', ar: '' };
                    }
                    if (item.lang === 'en') contentMap[item.key].en = item.value;
                    if (item.lang === 'ar') contentMap[item.key].ar = item.value;
                });
            }
            setDbContent(contentMap);
        } catch (err) {
            console.error("Error fetching content:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (key: string, lang: 'en' | 'ar', value: string) => {
        try {
            // Determine section from key (first part before dot)
            const section = key.split('.')[0] || 'general';

            const { error } = await supabase
                .from('site_content')
                .upsert({
                    key,
                    lang,
                    value,
                    section,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'key,lang' });

            if (error) throw error;

            // Update local state to mark as saved
            setUnsavedChanges(prev => {
                const newState = { ...prev };
                delete newState[`${key}-${lang}`];
                return newState;
            });

            // Refresh context to show changes immediately
            await refreshTranslations();

        } catch (err: any) {
            alert("Error saving content: " + err.message);
        }
    };

    const handleSync = async () => {
        if (!confirm(t('admin.confirmSync') || "This will populate the database with all static text keys. Continue?")) return;

        setIsSyncing(true);
        try {
            // We don't overwrite existing DB content, only insert missing
            // Actually, upserting all might be heavy. Let's just insert checking existence??
            // For now, simpler: The user edits what they see. 
            // If we want to FILL the DB, we can iterate all staticKeys.

            // Let's implement a "Smart Sync" that only inserts keys not present in DB
            const { data: existingData } = await supabase.from('site_content').select('key, lang');
            const existingKeys = new Set(existingData?.map(d => `${d.key}-${d.lang}`));

            const toInsert: any[] = [];
            const traverse = (obj: any, prefix = '', lang: 'en' | 'ar') => {
                for (const k in obj) {
                    if (typeof obj[k] === 'string') {
                        const key = prefix + k;
                        if (!existingKeys.has(`${key}-${lang}`)) {
                            toInsert.push({
                                key,
                                lang,
                                value: obj[k],
                                section: key.split('.')[0] || 'general'
                            });
                        }
                    } else if (typeof obj[k] === 'object' && obj[k] !== null) {
                        traverse(obj[k], prefix + k + '.', lang);
                    }
                }
            };

            // Import both langs
            const { en } = await import('../locales/en');
            const { ar } = await import('../locales/ar');

            traverse(en, '', 'en');
            traverse(ar, '', 'ar');

            if (toInsert.length === 0) {
                alert("Database is already up to date!");
                return;
            }

            // Batch insert (Supabase limit is usually high enough for locales, but maybe batch 100s)
            const batchSize = 100;
            for (let i = 0; i < toInsert.length; i += batchSize) {
                const batch = toInsert.slice(i, i + batchSize);
                const { error } = await supabase.from('site_content').insert(batch);
                if (error) console.error("Batch error:", error);
            }

            await fetchContent();
            alert(`Synced ${toInsert.length} keys to database.`);

        } catch (err: any) {
            alert("Sync failed: " + err.message);
        } finally {
            setIsSyncing(false);
        }
    };

    const getValue = (key: string, lang: 'en' | 'ar') => {
        // Return DB value if exists, else static value from files (via t helper logic?)
        // Actually, for the EDITOR, we should explicitly show what is in DB vs what is static.
        // If DB is empty, we should show static value as placeholder or value?
        // Let's show existing static value as default if DB is empty.

        if (dbContent[key]?.[lang] !== undefined) return dbContent[key][lang];

        // Fallback to static
        // We can use the t() function logic but we need raw value for specific lang
        // Simple traversal:
        // ... we don't have easy access to 'ar' static object here unless imported
        // We imported 'en' above. Let's import 'ar' as well or pass it.
        // Ideally user clicks "Sync" to populate everything to DB first.
        return "";
    };

    // Helper to get static value for display if DB is empty
    const getStaticValue = (key: string, lang: 'en' | 'ar') => {
        // This is just for placeholder purposes
        return "";
    };

    // Get unique sections
    const sections = Array.from(new Set(staticKeys.map(k => k.split('.')[0]))).sort();

    // Filter keys
    const filteredKeys = staticKeys.filter(key => {
        const matchesSection = activeSection === 'all' || key.startsWith(activeSection + '.');
        const matchesSearch = key.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSection && matchesSearch;
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[800px]">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-xl">
                <h2 className="font-bold text-charcoal flex items-center gap-2">
                    <Globe size={20} className="text-primary" />
                    {t('admin.contentManager') || "Content Manager"}
                </h2>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold hover:bg-purple-200 transition-colors disabled:opacity-50"
                >
                    {isSyncing ? <Loader size={16} className="animate-spin" /> : <Globe size={16} />}
                    {isSyncing ? "Syncing..." : "Sync Missing Keys to DB"}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Sections */}
                <div className="w-64 border-e border-gray-200 overflow-y-auto bg-gray-50/50">
                    <div className="p-3">
                        <div className="relative mb-4">
                            <Search size={14} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search keys..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full ps-9 pe-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                            />
                        </div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Sections</p>
                        <div className="space-y-1">
                            <button
                                onClick={() => setActiveSection('all')}
                                className={`w-full text-start px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === 'all' ? 'bg-blue-100 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                All Sections
                            </button>
                            {sections.map(sec => (
                                <button
                                    key={sec}
                                    onClick={() => setActiveSection(sec)}
                                    className={`w-full text-start px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeSection === sec ? 'bg-blue-100 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {sec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full text-gray-400">Loading content...</div>
                    ) : (
                        <div className="space-y-6">
                            {filteredKeys.slice(0, 50).map(key => ( // Virtualize/Limit for performance? 50 for now
                                <AdminKeyRow
                                    key={key}
                                    contentKey={key}
                                    dbValues={dbContent[key]}
                                    staticValues={staticContent[key]}
                                    onSave={handleSave}
                                />
                            ))}
                            {filteredKeys.length > 50 && (
                                <div className="text-center py-4 text-gray-500 italic text-sm">
                                    Showing first 50 results. Use search to find specific keys.
                                </div>
                            )}
                            {filteredKeys.length === 0 && (
                                <div className="text-center py-10 text-gray-400">No keys found. Try "Sync Missing Keys" if DB is empty.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AdminKeyRow: React.FC<{
    contentKey: string,
    dbValues: { en: string, ar: string } | undefined,
    staticValues: { en: string, ar: string } | undefined,
    onSave: (key: string, lang: 'en' | 'ar', val: string) => Promise<void>
}> = ({ contentKey, dbValues, staticValues, onSave }) => {
    // We need initial values. If DB has it, use it. If not, we might want to fetch static val.
    // For simplicity, we start blank if not in DB, forcing User to Sync or type. 
    // BETTER: Import static here to show placeholder? 
    // Let's assume passed dbValues are authoritative.

    // Initialize with DB value, fallback to Static value, or empty
    const [valEn, setValEn] = useState(dbValues?.en || staticValues?.en || '');
    const [valAr, setValAr] = useState(dbValues?.ar || staticValues?.ar || '');
    const [isChangedEn, setIsChangedEn] = useState(false);
    const [isChangedAr, setIsChangedAr] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Update local state if DB refreshes from parent
    // Update local state if DB/Static refreshes from parent
    useEffect(() => {
        if (dbValues?.en) setValEn(dbValues.en);
        else if (staticValues?.en) setValEn(staticValues.en);

        if (dbValues?.ar) setValAr(dbValues.ar);
        else if (staticValues?.ar) setValAr(staticValues.ar);
    }, [dbValues, staticValues]);

    const handleSaveRow = async () => {
        setIsSaving(true);
        await Promise.all([
            isChangedEn ? onSave(contentKey, 'en', valEn) : Promise.resolve(),
            isChangedAr ? onSave(contentKey, 'ar', valAr) : Promise.resolve()
        ]);
        setIsChangedEn(false);
        setIsChangedAr(false);
        setIsSaving(false);
    };

    const hasChanges = isChangedEn || isChangedAr;

    return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-start mb-3">
                <span className="font-mono text-xs text-gray-400 bg-white px-2 py-1 rounded border border-gray-200 select-all">
                    {contentKey}
                </span>
                {hasChanges && (
                    <button
                        onClick={handleSaveRow}
                        disabled={isSaving}
                        className="flex items-center gap-1 text-xs bg-primary text-white px-3 py-1 rounded-full font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : <><Save size={12} /> Save Changes</>}
                    </button>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">English</label>
                    <textarea
                        value={valEn}
                        onChange={e => { setValEn(e.target.value); setIsChangedEn(true); }}
                        className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${dbValues?.en ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'}`}
                        rows={2}
                        placeholder={staticValues?.en || "No static value"}
                        dir="ltr"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Arabic</label>
                    <textarea
                        value={valAr}
                        onChange={e => { setValAr(e.target.value); setIsChangedAr(true); }}
                        className={`w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${dbValues?.ar ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'}`}
                        rows={2}
                        placeholder={staticValues?.ar || "No static value"}
                        dir="rtl"
                    />
                </div>
            </div>
        </div>
    );
};
