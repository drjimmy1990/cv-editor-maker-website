import { UserProfile, ConsultationRequest, ContactSubmission } from "../types";

// Simulated Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Data Store
let currentUser: UserProfile | null = null; // Start logged out for better demo flow

let consultations: ConsultationRequest[] = [
  { id: '1', userId: 'user-123', email: 'demo@growthnexus.com', subject: 'Market Entry Strategy', message: 'Need help entering UAE market.', status: 'pending', date: '2023-10-25' }
];

let contactSubmissions: ContactSubmission[] = [];

export const supabase = {
  auth: {
    getUser: async () => {
      await delay(100);
      return currentUser;
    },
    signIn: async (role: 'user' | 'admin' = 'user') => {
      await delay(500);
      currentUser = {
        id: role === 'admin' ? 'admin-123' : 'user-123',
        email: role === 'admin' ? 'admin@growthnexus.com' : 'demo@growthnexus.com',
        fullName: role === 'admin' ? 'Admin User' : 'Alex Jordan',
        role: role,
        creditsCv: role === 'admin' ? 999 : 3,
        creditsChat: role === 'admin' ? 999 : 50
      };
      return currentUser;
    },
    signOut: async () => {
      await delay(200);
      currentUser = null;
      return true;
    }
  },
  db: {
    getConsultations: async () => {
      await delay(400);
      return [...consultations];
    },
    createConsultation: async (req: Omit<ConsultationRequest, 'id' | 'date'>) => {
      await delay(600);
      const newReq: ConsultationRequest = {
        ...req,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0]
      };
      consultations.push(newReq);
      return newReq;
    },
    submitContact: async (req: Omit<ContactSubmission, 'id' | 'date'>) => {
      await delay(600);
      const newSub: ContactSubmission = {
        ...req,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString().split('T')[0]
      };
      contactSubmissions.push(newSub);
      return newSub;
    },
    updateCredits: async (type: 'chat' | 'cv', amount: number) => {
      await delay(200);
      if (currentUser) {
        if (type === 'chat') currentUser.creditsChat += amount;
        if (type === 'cv') currentUser.creditsCv += amount;
      }
      return currentUser;
    }
  }
};