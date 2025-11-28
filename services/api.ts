import { ComparisonResult, CvOptimizeResult, CvFinalizeResult } from '../types';

// ✅ Ensure this is your correct n8n domain
const N8N_BASE_URL = 'https://n8n.ai4eg.com/webhook';

interface ContactPayload {
    email: string;
    subject: string;
    message: string;
}

interface ConsultationPayload {
    userId: string;
    email: string;
    subject: string;
    message: string;
}

export const api = {
    /**
     * Sends contact form data to n8n
     */
    submitContact: async (data: ContactPayload) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/contact-us`, {
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
    requestConsultation: async (data: ConsultationPayload) => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/consultation-request`, {
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
     * Sends two business URLs to n8n for AI analysis
     */
    compareBusinesses: async (linkA: string, linkB: string): Promise<ComparisonResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/competitor-analysis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkA, linkB }),
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

    // --- CV OPTIMIZER METHODS ---

    /**
     * 1. Upload PDF to extract raw text & Create Session
     * ✅ UPDATED: Sends userId to n8n
     */
    parseCv: async (file: File, userId: string): Promise<{ text: string; sessionId: string }> => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId); // Sent to n8n to create DB record

            const response = await fetch(`${N8N_BASE_URL}/parse-cv`, {
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
     * ✅ UPDATED: Sends sessionId so AI has memory
     */
    optimizeCv: async (sessionId: string, currentText: string, userPrompt: string): Promise<CvOptimizeResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/optimize-cv`, {
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
     * ✅ UPDATED: Uses sessionId to find the specific record
     */
    finalizeCv: async (sessionId: string): Promise<CvFinalizeResult> => {
        try {
            const response = await fetch(`${N8N_BASE_URL}/finalize-cv`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });

            if (!response.ok) throw new Error("Finalization failed");
            return await response.json() as CvFinalizeResult;
        } catch (error) {
            console.error("CV Finalize Error:", error);
            throw error;
        }
    }
};