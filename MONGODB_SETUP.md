# 🚀 MongoDB Setup Guide - Get Your URL Shortener Working!

## ⚡ FASTEST OPTION: MongoDB Atlas (Free Cloud Database)

This takes **5 minutes** and requires NO local installation!

### Step 1: Create Free MongoDB Atlas Account

1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with Google/GitHub (fastest) or email
3. Choose the **FREE tier** (M0 Sandbox)

### Step 2: Create a Free Cluster

1. After signup, click **"Build a Database"**
2. Choose **"M0 FREE"** option
3. Select a cloud provider (AWS recommended)
4. Choose a region close to you
5. Click **"Create"** (it takes 1-3 minutes to provision)

### Step 3: Create Database User

1. You'll see a **"Security Quickstart"** screen
2. Create a database user:
   - Username: `urlshortener`
   - Password: Click "Autogenerate Secure Password" and **COPY IT**
   - Or create your own password (remember it!)
3. Click **"Create User"**

### Step 4: Whitelist Your IP

1. Add your IP address (should show your current IP)
2. Or click **"Allow Access from Anywhere"** (easier for development)
3. Click **"Add Entry"**
4. Click **"Finish and Close"**

### Step 5: Get Your Connection String

1. Click **"Connect"** on your cluster
2. Choose **"Connect your application"**
3. Select **"Node.js"** driver
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://urlshortener:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. **IMPORTANT:** Replace `<password>` with your actual password!

### Step 6: Update Your .env File

1. Open: `backend/.env`
2. Replace the MongoDB line with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://urlshortener:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/url-shortener?retryWrites=true&w=majority
   ```
3. Make sure to:
   - Replace `YOUR_PASSWORD_HERE` with your actual password
   - Add `url-shortener` as the database name before the `?`
   - Keep `?retryWrites=true&w=majority` at the end
4. Save the file

### Step 7: Restart Backend

In VSCode terminal:

```powershell
cd backend
npm run dev
```

OR use the VSCode task: **Terminal → Run Task → Start Backend Dev**

### Step 8: Test It!

1. Go to: http://localhost:3000
2. Enter a URL (e.g., https://google.com)
3. Click "Shorten URL"
4. It should work! 🎉

---

## 🖥️ ALTERNATIVE: Local MongoDB (If You Prefer)

### Option A: MongoDB Community Edition

1. **Download:** https://www.mongodb.com/try/download/community
2. **Install:** Run the installer (choose default settings)
3. **Start MongoDB:**
   ```powershell
   # MongoDB should auto-start, or run:
   "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
   ```
4. **Restart backend** and it should connect automatically!

### Option B: MongoDB with Docker

If you have Docker Desktop:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:7
```

Then restart your backend.

---

## 🆘 Troubleshooting

### "Failed to shorten URL" Error

- ❌ Backend can't connect to MongoDB
- ✅ Make sure MongoDB URI is correct in `backend/.env`
- ✅ Check if you replaced `<password>` with actual password
- ✅ Restart the backend after changing .env

### "Network Error"

- ❌ Backend server isn't running
- ✅ Start backend: `cd backend; npm run dev`
- ✅ Check for errors in the terminal

### "Connection Timeout"

- ❌ MongoDB Atlas IP not whitelisted
- ✅ Go to Atlas → Network Access → Add your IP or allow all (0.0.0.0/0)

### Still Not Working?

1. Check backend terminal for error messages
2. Verify your .env file has the correct connection string
3. Make sure you saved the .env file
4. Restart the backend server

---

## ✅ Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created free M0 cluster
- [ ] Created database user with password
- [ ] Whitelisted IP address
- [ ] Copied connection string
- [ ] Updated backend/.env with connection string
- [ ] Replaced `<password>` with actual password
- [ ] Saved .env file
- [ ] Restarted backend server
- [ ] Tested URL shortening

---

## 🎉 Once It's Working

You'll be able to:

- ✅ Shorten any URL
- ✅ Copy short links with one click
- ✅ Track click analytics
- ✅ View creation dates
- ✅ Share your short URLs

**Estimated Setup Time: 5-10 minutes**

Good luck! 🚀
