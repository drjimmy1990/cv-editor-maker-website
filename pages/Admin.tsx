import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { api } from '../services/api';
import {
  Users, MessageSquare, AlertCircle, X, Check, Eye,
  LayoutDashboard, Mail, FileText, Zap, Edit2, Save,
  ChevronRight, Search, Trash2, Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ContentEditor } from '../components/ContentEditor';

// Types
interface ConsultationRequest {
  id: string;
  date: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'closed';
  email: string;
  is_paid: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin';
  credits_cv: number;
  credits_chat: number;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  email: string;
  subject: string | null;
  message: string | null;
  created_at: string;
}

interface CvSession {
  id: string;
  user_id: string;
  user_email?: string;
  status: 'active' | 'downloaded' | 'archived';
  original_pdf_url: string | null;
  final_pdf_url: string | null;
  created_at: string;
}

type TabType = 'dashboard' | 'users' | 'consultations' | 'contact' | 'complaints' | 'cv-sessions' | 'content';

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [cvSessions, setCvSessions] = useState<CvSession[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<ContactSubmission | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Email Reply States
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const { user } = useAuth();
  const { t, isRTL } = useLanguage();

  const tabs = [
    { id: 'dashboard' as TabType, label: t('admin.tabDashboard'), icon: <LayoutDashboard size={18} /> },
    { id: 'users' as TabType, label: t('admin.tabUsers'), icon: <Users size={18} /> },
    { id: 'consultations' as TabType, label: t('admin.tabConsultations'), icon: <MessageSquare size={18} /> },
    { id: 'contact' as TabType, label: t('admin.tabContact'), icon: <Mail size={18} /> },
    { id: 'complaints' as TabType, label: t('admin.tabComplaints'), icon: <AlertCircle size={18} /> },
    { id: 'cv-sessions' as TabType, label: t('admin.tabCvSessions'), icon: <FileText size={18} /> },
    { id: 'content' as TabType, label: t('admin.contentManager') || "Content Manager", icon: <Globe size={18} /> },
  ];

  // Filter complaints from contacts (subject starts with 'COMPLAINT')
  const complaints = contacts.filter(c => c.subject?.toUpperCase().startsWith('COMPLAINT'));
  const regularContacts = contacts.filter(c => !c.subject?.toUpperCase().startsWith('COMPLAINT'));

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchConsultations(),
      fetchUsers(),
      fetchContacts(),
      fetchCvSessions(),
    ]);
  };

  const fetchConsultations = async () => {
    try {
      const { data, error } = await supabase
        .from('consultation_requests')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          date: new Date(item.created_at).toLocaleDateString(),
          subject: item.subject,
          message: item.message,
          status: item.status,
          email: item.profiles?.email || 'Unknown',
          is_paid: item.is_paid || false,
        }));
        setRequests(mapped);
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setUsers(data);
      if (count !== null) setTotalUsers(count);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchCvSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('cv_sessions')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        const mapped = data.map((item: any) => ({
          ...item,
          user_email: item.profiles?.email || 'Unknown',
        }));
        setCvSessions(mapped);
      }
    } catch (error) {
      console.error("Error fetching CV sessions:", error);
    }
  };

  const handleUpdateConsultationStatus = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('consultation_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      await fetchConsultations();
      setSelectedRequest(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateUserCredits = async (userId: string, credits_cv: number, credits_chat: number) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ credits_cv, credits_chat })
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers();
      setSelectedUser(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;
      await fetchUsers();
      // Update selectedUser state so UI reflects the change
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchContacts();
      setSelectedContact(null);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleSendReply = async (toEmail: string, subject: string, type: 'contact' | 'consultation') => {
    if (!replyMessage.trim()) return;
    setIsSendingReply(true);
    try {
      await api.sendEmailReply({
        to: toEmail,
        subject: `Re: ${subject || 'Your Inquiry'}`,
        message: replyMessage,
        type,
      });
      alert(t('admin.replySent'));
      setReplyMessage('');
      setShowReplyForm(false);
      if (type === 'contact') setSelectedContact(null);
      if (type === 'consultation') setSelectedRequest(null);
    } catch (err: any) {
      alert(t('admin.replyFailed') + ': ' + err.message);
    } finally {
      setIsSendingReply(false);
    }
  };

  // Filter users by search
  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">{t('admin.dashboard')}</h1>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                ? 'border-primary text-primary bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Users className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('admin.totalUsers')}</p>
                <p className="text-2xl font-bold text-charcoal">{totalUsers}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <MessageSquare className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('admin.pendingReq')}</p>
                <p className="text-2xl font-bold text-charcoal">{requests.filter(r => r.status === 'pending').length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <Mail className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('admin.contactMessages')}</p>
                <p className="text-2xl font-bold text-charcoal">{contacts.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{t('admin.cvSessions')}</p>
                <p className="text-2xl font-bold text-charcoal">{cvSessions.length}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-bold text-charcoal mb-4">{t('admin.quickActions')}</h2>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setActiveTab('users')} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                <Users size={16} /> {t('admin.manageUsers')}
              </button>
              <button onClick={() => setActiveTab('consultations')} className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg text-sm font-medium transition-colors">
                <MessageSquare size={16} /> {t('admin.viewConsultations')}
              </button>
              <button onClick={() => setActiveTab('contact')} className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors">
                <Mail size={16} /> {t('admin.viewContacts')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-bold text-charcoal">{t('admin.userManagement')}</h2>
            <div className="relative">
              <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('admin.searchUsers')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 pe-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-start">{t('common.email')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('admin.fullName')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.role')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.cvCredits')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.chatCredits')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-charcoal">{u.email}</td>
                    <td className="px-6 py-4 text-gray-600">{u.full_name || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-bold">
                        <Zap size={14} /> {u.credits_cv}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">{u.credits_chat}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-all"
                        title={t('admin.editUser')}
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      {t('admin.noUsersFound')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Consultations Tab */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-charcoal">{t('admin.reqTable')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-start w-32">{t('admin.date')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('common.email')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('admin.subject')}</th>
                  <th className="px-6 py-4 font-semibold text-center w-32">{t('admin.status')}</th>
                  <th className="px-6 py-4 font-semibold text-center w-32">{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{req.date}</td>
                    <td className="px-6 py-4 text-charcoal font-medium">{req.email}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs" title={req.subject}>{req.subject}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          req.status === 'reviewed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-all"
                        title={t('common.viewDetails')}
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <MessageSquare size={32} className="mx-auto opacity-20 mb-2" />
                      <p>{t('admin.noRequests')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-charcoal">{t('admin.contactSubmissions')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-start w-32">{t('admin.date')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('common.email')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('admin.subject')}</th>
                  <th className="px-6 py-4 font-semibold text-center w-32">{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {regularContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-charcoal font-medium">{c.email}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{c.subject || '-'}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedContact(c)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-all"
                        title={t('common.viewDetails')}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        title={t('admin.delete')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {regularContacts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      <Mail size={32} className="mx-auto opacity-20 mb-2" />
                      <p>{t('admin.noContacts')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
            <h2 className="font-bold text-charcoal flex items-center gap-2">
              <AlertCircle size={20} className="text-red-500" />
              {t('admin.complaintsTitle')}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-start w-32">{t('admin.date')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('common.email')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('admin.subject')}</th>
                  <th className="px-6 py-4 font-semibold text-center w-32">{t('admin.action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-charcoal font-medium">{c.email}</td>
                    <td className="px-6 py-4 text-red-600 font-medium truncate max-w-xs">{c.subject || '-'}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedComplaint(c)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-full transition-all"
                        title={t('common.viewDetails')}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(c.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        title={t('admin.delete')}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {complaints.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      <AlertCircle size={32} className="mx-auto opacity-20 mb-2" />
                      <p>{t('admin.noComplaints')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CV Sessions Tab */}
      {activeTab === 'cv-sessions' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-bold text-charcoal">{t('admin.cvSessions')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-start">{t('common.email')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.status')}</th>
                  <th className="px-6 py-4 font-semibold text-start">{t('admin.date')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.originalPdf')}</th>
                  <th className="px-6 py-4 font-semibold text-center">{t('admin.finalPdf')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cvSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-charcoal">{session.user_email}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${session.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          session.status === 'downloaded' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{new Date(session.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      {session.original_pdf_url ? (
                        <a href={session.original_pdf_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                          View
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {session.final_pdf_url ? (
                        <a href={session.final_pdf_url} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-xs">
                          Download
                        </a>
                      ) : '-'}
                    </td>
                  </tr>
                ))}
                {cvSessions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      <FileText size={32} className="mx-auto opacity-20 mb-2" />
                      <p>{t('admin.noCvSessions')}</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content Editor Tab */}
      {activeTab === 'content' && <ContentEditor />}

      {/* Consultation Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-charcoal">{t('admin.requestDetails')}</h3>
              <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.from')}</label>
                  <p className="text-charcoal font-medium text-sm">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.date')}</label>
                  <p className="text-charcoal font-medium text-sm">{selectedRequest.date}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.subject')}</label>
                <p className="text-charcoal font-bold text-lg">{selectedRequest.subject}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.message')}</label>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{selectedRequest.message}</p>
              </div>

              {/* Reply Form */}
              {showReplyForm && (
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.yourReply')}</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder={t('admin.yourReply') + '...'}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap justify-end gap-3">
              {showReplyForm ? (
                <>
                  <button
                    onClick={() => { setShowReplyForm(false); setReplyMessage(''); }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    {t('common.back')}
                  </button>
                  <button
                    onClick={() => handleSendReply(selectedRequest.email, selectedRequest.subject, 'consultation')}
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mail size={16} />
                    {isSendingReply ? t('admin.sending') : t('admin.sendReply')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowReplyForm(true)}
                    className="bg-secondary hover:bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <Mail size={16} /> {t('admin.reply')}
                  </button>
                  {selectedRequest.status === 'pending' && (
                    <button
                      onClick={() => handleUpdateConsultationStatus(selectedRequest.id, 'reviewed')}
                      disabled={isUpdating}
                      className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {isUpdating ? t('common.loading') : <><Check size={16} /> {t('admin.markReviewed')}</>}
                    </button>
                  )}
                  {selectedRequest.status !== 'closed' && (
                    <button
                      onClick={() => handleUpdateConsultationStatus(selectedRequest.id, 'closed')}
                      disabled={isUpdating}
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                    >
                      {t('admin.closeRequest')}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-charcoal">{t('admin.editUser')}</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const credits_cv = parseInt((form.elements.namedItem('credits_cv') as HTMLInputElement).value);
              const credits_chat = parseInt((form.elements.namedItem('credits_chat') as HTMLInputElement).value);
              handleUpdateUserCredits(selectedUser.id, credits_cv, credits_chat);
            }} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('common.email')}</label>
                <p className="text-charcoal font-medium">{selectedUser.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.cvCredits')}</label>
                  <input
                    type="number"
                    name="credits_cv"
                    defaultValue={selectedUser.credits_cv}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.chatCredits')}</label>
                  <input
                    type="number"
                    name="credits_chat"
                    defaultValue={selectedUser.credits_chat}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.role')}</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpdateUserRole(selectedUser.id, 'user')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${selectedUser.role === 'user' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateUserRole(selectedUser.id, 'admin')}
                    className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${selectedUser.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-primary hover:bg-blue-800 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isUpdating ? t('common.loading') : <><Save size={18} /> {t('admin.saveChanges')}</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-charcoal">{t('admin.contactDetails')}</h3>
              <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.from')}</label>
                  <p className="text-charcoal font-medium text-sm">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.date')}</label>
                  <p className="text-charcoal font-medium text-sm">{new Date(selectedContact.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.subject')}</label>
                <p className="text-charcoal font-bold text-lg">{selectedContact.subject || '-'}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.message')}</label>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{selectedContact.message || '-'}</p>
              </div>

              {/* Reply Form */}
              {showReplyForm && (
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.yourReply')}</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder={t('admin.yourReply') + '...'}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              {showReplyForm ? (
                <>
                  <button
                    onClick={() => { setShowReplyForm(false); setReplyMessage(''); }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    {t('common.back')}
                  </button>
                  <button
                    onClick={() => handleSendReply(selectedContact.email, selectedContact.subject || '', 'contact')}
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mail size={16} />
                    {isSendingReply ? t('admin.sending') : t('admin.sendReply')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowReplyForm(true)}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <Mail size={16} /> {t('admin.reply')}
                  </button>
                  <button
                    onClick={() => { handleDeleteContact(selectedContact.id); }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <Trash2 size={16} /> {t('admin.delete')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-slideUp">
            <div className="bg-red-50 px-6 py-4 border-b border-red-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-charcoal flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                {t('admin.complaintDetails')}
              </h3>
              <button onClick={() => { setSelectedComplaint(null); setShowReplyForm(false); setReplyMessage(''); }} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.from')}</label>
                  <p className="text-charcoal font-medium text-sm">{selectedComplaint.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.date')}</label>
                  <p className="text-charcoal font-medium text-sm">{new Date(selectedComplaint.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t('admin.subject')}</label>
                <p className="text-red-600 font-bold text-lg">{selectedComplaint.subject || '-'}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.message')}</label>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{selectedComplaint.message || '-'}</p>
              </div>

              {/* Reply Form */}
              {showReplyForm && (
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('admin.yourReply')}</label>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder={t('admin.yourReply') + '...'}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              {showReplyForm ? (
                <>
                  <button
                    onClick={() => { setShowReplyForm(false); setReplyMessage(''); }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    {t('common.back')}
                  </button>
                  <button
                    onClick={() => handleSendReply(selectedComplaint.email, selectedComplaint.subject || '', 'contact')}
                    disabled={isSendingReply || !replyMessage.trim()}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mail size={16} />
                    {isSendingReply ? t('admin.sending') : t('admin.sendReply')}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowReplyForm(true)}
                    className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <Mail size={16} /> {t('admin.reply')}
                  </button>
                  <button
                    onClick={() => { handleDeleteContact(selectedComplaint.id); setSelectedComplaint(null); }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    <Trash2 size={16} /> {t('admin.delete')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};