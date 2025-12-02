@echo off
echo 开始部署所有云函数到环境：my-app-fucai-4gcaw7hv5d0274cb

echo.
echo 1. 部署 generateAuthCode...
cd cloud-functions\generateAuthCode
tcb functions:deploy generateAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo.
echo 2. 部署 verifyAuthCode...
cd cloud-functions\verifyAuthCode
tcb functions:deploy verifyAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo.
echo 3. 部署 checkAuthStatus...
cd cloud-functions\checkAuthStatus
tcb functions:deploy checkAuthStatus -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo.
echo 所有云函数部署完成！
pause