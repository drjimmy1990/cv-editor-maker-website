@echo off
REM ======================================
REM  Optimization.sa - Build & Package
REM  Run this script to create deploy.zip
REM ======================================

echo [1/3] Installing dependencies...
call npm install

echo [2/3] Building production version...
call npm run build

echo [3/3] Creating deploy.zip...
cd dist
powershell Compress-Archive -Path * -DestinationPath ..\deploy.zip -Force
cd ..

echo.
echo ========================================
echo  BUILD COMPLETE!
echo ========================================
echo.
echo  deploy.zip has been created.
echo.
echo  Next steps:
echo  1. Upload deploy.zip to your VPS
echo  2. Extract to /www/wwwroot/your-domain/
echo  3. Configure Nginx (see DEPLOY_GUIDE.md)
echo.
pause
