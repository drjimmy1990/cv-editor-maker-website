import React, { useEffect, useState } from 'react';
import { supabase } from '../services/mockSupabase';
import { ConsultationRequest, UserProfile } from '../types';
import { Users, MessageSquare, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Admin: React.FC = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    supabase.auth.getUser().then(u => {
      setUser(u);
      if (u?.role === 'admin') {
        supabase.db.getConsultations().then(setRequests);
      }
    });
  }, []);

  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-charcoal">{t('admin.accessDenied')}</h1>
          <p className="text-gray-500">{t('admin.accessDeniedMsg')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-8">{t('admin.dashboard')}</h1>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Users className="text-primary" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('admin.totalUsers')}</p>
            <p className="text-2xl font-bold text-charcoal">1,248</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
           <div className="p-4 bg-teal-50 rounded-lg">
            <MessageSquare className="text-secondary" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{t('admin.pendingReq')}</p>
            <p className="text-2xl font-bold text-charcoal">{requests.filter(r => r.status === 'pending').length}</p>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="font-bold text-charcoal">{t('admin.reqTable')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold">{t('admin.date')}</th>
                <th className="px-6 py-3 font-semibold">{t('admin.subject')}</th>
                <th className="px-6 py-3 font-semibold">{t('admin.status')}</th>
                <th className="px-6 py-3 font-semibold">{t('admin.action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{req.date}</td>
                  <td className="px-6 py-4 font-medium text-charcoal">{req.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-blue-800 font-medium">{t('common.viewDetails')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};