# Sync frontend files to backend deployment folder
# Run this after making changes to frontend files

$source = ".\frontend\static"
$dest = ".\backend\src\main\resources\static"

if (-not (Test-Path $source)) {
    Write-Host "❌ Frontend folder not found: $source" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $dest)) {
    Write-Host "❌ Backend folder not found: $dest" -ForegroundColor Red
    exit 1
}

try {
    # Copy all files from frontend to backend
    Get-ChildItem $source | ForEach-Object {
        Copy-Item $_.FullName -Destination $dest -Force
        Write-Host "✅ Synced: $($_.Name)" -ForegroundColor Green
    }
    
    Write-Host "`n✅ All frontend files synced to backend successfully!" -ForegroundColor Green
    Write-Host "📁 Source: $source" -ForegroundColor Cyan
    Write-Host "📁 Destination: $dest" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Error during sync: $_" -ForegroundColor Red
    exit 1
}
