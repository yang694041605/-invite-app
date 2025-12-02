@echo off
chcp 65001
echo ========================================
echo         彩票系统云函数一键部署
echo ========================================
echo.

echo 步骤1: 清理并重建正确的目录结构...
cd cloud-functions

echo 清理 generateAuthCode...
cd generateAuthCode
if exist functions rmdir /s /q functions
if exist node_modules rmdir /s /q node_modules
cd ..

echo 清理 verifyAuthCode...
cd verifyAuthCode
if exist functions rmdir /s /q functions
if exist node_modules rmdir /s /q node_modules
cd ..

echo 清理 checkAuthStatus...
cd checkAuthStatus
if exist functions rmdir /s /q functions
if exist node_modules rmdir /s /q node_modules
cd ..

echo 步骤2: 使用简单的目录结构（不要嵌套functions文件夹）...
echo 直接在每个云函数目录中部署，不使用子文件夹

echo 步骤3: 部署 generateAuthCode...
cd generateAuthCode
echo 正在安装依赖...
call npm install
echo 正在部署云函数...
call tcb fn deploy generateAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..

echo 步骤4: 部署 verifyAuthCode...
cd verifyAuthCode
echo 正在安装依赖...
call npm install
echo 正在部署云函数...
call tcb fn deploy verifyAuthCode -e my-app-fucai-4gcaw7hv5d0274cb
cd ..

echo 步骤5: 部署 checkAuthStatus...
cd checkAuthStatus
echo 正在安装依赖...
call npm install
echo 正在部署云函数...
call tcb fn deploy checkAuthStatus -e my-app-fucai-4gcaw7hv5d0274cb
cd ..

echo.
echo ========================================
echo ✅ 部署完成！
echo ========================================
echo.
pause