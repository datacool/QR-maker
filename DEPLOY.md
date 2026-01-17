# 배포 가이드

이 프로젝트를 배포하는 여러 방법이 있습니다.

## 방법 1: Vercel 배포 (가장 쉬움)

1. [Vercel](https://vercel.com)에 가입하거나 로그인
2. 터미널에서 다음 명령어 실행:
   ```bash
   npx vercel login
   npx vercel --prod
   ```
3. 브라우저에서 배포 URL 확인

## 방법 2: GitHub Pages 배포

1. GitHub에 저장소 생성 및 코드 푸시:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
2. GitHub 저장소 Settings > Pages로 이동
3. Source를 "GitHub Actions"로 선택
4. `.github/workflows/deploy.yml` 파일이 자동으로 배포를 처리합니다

## 방법 3: Netlify 배포

1. [Netlify](https://www.netlify.com)에 가입
2. "Add new site" > "Import an existing project"
3. GitHub 저장소 연결 또는 `dist` 폴더 드래그 앤 드롭
4. Build command: `npm run build`
5. Publish directory: `dist`

## 방법 4: 수동 배포

빌드된 파일을 직접 호스팅 서버에 업로드:

```bash
npm run build
# dist 폴더의 내용을 웹 서버에 업로드
```
