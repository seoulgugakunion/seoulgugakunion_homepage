# 서울국악동아리연합 홈페이지

서울 지역 대학 국악 동아리 연합의 공식 홈페이지입니다.
HTML, CSS, JavaScript로 구성된 정적 사이트이며 별도의 빌드 과정이 없습니다.

- 홈페이지: https://seoul-gugak-union.com

## 로컬 실행

저장소 루트에서 다음 명령을 실행합니다.

```sh
python3 serve.py
```

브라우저에서 http://127.0.0.1:8001 에 접속합니다.

## 파일 구성

- `index.html`: 메인 페이지
- `pages/`: 소개, 참여 동아리, 파트 및 파트 상세 페이지
- `assets/css/styles.css`: 공통 스타일
- `assets/js/app.js`: 동아리·파트 데이터와 공통 기능
- `assets/img/`: 로고와 사진

## 콘텐츠 수정

동아리와 파트 명단, 주요 소식은 `assets/js/app.js`에서 수정합니다.
상단 메뉴와 하단 영역을 변경할 때는 각 HTML 페이지에 동일하게 반영합니다.
CSS 또는 JavaScript를 수정하면 HTML의 `?v=N` 버전도 갱신해 브라우저 캐시를 업데이트합니다.

## 배포

GitHub Pages로 호스팅하며, `main` 브랜치에 푸시하면 자동 배포됩니다.
