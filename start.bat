@echo off
echo.
echo ============================================
echo   MOOD BASED MUSIC PLAYER - STARTUP
echo ============================================
echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd /d %~dp0 && npm start"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting frontend React app...
start "Frontend App" cmd /k "cd /d %~dp0client && set PORT=3005 && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3502
echo Frontend: http://localhost:3005
echo.
echo The application will open in your browser automatically.
echo.
pause
