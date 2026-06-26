/* ======================================================================
   common.js — 共享：顶部导航 / 数据存储层 / 工具函数
   平台：装配智建·和美乡村   主题：规范筑基 · 数字提效
   数据策略：优先后端 API（若 backend 在线），否则回退 localStorage。
   ====================================================================== */
(function () {
  "use strict";

  /* ---------------- 导航 ---------------- */
  const NAV = [
    { href: "index.html", label: "指挥中心" },
    { href: "huijian.html", label: "装配慧检AI" },
    { href: "gongdi.html", label: "智慧工地" },
    { href: "liucheng.html", label: "施工流程" },
    { href: "chengguo.html", label: "创新成果" },
    { href: "trace.html", label: "一码溯源" },
  ];

  function currentFile() {
    const p = location.pathname.split("/").pop() || "index.html";
    return p === "" ? "index.html" : p;
  }

  function renderNav() {
    const mount = document.querySelector("[data-nav]");
    if (!mount) return;
    const cur = currentFile();
    mount.innerHTML = `
      <div class="topbar-inner">
        <a class="brand" href="index.html" style="text-decoration:none;color:inherit">
          <span class="logo">装</span>
          <span>
            <b>装配智建 · 和美乡村</b><br>
            <small>规范筑基 · 数字提效</small>
          </span>
        </a>
        <button class="nav-toggle" aria-label="菜单">☰</button>
        <nav class="nav">
          ${NAV.map(n => `<a href="${n.href}" class="${n.href === cur ? "active" : ""}">${n.label}</a>`).join("")}
        </nav>
      </div>`;
    const toggle = mount.querySelector(".nav-toggle");
    const nav = mount.querySelector(".nav");
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  /* ---------------- 工具函数 ---------------- */
  const $ = (id) => document.getElementById(id);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function fmt(n, d = 1) {
    return (n === null || n === undefined || isNaN(n)) ? "" : Number(n).toFixed(d);
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function now() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  function toast(msg) {
    let t = $("globalToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "globalToast"; t.className = "toast";
      document.body.appendChild(t);
    }
    t.innerHTML = `<i class="fa fa-check-circle-o"></i> ${msg}`;
    t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------------- 数据存储层 ---------------- */
  // 检测后端（可选）。
  // - 通过 http(s) 由后端 / 静态服务器打开时：尝试同源 API（window.PLATFORM_API 可覆盖）。
  // - 通过 file:// 直接打开时：纯离线，使用 localStorage。
  const isHttp = location.protocol === "http:" || location.protocol === "https:";
  const API_BASE = (window.PLATFORM_API != null ? window.PLATFORM_API : (isHttp ? "" : null));
  const LS_KEY = "zhuang_records_v1";

  let _onlineCache = null, _onlineAt = 0;
  async function _backendOnline() {
    if (API_BASE == null) return false;
    if (_onlineCache !== null && Date.now() - _onlineAt < 8000) return _onlineCache;
    try {
      const r = await fetch((API_BASE || "") + "/api/health", { method: "GET" });
      _onlineCache = r.ok;
    } catch { _onlineCache = false; }
    _onlineAt = Date.now();
    return _onlineCache;
  }

  function _lsList() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
    catch { return []; }
  }
  function _lsSave(list) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  }

  const Store = {
    async list() {
      if (await _backendOnline()) {
        try {
          const r = await fetch(API_BASE + "/api/records");
          if (r.ok) return await r.json();
        } catch {}
      }
      return _lsList();
    },
    async add(record) {
      record.id = record.id || ("PC-" + Date.now());
      record.uploadTime = record.uploadTime || now();
      if (await _backendOnline()) {
        try {
          const r = await fetch(API_BASE + "/api/records", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(record),
          });
          if (r.ok) return await r.json();
        } catch {}
      }
      const list = _lsList();
      list.push(record);
      _lsSave(list);
      return record;
    },
    async update(id, patch) {
      if (await _backendOnline()) {
        try {
          const r = await fetch(API_BASE + "/api/records/" + encodeURIComponent(id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch),
          });
          if (r.ok) return await r.json();
        } catch {}
      }
      const list = _lsList();
      const idx = list.findIndex((x) => x.id === id);
      if (idx < 0) throw new Error("记录不存在");
      list[idx] = Object.assign({}, list[idx], patch, { updatedAt: now() });
      _lsSave(list);
      return list[idx];
    },
    async remove(id) {
      if (await _backendOnline()) {
        try {
          const r = await fetch(API_BASE + "/api/records/" + encodeURIComponent(id), { method: "DELETE" });
          if (r.ok) return await r.json();
        } catch {}
      }
      const list = _lsList();
      const next = list.filter((x) => x.id !== id);
      _lsSave(next);
      return { ok: true, deleted: list.length - next.length };
    },
    async findByCid(cid) {
      const all = await this.list();
      return all.filter(r =>
        (r.walls && Object.values(r.walls).some(w => (w.cid || "").trim() === cid.trim()))
      );
    },
    async stats() {
      const list = await this.list();
      return {
        total: list.length,
        qualified: list.filter(x => x.status === "合格").length,
        warning: list.filter(x => x.status === "预警").length,
        unqualified: list.filter(x => x.status === "不合格").length,
        list,
      };
    },
    async replaceAll(records) {
      const list = Array.isArray(records) ? records : [];
      _lsSave(list);
      return list;
    },
    // 演示数据：首次访问时注入若干样例记录，便于看板/溯源演示
    async seedIfEmpty() {
      const list = _lsList();
      if (list.length || localStorage.getItem("zhuang_seeded")) return;
      const samples = makeSeed();
      _lsSave(samples);
      localStorage.setItem("zhuang_seeded", "1");
    },
  };

  function makeSeed() {
    const sites = ["和美乡村1号房", "和美乡村2号房", "和美乡村3号房"];
    const types = ["剪力墙1", "剪力墙2", "叠合板", "预制楼梯"];
    const out = [];
    const base = Date.now() - 18 * 36e5;
    for (let i = 0; i < 12; i++) {
      const rate = [98, 96, 94, 92, 88, 100, 99, 95, 76, 91, 97, 85][i];
      const status = rate >= 90 ? "合格" : rate >= 70 ? "预警" : "不合格";
      const mkWall = (n) => ({
        matchSession: sites[i % 3], teamId: "2025" + pad((i % 6) + 1),
        componentType: types[(i + n) % 4], drawingNo: "15G365-" + ((i % 2) + 1),
        cid: `WQ-3F-A${i + 1}-${pad(n)}`, pid: "HMXC-2025-" + pad(i + 1),
        grid: `A / A${i + 1}`,
        steps: { size: { done: true, pass: true }, line: { done: true, pass: true },
                 fix: { done: true, pass: rate >= 80 }, rebar: { done: i % 5 !== 0, pass: rate >= 90 } },
        sleeveTotal: 8, sleeveFailed: rate >= 90 ? 0 : 1,
      });
      out.push({
        id: "PC-" + (base + i * 36e5),
        uploadTime: now(),
        workstationNo: "GW-" + pad(i + 1),
        recorder: ["张工", "李工", "王工"][i % 3],
        crew: "起重工/钢筋工",
        passRate: rate, status,
        walls: { 1: mkWall(1), 2: mkWall(2) },
      });
    }
    return out;
  }

  /* ---------------- 报警声（WebAudio 警笛） ---------------- */
  let sirenCtx = null, sirenOsc = null, sirenTimer = null;
  function startSiren() {
    try {
      if (sirenCtx) return;
      const Actx = window.AudioContext || window.webkitAudioContext;
      sirenCtx = new Actx();
      sirenOsc = sirenCtx.createOscillator();
      const g = sirenCtx.createGain();
      sirenOsc.type = "sine"; g.gain.value = 0.06;
      sirenOsc.connect(g).connect(sirenCtx.destination);
      sirenOsc.start();
      let up = true;
      sirenTimer = setInterval(() => {
        const target = up ? 1000 : 550;
        sirenOsc.frequency.cancelScheduledValues(sirenCtx.currentTime);
        sirenOsc.frequency.setValueAtTime(sirenOsc.frequency.value || 550, sirenCtx.currentTime);
        sirenOsc.frequency.linearRampToValueAtTime(target, sirenCtx.currentTime + 0.5);
        up = !up;
      }, 500);
    } catch (e) {}
  }
  function stopSiren() {
    try {
      if (sirenTimer) { clearInterval(sirenTimer); sirenTimer = null; }
      if (sirenOsc) sirenOsc.stop(0);
      if (sirenCtx) sirenCtx.close();
    } catch (e) {}
    sirenCtx = sirenOsc = null;
  }

  /* ---------------- AI（DeepSeek，经后端代理；key 不出服务端） ---------------- */
  const AI = {
    _enabled: null, _checkedAt: 0,
    async available() {
      if (API_BASE == null) return false; // file:// 纯离线
      if (this._enabled !== null && Date.now() - this._checkedAt < 15000) return this._enabled;
      try {
        const r = await fetch((API_BASE || "") + "/api/ai/health");
        this._enabled = r.ok ? !!(await r.json()).enabled : !!API_BASE;
      }
      catch { this._enabled = !!API_BASE; }
      this._checkedAt = Date.now();
      return this._enabled;
    },
    // messages: [{role:'system'|'user'|'assistant', content}]；失败抛错由调用方回退
    async chat(messages, opts = {}) {
      const r = await fetch((API_BASE || "") + "/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, temperature: opts.temperature, max_tokens: opts.max_tokens }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "AI 请求失败");
      return j.content || "";
    },
    async extractDrawing(text) {
      const r = await fetch((API_BASE || "") + "/api/drawing/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "图纸参数抽取失败");
      return j.params || {};
    },
  };

  /* ---------------- 导出 ---------------- */
  window.Platform = {
    $, $$, fmt, pad, now, toast, Store, AI,
    startSiren, stopSiren, renderNav,
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderNav();
    Store.seedIfEmpty();
  });
})();
