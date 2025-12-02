@echo off
chcp 65001
echo ========================================
echo         部署修复后的云函数
echo ========================================
echo.

echo 1. 部署 generateAuthCode...
cd cloud-functions\generateAuthCode\functions\generateAuthCode
call npm install
call tcb fn deploy generateAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

echo.
echo 2. 部署 verifyAuthCode...
cd cloud-functions\verifyAuthCode\functions\verifyAuthCode
call npm install
call tcb fn deploy verifyAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

echo.
echo 3. 部署 checkAuthStatus...
cd cloud-functions\checkAuthStatus\functions\checkAuthStatus
call npm install
call tcb fn deploy checkAuthStatus -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

echo.
echo ========================================
echo ✅ 所有云函数部署完成！
echo ========================================
echo.
pause