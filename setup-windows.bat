@echo off
echo ================================
echo Money Manager Setup Script
echo ================================
echo.

echo Step 1: Installing Backend Dependencies...
cd money-manager-backend
call npm install
echo Backend dependencies installed!
echo.

echo Step 2: Installing Frontend Dependencies...
cd ../money-manager-frontend
call npm install
echo Frontend dependencies installed!
echo.

echo ================================
echo Installation Complete!
echo ================================
echo.
echo Next steps:
echo 1. Setup MongoDB Atlas and get connection string
echo 2. Create .env file in money-manager-backend with:
echo    MONGODB_URI=your_connection_string
echo    PORT=5000
echo    NODE_ENV=development
echo.
echo 3. Start backend: cd money-manager-backend ^&^& npm start
echo 4. Start frontend: cd money-manager-frontend ^&^& npm start
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
