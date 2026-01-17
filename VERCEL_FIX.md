# Vercel NOT_FOUND 오류 해결 가이드

## 🔧 문제 해결

NOT_FOUND 오류는 일반적으로 다음과 같은 이유로 발생합니다:

1. **SPA 라우팅 문제**: React 앱이 클라이언트 사이드 라우팅을 사용할 때
2. **잘못된 빌드 설정**: outputDirectory나 buildCommand 설정 오류
3. **정적 파일 누락**: public 폴더의 파일이 dist에 복사되지 않음

## ✅ 수정 완료

다음 사항을 확인/수정했습니다:

1. ✅ `vercel.json` 설정 업데이트
2. ✅ `dist` 폴더에 `logo.jpg` 복사 확인
3. ✅ 빌드 재실행

## 📋 Vercel에 재배포 방법

### 방법 1: Vercel CLI 사용
```bash
vercel --prod
```

### 방법 2: Vercel 대시보드 사용
1. https://vercel.com/dashboard 에서 프로젝트 선택
2. "Settings" > "General" 확인
3. "Redeploy" 클릭

### 방법 3: GitHub 연동 시
- 코드를 푸시하면 자동 재배포됩니다

## 🔍 확인 사항

배포 후 다음을 확인하세요:

1. **메인 페이지 로드**: `https://your-app.vercel.app` 접속
2. **logo.jpg 접근**: `https://your-app.vercel.app/logo.jpg` 접속
3. **QR 코드 생성 테스트**: 링크 입력 후 QR 코드가 생성되는지 확인

## 🆘 여전히 문제가 발생한다면

1. **Vercel 대시보드에서 배포 로그 확인**
   - 프로젝트 > Deployments > 최신 배포 > Logs

2. **Build Settings 확인**
   - Settings > General > Build & Development Settings
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **환경 변수 확인**
   - Settings > Environment Variables
   - 필요한 환경 변수가 있는지 확인

## 📝 vercel.json 설명

현재 `vercel.json` 설정:
- `buildCommand`: 빌드 명령어
- `outputDirectory`: 빌드 결과물 폴더
- `framework`: Vite 프레임워크 인식
- `rewrites`: 모든 경로를 index.html로 리다이렉트 (SPA 지원)
