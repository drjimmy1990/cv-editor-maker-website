import React, { useMemo } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Users, DollarSign, FileText, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AnalyticsDashboardProps {
    users: any[];
    transactions: any[];
    cvSessions: any[];
    comparisons: any[];
    contacts: any[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
    users,
    transactions,
    cvSessions,
    comparisons,
    contacts
}) => {
    const { t } = useLanguage();

    // --- 1. KPI Calculations ---
    const totalRevenue = useMemo(() => {
        return transactions
            .filter(t => t.status === 'paid')
            .reduce((sum, t) => sum + (t.amount || 0), 0);
    }, [transactions]);

    const activeComplaints = useMemo(() => {
        return contacts.filter(c => c.subject?.toUpperCase().startsWith('COMPLAINT')).length;
    }, [contacts]);

    // --- 2. Chart Data Preparation ---

    // User Growth (Last 30 Days)
    const userGrowthData = useMemo(() => {
        const last30Days = [...Array(30)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (29 - i));
            return d.toISOString().split('T')[0];
        });

        return last30Days.map(date => {
            const count = users.filter(u => u.created_at.startsWith(date)).length;
            return { date: date.split('-').slice(1).join('/'), count }; // MM/DD
        });
    }, [users]);

    // Revenue Trend (Last 7 Days) - Simplified for demo
    // In a real app, you'd aggregate properly. Here we just show mock-ish structure if no data
    const revenueData = useMemo(() => {
        // Group transactions by date
        const grouped: Record<string, number> = {};
        transactions.forEach(t => {
            if (t.status === 'paid') {
                const date = t.created_at.split('T')[0]; // YYYY-MM-DD
                grouped[date] = (grouped[date] || 0) + t.amount;
            }
        });

        // Sort and take last 7 entries (or arbitrary range)
        return Object.keys(grouped).sort().slice(-7).map(date => ({
            date: date.split('-').slice(1).join('/'),
            amount: grouped[date]
        }));
    }, [transactions]);

    // Service Usage
    const serviceUsageData = useMemo(() => [
        { name: 'CV Sessions', value: cvSessions.length },
        { name: 'Comparisons', value: comparisons.length },
    ], [cvSessions, comparisons]);

    // Complaint Ratio
    const complaintData = useMemo(() => {
        const complaintCount = contacts.filter(c => c.subject?.toUpperCase().startsWith('COMPLAINT')).length;
        const generalCount = contacts.length - complaintCount;
        return [
            { name: 'Complaints', value: complaintCount },
            { name: 'General Inquiries', value: generalCount },
        ];
    }, [contacts]);


    return (
        <div className="space-y-6 animate-fadeIn">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-charcoal mt-1">${totalRevenue.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <DollarSign size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total Users</p>
                            <h3 className="text-2xl font-bold text-charcoal mt-1">{users.length}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                            <Users size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Total CV Sessions</p>
                            <h3 className="text-2xl font-bold text-charcoal mt-1">{cvSessions.length}</h3>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                            <FileText size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Active Complaints</p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">{activeComplaints}</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg text-red-600">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-charcoal mb-4">User Growth (Last 30 Days)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-charcoal mb-4">Revenue Trend</h3>
                    <div className="h-64">
                        {revenueData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} />
                                    <Tooltip formatter={(value) => `$${value}`} />
                                    <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No revenue data available
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Usage */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-charcoal mb-4">Service Usage Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={serviceUsageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {serviceUsageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Complaints Ratio */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-charcoal mb-4">Inquiries vs Complaints</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={complaintData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    <Cell fill="#EF4444" /> {/* Complaints Red */}
                                    <Cell fill="#3B82F6" /> {/* General Blue */}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
