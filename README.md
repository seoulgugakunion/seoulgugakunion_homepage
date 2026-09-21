# 서울 국악 동아리 연합 홈페이지

서울 지역 대학 국악 동아리 연합의 공식 홈페이지.
순수 HTML/CSS/JS 정적 사이트 — **빌드 없음, 프레임워크 없음, 백엔드 없음**.

- **라이브 주소**: https://seoul-gugak-union.com (www는 메인 주소로 301 리다이렉트)
- **저장소**: https://github.com/seoulgugakunion/seoulgugakunion_homepage
- 개발/테스트 방법과 코드 구조는 [CLAUDE.md](CLAUDE.md) 참고.

## 배포 구성

**GitHub Pages**로 호스팅. `main` 브랜치 루트(`/`)에서 그대로 서빙되며,
`main`에 push하면 자동으로 재배포된다. 별도 배포 명령 없음.

- Pages 설정: 저장소 → Settings → Pages (Source: Deploy from a branch, `main` / `/ (root)`)
- Custom domain: `seoul-gugak-union.com` (설정 시 GitHub이 저장소에 `CNAME` 파일을 자동 커밋함 — 삭제하지 말 것)
- 인증서: GitHub이 Let's Encrypt로 자동 발급/갱신 (2026-09-05 최초 발급, 2026-12-04 만료 → 자동 갱신됨)

### 도메인 / DNS (가비아)

도메인 `seoul-gugak-union.com`은 **가비아**에서 구매, 네임서버도 가비아 기본
(`ns.gabia.co.kr`, `ns1.gabia.co.kr`, `ns.gabia.net`)을 사용한다.
레코드 관리: My가비아 → 도메인 → 관리 → **DNS 관리툴**.

현재 등록된 레코드 (GitHub Pages 공식 IP):

| 타입  | 호스트 | 값                          | TTL |
|-------|--------|-----------------------------|-----|
| A     | @      | 185.199.108.153             | 600 |
| A     | @      | 185.199.109.153             | 600 |
| A     | @      | 185.199.110.153             | 600 |
| A     | @      | 185.199.111.153             | 600 |
| CNAME | www    | `seoulgugakunion.github.io.` | 600 |

## 배포 이력 & 현재 상태 (2026-09-05 마지막 확인 기준)

완료된 것:

- [x] GitHub Pages 활성화 (`main` / root) — 조직 관리자 계정으로 웹 UI에서 설정
- [x] 커스텀 도메인 `seoul-gugak-union.com` 연결
- [x] 가비아 DNS 레코드 등록 및 전 세계 전파 확인
- [x] HTTP 접속 정상 (apex 200 OK, www → apex 301)
- [x] HTTPS 인증서 발급 완료 (API 상태 `approved`, `CN=seoul-gugak-union.com` 서빙 확인)

확인 필요 (마지막 세션에서 검증 못 함):

- [ ] **Enforce HTTPS 활성화 여부** — 마지막 확인 시점에 `https_enforced: false`였다.
      인증서 발급 직후라 체크박스를 아직 안 켰을 수 있음.
      Settings → Pages에서 **Enforce HTTPS**가 켜져 있는지 확인하고, 꺼져 있으면 켤 것.
      (꺼져 있으면 `http://` 접속이 `https://`로 리다이렉트되지 않는다.)
- [ ] `https://seoul-gugak-union.com` 및 `https://www.seoul-gugak-union.com` 실제 접속 확인

## 계정 / 권한 메모

- 로컬 개발자 계정 `thousae`는 이 저장소에 **write(push) 권한만** 있고 admin이 아니며,
  `seoulgugakunion` 조직의 멤버도 아니다 (외부 협력자).
- 따라서 **Pages 설정 변경(도메인, HTTPS 등)은 조직 소유자 계정으로 웹 UI에서** 해야 한다.
  `gh` CLI로 Pages 설정 API를 호출하면 권한 부족으로 404가 뜬다 (읽기 조회는 가능).
- admin을 주려면: 조직 소유자 계정으로 저장소 → Settings → Collaborators and teams
  (`github.com/seoulgugakunion/seoulgugakunion_homepage/settings/access`) →
  `thousae`의 Role 드롭다운 → Admin. (조직 People 페이지에는 Member/Owner만 보이니 거기가 아님.)

## 트러블슈팅 (실제 겪은 문제와 해법)

**"InvalidDNSError / Both … improperly configured" (Pages 설정 화면)**
GitHub이 도메인의 DNS 레코드를 못 찾는 상태. 실제 원인은 가비아 DNS 관리툴에
레코드를 등록하지 않아 존(zone) 자체가 없었던 것 — 가비아 네임서버가 REFUSED를
반환했다. 위 표의 레코드를 등록하고 저장하면 10분~1시간 내 해결.

**HTTPS 접속 시 `*.github.io` 인증서가 나오면서 보안 오류**
커스텀 도메인 전용 인증서가 아직 발급 안 된 상태. DNS가 깨진 상태에서 도메인을
등록하면 첫 발급 시도가 실패하고 재시도가 늦어진다. 해법: Settings → Pages에서
Custom domain을 **Remove 후 같은 값으로 다시 Save** → 발급이 즉시 재시작되어
수 분 내 완료된다. (이 방법으로 해결했음.)

**진단 명령어**

```sh
# 가비아 네임서버에 직접 질의 (존/레코드 등록 여부 — REFUSED면 존이 없는 것)
dig A seoul-gugak-union.com @ns.gabia.co.kr +noall +answer +comments

# 전파 확인 (구글 DNS 기준)
dig A seoul-gugak-union.com @8.8.8.8 +short

# 현재 서빙되는 인증서 확인 (CN이 seoul-gugak-union.com이어야 정상)
echo | openssl s_client -connect seoul-gugak-union.com:443 -servername seoul-gugak-union.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates

# GitHub Pages 상태 확인 (write 권한으로 조회 가능)
gh api repos/seoulgugakunion/seoulgugakunion_homepage/pages \
  --jq '{status, cname, https_enforced, cert_state: .https_certificate.state}'
```

## 캐시 주의

HTML이 `?v=N` 쿼리로 CSS/JS 캐시를 버스팅한다. 배포 후 변경이 반영 안 된 것처럼
보이면 `?v=N`을 올려서 커밋할 것. 자세한 내용은 [CLAUDE.md](CLAUDE.md) 참고.
