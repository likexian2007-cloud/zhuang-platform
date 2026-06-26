/* ======================================================================
   app.js — 单页应用外壳（指挥中心头部 + 模块导航 + 路由）
   模块通过 window.MODULES 注册；本文件负责渲染外壳、构建导航、
   懒加载并缓存各模块 DOM，切换时仅 显示/隐藏 + 淡入，无整页刷新。
   ====================================================================== */
(function () {
  "use strict";
  const { $, pad, toast } = window.Platform;
  const MODULES = window.MODULES || [];
  const view = document.getElementById("view");
  const cache = {};
  let current = null;

  const ACCESS_HASH = "ae27b5d6f9a09319d15ffb48a9674f76a07bdfd48b5b38addd3a832808ceceac";
  const ACCESS_MARK = "ip-protected-v1";
  const COPYRIGHT_OWNER = "装配智建·和美乡村项目组";
  async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  function buildProtectionLayer() {
    if (document.getElementById("copyrightWatermark")) return;
    const mark = document.createElement("div");
    mark.id = "copyrightWatermark";
    mark.className = "copyright-watermark";
    mark.innerHTML = `<span>${COPYRIGHT_OWNER}</span><span>内部演示资料 · 未经授权禁止复制传播</span>`;
    document.body.appendChild(mark);

    const notice = () => toast("已启用版权保护：禁止未授权复制、截图传播或二次商用");
    document.addEventListener("contextmenu", (e) => { e.preventDefault(); notice(); });
    document.addEventListener("dragstart", (e) => e.preventDefault());
    document.addEventListener("copy", (e) => {
      e.clipboardData.setData("text/plain", `${COPYRIGHT_OWNER} 版权所有。未经授权禁止复制传播。`);
      e.preventDefault();
      notice();
    });
    document.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["s", "u", "p"].includes(k)) {
        e.preventDefault();
        notice();
      }
    });
  }

  function buildLoginGate() {
    buildProtectionLayer();
    if (sessionStorage.getItem("zhuang_access_ok") === ACCESS_MARK || localStorage.getItem("zhuang_login_ok") === ACCESS_MARK) return;
    const gate = document.createElement("div");
    gate.className = "login-gate";
    gate.innerHTML = `
      <div class="login-card">
        <div class="login-brand"><img src="assets/logo.svg" alt=""><div><b>装配智建智慧管理平台</b><span>和美乡村 · 版权保护访问</span></div></div>
        <div class="login-tabs"><button class="on">授权访问</button><button>版权声明</button></div>
        <label>项目访问码<input id="loginPass" type="password" autocomplete="current-password" placeholder="请输入项目组授权访问码"></label>
        <button id="loginEnter" class="btn btn-cyan" style="width:100%;margin-top:8px"><i class="fa fa-shield"></i> 验证并进入平台</button>
        <div class="security-note">本平台为原创竞赛作品与项目资料展示系统，已启用访问控制、水印标记、防复制提示和接口安全策略。未经授权禁止下载、复刻、商用或二次传播。</div>
      </div>`;
    document.body.appendChild(gate);
    const enter = async () => {
      const p = $("loginPass").value.trim();
      if (await sha256(p) === ACCESS_HASH) {
        sessionStorage.setItem("zhuang_access_ok", ACCESS_MARK);
        localStorage.setItem("zhuang_login_ok", ACCESS_MARK);
        gate.remove();
        toast("授权验证通过，版权保护系统已启用");
      } else {
        alert("访问码错误，请联系项目组获取授权。");
      }
    };
    $("loginEnter").addEventListener("click", enter);
    $("loginPass").addEventListener("keydown", (e) => { if (e.key === "Enter") enter(); });
  }

  /* ---------------- 指挥中心头部 ---------------- */
  function buildHeader() {
    const head = document.getElementById("ccHead");
    const navChips = MODULES.map(
      (m) => `<a class="modchip" data-go="${m.id}"><i class="fa ${m.icon}"></i> ${m.label}</a>`
    ).join("");
    head.innerHTML = `
      <div class="cc-row cc-top">
        <div class="cc-brand">
          <img class="lg" src="assets/logo.svg" alt="装配智建" width="40" height="40" />
          <span><b>装配智建 · 和美乡村</b><small>PREFAB RURAL HOUSING · DIGITAL COMMAND CENTER</small></span>
        </div>
        <div class="cc-user">
          <span class="badge green"><span class="dot green"></span> 系统在线</span>
          <span id="ccClock">--:--:--</span>
          <span class="av">管</span>
          <span>项目管理中心管理员 ▾</span>
        </div>
      </div>
      <div class="cc-row cc-status">
        <span class="lead">数字孪生协同：装配慧检 / 超差报警 / 图纸AI核对 / 人员协同 / 一码溯源</span>
        <span style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <span class="cc-pill">当前模式：<b id="modeText">标准施工模式</b></span>
          <span class="cc-pill">协同系统：<b style="color:#6ee7b7">在线</b></span>
          <span class="cc-pill">数据接入率：<b>98.6%</b></span>
          <span class="cc-pill">预警闭环率：<b>100%</b></span>
          <button class="cc-btn yellow" id="btnMode">模式切换</button>
          <button class="cc-btn" id="btnLow">低负载模式</button>
        </span>
      </div>
      <div class="cc-green">
        <div class="cc-row">
          <span class="gbadge"><i class="fa fa-circle"></i> 运行状态：<span id="runState">标准施工模式</span></span>
          <span class="gbadge"><i class="fa fa-database"></i> 全域数据在线</span>
          <span class="gbadge"><i class="fa fa-th"></i> 模块可点击切换</span>
          <span class="gbadge"><i class="fa fa-refresh"></i> 记录/上传/核对/溯源联动正常</span>
          <span class="gbadge"><i class="fa fa-building"></i> 项目：和美乡村3号房 1/2号剪力墙</span>
          <span class="gbadge" style="margin-left:auto"><i class="fa fa-shield"></i> 关键复核：尺寸 / 钢筋 / 套筒 / 垂直度</span>
        </div>
      </div>
      <div class="cc-modnav">
        <div class="cc-row" id="navChips">${navChips}</div>
      </div>`;

    // 时钟
    function tick() { const d = new Date(); const e = $("ccClock"); if (e) e.textContent = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; }
    setInterval(tick, 1000); tick();

    // 模式切换
    const MODES = ["标准施工模式", "赛前冲刺模式", "日常节能模式"];
    let mi = 0;
    $("btnMode").addEventListener("click", () => { mi = (mi + 1) % MODES.length; $("modeText").textContent = MODES[mi]; $("runState").textContent = MODES[mi]; toast("已切换至「" + MODES[mi] + "」"); });

    // 低负载
    let low = false;
    $("btnLow").addEventListener("click", () => { low = !low; document.body.classList.toggle("low-power", low); $("btnLow").textContent = low ? "恢复动效" : "低负载模式"; toast(low ? "已进入低负载模式" : "已恢复动效"); });
  }

  /* ---------------- 路由 ---------------- */
  function go(id) {
    const m = MODULES.find((x) => x.id === id) || MODULES[0];
    if (!m) return;
    if (!cache[m.id]) {
      const sec = document.createElement("section");
      sec.className = "view-section";
      sec.dataset.id = m.id;
      view.appendChild(sec);
      try { m.render(sec); } catch (e) { sec.innerHTML = '<div class="card">模块加载失败：' + e.message + "</div>"; console.error(e); }
      cache[m.id] = { sec, mod: m };
    }
    Object.values(cache).forEach((c) => { c.sec.classList.remove("active"); c.sec.style.display = "none"; });
    const entry = cache[m.id];
    entry.sec.style.display = "block";
    void entry.sec.offsetWidth; // 强制回流，保证过渡动画在任意环境下生效
    entry.sec.classList.add("active");
    if (entry.mod.onShow) { try { entry.mod.onShow(entry.sec); } catch (e) { console.error(e); } }
    // 高亮导航
    document.querySelectorAll("[data-go]").forEach((a) => a.classList.toggle("on", a.dataset.go === m.id));
    const query = location.search || "";
    if (location.hash.split("?")[0] !== "#" + m.id) history.replaceState(null, "", query + "#" + m.id);
    current = m.id;
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  window.AppGo = go;

  // 委托点击
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-go]");
    if (a) { e.preventDefault(); go(a.dataset.go); }
  });
  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "").split("?")[0];
    if (id && id !== current) go(id);
  });

  /* ---------------- 启动 ---------------- */
    buildHeader();
  buildLoginGate();
  const initial = location.hash.replace("#", "").split("?")[0] || (MODULES[0] && MODULES[0].id);
  // 先确保演示数据就绪，再渲染首屏
  Promise.resolve(window.Platform.Store.seedIfEmpty()).finally(() => go(initial));
})();
