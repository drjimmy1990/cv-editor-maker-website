# Deployment Guide for aaPanel

## Prerequisites
- aaPanel installed on your VPS
- Domain pointing to your VPS IP
- Node.js 18+ installed locally (for building)

---

## Step 1: Build Locally

### Option A: Run the Script (Windows)
```bash
build-deploy.bat
```

### Option B: Manual Build
```bash
npm install
npm run build
```

This creates a `dist/` folder with all static files.

---

## Step 2: Upload to VPS

### Method 1: Via aaPanel File Manager
1. Login to aaPanel
2. Go to **Files** → Navigate to `/www/wwwroot/`
3. Create folder: `optimization.sa` (or your domain)
4. Upload `deploy.zip` (or the `dist/` folder contents)
5. Extract if uploaded as zip

### Method 2: Via SFTP/SCP
```bash
scp -r dist/* root@your-vps-ip:/www/wwwroot/optimization.sa/
```

---

## Step 3: Configure Site in aaPanel

### 3.1 Add Website
1. Go to **Website** → **Add site**
2. Fill in:
   - **Domain**: `optimization.sa`
   - **Root directory**: `/www/wwwroot/optimization.sa`
   - **PHP**: Pure Static (or None)

### 3.2 Configure Nginx
Go to **Website** → Click your site → **Config** → **Nginx Config**

Add this inside the `server {}` block:

```nginx
# Handle React Router (SPA)
location / {
    try_files $uri $uri/ /index.html;
}

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
```

Click **Save** and **Restart** Nginx.

### 3.3 Enable SSL
1. Go to **SSL** tab
2. Click **Let's Encrypt**
3. Select your domain(s)
4. Click **Apply**
5. Enable **Force HTTPS**

---

## Step 4: Verify Deployment

1. Visit `https://optimization.sa`
2. Test navigation (React Router)
3. Test login and admin panel
4. Check browser console for errors

---

## Updating the Site

When you make changes:

1. **Local**: Run `build-deploy.bat` or `npm run build`
2. **Upload**: Replace files in `/www/wwwroot/optimization.sa/`
3. **Clear cache**: In aaPanel → Website → Purge Cache (if using)

---

## Troubleshooting

### 404 on page refresh
Make sure `try_files $uri $uri/ /index.html;` is in Nginx config.

### API calls failing
Check that your `.env` has correct API URLs before building:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_N8N_WEBHOOK_URL=https://n8n.ai4eg.com/webhook
```

### Blank page
Check browser console (F12) for JavaScript errors.
Ensure all files from `dist/` were uploaded correctly.
