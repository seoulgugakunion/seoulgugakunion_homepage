const rootPath = window.location.pathname.includes("/pages/") ? "../" : "./";
const imagePath = (fileName) => `${rootPath}assets/img/${fileName}`;

const clubs = [
      { name: "경인교육대학교 풍류회", school: "경인교육대학교", logo: imagePath("ginue_logo.png"), isNew: true, instagram: "https://instagram.com/ginue_punglyuhoe", youtube: "https://youtube.com/@ginue_punglyuhoe" },
      { name: "고려대학교 국악연구회", school: "고려대학교", logo: imagePath("korea_logo.png"), isNew: false, instagram: "https://www.instagram.com/kukookyeon/", youtube: "https://www.youtube.com/@%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EA%B5%90%EA%B5%AD%EC%95%85%EC%97%B0%EA%B5%AC%ED%9A%8C" },
      { name: "서울대학교 여민락", school: "서울대학교", logo: imagePath("snu_logo.png"), isNew: true, instagram: "https://instagram.com/snu_yeominrak", youtube: "https://youtube.com/@서울대학교국악동아리" },
      { name: "성균관대학교 대동악회 다스름", school: "성균관대학교", logo: imagePath("skku_logo.png"), isNew: false, instagram: "https://www.instagram.com/skku_gugak/", youtube: "https://www.youtube.com/@skku_gugak" },
      { name: "숭실대학교 젓대잽이", school: "숭실대학교", logo: imagePath("ssu_logo.png"), isNew: true, instagram: "https://instagram.com/ssu_jdje", youtube: "https://youtube.com/@ssu_jdje" },
      { name: "연세대학교 연세국악연구회", school: "연세대학교", logo: imagePath("yonsei_logo.png"), isNew: false, instagram: "https://www.instagram.com/gugak_yonguk/", youtube: "https://www.youtube.com/@yonsei_gugak" },
      { name: "이화여자대학교 닐리리화", school: "이화여자대학교", logo: imagePath("ewha_logo_wo_bg.png"), isNew: false, instagram: "https://www.instagram.com/lilyewha_official/", youtube: "https://www.youtube.com/@lilyewha7017" },
      { name: "한국외국어대학교 얼소리", school: "한국외국어대학교", logo: imagePath("hufs_logo_wo_bg.png"), isNew: true, instagram: "https://instagram.com/hufs_eolsori", youtube: "https://youtube.com/@한국외대얼소리" }
    ];

    const parts = [
      { name: "가야금", en: "Gayageum", icon: "music_note", leader: "김서연", status: "신입 3명 모집", members: ["이준호", "박지민", "최수아", "정현우", "강민지", "윤도현"], repertoire: "침향무, 도라지 변주곡" },
      { name: "거문고", en: "Geomungo", icon: "graphic_eq", leader: "오민재", status: "상시 상담 가능", members: ["한유진", "배성우", "문채린", "서지훈"], repertoire: "수연장지곡, 출강" },
      { name: "대금", en: "Daegeum", icon: "waves", leader: "장하늘", status: "신입 2명 모집", members: ["김태오", "윤세아", "백준서", "임가은", "노현"], repertoire: "청성곡, 평조회상" },
      { name: "아쟁", en: "Ajaeng", icon: "horizontal_rule", leader: "신다온", status: "경험자 우대", members: ["정유민", "강태림", "이건"], repertoire: "산조 합주, 남도굿거리" },
      { name: "피리", en: "Piri", icon: "straight", leader: "박은호", status: "기초반 운영", members: ["고수빈", "최민규", "홍예린", "유재현"], repertoire: "상령산, 염양춘" },
      { name: "타악", en: "Percussion", icon: "radio_button_checked", leader: "류지완", status: "신입 4명 모집", members: ["권도윤", "이소담", "차민성", "남지아", "문성호"], repertoire: "삼도설장구, 판굿" },
      { name: "해금", en: "Haegeum", icon: "music_video", leader: "서아린", status: "상시 상담 가능", members: ["조하윤", "김민석", "이유나", "박하람", "안재원", "최라희"], repertoire: "지영희류 산조, 적념" }
    ];

    const news = {
      concert: { title: "정기 공연 안내", body: "2026년 8월 22일 토요일 오후 5시, 서울 시민청 바스락홀에서 여름 정기 공연을 엽니다. 좌석 예약은 문의 폼으로 이름, 연락처, 희망 매수를 보내면 운영진이 확인 후 회신합니다." },
      join: { title: "신규 동아리 모집", body: "서울 소재 대학 국악 동아리는 연중 가입 상담이 가능합니다. 활동 악기, 대표 연락처, 최근 공연 또는 연습 이력을 문의 폼에 남겨 주세요. 운영진 검토 후 합동 연습 일정과 회칙을 안내합니다." },
      archive: { title: "국악 아카이브", body: "공연 영상, 파트별 연습 음원, 악보 링크는 참여 동아리 확인 후 공유됩니다. 자료 접근 신청은 소속 동아리와 필요한 자료 범위를 적어 문의해 주세요." }
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const modalBackdrop = $("#modalBackdrop");
    const modalTitle = $("#modalTitle");
    const modalBody = $("#modalBody");
    const toast = $("#toast");

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
      clearTimeout(showToast.timer);
      showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
    }

    function closeMobile() {
      const panel = $("#mobilePanel");
      const toggle = $(".mobile-toggle");
      if (!panel || !toggle) return;
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      $(".mobile-toggle .material-symbols-outlined").textContent = "menu";
    }

    function openModal(type, payload) {
      document.body.classList.add("locked");
      modalBackdrop.classList.add("open");
      if (type === "contact") renderContactForm(payload);
      if (type === "privacy") renderPrivacy();
      if (type === "news") renderNews(payload);
      $("#modalClose").focus();
    }

    function closeModal() {
      modalBackdrop.classList.remove("open");
      document.body.classList.remove("locked");
    }

    function renderNews(key) {
      modalTitle.textContent = news[key].title;
      modalBody.innerHTML = `
        <p>${news[key].body}</p>
        <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap">
          <button class="primary-btn" data-open-modal="contact"><span class="material-symbols-outlined">mail</span>문의하기</button>
          <button class="secondary-btn" id="newsClose">닫기</button>
        </div>`;
      $("#newsClose").addEventListener("click", closeModal);
    }

    function renderPrivacy() {
      modalTitle.textContent = "개인정보 처리 안내";
      modalBody.innerHTML = `
        <p>문의 폼에 입력한 이름, 이메일, 전화번호, 소속, 메시지는 답변과 운영 안내 목적으로만 브라우저의 로컬 저장소에 임시 보관됩니다.</p>
        <p style="margin-top:12px">실제 서버 연동 전까지 외부 전송은 발생하지 않습니다. 사용자는 브라우저 저장소를 삭제하거나 문의 제출 후 표시되는 접수 내역을 확인할 수 있습니다.</p>
        <div style="margin-top:22px"><button class="secondary-btn" id="privacyClose">확인</button></div>`;
      $("#privacyClose").addEventListener("click", closeModal);
    }

    function renderContactForm(prefill = {}) {
      modalTitle.textContent = "문의하기";
      modalBody.innerHTML = `
        <form id="contactForm" novalidate>
          <div class="form-grid">
            <div class="field">
              <label for="name">이름</label>
              <input id="name" name="name" autocomplete="name" value="${prefill.name || ""}">
              <div class="error-text" data-error-for="name"></div>
            </div>
            <div class="field">
              <label for="email">이메일</label>
              <input id="email" name="email" type="email" autocomplete="email" value="${prefill.email || ""}">
              <div class="error-text" data-error-for="email"></div>
            </div>
            <div class="field">
              <label for="phone">전화번호</label>
              <input id="phone" name="phone" inputmode="tel" placeholder="010-1234-5678" value="${prefill.phone || ""}">
              <div class="error-text" data-error-for="phone"></div>
            </div>
            <div class="field">
              <label for="topic">문의 유형</label>
              <select id="topic" name="topic">
                <option value="">선택</option>
                <option ${prefill.topic === "공연 예약" ? "selected" : ""}>공연 예약</option>
                <option ${prefill.topic === "동아리 가입" ? "selected" : ""}>동아리 가입</option>
                <option ${prefill.topic === "파트 상담" ? "selected" : ""}>파트 상담</option>
                <option ${prefill.topic === "자료 요청" ? "selected" : ""}>자료 요청</option>
              </select>
              <div class="error-text" data-error-for="topic"></div>
            </div>
            <div class="field full">
              <label for="message">내용</label>
              <textarea id="message" name="message" placeholder="소속, 문의 목적, 가능한 연락 시간을 함께 적어 주세요.">${prefill.message || ""}</textarea>
              <div class="error-text" data-error-for="message"></div>
            </div>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
            <button class="primary-btn" type="submit"><span class="material-symbols-outlined">send</span>제출</button>
            <button class="secondary-btn" type="button" id="fillSample">예시 입력</button>
          </div>
          <div class="success-box" id="formSuccess"></div>
        </form>`;
      $("#fillSample").addEventListener("click", () => {
        $("#name").value = "이연우";
        $("#email").value = "yeonwoo@example.com";
        $("#phone").value = "010-2345-6789";
        $("#topic").value = "동아리 가입";
        $("#message").value = "서울 소재 대학 국악 동아리 대표입니다. 연합 가입 절차와 다음 합동 연습 일정을 알고 싶습니다.";
      });
      $("#contactForm").addEventListener("submit", handleContactSubmit);
    }

    function handleContactSubmit(event) {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      const errors = {};
      if (!data.name.trim()) errors.name = "이름을 입력해 주세요.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "올바른 이메일을 입력해 주세요.";
      if (!/^010-\d{4}-\d{4}$/.test(data.phone)) errors.phone = "010-0000-0000 형식으로 입력해 주세요.";
      if (!data.topic) errors.topic = "문의 유형을 선택해 주세요.";
      if (data.message.trim().length < 10) errors.message = "내용을 10자 이상 입력해 주세요.";
      $$(".error-text", form).forEach(el => el.textContent = "");
      Object.entries(errors).forEach(([key, value]) => $(`[data-error-for="${key}"]`, form).textContent = value);
      if (Object.keys(errors).length) {
        showToast("입력값을 확인해 주세요.");
        return;
      }
      const submissions = JSON.parse(localStorage.getItem("sgu-contact") || "[]");
      const saved = { ...data, submittedAt: new Date().toISOString() };
      submissions.push(saved);
      localStorage.setItem("sgu-contact", JSON.stringify(submissions));
      $("#formSuccess").style.display = "block";
      $("#formSuccess").textContent = `${data.name} 님의 ${data.topic} 문의가 접수되었습니다. 입력한 이메일 ${data.email}로 회신 예정입니다.`;
      form.reset();
      showToast("문의가 접수되었습니다.");
    }

    function renderClubs() {
      const query = $("#clubSearch").value.trim().toLowerCase();
      const filter = $("#clubFilter").value;
      const list = $("#clubList");
      const filtered = clubs.filter(club => {
        const haystack = `${club.name} ${club.school}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        const matchesFilter =
          filter === "all" ||
          (filter === "new" && club.isNew) ||
          (filter === "instagram" && club.instagram) ||
          (filter === "youtube" && club.youtube);
        return matchesQuery && matchesFilter;
      });
      list.innerHTML = filtered.map(club => `
        <article class="card club-card">
          <div class="club-head">
            <img class="club-logo" src="${club.logo}" alt="${club.school} 로고" loading="lazy">
            <div>
              <h3>${club.name}${club.isNew ? '<span class="badge">New</span>' : ""}</h3>
            </div>
          </div>
          <div class="club-actions">
            ${club.instagram ? `<a class="secondary-btn" href="${club.instagram}" target="_blank" rel="noreferrer"><span class="sr-only">Instagram</span><svg class="brand-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"></circle></svg>Instagram</a>` : ""}
            ${club.youtube ? `<a class="secondary-btn" href="${club.youtube}" target="_blank" rel="noreferrer"><span class="sr-only">YouTube</span><span class="youtube-icon" aria-hidden="true"></span>YouTube</a>` : ""}
            <button class="secondary-btn" data-club-contact="${club.name}"><span class="material-symbols-outlined">mail</span>문의</button>
          </div>
        </article>`).join("");
      $("#clubEmpty").style.display = filtered.length ? "none" : "block";
    }

    function renderParts() {
      $("#partGrid").innerHTML = parts.map(part => `
        <a class="card part-card" href="part-detail.html?part=${encodeURIComponent(part.name)}">
          <span class="material-symbols-outlined watermark">${part.icon}</span>
          <div>
            <h3>${part.name}</h3>
            <p>${part.en}</p>
          </div>
          <span class="secondary-btn" style="width:max-content"><span class="material-symbols-outlined">arrow_forward</span>상세</span>
        </a>`).join("");
    }

    function renderPartDetail(name) {
      const part = parts.find(item => item.name === name);
      const detail = $("#partDetailRoot");
      if (!detail) return;
      if (!part) {
        detail.innerHTML = `
          <a class="secondary-btn" href="parts.html"><span class="material-symbols-outlined">arrow_back</span>파트 목록</a>
          <h1 style="margin-top:22px">파트를 찾을 수 없습니다</h1>
          <p class="lead" style="margin-left:0">파트 목록에서 다시 선택해 주세요.</p>`;
        return;
      }
      document.title = `${part.name} 파트 - 서울 국악 동아리 연합`;
      detail.innerHTML = `
        <a class="secondary-btn" href="parts.html"><span class="material-symbols-outlined">arrow_back</span>파트 목록</a>
        <h2 style="margin-top:22px">${part.name}</h2>
        <div class="detail-grid" style="margin-top:24px">
          <div class="card">
            <span class="eyebrow">파트장</span>
            <h3>${part.leader}</h3>
            <p style="margin-top:8px">${part.status}</p>
            <button class="primary-btn" style="margin-top:18px" data-part-contact="${part.name}"><span class="material-symbols-outlined">mail</span>상담 문의</button>
          </div>
          <div class="card">
            <span class="eyebrow">파트원</span>
            <ul class="member-list">${part.members.map(member => `<li>${member}</li>`).join("")}</ul>
            <p style="margin-top:22px"><strong>연습 곡목:</strong> ${part.repertoire}</p>
          </div>
        </div>`;
    }

    document.addEventListener("click", event => {
      const link = event.target.closest("[data-link]");
      if (link) {
        event.preventDefault();
        window.location.href = link.dataset.link;
      }
      const modalTrigger = event.target.closest("[data-open-modal]");
      if (modalTrigger) {
        event.preventDefault();
        openModal(modalTrigger.dataset.openModal);
      }
      const newsTrigger = event.target.closest("[data-news]");
      if (newsTrigger) openModal("news", newsTrigger.dataset.news);
      const clubContact = event.target.closest("[data-club-contact]");
      if (clubContact) openModal("contact", { topic: "동아리 가입", message: `${clubContact.dataset.clubContact} 관련 문의입니다. ` });
      const partContact = event.target.closest("[data-part-contact]");
      if (partContact) openModal("contact", { topic: "파트 상담", message: `${partContact.dataset.partContact} 파트 상담을 요청합니다. ` });
    });

    if ($(".mobile-toggle")) {
      $(".mobile-toggle").addEventListener("click", event => {
        const panel = $("#mobilePanel");
        const open = !panel.classList.contains("open");
        panel.classList.toggle("open", open);
        event.currentTarget.setAttribute("aria-expanded", String(open));
        $(".mobile-toggle .material-symbols-outlined").textContent = open ? "close" : "menu";
      });
    }
    $("#modalClose").addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && modalBackdrop.classList.contains("open")) closeModal(); });
    if ($("#clubSearch") && $("#clubFilter")) {
      $("#clubSearch").addEventListener("input", renderClubs);
      $("#clubFilter").addEventListener("change", renderClubs);
      renderClubs();
    }
    if ($("#partGrid")) renderParts();
    if ($("#partDetailRoot")) {
      const params = new URLSearchParams(window.location.search);
      renderPartDetail(params.get("part") || "");
    }
