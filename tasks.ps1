# Task to be run during the build process
param(
    [Parameter(Mandatory = $True)]
    [ValidateSet('build', 'clean', 'cbuild', 'scan', 'list')]
    [string]$Cmd
)

function DoBuild {
    mkdir out\artifact -ErrorAction Ignore | Out-Null
    $env:Path = "$env:CLANG_ROOT;$env:MSVC_ROOT\Common7\IDE\CommonExtensions\Microsoft\CMake\Ninja;" + $env:Path
    ninja.exe all >out\build.log
}

function DoCBuild {
    DoClean
    DoBuild
}

function DoClean {
    Remove-Item .\.ninja_log -ErrorAction Ignore
    remove-item out -Recurse -Force -ErrorAction Ignore
}

function DoScan {
    Write-Output 'Environment'
    Write-Output '-----------'
    cmd.exe /c set

    Write-Output ''
    Write-Output 'Path'
    Write-Output '-----'
    $env:Path.split(';')

    Write-Output ''
    Write-Output 'Root Dir C'
    Write-Output  '----------'
    cmd.exe /c dir c:\ /ogn

    Write-Output ''
    Write-Output 'Root Dir D'
    Write-Output '----------'
    cmd.exe /c dir d:\ /ogn

    Write-Output ''
    Write-Output 'Root Dir E'
    Write-Output '----------'
    cmd.exe /c dir d:\ /ogn

    Write-Output ''
    Write-Output 'Root Dir F'
    Write-Output '----------'
    cmd.exe /c dir f:\ /ogn

    Write-Output ''
    Write-Output 'Program Files'
    Write-Output '-------------'
    cmd.exe /c dir "c:\Program Files" /ogn

    Write-Output ''
    Write-Output 'Program Files (x86)'
    Write-Output '-------------------'
    cmd.exe /c dir "c:\Program Files (x86)" /ogn

    Write-Output ''
    Write-Output 'msys64'
    Write-Output '-------------'
    cmd.exe /c dir "c:\msys64" /ogn

    # Write-Output ''
    # Write-Output 'Compilers'
    # Write-Output '---------'
    # cmd.exe /c "dir c:\*.exe /s/b | grep -iE ""[\](cl|clang\+\+|cmake|gcc|ninja)\.exe$"""
}

switch ($Cmd.ToLower()) {
    'build' { DoBuild }
    'cbuild' { DoCBuild }
    'clean' { DoClean }
    'scan' {
        mkdir out\artifact -ErrorAction Ignore | Out-Null
        DoScan >out\artifact\scan.log
    }
}