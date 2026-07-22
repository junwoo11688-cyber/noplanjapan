@echo off
chcp 65001 >nul
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js and npm are required.
  echo Install Node.js from https://nodejs.org and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing project dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo Starting Dokodemo Tabikuji at http://localhost:5173
start "Dokodemo Tabikuji Server" /min cmd /k "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"
timeout /t 2 /nobreak >nul
start "" "http://localhost:5173"
exit /b 0
