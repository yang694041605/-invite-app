@echo off
chcp 65001
echo 一键修复和部署云函数...

echo 步骤1: 重新创建正确的目录结构...
cd cloud-functions

echo 重建 generateAuthCode 结构...
cd generateAuthCode
if exist functions rmdir /s /q functions
mkdir functions\generateAuthCode
copy index.js functions\generateAuthCode\ >nul
echo {>"functions\generateAuthCode\package.json"
echo   "name": "generateAuthCode",>>"functions\generateAuthCode\package.json"
echo   "version": "1.0.0",>>"functions\generateAuthCode\package.json"
echo   "main": "index.js",>>"functions\generateAuthCode\package.json"
echo   "dependencies": {>>"functions\generateAuthCode\package.json"
echo     "@cloudbase/node-sdk": "^2.7.0">>"functions\generateAuthCode\package.json"
echo   }>>"functions\generateAuthCode\package.json"
echo }>>"functions\generateAuthCode\package.json"
cd ..

echo 重建 verifyAuthCode 结构...
cd verifyAuthCode
if exist functions rmdir /s /q functions
mkdir functions\verifyAuthCode
copy index.js functions\verifyAuthCode\ >nul
echo {>"functions\verifyAuthCode\package.json"
echo   "name": "verifyAuthCode",>>"functions\verifyAuthCode\package.json"
echo   "version": "1.0.0",>>"functions\verifyAuthCode\package.json"
echo   "main": "index.js",>>"functions\verifyAuthCode\package.json"
echo   "dependencies": {>>"functions\verifyAuthCode\package.json"
echo     "@cloudbase/node-sdk": "^2.7.0">>"functions\verifyAuthCode\package.json"
echo   }>>"functions\verifyAuthCode\package.json"
echo }>>"functions\verifyAuthCode\package.json"
cd ..

echo 重建 checkAuthStatus 结构...
cd checkAuthStatus
if exist functions rmdir /s /q functions
mkdir functions\checkAuthStatus
copy index.js functions\checkAuthStatus\ >nul
echo {>"functions\checkAuthStatus\package.json"
echo   "name": "checkAuthStatus",>>"functions\checkAuthStatus\package.json"
echo   "version": "1.0.0",>>"functions\checkAuthStatus\package.json"
echo   "main": "index.js",>>"functions\checkAuthStatus\package.json"
echo   "dependencies": {>>"functions\checkAuthStatus\package.json"
echo     "@cloudbase/node-sdk": "^2.7.0">>"functions\checkAuthStatus\package.json"
echo   }>>"functions\checkAuthStatus\package.json"
echo }>>"functions\checkAuthStatus\package.json"
cd ..

echo 步骤2: 部署云函数...
cd generateAuthCode\functions\generateAuthCode
call npm install
call tcb fn deploy generateAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

cd verifyAuthCode\functions\verifyAuthCode
call npm install
call tcb fn deploy verifyAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

cd checkAuthStatus\functions\checkAuthStatus
call npm install
call tcb fn deploy checkAuthStatus -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..\..\..

echo.
echo ✅ 修复和部署完成！
pause