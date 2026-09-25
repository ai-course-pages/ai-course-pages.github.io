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
$env:GIT_TERMINAL_PROMPT = "0"
$env:GCM_INTERACTIVE = "Never"
$extra = "AUTHORIZATION: bearer $token"
& git -c "credential.helper=" -c "http.https://github.com/.extraheader=$extra" push -u origin main
if ($LASTEXITCODE -ne 0) { throw "git push failed" }
$body = '{"source":{"branch":"main","path":"/"}}'
try {
  Invoke-RestMethod -Method Post -Headers $headers -Uri "https://api.github.com/repos/ai-course-pages/ai-course-pages.github.io/pages" -Body $body -ContentType "application/json" | Out-Null
  Write-Output "pages: enabled"
} catch {
  $status = $_.Exception.Response.StatusCode.value__
  if ($status -eq 409) {
    Write-Output "pages: already enabled"
  } else {
    Write-Output ("pages: not changed (" + $status + ")")
  }
}
