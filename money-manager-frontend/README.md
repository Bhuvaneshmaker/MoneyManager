# Money Manager Frontend

A modern, responsive web application for managing personal finances built with React and Tailwind CSS.

## Features

- 📊 Dashboard with visual charts and analytics
- 💰 Track income and expenses
- 🏢 Separate office and personal transactions
- 📅 Filter by weekly, monthly, and yearly periods
- 🔍 Advanced filtering by category, division, and date range
- ✏️ Edit transactions within 12 hours
- 📈 Real-time summary and statistics
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Date Handling**: date-fns

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see money-manager-backend)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd money-manager-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your backend API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── AddTransactionModal.js
│   ├── Dashboard.js
│   ├── FilterPanel.js
│   └── TransactionHistory.js
├── services/
│   └── api.js
├── utils/
│   ├── constants.js
│   └── helpers.js
├── App.js
├── index.js
└── index.css
```

## Features Overview

### Dashboard
- Visual charts showing income vs expense trends
- Category breakdown pie chart
- Division-wise summary
- Summary cards with key metrics

### Transaction Management
- Add income/expense with detailed information
- Edit transactions within 12 hours of creation
- Delete transactions with confirmation
- Categorize transactions (fuel, food, medical, etc.)
- Assign to office or personal division

### Filtering & Search
- Filter by transaction type (income/expense)
- Filter by category
- Filter by division (office/personal)
- Custom date range filtering
- Period-based view (weekly/monthly/yearly)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/money-manager-frontend",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
