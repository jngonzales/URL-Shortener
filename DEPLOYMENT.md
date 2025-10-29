# Deployment Guide - URL Shortener

## 🚀 Quick Deploy Guide

Your URL Shortener can be deployed for **FREE** using modern platforms!

---

## ⭐ RECOMMENDED: Vercel + Railway + MongoDB Atlas

### Step 1: Deploy Frontend to Vercel

**Prerequisites:**

- GitHub account
- Vercel account (free): https://vercel.com

**Instructions:**

1. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**

   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - **Root Directory:** Set to `frontend`
   - **Framework Preset:** Vite
   - **Environment Variables:**
     ```
     VITE_API_URL=YOUR_BACKEND_URL (add after deploying backend)
     ```
   - Click "Deploy"

3. **Get your frontend URL** (e.g., `https://url-shortener.vercel.app`)

---

### Step 2: Deploy Backend to Railway

**Prerequisites:**

- Railway account (free): https://railway.app

**Instructions:**

1. **Go to Railway.app**

   - Sign up with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Configure deployment:**

   - Select your repository
   - **Root Directory:** Set to `backend`
   - Railway will auto-detect Node.js

3. **Add Environment Variables:**

   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://jngonz24_db_user:XyHcOUfz73Dvje55@cluster0.hplaric.mongodb.net/url-shortener?retryWrites=true&w=majority
   BASE_URL=YOUR_RAILWAY_URL (e.g., https://your-app.railway.app)
   FRONTEND_URL=YOUR_VERCEL_URL (e.g., https://url-shortener.vercel.app)
   URL_EXPIRATION_DAYS=0
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy & Get URL** (e.g., `https://url-shortener-production.up.railway.app`)

5. **Update Vercel frontend with backend URL:**
   - Go back to Vercel
   - Settings → Environment Variables
   - Update `VITE_API_URL` with your Railway URL
   - Redeploy frontend

---

## 🎯 Alternative: All-in-One Deployment

### Option 1: Render (Easiest)

**FREE tier available!**

1. **Go to https://render.com**
2. **Connect GitHub**
3. **Create Web Service (Backend):**

   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables (same as Railway)

4. **Create Static Site (Frontend):**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   - Environment Variables:
     ```
     VITE_API_URL=YOUR_BACKEND_RENDER_URL
     ```

---

### Option 2: Fly.io (Docker-based)

**Your project is Docker-ready!**

1. **Install Fly CLI:**

   ```bash
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Deploy Backend:**

   ```bash
   cd backend
   fly launch
   fly secrets set MONGODB_URI="your-mongodb-uri"
   fly secrets set FRONTEND_URL="your-frontend-url"
   fly deploy
   ```

3. **Deploy Frontend:**
   ```bash
   cd ../frontend
   fly launch
   fly secrets set VITE_API_URL="your-backend-url"
   fly deploy
   ```

---

### Option 3: Heroku (Classic)

**$5/month minimum (no longer free tier)**

1. **Install Heroku CLI**
2. **Deploy Backend:**

   ```bash
   cd backend
   heroku create your-app-name-backend
   heroku config:set MONGODB_URI="your-uri"
   git push heroku main
   ```

3. **Deploy Frontend:**
   ```bash
   cd frontend
   heroku create your-app-name-frontend
   heroku buildpacks:set heroku/nodejs
   git push heroku main
   ```

---

## 🐳 Docker Deployment (Your Own Server)

**If you have a VPS or want to use Docker:**

### Deploy with Docker Compose:

1. **Update docker-compose.yml production values**

2. **Deploy to server:**

   ```bash
   # On your server
   git clone your-repo
   cd url-shortener
   docker-compose up -d
   ```

3. **Set up reverse proxy (Nginx/Caddy) for HTTPS**

---

## 📊 Deployment Comparison

| Platform             | Frontend | Backend | Database      | Cost   | Difficulty |
| -------------------- | -------- | ------- | ------------- | ------ | ---------- |
| **Vercel + Railway** | ✅       | ✅      | MongoDB Atlas | FREE   | Easy       |
| **Render**           | ✅       | ✅      | MongoDB Atlas | FREE   | Easiest    |
| **Fly.io**           | ✅       | ✅      | MongoDB Atlas | FREE   | Medium     |
| **Heroku**           | ✅       | ✅      | MongoDB Atlas | $5/mo  | Easy       |
| **DigitalOcean**     | ✅       | ✅      | MongoDB Atlas | $4/mo  | Hard       |
| **AWS/GCP**          | ✅       | ✅      | MongoDB Atlas | Varies | Hard       |

---

## ✅ Recommended for You: **Vercel + Railway**

**Why?**

- ✅ Completely FREE
- ✅ Easiest setup
- ✅ Automatic deployments from GitHub
- ✅ Great performance
- ✅ Custom domains supported
- ✅ Perfect for your stack (React + Node.js)

---

## 🎓 Quick Start Commands

### Push to GitHub:

```bash
git init
git add .
git commit -m "URL Shortener - Production Ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/url-shortener.git
git push -u origin main
```

### Deploy Frontend (Vercel):

```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy Backend (Railway):

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo, set root to `backend`
4. Add environment variables
5. Deploy!

---

## 🔒 Security Checklist Before Deploy

- [ ] Change MongoDB Atlas password
- [ ] Update CORS origins to your production URLs
- [ ] Set NODE_ENV=production
- [ ] Add rate limiting (already included!)
- [ ] Use environment variables (never commit .env)
- [ ] Enable HTTPS (automatic with Vercel/Railway)

---

## 🌐 Custom Domain (Optional)

### Vercel:

1. Go to project settings
2. Domains → Add domain
3. Follow DNS instructions

### Railway:

1. Project → Settings → Domains
2. Add custom domain
3. Update DNS records

---

## 📈 Monitoring & Analytics

After deployment, consider adding:

- **Vercel Analytics** (free, built-in)
- **Railway Metrics** (free, built-in)
- **MongoDB Atlas Monitoring** (free, built-in)

---

## 🎉 You're Ready to Deploy!

Your URL Shortener is **production-ready** and can be deployed in **under 10 minutes**!

**Questions?** Check the platform-specific docs:

- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- Render: https://render.com/docs

Good luck! 🚀
