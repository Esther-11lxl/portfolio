/* ============ 渲染逻辑（一般不需要改这个文件） ============ */

const $ = (sel) => document.querySelector(sel);
const esc = (s = "") => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* 导航 */
function renderNav() {
  $("#nav-list").innerHTML = SITE.nav
    .map((n) => `<li><a href="#${n.id}" data-id="${n.id}">${esc(n.label)}</a></li>`)
    .join("");
}

/* 首页 */
function renderHome() {
  const h = SITE.home;
  return `
  <section id="home">
    <p class="home-greet">${esc(h.greeting)}</p>
    <h1 class="home-tagline">${h.tagline.replace(/(AI|数据|用户)/g, "<em>$1</em>")}</h1>
    <p class="home-subline">${esc(h.subline)}</p>
    <div class="stats">
      ${h.stats.map((s) => `<div class="stat-card"><div class="stat-num">${esc(s.num)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join("")}
    </div>
    <div class="home-cta"><a class="btn" href="#projects">${esc(h.ctaText)}</a></div>
  </section>`;
}

/* 关于我 */
function renderAbout() {
  const a = SITE.about;
  return `
  <section id="about">
    <p class="sec-label">About Me</p>
    <h2 class="sec-title">关于我</h2>
    <div class="about-grid">
      <div class="about-photo"><img src="${a.photo}" alt="个人照片" onerror="this.style.display='none'"></div>
      <div>
        <div class="about-name">${esc(a.name)}</div>
        <ul class="info-list">
          ${a.basicInfo.map((i) => `<li><span class="k">${esc(i.k)}</span><span>${esc(i.v)}</span></li>`).join("")}
        </ul>
        ${a.education.items.map((e) => `
          <div class="edu-card">
            <div class="sec-label">${esc(a.education.title)}</div>
            <div class="edu-time">${esc(e.time)}</div>
            <div class="edu-school">${esc(e.school)}</div>
            <div class="edu-detail">${esc(e.detail)}</div>
          </div>`).join("")}
        <p class="about-intro">${esc(a.intro)}</p>
        <div class="tags">${a.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </div>
  </section>`;
}

/* 项目 */
function renderProjects() {
  return `
  <section id="projects">
    <p class="sec-label">Projects</p>
    <h2 class="sec-title">核心项目</h2>
    ${SITE.projects.map((p) => `
      <div class="project" id="${p.id}">
        <div class="project-head">
          <span class="project-no">${esc(p.no)}</span>
          <h3 class="project-title">${esc(p.title)}</h3>
        </div>
        <p class="project-meta">${esc(p.org)} ｜ ${esc(p.time)}</p>
        <p class="project-desc">${esc(p.desc)}</p>
        <ul class="hl-list">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        <div class="img-grid">
          ${p.images.map((img) => img.src
            ? `<div class="img-item">${img.link ? `<a href="${esc(img.link)}" target="_blank" rel="noopener" title="点击在线观看">` : ""}<img src="${img.src}" alt="${esc(img.caption)}" loading="lazy">${img.link ? "</a>" : ""}<div class="img-caption">${esc(img.caption)}${img.link ? ` · <a href="${esc(img.link)}" target="_blank" rel="noopener" class="img-link">▶ 在线观看</a>` : ""}</div></div>`
            : img.link
            ? `<div class="img-item"><a class="link-card" href="${esc(img.link)}" target="_blank" rel="noopener"><span class="link-icon">▶</span><span class="link-text">${esc(img.caption)}</span><span class="link-hint">点击打开观看</span></a></div>`
            : `<div class="img-item"><div class="placeholder">📷 ${esc(img.caption)}</div><div class="img-caption">${esc(img.caption)}</div></div>`
          ).join("")}
        </div>
      </div>`).join("")}
  </section>`;
}

/* 技能 */
function renderSkills() {
  return `
  <section id="skills">
    <p class="sec-label">Skills</p>
    <h2 class="sec-title">技能</h2>
    <div class="skills-grid">
      ${SITE.skills.groups.map((g) => `
        <div class="skill-card">
          <div class="skill-icon">${g.icon}</div>
          <div class="skill-name">${esc(g.name)}</div>
          <div class="skill-tags">${g.items.map((i) => `<span>${esc(i)}</span>`).join("")}</div>
        </div>`).join("")}
    </div>
  </section>`;
}

/* 联系 */
function renderContact() {
  const c = SITE.contact;
  return `
  <section id="contact">
    <p class="sec-label">Contact</p>
    <h2 class="sec-title">${esc(c.title)}</h2>
    <p class="project-desc" style="margin:0 auto;">${esc(c.desc)}</p>
    <div class="contact-cards">
      ${c.items.map((i) => `<div class="contact-card"><div class="contact-label">${i.icon} ${esc(i.label)}</div><div class="contact-value">${esc(i.value)}</div></div>`).join("")}
    </div>
  </section>`;
}

/* 初始化 */
renderNav();
$("#app").innerHTML = renderHome() + renderAbout() + renderProjects() + renderSkills() + renderContact();

/* 导航高亮 */
const sections = SITE.nav.map((n) => document.getElementById(n.id));
window.addEventListener("scroll", () => {
  let cur = SITE.nav[0].id;
  sections.forEach((s) => { if (s && window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll("#nav-list a").forEach((a) => a.classList.toggle("active", a.dataset.id === cur));
});
