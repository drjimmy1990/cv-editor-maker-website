import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

interface ConfigCache {
    [key: string]: string;
}

let configCache: ConfigCache = {};
let cacheTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSystemConfig = (key: string, defaultValue: string = ''): { value: string; loading: boolean } => {
    const [value, setValue] = useState<string>(defaultValue);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchConfig = async () => {
            // Check cache first
            const now = Date.now();
            if (configCache[key] && (now - cacheTime) < CACHE_DURATION) {
                setValue(configCache[key]);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('system_config')
                    .select('value')
                    .eq('key', key)
                    .single();

                if (error) {
                    console.warn(`Config key "${key}" not found, using default`);
                    setValue(defaultValue);
                } else if (data) {
                    configCache[key] = data.value;
                    cacheTime = now;
                    setValue(data.value);
                }
            } catch (err) {
                console.error('Error fetching system config:', err);
                setValue(defaultValue);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, [key, defaultValue]);

    return { value, loading };
};

// Utility to fetch multiple config values at once
export const useSystemConfigs = (keys: string[]): { configs: ConfigCache; loading: boolean } => {
    const [configs, setConfigs] = useState<ConfigCache>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchConfigs = async () => {
            try {
                const { data, error } = await supabase
                    .from('system_config')
                    .select('key, value')
                    .in('key', keys);

                if (error) throw error;

                const configMap: ConfigCache = {};
                data?.forEach(item => {
                    configMap[item.key] = item.value;
                });
                setConfigs(configMap);
            } catch (err) {
                console.error('Error fetching system configs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConfigs();
    }, [keys.join(',')]);

    return { configs, loading };
};
