@echo off
title GigSecure - Cyber Security & Fraud Protection System
color 0b

echo =======================================================================
echo          GigSecure - Cyber Security System for Gig Workers
echo          Bhavna Trust Degree College - Final Year Project (2026-2027)
echo          Author: Ashab ul haq Ansari
echo =======================================================================
echo.

set NODE_EXE="C:\Program Files\nodejs\node.exe"

if exist %NODE_EXE% (
    echo [OK] Node.js engine detected at %NODE_EXE%
    echo Starting GigSecure Web Server on http://localhost:3000 ...
    echo Opening application in your web browser...
    start http://localhost:3000
    %NODE_EXE% server\server.js
) else (
    where node >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        echo [OK] Node.js detected in system PATH.
        echo Starting GigSecure Web Server on http://localhost:3000 ...
        echo Opening application in your web browser...
        start http://localhost:3000
        node server\server.js
    ) else (
        echo [INFO] Node.js not found in default path.
        echo Opening GigSecure directly in your default browser...
        start index.html
        pause
    )
)