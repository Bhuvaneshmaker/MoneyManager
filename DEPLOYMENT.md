# Deployment Guide for Money Manager Application

This guide provides step-by-step instructions for deploying both the frontend and backend of the Money Manager application.

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Post-Deployment](#post-deployment)

---

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Choose the free M0 tier (512 MB storage)

### 2. Create a Cluster
1. After login, click "Build a Database"
2. Choose "Shared" (Free tier)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"

### 3. Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set user privileges to "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add specific IP addresses
5. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `money-manager`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/money-manager?retryWrites=true&w=majority
```

---

## Backend Deployment

### Option 1: Render (Recommended - Free Tier)

This repo includes a `render.yaml` blueprint that can deploy both backend and frontend in one click.

Steps:
1. Push this repo to GitHub.
2. In Render, click "New +" and select "Blueprint".
3. Choose the repo and approve the services.
4. Set environment variables:
   - `MONGODB_URI` (required)
   - `CORS_ORIGIN` (set to your frontend URL after frontend deploy)
5. Deploy and wait for the backend URL.

Backend health check:
```
https://your-backend.onrender.com/health
```

---

### Option 2: Heroku (Legacy)

#### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed

#### Steps

1. **Install Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Navigate to Backend Directory**
```bash
cd money-manager-backend
```

4. **Initialize Git (if not already done)**
```bash
git init
git add .
git commit -m "Initial commit"
```

5. **Create Heroku App**
```bash
heroku create money-manager-backend-yourname
```

6. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set NODE_ENV=production
```

7. **Deploy to Heroku**
```bash
git push heroku main
# Or if your branch is master:
git push heroku master
```

8. **Verify Deployment**
```bash
heroku open
heroku logs --tail
```

Your backend will be available at: `https://money-manager-backend-yourname.herokuapp.com`

---

### Option 3: Railway

#### Steps

1. **Go to Railway**
   - Visit https://railway.app/
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your backend repository

3. **Configure Environment Variables**
   - Go to "Variables" tab
   - Add:
     - `MONGODB_URI`: Your MongoDB connection string
     - `NODE_ENV`: production
     - `PORT`: Leave empty (Railway auto-assigns)

4. **Deploy**
   - Railway will automatically deploy
   - Get your deployment URL from the dashboard

---

### Option 4: Render (Manual Setup)

#### Steps

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select the backend repository

3. **Configure Service**
   - Name: money-manager-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables**
   - Add `MONGODB_URI`
   - Add `NODE_ENV` = production

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

---

## Frontend Deployment

### Option 1: Render (Recommended - Free Tier)

If you used the `render.yaml` blueprint, Render will also create the frontend service automatically.

Steps:
1. Open the frontend service in Render.
2. Set the environment variable:
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
3. Trigger a new deploy.

Your frontend will be available at: `https://your-frontend.onrender.com`

---

### Option 2: Vercel

#### Prerequisites
- Vercel account
- Vercel CLI (optional)

#### Steps

1. **Install Vercel CLI** (optional)
```bash
npm install -g vercel
```

2. **Navigate to Frontend Directory**
```bash
cd money-manager-frontend
```

3. **Update Environment Variable**
Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

4. **Deploy with Vercel CLI**
```bash
vercel
```

Or **Deploy via GitHub**:
1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select `money-manager-frontend`
5. Add environment variable: `REACT_APP_API_URL`
6. Click "Deploy"

Your frontend will be available at: `https://money-manager-frontend.vercel.app`

---

### Option 3: Netlify

#### Steps

1. **Build the Project**
```bash
cd money-manager-frontend
npm run build
```

2. **Deploy via Netlify Dashboard**
   - Go to https://www.netlify.com/
   - Sign up/Login
   - Click "Add new site" → "Deploy manually"
   - Drag and drop the `build` folder

3. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = your backend URL

4. **Deploy via Git** (Alternative)
   - Click "Add new site" → "Import from Git"
   - Connect your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Add environment variables
   - Deploy

---

### Option 4: GitHub Pages

#### Steps

1. **Install gh-pages**
```bash
cd money-manager-frontend
npm install --save-dev gh-pages
```

2. **Update package.json**
Add these lines:
```json
{
  "homepage": "https://yourusername.github.io/money-manager-frontend",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Update Environment Variable**
Create `.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

4. **Deploy**
```bash
npm run deploy
```

Your site will be available at: `https://yourusername.github.io/money-manager-frontend`

---

## Post-Deployment

### 1. Update URLs

Update the frontend environment variable with the actual backend URL:

**In Vercel/Netlify:**
- Go to environment variables
- Update `REACT_APP_API_URL` to your deployed backend URL
- Redeploy the frontend

### 2. Test the Application

1. **Test Backend**
```bash
curl https://your-backend-url.herokuapp.com/health
```

2. **Test Frontend**
   - Open your frontend URL in a browser
   - Try adding a transaction
   - Check if dashboard loads correctly

### 3. Enable CORS (if needed)

If you get CORS errors, update backend `server.js`:

```javascript
Set `CORS_ORIGIN` in the backend service:
```
CORS_ORIGIN=https://your-frontend.onrender.com
```
```

### 4. Monitor Application

**Heroku:**
```bash
heroku logs --tail
```

**Railway/Render:**
- Check logs in the dashboard

### 5. Set Up Custom Domain (Optional)

**Vercel/Netlify:**
1. Go to domain settings
2. Add your custom domain
3. Update DNS records as instructed

---

## Submission Checklist

Create a text file with the following information:

```
Money Manager Application - Submission Details

Frontend:
- GitHub Repository: https://github.com/yourusername/money-manager-frontend
- Live URL: https://money-manager-frontend.vercel.app
- Last Commit Hash: abc123def456...

Backend:
- GitHub Repository: https://github.com/yourusername/money-manager-backend
- Live URL: https://money-manager-backend.herokuapp.com
- Last Commit Hash: xyz789uvw012...

MongoDB:
- Database: MongoDB Atlas
- Connection: Configured

Features Implemented:
✓ Dashboard with charts
✓ Add/Edit/Delete transactions
✓ Filter by category, division, date
✓ Weekly/Monthly/Yearly views
✓ 12-hour edit restriction
✓ Account management
✓ Responsive design

Tech Stack:
- Frontend: React 18 + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
```

---

## Troubleshooting

### Issue: Frontend can't connect to backend

**Solution:**
1. Check CORS settings in backend
2. Verify REACT_APP_API_URL is correct
3. Ensure backend is running
4. Check browser console for errors

### Issue: MongoDB connection fails

**Solution:**
1. Verify connection string is correct
2. Check Network Access whitelist in MongoDB Atlas
3. Ensure database user has correct permissions

### Issue: Environment variables not working

**Solution:**
1. For React: Variables must start with `REACT_APP_`
2. Redeploy after changing environment variables
3. Clear cache and rebuild

### Issue: Build fails on deployment

**Solution:**
1. Check Node.js version compatibility
2. Run `npm install` locally to check for errors
3. Review deployment logs for specific errors

---

## Security Recommendations

1. **Never commit `.env` files**
2. **Use strong database passwords**
3. **Restrict MongoDB Network Access in production**
4. **Enable HTTPS** (automatically enabled on Vercel/Netlify/Heroku)
5. **Implement rate limiting** for API endpoints
6. **Add authentication** for production use

---

## Maintenance

### Updating the Application

1. **Update Code**
```bash
git add .
git commit -m "Your update message"
git push origin main
```

2. **Redeploy**
   - Vercel/Netlify/Railway: Automatic deployment on push
   - Heroku: `git push heroku main`

### Monitoring

- Set up monitoring with services like:
  - UptimeRobot (for uptime monitoring)
  - LogRocket (for frontend monitoring)
  - Sentry (for error tracking)

---

## Cost Estimation

### Free Tier Limitations

**MongoDB Atlas (Free):**
- 512 MB storage
- Shared CPU
- Suitable for development/small projects

**Heroku (Free - being phased out, use hobby tier $7/month):**
- 512 MB RAM
- Sleep after 30 min of inactivity

**Vercel (Free):**
- 100 GB bandwidth/month
- Unlimited deployments

**Railway (Free trial):**
- $5 credit per month
- Pay-as-you-go after

**Render (Free):**
- Spins down after inactivity
- 750 hours/month

### Recommended for Production

- **Backend**: Railway ($5-10/month) or Render ($7/month)
- **Frontend**: Vercel (Free tier sufficient)
- **Database**: MongoDB Atlas (Free tier sufficient for small apps)

**Total: $5-10/month**

---

For additional help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Netlify Documentation](https://docs.netlify.com/)
