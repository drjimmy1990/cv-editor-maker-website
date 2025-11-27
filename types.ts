// Brand Colors Enum
export enum BrandColor {
  Primary = '#1D4E89',
  Secondary = '#1ABC9C',
  Accent = '#F39C12',
  Background = '#F5F5F5',
  Surface = '#FFFFFF',
  Text = '#2C3E50'
}

// User Profile
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  creditsCv: number;
  creditsChat: number;
}

// Chat System
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Comparison System
export interface ComparisonResult {
  winner: string;
  ratingGap: number;
  sentimentSummary: string;
  recommendation: string;
}

// Consultation (Service)
export interface ConsultationRequest {
  id: string;
  userId: string;
  email?: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'closed';
  date: string;
}

// General Contact Form
export interface ContactSubmission {
  id: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

// Language Context
export type Language = 'en' | 'ar';

export interface LangContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => any;
}