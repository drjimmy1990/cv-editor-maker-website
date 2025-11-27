# GrowthNexus 🚀

**GrowthNexus** is a bilingual (English & Arabic) AI-powered business intelligence platform. It bridges the gap between individual career ambition and corporate strategic needs using Generative AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Development-orange.svg)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20Supabase%20%7C%20Gemini-purple.svg)

## 🌟 Core Features

### 1. Bilingual Architecture (EN/AR)
- Full RTL (Right-to-Left) support.
- Logical property styling (Tailwind CSS).
- Dynamic locale switching via Context API.

### 2. Service Hub (Portal)
Separated workflows for distinct user types:
*   **👤 For Individuals:**
    *   **AI CV Optimizer:** Interactive chat with Google Gemini (Flash 2.5) to rewrite resumes, integrated with a PDF viewer (`<embed>`/`<object>` fallback).
*   **🏢 For Companies:**
    *   **Competitor Analysis:** AI-driven comparison of business entities using JSON Schema mode.
    *   **Expert Consultation:** Priority booking system for human strategic advice.

### 3. General Features
*   **Contact Us:** General inquiry form with database logging.
*   **Admin Dashboard:** Restricted area for managing users and viewing consultation requests.
*   **Pricing:** 3-Tier responsive pricing table.

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Tailwind CSS.
*   **Routing:** React Router v6 (HashRouter for compatibility).
*   **AI Engine:** Google Gemini API (`@google/genai`).
*   **Database:** Supabase (PostgreSQL).
*   **Icons:** Lucide React.
*   **Build Tool:** Vite.

---

## 🚀 Getting Started

### Prerequisites
1.  **Node.js** (v18+)
2.  **Supabase Account** (for database and auth).
3.  **Google AI Studio Key** (for Gemini API).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/growth-nexus.git
    cd growth-nexus
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory:
    ```env
    # Google Gemini API Key
    API_KEY=your_gemini_api_key_here

    # (Optional) Supabase Credentials if switching from Mock
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  Run the Development Server:
    ```bash
    npm start
    ```

---

## 🗄️ Database Setup (Supabase)

This project currently uses a **Mock Service** (`services/mockSupabase.ts`) for demonstration purposes. To connect to a real backend:

1.  Go to your Supabase Dashboard -> **SQL Editor**.
2.  Copy the content of `schema.txt`.
3.  Run the script to create tables, RLS policies, and triggers.
4.  Update `services/mockSupabase.ts` (or replace it with a real `supabaseClient.ts`) to use the official `@supabase/supabase-js` client.

### Schema Overview
*   `profiles`: Extends standard Auth with credits and roles.
*   `cv_sessions`: Tracks uploaded PDFs.
*   `chat_messages`: Stores AI chat history.
*   `consultation_requests`: Stores company service requests.
*   `company_comparisons`: Archives analysis results.
*   `contact_submissions`: General contact form entries.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/       # Reusable UI components (Layout, etc.)
│   ├── context/          # Global State (LanguageContext)
│   ├── locales/          # Translation Dictionaries (en.ts, ar.ts)
│   ├── pages/            # Main Route Views
│   ├── services/         # API Integrations (Gemini, MockSupabase)
│   ├── types.ts          # TypeScript Definitions
│   ├── App.tsx           # Router Config
│   └── main.tsx          # Entry Point
├── public/               # Static Assets
├── schema.txt            # Database Definition (Text Format)
└── README.md             # Documentation
```

## 🔐 Admin Access

To access the Admin Dashboard in **Mock Mode**:
1.  Go to the **Login Page**.
2.  Click **"Simulate Admin Login"**.
3.  Navigate to the Admin link in the navbar (Dashboard icon).

---

## 🛡️ License

This project is licensed under the MIT License.