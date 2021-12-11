@if :%_echo%==:1 (echo on) else (echo off)
    setlocal enableextensions
    echo You are running the test.cmd script

    where node
    where python
    where cmake
    where ninja

    echo.
    echo set -------------------------------------------------------------------
    set

    echo.
    echo SystemRoot -----------------------------------------------------------
    dir /a/b "%SystemRoot%\.."

    echo.
    echo ProgramFiles -----------------------------------------------------------
    dir /a/b "%ProgramFiles%"

    echo.
    echo ProgramFiles -----------------------------------------------------------
    dir /a/b "%ProgramFiles(x86)%"
