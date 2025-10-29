# URL Shortener Service

A production-ready, full-stack URL shortener service built with modern technologies. Create short, memorable links with analytics tracking, all wrapped in a beautiful dark-themed, responsive UI.

![Tech Stack](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 🌐 Live Demo

- **Frontend:** https://url-shortener-sandy-phi.vercel.app
- **Backend API:** https://url-shortener-production-6295.up.railway.app
- **Custom Domain (Pending):** https://jng.is-a.dev (PR submitted)

## 🚀 Features

### Backend
- ✅ **RESTful API** with full TypeScript support
- ✅ **Smart URL Shortening** with 6-character unique codes
- ✅ **Duplicate Detection** to prevent redundant entries
- ✅ **Click Analytics** with real-time tracking
- ✅ **URL Expiration** support (optional)
- ✅ **Rate Limiting** for API protection
- ✅ **Input Validation** and error handling
- ✅ **MongoDB** with Mongoose ODM
- ✅ **Docker** ready for easy deployment

### Frontend
- ✅ **Modern React UI** with TypeScript
- ✅ **Dark Theme** with gradient backgrounds and glass morphism
- ✅ **Tailwind CSS** for beautiful, responsive design
- ✅ **One-click Copy** functionality
- ✅ **Real-time Analytics** display
- ✅ **Input Validation** with helpful error messages
- ✅ **Mobile-friendly** responsive design
- ✅ **Fast Performance** with Vite
- ✅ **Deployed on Vercel** for global CDN delivery

## 📋 Prerequisites

Before you begin, ensure you have the following:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (free tier available) or local MongoDB
- **Docker** and **Docker Compose** (optional, for local containerized development)
- **Railway account** (optional, for backend deployment)
- **Vercel account** (optional, for frontend deployment)

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Database:** MongoDB Atlas (Cloud)
- **Security:** Helmet, CORS, Rate Limiting
- **Validation:** Validator.js
- **ID Generation:** nanoid
- **Deployment:** Railway with Docker

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS with dark theme
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Installation

### Option 1: Docker Compose (Recommended)

The easiest way to get started is using Docker Compose, which will set up the entire stack including MongoDB.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

4. **Stop all services:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove volumes (reset database):**
   ```bash
   docker-compose down -v
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
   BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:3000
   URL_EXPIRATION_DAYS=365
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

   > **Note:** For production, use MongoDB Atlas. See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for setup instructions.

5. **Start MongoDB** (if not using Docker):
   ```bash
   mongod
   ```

6. **Run in development mode:**
   ```bash
   npm run dev
   ```

7. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Run in development mode:**
   ```bash
   npm run dev
   ```

6. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## 🔌 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### 1. Shorten URL
**POST** `/api/shorten`

Create a shortened URL.

**Request Body:**
```json
{
  "url": "https://example.com/very/long/url",
  "customCode": "mycode",  // Optional
  "expirationDays": 30     // Optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "mycode",
    "shortUrl": "http://localhost:5000/mycode",
    "clicks": 0,
    "createdAt": "2025-10-29T12:00:00.000Z",
    "expiresAt": null
  },
  "message": "URL shortened successfully"
}
```

#### 2. Redirect to Original URL
**GET** `/:code`

Redirect to the original URL and increment click count.

**Example:**
```
GET http://localhost:5000/mycode
→ Redirects to https://example.com/very/long/url
```

#### 3. Get Analytics
**GET** `/api/analytics/:code`

Get analytics data for a shortened URL.

**Response:**
```json
{
  "success": true,
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "mycode",
    "shortUrl": "http://localhost:5000/mycode",
    "clicks": 42,
    "createdAt": "2025-10-29T12:00:00.000Z",
    "expiresAt": null,
    "isExpired": false
  }
}
```

#### 4. Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

## 🏗️ Project Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── controllers/
│   │   │   └── urlController.ts     # Request handlers
│   │   ├── middleware/
│   │   │   └── errorHandler.ts      # Error handling
│   │   ├── models/
│   │   │   └── Url.ts               # Mongoose schema
│   │   ├── routes/
│   │   │   └── urlRoutes.ts         # API routes
│   │   ├── utils/
│   │   │   └── urlUtils.ts          # Helper functions
│   │   └── server.ts                # Express app setup
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx           # Header component
│   │   │   ├── UrlForm.tsx          # URL input form
│   │   │   └── ResultCard.tsx       # Result display
│   │   ├── hooks/
│   │   │   └── useClipboard.ts      # Clipboard hook
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript types
│   │   ├── utils/
│   │   │   ├── api.ts               # API calls
│   │   │   └── helpers.ts           # Helper functions
│   │   ├── App.tsx                  # Main component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

## 🔒 Security Features

- **Helmet.js** for secure HTTP headers
- **CORS** configuration for cross-origin requests
- **Rate Limiting** to prevent abuse
- **Input Validation** to prevent malicious inputs
- **Error Handling** with sanitized error messages
- **Environment Variables** for sensitive configuration

## 🎨 UI Features

- **Responsive Design** - Works on all devices
- **Modern Animations** - Smooth transitions and effects
- **Copy to Clipboard** - One-click URL copying
- **Error Messages** - Clear, helpful validation feedback
- **Loading States** - Visual feedback during operations
- **Analytics Display** - Real-time click tracking

## 🚀 Deployment

This project is currently deployed and running in production:

- **Frontend (Vercel):** https://url-shortener-sandy-phi.vercel.app
- **Backend (Railway):** https://url-shortener-production-6295.up.railway.app
- **Database:** MongoDB Atlas (M0 Free Tier)

### Deploy Your Own Instance

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

#### Quick Deploy to Railway (Backend)

1. **Push your code to GitHub**
2. **Go to [Railway](https://railway.app)**
3. **Create New Project** → Deploy from GitHub repo
4. **Add environment variables** (see Backend Variables section below)
5. **Railway will auto-detect Dockerfile and deploy**

#### Quick Deploy to Vercel (Frontend)

1. **Go to [Vercel](https://vercel.com)**
2. **Import your GitHub repository**
3. **Set Root Directory to `frontend`**
4. **Add environment variable:** `VITE_API_URL=<your-railway-url>`
5. **Deploy**

### Custom Domain Setup

The project supports custom domains. Current setup:
- Submitted PR for `jng.is-a.dev` (free subdomain)
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for custom domain instructions

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📝 Environment Variables

### Backend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `BASE_URL` | Base URL for short links | `https://url-shortener-production-6295.up.railway.app` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://url-shortener-sandy-phi.vercel.app` |
| `URL_EXPIRATION_DAYS` | Days until URL expires (0 = never) | `365` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

### Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://url-shortener-production-6295.up.railway.app` |

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick start guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment instructions
- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - MongoDB Atlas setup guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview and architecture

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the powerful database
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

## 📧 Support

For support, create an issue in the repository.

## 👤 Author

**jngonzales**
- GitHub: [@jngonzales](https://github.com/jngonzales)
- Repository: [URL-Shortener](https://github.com/jngonzales/URL-Shortener)

---

⭐ Star this repository if you find it helpful!
