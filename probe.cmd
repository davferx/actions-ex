@if :%_echo%==:1 (echo on) else (echo off)
    setlocal enableextensions
    echo You are running the probe.cmd script

    mkdir artifacts
    copy c:\InstalledSoftware.md artifacts
    where vcpkg
    vcpkg version