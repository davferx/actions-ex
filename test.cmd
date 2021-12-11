@if :%_echo%==:1 (echo on) else (echo off)
    setlocal enableextensions
    echo You are running the test.cmd script

    mkdir artifact
    echo log1 text > artifact\log1.txt
    echo log2 text > artifact\log2.txt

    where node
    where python
    where cmake
    where ninja

    echo.
    echo cmake version ---------------------------------------------------------
    cmake --version

    echo.
    echo ninja version ---------------------------------------------------------
    ninja --version

    echo.
    echo node version ----------------------------------------------------------
    node --version

    echo.
    echo run a node script -----------------------------------------------------
    node tasks version

    echo.
    echo set -------------------------------------------------------------------
    set

    echo.
    echo Current Dir ----------------------------------------------------------
    dir /a

    echo.
    echo SystemRoot ------------------------------------------------------------
    dir /a/b "%SystemRoot%\.."

    echo.
    echo ProgramFiles ----------------------------------------------------------
    dir /a/b "%ProgramFiles%"

    echo.
    echo ProgramFiles x86 ------------------------------------------------------
    dir /a/b "%ProgramFiles(x86)%"

    echo.
    echo Drives ----------------------------------------------------------------
    dir a:\
    dir b:\
    dir c:\
    dir d:\
    dir e:\
    dir f:\
    dir g:\
    dir h:\
    dir i:\
    dir j:\
    dir k:\
    dir l:\
    dir m:\
    dir n:\
    dir o:\
    dir p:\
    dir q:\
    dir r:\
    dir s:\
    dir t:\
    dir u:\
    dir v:\
    dir w:\
    dir x:\
    dir y:\
    dir z:\

    :: echo.
    :: echo cl.exe ----------------------------------------------------------------
    :: pushd "c:\Program Files (x86)\Microsoft Visual Studio"
    :: dir /s/b cl.exe

    echo.
    echo ninja.exe -------------------------------------------------------------
    pushd "c:\"
    dir /s/b ninja.exe
