# Quick Start Guide - Money Manager

Get your Money Manager application up and running in 5 minutes!

## Prerequisites
- Node.js installed (v14+)
- MongoDB Atlas account (free)
- Terminal/Command Prompt

## Step 1: Setup MongoDB (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster (free M0 tier)
4. Create database user:
   - Username: `moneymanager`
   - Password: `[choose a password]`
5. Add IP: Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the string
   - Replace `<password>` with your password
   - Replace database name with `money-manager`

Your connection string should look like:
```
mongodb+srv://moneymanager:yourpassword@cluster0.xxxxx.mongodb.net/money-manager?retryWrites=true&w=majority
```

## Step 2: Setup Backend (1 minute)

```bash
# Navigate to backend folder
cd money-manager-backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=your_connection_string_here" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env

# Start the server
npm start
```

You should see: `MongoDB Connected` and `Server is running on port 5000`

## Step 3: Setup Frontend (1 minute)

Open a new terminal:

```bash
# Navigate to frontend folder
cd money-manager-frontend

# Install dependencies
npm install

# Create .env file (optional, defaults to localhost:5000)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the application
npm start
```

Your browser will open automatically at `http://localhost:3000`

## Step 4: Test the Application (1 minute)

1. Click "Add Transaction" button
2. Add a sample income:
   - Amount: 50000
   - Description: Monthly Salary
   - Category: Salary
   - Division: Office
3. Add a sample expense:
   - Amount: 2000
   - Description: Fuel for car
   - Category: Fuel
   - Division: Office
4. View the dashboard - you should see:
   - Summary cards updated
   - Charts displaying your data
5. Check the "History" tab to see your transactions

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Make sure you replaced `<password>` in the connection string
- Verify your IP is whitelisted in MongoDB Atlas

### Frontend won't start
- Make sure backend is running first
- Check if port 3000 is available
- Try clearing npm cache: `npm cache clean --force`

### Can't see transactions
- Open browser console (F12) to check for errors
- Verify backend URL in frontend .env file
- Make sure backend health check works: http://localhost:5000/health

## What's Next?

Now you can:
- Add more transactions
- Explore filtering options
- Switch between weekly/monthly/yearly views
- Edit transactions (within 12 hours)
- Create accounts and transfer money

## Need Help?

Check the full documentation:
- Main README.md - Complete project overview
- DEPLOYMENT.md - Deploy to production
- Frontend README.md - Frontend details
- Backend README.md - API documentation

## Quick Commands Reference

**Backend:**
```bash
npm start          # Start server
npm run dev        # Start with auto-reload (need nodemon)
```

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
```

## Default URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Base: http://localhost:5000/api
- Health Check: http://localhost:5000/health

---

**🎉 Congratulations! Your Money Manager is ready to use!**

Start tracking your finances and gain insights into your spending patterns.
