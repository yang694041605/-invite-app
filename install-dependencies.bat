@echo off
echo 开始安装云函数依赖...

echo.
echo 1. 安装 generateAuthCode 依赖...
cd cloud-functions\generateAuthCode
call npm install
if %errorlevel% neq 0 (
    echo 错误：generateAuthCode 依赖安装失败
    pause
    exit /b 1
)
cd ..\..

echo.
echo 2. 安装 verifyAuthCode 依赖...
cd cloud-functions\verifyAuthCode
call npm install
if %errorlevel% neq 0 (
    echo 错误：verifyAuthCode 依赖安装失败
    pause
    exit /b 1
)
cd ..\..

echo.
echo 3. 安装 checkAuthStatus 依赖...
cd cloud-functions\checkAuthStatus
call npm install
if %errorlevel% neq 0 (
    echo 错误：checkAuthStatus 依赖安装失败
    pause
    exit /b 1
)
cd ..\..

echo.
echo 所有云函数依赖安装完成！
echo 生成的 node_modules 文件夹：
dir cloud-functions\generateAuthCode\node_modules /A:D
dir cloud-functions\verifyAuthCode\node_modules /A:D
dir cloud-functions\checkAuthStatus\node_modules /A:D

echo.
echo 下一步：部署云函数到腾讯云
pause