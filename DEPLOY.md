# FocusFlow Landing Page — Deploy Guide

## Architecture
```
Browser  →  Vercel (static HTML + serverless functions)  →  Neon Postgres (database)
                                                          →  Email (SMTP, optional)
```

---

## Step 1: Create Neon Database (2 min)

1. Go to [console.neon.tech](https://console.neon.tech) and sign up (free)
2. Click **New Project** — pick a name and region
3. Once created, go to the **SQL Editor** (left sidebar)
4. Paste the contents of `neon-schema.sql` and click **Run**
5. Go to **Connection Details** (Dashboard tab) and copy the **Connection string**
   - It looks like: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

---

## Step 2: Deploy to Vercel (3 min)

### Option A — GitHub (easiest)
1. Push this `focusflow-landing` folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com), click **Add New → Project**
3. Import your repo
4. Under **Environment Variables**, add:
   - `DATABASE_URL` = your Neon connection string
5. Click **Deploy**

### Option B — CLI
```bash
npm i -g vercel
cd focusflow-landing
vercel login
vercel env add DATABASE_URL        # paste your Neon connection string
vercel --prod
```

---

## Step 3: Email Notifications (optional)

Get an email every time someone signs up or leaves feedback:

1. In Vercel dashboard → Settings → Environment Variables, add:
   - `NOTIFY_EMAIL` = where to send notifications (e.g. chinwei624@gmail.com)
   - `SMTP_HOST` = e.g. `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = your Gmail address
   - `SMTP_PASS` = App Password (Gmail → Settings → Security → App Passwords)
2. Redeploy: `vercel --prod`

---

## Step 4: Custom Domain (optional)

1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g. `focusflow.app`)
3. Update your DNS records as Vercel instructs

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/signup` | POST | Submit waitlist signup |
| `/api/feedback` | POST | Submit feedback |
| `/api/stats` | GET | Live signup/feedback counts |

---

## Viewing Your Data

### Neon Dashboard
Go to [console.neon.tech](https://console.neon.tech) → your project → **Tables** to browse all signups and feedback directly.

### SQL Editor — useful queries
```sql
-- All signups
SELECT * FROM waitlist ORDER BY created_at DESC;

-- This week's signups
SELECT * FROM waitlist WHERE created_at >= CURRENT_DATE - 7 ORDER BY created_at DESC;

-- All feedback with high ratings
SELECT * FROM feedback WHERE rating >= 4 ORDER BY created_at DESC;

-- Quick dashboard stats
SELECT * FROM landing_stats;

-- Export emails as CSV (copy/paste from results)
SELECT email, first_name, last_name, role, created_at FROM waitlist ORDER BY created_at;
```

### Live Stats API
Visit `https://your-site.vercel.app/api/stats` to see live counts.
