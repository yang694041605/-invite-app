@echo off
echo 开始部署云函数...

echo 正在部署 generateAuthCode...
cd cloud-functions\generateAuthCode
call npm install
call tcb functions:deploy generateAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo 正在部署 verifyAuthCode...
cd cloud-functions\verifyAuthCode
call npm install
call tcb functions:deploy verifyAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo 正在部署 checkAuthStatus...
cd cloud-functions\checkAuthStatus
call npm install
call tcb functions:deploy checkAuthStatus -e my-app-fucai-4gcaw7hv5d0274cb
cd ..\..

echo 所有云函数部署完成！
pause