# 🚀 Quick Start Guide

## Getting Started in 5 Minutes

### Option 1: Using Docker (Easiest)

If you have Docker and Docker Compose installed:

```powershell
# Navigate to project directory
cd "C:\Users\jngon\OneDrive\Desktop\CODE\URL Shortener"

# Start all services
docker-compose up -d

# Wait for services to start (about 30 seconds)
# Then open your browser to:
# http://localhost:3000
```

That's it! 🎉

### Option 2: Manual Development Setup

#### Prerequisites
- Node.js (v18+)
- MongoDB (running on localhost:27017)

#### Step 1: Setup Environment Files
```powershell
# Run the setup script
.\setup.ps1
```

Or manually:
```powershell
# Backend
cd backend
Copy-Item .env.example .env

# Frontend
cd ..\frontend
Copy-Item .env.example .env
```

#### Step 2: Start MongoDB
Make sure MongoDB is running on your system.

#### Step 3: Start Backend (Terminal 1)
```powershell
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

#### Step 4: Start Frontend (Terminal 2)
```powershell
cd frontend
npm run dev
```

Frontend will run on: http://localhost:3000

## 🎯 First Steps

1. **Open** http://localhost:3000 in your browser
2. **Enter** a long URL (e.g., https://example.com/very/long/url)
3. **Click** "Shorten URL"
4. **Copy** your short URL
5. **Test** the short URL in a new tab

## 📊 View Analytics

To see analytics for your shortened URL:
- Click on the analytics icon or
- Navigate to: http://localhost:5000/api/analytics/YOUR_CODE

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongod`
- Check port 5000 is available
- Verify `.env` file exists in backend folder

### Frontend won't start
- Check port 3000 is available
- Verify `.env` file exists in frontend folder
- Run `npm install` in frontend folder

### MongoDB connection error
- Start MongoDB: `mongod`
- Or use Docker: `docker-compose up mongodb -d`

## 🔧 Useful Commands

### Docker Commands
```powershell
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart backend

# Remove everything including volumes
docker-compose down -v
```

### Development Commands
```powershell
# Backend
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server

# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 📝 Testing the API with cURL

### Shorten a URL
```powershell
curl -X POST http://localhost:5000/api/shorten `
  -H "Content-Type: application/json" `
  -d '{\"url\": \"https://example.com/very/long/url\"}'
```

### Get Analytics
```powershell
curl http://localhost:5000/api/analytics/YOUR_CODE
```

### Health Check
```powershell
curl http://localhost:5000/health
```

## 🎨 Customization

### Change Port Numbers

**Backend** - Edit `backend/.env`:
```env
PORT=8080
```

**Frontend** - Edit `frontend/vite.config.ts`:
```typescript
server: {
  port: 4000,
}
```

### Change Base URL

Edit `backend/.env`:
```env
BASE_URL=http://yourdomain.com
```

## 📚 Next Steps

- Read the full [README.md](./README.md)
- Check API documentation in README
- Customize the UI colors in `frontend/tailwind.config.js`
- Add authentication (not included)
- Deploy to production

## 🆘 Need Help?

- Check the logs: `docker-compose logs -f`
- Open an issue on GitHub
- Review the README.md for detailed documentation

---

**Happy URL Shortening! 🎉**
