# QR 코드 생성기 배포 가이드

## 🚀 빠른 배포 방법 (3가지)

### 방법 1: Netlify Drop (가장 쉬움, 로그인 불필요)

1. 다음 명령어로 빌드:
   ```bash
   npm run build
   ```

2. 브라우저에서 https://app.netlify.com/drop 열기

3. `dist` 폴더를 드래그 앤 드롭

4. 즉시 배포 URL 받기! (예: https://random-name-123.netlify.app)

**장점**: 회원가입 없이 즉시 배포 가능

---

### 방법 2: Vercel (간단, GitHub 연동 가능)

1. 다음 명령어로 빌드:
   ```bash
   npm run build
   ```

2. 브라우저에서 https://vercel.com/new 열기

3. `dist` 폴더를 드래그 앤 드롭하거나 GitHub 저장소 연결

4. 자동으로 배포 완료!

**장점**: 무료, 빠른 배포, GitHub 연동 시 자동 배포

---

### 방법 3: GitHub Pages (GitHub 사용 시)

1. GitHub에 저장소 생성 및 코드 푸시:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. GitHub 저장소 Settings > Pages 이동

3. Source를 "GitHub Actions"로 선택

4. `.github/workflows/deploy.yml` 파일이 자동 배포 처리

**장점**: GitHub 계정만 있으면 무료 호스팅

---

## 📦 빌드 파일 생성

배포 전에 빌드를 실행하세요:

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

---

## 🔧 CLI를 사용한 배포 (고급)

### Netlify CLI 사용:
```bash
# 로그인 (브라우저에서 인증 필요)
netlify login

# 배포
netlify deploy --prod --dir=dist
```

### Vercel CLI 사용:
```bash
# 로그인 (브라우저에서 인증 필요)
vercel login

# 배포
vercel --prod
```

---

## ✅ 배포 체크리스트

- [x] `npm run build` 실행 완료
- [x] `dist` 폴더에 파일 생성 확인
- [ ] Netlify/Vercel/GitHub Pages 선택
- [ ] 배포 완료 후 URL 확인
- [ ] QR 코드 생성 기능 테스트

---

## 🆘 문제 해결

### 빌드 오류 발생 시:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install
npm run build
```

### 배포 후 페이지가 안 보일 때:
- Netlify: `netlify.toml` 파일 확인
- Vercel: `vercel.json` 파일 확인
- GitHub Pages: `vite.config.ts`의 `base` 설정 확인
