Write-Host -ForegroundColor Blue 'Build-EnvScript'
$dst = 'Set-MsvcEnv.ps1'
Write-Output "dst == $dst"
if (Test-Path $dst) {
    Write-Output 'file found'
    return
}

Write-Output 'no file found, creating it'
