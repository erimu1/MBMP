@echo off
echo Deploying MBMP to GitHub...
echo.
echo Step 1: Pushing to GitHub repository...
git push -u origin main
echo.
echo Step 2: Deploying to GitHub Pages...
cd client
npm run deploy
echo.
echo ✅ MBMP should now be live at: https://erimu1.github.io/MBMP
echo.
pause
