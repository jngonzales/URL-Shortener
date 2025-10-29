# Development Environment Setup Script for Windows

Write-Host "🚀 URL Shortener - Development Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js is not installed. Please install Node.js v18 or higher." -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running
Write-Host "Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = Get-Process mongod -ErrorAction SilentlyContinue
if ($mongoRunning) {
    Write-Host "✅ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running. Please start MongoDB or use Docker." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setting up Backend..." -ForegroundColor Cyan

# Backend setup
Set-Location backend
if (Test-Path ".env") {
    Write-Host "✅ Backend .env file exists" -ForegroundColor Green
} else {
    Write-Host "📝 Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ Backend .env file created" -ForegroundColor Green
}

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "Setting up Frontend..." -ForegroundColor Cyan

# Frontend setup
Set-Location frontend
if (Test-Path ".env") {
    Write-Host "✅ Frontend .env file exists" -ForegroundColor Green
} else {
    Write-Host "📝 Creating frontend .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✅ Frontend .env file created" -ForegroundColor Green
}

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Cyan
Write-Host "  1. Start Backend:  cd backend; npm run dev" -ForegroundColor White
Write-Host "  2. Start Frontend: cd frontend; npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Or use Docker Compose:" -ForegroundColor Cyan
Write-Host "  docker-compose up -d" -ForegroundColor White
Write-Host ""
Write-Host "Access the application:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "=====================================" -ForegroundColor Cyan
