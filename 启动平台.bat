@echo off
chcp 65001 >nul
title 装配智建·和美乡村 智慧管理平台
cd /d "%~dp0"

echo ==================================================
echo   装配智建 · 和美乡村 智慧管理平台
echo   规范筑基 · 数字提效
echo ==================================================
echo.

where node >nul 2>nul
if %errorlevel%==0 (
    echo [启动方式 1] 检测到 Node.js，启动完整平台（含质量监测后端，数据可持久化）...
    echo 浏览器将自动打开：http://localhost:8080
    echo 关闭本窗口即可停止平台。
    echo.
    start "" http://localhost:8080
    node backend\server.js
) else (
    echo [启动方式 2] 未检测到 Node.js，直接以离线模式打开平台（数据存于浏览器本地）。
    echo 如需跨设备数据同步，请安装 Node.js 后重新运行本脚本。
    echo.
    start "" "%~dp0index.html"
)
pause
