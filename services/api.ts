import { ComparisonResult, CvOptimizeResult, CvFinalizeResult, BusinessAnalysisResult } from '../types';

// ✅ Webhook Configuration - Uses environment variables with fallbacks
const N8N_BASE_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.ai4eg.com/webhook';

// Webhook Endpoints (from .env or fallback to paths)
const WEBHOOKS = {
    CONTACT_US: import.meta.env.VITE_WEBHOOK_CONTACT_US || 'contact-us',
    CONSULTATION: import.meta.env.VITE_WEBHOOK_CONSULTATION || 'consultation-request',
    COMPETITOR_ANALYSIS: import.meta.env.VITE_WEBHOOK_COMPETITOR_ANALYSIS || 'competitor-analysis',
    PARSE_CV: import.meta.env.VITE_WEBHOOK_PARSE_CV || 'parse-cv',
    OPTIMIZE_CV: import.meta.env.VITE_WEBHOOK_OPTIMIZE_CV || 'optimize-cv',
    FINALIZE_CV: import.meta.env.VITE_WEBHOOK_FINALIZE_CV || 'finalize-cv',
    CREATE_CV: import.meta.env.VITE_WEBHOOK_CREATE_CV || 'create-cv',
    BUSINESS_ANALYZER: import.meta.env.VITE_WEBHOOK_BUSINESS_ANALYZER || 'business-analyzer',
    SUBMIT_COMPLAINT: import.meta.env.VITE_WEBHOOK_SUBMIT_COMPLAINT || 'submit-complaint',
};

interface ContactPayload {
    email: string;
    subject: string;
    message: string;
}

interface ConsultationPayload {
    userId: string;
    email: string;
    entityName: string;
    contactPerson: string;
    mobileNumber: string;
    projectOverview: string;
    supportNeeds: string;
}

interface ComplaintPayload {
    name: string;
    email: string;
    phone?: string;
    complaint: string;
}

export const api = {
    /**
     * Sends contact form data to n8n
     */
    submitContact: async (data: ContactPayload) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.CONTACT_US}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    /**
     * Sends a consultation request to n8n
     */
    requestConsultation: async (data: ConsultationPayload, profileId: string) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.CONSULTATION}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, profile_id: profileId }),
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    /**
     * Sends two business URLs to n8n for AI analysis
     */
    compareBusinesses: async (linkA: string, linkB: string, language: string = 'English', profileId: string): Promise<ComparisonResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.COMPETITOR_ANALYSIS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkA, linkB, language, profile_id: profileId }),
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json() as ComparisonResult;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    /**
     * Sends a single business URL to n8n for AI analysis
     */
    analyzeBusiness: async (link: string, language: string = 'English', profileId: string): Promise<BusinessAnalysisResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.BUSINESS_ANALYZER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ link, language, profile_id: profileId }),
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json() as BusinessAnalysisResult;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    },

    // --- CV OPTIMIZER METHODS ---

    /**
     * 1. Upload PDF to extract raw text & Create Session
     */
    parseCv: async (file: File, userId: string): Promise<{ text: string; sessionId: string }> => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);

            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.PARSE_CV}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to parse PDF");
            return await response.json();
        } catch (error) {
            console.error("CV Parse Error:", error);
            throw error;
        }
    },

    /**
     * 2. The Loop: Chat with AI (Context Aware)
     */
    optimizeCv: async (sessionId: string, currentText: string, userPrompt: string): Promise<CvOptimizeResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.OPTIMIZE_CV}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId,
                    currentText,
                    userPrompt
                })
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json() as CvOptimizeResult;
        } catch (error) {
            console.error("CV Optimize Error:", error);
            throw error;
        }
    },

    /**
     * 3. Finalize: Mark session as complete and get final URL
     * ✅ UPDATED: Now sends `userId` because n8n workflow requires it
     */
    finalizeCv: async (sessionId: string, userId: string): Promise<CvFinalizeResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.FINALIZE_CV}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Sending both ID and UserID to match n8n requirements
                body: JSON.stringify({ sessionId, userId })
            });

            if (!response.ok) throw new Error("Finalization failed");
            return await response.json() as CvFinalizeResult;
        } catch (error) {
            console.error("CV Finalize Error:", error);
            throw error;
        }
    },
    createCvFromData: async (data: any, userId: string) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.CREATE_CV}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, userId }),
            });

            if (!response.ok) throw new Error("Failed to generate CV");
            return await response.json();
        } catch (error) {
            console.error("Create CV Error:", error);
            throw error;
        }
    },

    /**
     * Sends a complaint to n8n
     */
    submitComplaint: async (data: ComplaintPayload) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/${WEBHOOKS.SUBMIT_COMPLAINT}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`n8n Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Complaint Submission Error:", error);
            throw error;
        }
    }
};