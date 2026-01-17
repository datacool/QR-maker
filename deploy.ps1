# QR Code Maker 배포 스크립트
Write-Host "QR 코드 생성기 배포 스크립트" -ForegroundColor Green
Write-Host ""

# 빌드 확인
Write-Host "1. 프로젝트 빌드 중..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "빌드 실패!" -ForegroundColor Red
    exit 1
}

Write-Host "빌드 완료!" -ForegroundColor Green
Write-Host ""

Write-Host "배포 방법 선택:" -ForegroundColor Cyan
Write-Host "1. Netlify (netlify.com) - 드래그 앤 드롭 배포"
Write-Host "2. Vercel (vercel.com) - 드래그 앤 드롭 배포"
Write-Host "3. GitHub Pages - GitHub 저장소에 푸시"
Write-Host ""
Write-Host "빌드된 파일 위치: dist 폴더" -ForegroundColor Yellow
Write-Host ""
Write-Host "Netlify/Vercel 배포:" -ForegroundColor Cyan
Write-Host "- https://app.netlify.com/drop 에서 dist 폴더를 드래그 앤 드롭"
Write-Host "- 또는 https://vercel.com/new 에서 dist 폴더를 드래그 앤 드롭"
Write-Host ""

# dist 폴더 열기
Write-Host "dist 폴더를 여시겠습니까? (Y/N): " -NoNewline
$response = Read-Host
if ($response -eq "Y" -or $response -eq "y") {
    explorer dist
}
