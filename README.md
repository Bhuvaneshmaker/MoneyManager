# Money Manager Web Application

A full-stack web application for managing personal and business finances with ease. Track income, expenses, visualize spending patterns, and manage your financial data efficiently.

![Money Manager](https://img.shields.io/badge/Money-Manager-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248)

## 🌟 Features

### Core Functionality
- ✅ Add income and expenses with detailed information
- ✅ Track transactions with date, time, description, and categories
- ✅ Separate office and personal divisions
- ✅ Edit/delete transactions within 12 hours
- ✅ Multiple category support (fuel, food, medical, loan, etc.)

### Dashboard & Analytics
- 📊 Visual charts (bar, line, pie charts)
- 📈 Month-wise, weekly, and yearly income/expenditure analysis
- 💰 Real-time balance calculation
- 📉 Category-wise spending breakdown
- 🏢 Division-wise summary (office vs personal)

### Filtering & Search
- 🔍 Filter by transaction type (income/expense)
- 🗂️ Filter by category
- 🏢 Filter by division
- 📅 Custom date range filtering
- 🎯 Advanced search capabilities

### Account Management
- 💳 Multiple account support
- 🔄 Transfer money between accounts
- 💵 Account balance tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Validation**: express-validator
- **CORS**: Enabled for cross-origin requests

## 📁 Project Structure

```
money-manager-project/
├── money-manager-frontend/     # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   ├── utils/             # Helper functions
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── package.json
│   └── README.md
│
├── money-manager-backend/      # Node.js backend API
│   ├── config/               # Configuration files
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── server.js             # Main server file
│   ├── package.json
│   └── README.md
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd money-manager-project
```

### 2. Backend Setup

```bash
cd money-manager-backend
npm install
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../money-manager-frontend
npm install
cp .env.example .env
# Edit .env if your backend URL is different
npm start
```

The frontend will open at `http://localhost:3000`

## 📝 Detailed Setup Instructions

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free M0 tier available)
4. Go to Database Access and create a database user
5. Go to Network Access and add your IP address (or 0.0.0.0/0 for development)
6. Click "Connect" → "Connect your application"
7. Copy the connection string
8. Replace `<password>` with your database user password
9. Replace `myFirstDatabase` with `money-manager`
10. Paste the connection string in backend `.env` file

Example connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/money-manager?retryWrites=true&w=majority
```

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 Usage Guide

### Adding a Transaction

1. Click the "Add Transaction" button in the header
2. Select "Income" or "Expense" tab
3. Fill in the details:
   - Amount
   - Description
   - Category
   - Division (Personal/Office)
   - Date and Time
4. Click "Add Income" or "Add Expense"

### Viewing Dashboard

1. The dashboard shows:
   - Total income and expense cards
   - Current balance
   - Number of transactions
   - Income vs Expense bar chart
   - Trend analysis line chart
   - Category breakdown pie chart
   - Division summary

### Filtering Transactions

1. Click the "Filters" button
2. Select filter criteria:
   - Transaction Type
   - Category
   - Division
   - Date Range
3. Click "Apply"

### Editing/Deleting Transactions

- Transactions can only be edited or deleted within 12 hours of creation
- Click the edit icon to modify a transaction
- Click the delete icon and confirm to remove a transaction
- After 12 hours, transactions are locked and show a "Locked" badge

## 🌐 Deployment

### Backend Deployment Options

#### Option 1: Heroku
```bash
heroku create money-manager-backend
heroku config:set MONGODB_URI="your-connection-string"
git push heroku main
```

#### Option 2: Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

#### Option 3: Render
1. Connect GitHub repository
2. Select Node.js environment
3. Add environment variables
4. Deploy

### Frontend Deployment Options

#### Option 1: Vercel
```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify
```bash
npm run build
# Deploy the build folder to Netlify
```

#### Option 3: GitHub Pages
```bash
npm install --save-dev gh-pages
# Add homepage and deploy scripts to package.json
npm run deploy
```

## 📊 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/filter` - Filter transactions
- `GET /api/transactions/summary` - Get summary

### Accounts
- `GET /api/accounts` - Get all accounts
- `POST /api/accounts` - Create account
- `PUT /api/accounts/:id` - Update account
- `DELETE /api/accounts/:id` - Delete account
- `POST /api/accounts/transfer` - Transfer between accounts

## 🎨 Screenshots

### Dashboard
Shows comprehensive financial overview with charts and statistics.

### Transaction History
Displays all transactions grouped by date with edit/delete options.

### Add Transaction Modal
Easy-to-use form for adding income or expenses.

## 🔒 Security Features

- Input validation on both frontend and backend
- MongoDB injection prevention through Mongoose
- CORS configuration for secure cross-origin requests
- Environment variable protection
- Time-based edit/delete restrictions

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify all environment variables are set

### Frontend can't connect to backend
- Check REACT_APP_API_URL in frontend .env
- Ensure backend is running on correct port
- Check CORS settings in backend

### Transactions not showing
- Check browser console for errors
- Verify API endpoints are working (test with Postman)
- Check MongoDB Atlas database for data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components
- MongoDB team for the excellent database solution

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainer.

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Multiple user support
- [ ] Budget planning and alerts
- [ ] Recurring transactions
- [ ] Export to CSV/Excel
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Receipt upload and OCR
- [ ] Multi-currency support
- [ ] Financial goals tracking

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ for better financial management
