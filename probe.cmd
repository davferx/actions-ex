@if :%_echo%==:1 (echo on) else (echo off)
    setlocal enableextensions
    echo You are running the probe.cmd script

    dir "%USERPROFILE%\ctest"
    echo --------------------
    type "%USERPROFILE%\ctest\number.txt"

