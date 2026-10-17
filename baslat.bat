@echo off
chcp 65001 > nul
title Donanim Dunyasi 3D - BTY.5.1.5
echo ===================================================
echo   BTY.5.1.5. 3D Donanim Ogrenme Modulu Baslatiliyor...
echo ===================================================
echo.
echo Tarayici aciliyor, lutfen bekleyin...
echo.

call npm.cmd run dev -- --open

pause
