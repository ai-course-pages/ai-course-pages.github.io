param(
  [ValidateSet("check", "push")]
  [string]$Action = "check"
)

$ErrorActionPreference = "Stop"
$repo = Split-Path $PSScriptRoot -Parent
$envFile = Join-Path $env:USERPROFILE ".config\ai-course-pages\github.env"
$token = $env:AI_COURSE_GITHUB_TOKEN

if (-not $token -and (Test-Path -LiteralPath $envFile)) {
  foreach ($line in Get-Content -LiteralPath $envFile) {
    if ($line -match '^\s*#' -or $line -match '^\s*$') { continue }
    if ($line -match '^\s*GITHUB_TOKEN\s*=\s*(.*)$') {
      $token = $Matches[1].Trim().Trim('"').Trim("'")
    }
  }
}

if (-not $token) {
  Write-Error "No token. Set AI_COURSE_GITHUB_TOKEN, or put GITHUB_TOKEN= in $envFile"
}

$headers = @{
  Authorization = "Bearer $token"
  Accept = "application/vnd.github+json"
  "User-Agent" = "ai-course-pages"
}
$me = Invoke-RestMethod -Headers $headers -Uri "https://api.github.com/user"
Write-Output ("token login: " + $me.login)

if ($Action -eq "check") { return }

Set-Location $repo
$origin = "https://github.com/ai-course-pages/ai-course-pages.github.io.git"
$names = @(git remote)
if ($names -contains "origin") { git remote set-url origin $origin } else { git remote add origin $origin }
$env:GIT_CONFIG_COUNT = "2"
$env:GIT_CONFIG_KEY_0 = "credential.helper"
$env:GIT_CONFIG_VALUE_0 = ""
$env:GIT_CONFIG_KEY_1 = "http.extraheader"
$env:GIT_CONFIG_VALUE_1 = "AUTHORIZATION: bearer $token"
try {
  git push -u origin main
} finally {
  Remove-Item Env:GIT_CONFIG_COUNT, Env:GIT_CONFIG_KEY_0, Env:GIT_CONFIG_VALUE_0, Env:GIT_CONFIG_KEY_1, Env:GIT_CONFIG_VALUE_1 -ErrorAction SilentlyContinue
}
