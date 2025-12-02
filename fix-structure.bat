@echo off
chcp 65001
echo 正在修复云函数目录结构...

echo 修复 generateAuthCode...
cd cloud-functions\generateAuthCode
if not exist functions mkdir functions
cd functions
if not exist generateAuthCode mkdir generateAuthCode
cd ..
move index.js functions\generateAuthCode\ 2>nul
move package.json functions\generateAuthCode\ 2>nul
cd ..\..

echo 修复 verifyAuthCode...
cd cloud-functions\verifyAuthCode
if not exist functions mkdir functions
cd functions
if not exist verifyAuthCode mkdir verifyAuthCode
cd ..
move index.js functions\verifyAuthCode\ 2>nul
move package.json functions\verifyAuthCode\ 2>nul
cd ..\..

echo 修复 checkAuthStatus...
cd cloud-functions\checkAuthStatus
if not exist functions mkdir functions
cd functions
if not exist checkAuthStatus mkdir checkAuthStatus
cd ..
move index.js functions\checkAuthStatus\ 2>nul
move package.json functions\checkAuthStatus\ 2>nul
cd ..\..

echo 目录结构修复完成！
echo 请检查 verifyAuthCode 的 package.json 文件格式是否正确
pause