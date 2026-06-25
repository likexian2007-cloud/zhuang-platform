/* ======================================================================
   装配智建·和美乡村 平台 — 轻量后端（零依赖，纯 Node 内置模块）
   功能：1) 托管前端静态页面  2) 提供质量监测记录的存取 API
   存储：backend/data/records.json （跨设备/跨浏览器持久化）
   启动：node backend/server.js   （默认 http://localhost:8080）
   ====================================================================== */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 8080;
const ROOT = path.join(__dirname, "..");            // 前端根目录（zhuang/）
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "records.json");

/* ---- AI 配置（key 仅存服务端，已 .gitignore，不随前端/仓库泄露） ---- */
const AI_CONFIG_FILE = path.join(__dirname, "ai-config.json");
let AI_CFG = { deepseekApiKey: "", baseUrl: "https://api.deepseek.com", model: "deepseek-chat" };
try {
  if (fs.existsSync(AI_CONFIG_FILE)) AI_CFG = Object.assign(AI_CFG, JSON.parse(fs.readFileSync(AI_CONFIG_FILE, "utf8")));
} catch (e) { console.warn("ai-config.json 读取失败：", e.message); }
if (process.env.DEEPSEEK_API_KEY) AI_CFG.deepseekApiKey = process.env.DEEPSEEK_API_KEY;
const AI_ENABLED = !!AI_CFG.deepseekApiKey;

/* 调用 DeepSeek（OpenAI 兼容 /chat/completions），返回 assistant 文本 */
function callDeepSeek(messages, opts = {}) {
  return new Promise((resolve, reject) => {
    if (!AI_ENABLED) return reject(new Error("AI 未配置 API Key"));
    const host = AI_CFG.baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const payload = JSON.stringify({
      model: opts.model || AI_CFG.model,
      messages,
      temperature: opts.temperature != null ? opts.temperature : 0.6,
      max_tokens: opts.max_tokens || 800,
      stream: false,
    });
    const req = https.request(
      { hostname: host, path: "/chat/completions", method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + AI_CFG.deepseekApiKey, "Content-Length": Buffer.byteLength(payload) }, timeout: 45000 },
      (r) => {
        let data = ""; r.on("data", (c) => (data += c));
        r.on("end", () => {
          try { const j = JSON.parse(data); if (j.error) return reject(new Error(j.error.message || "AI 接口错误")); resolve(j.choices && j.choices[0] && j.choices[0].message ? j.choices[0].message.content : ""); }
          catch (e) { reject(new Error("AI 响应解析失败")); }
        });
      }
    );
    req.on("timeout", () => { req.destroy(new Error("AI 请求超时")); });
    req.on("error", reject);
    req.write(payload); req.end();
  });
}

function safeJsonParse(text, fallback) {
  try { return JSON.parse(text); } catch { return fallback; }
}

function extractJsonObject(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  return safeJsonParse(raw.slice(start, end + 1), null);
}

function normalizeDrawingParams(obj) {
  const src = obj && typeof obj === "object" ? obj : {};
  const num = (v) => {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(String(v).replace(/[^\d.+-]/g, ""));
    return Number.isFinite(n) ? n : null;
  };
  const str = (v) => (v === null || v === undefined ? "" : String(v).trim());
  const steel = str(src.steel || src.steelSpec || src["钢筋规格"]);
  let ring = num(src.ring || src.ringHeight || src["吊环高度"]);
  let hRangeLimit = num(src.hRangeLimit || src["高度极差允许值"]) || 4;
  if (!ring && hRangeLimit > 50) {
    ring = hRangeLimit;
    hRangeLimit = 4;
  }
  return {
    drawingNo: str(src.drawingNo || src.drawing_no || src["图纸编号"]),
    componentType: str(src.componentType || src.component_type || src["构件类型"]),
    thickness: num(src.thickness || src["厚度"]),
    exposed: num(src.exposed || src.exposedLength || src["钢筋外露长度"] || src["外露长度"]),
    steel: steel && /^\d{2}$/.test(steel) ? "Φ" + steel : steel.replace(/\s+/g, ""),
    sleeve: num(src.sleeve || src.sleeveTotal || src["套筒数量"] || src["灌浆套筒"]),
    ring,
    diagonalLimit: num(src.diagonalLimit || src["对角线允许差"]) || 3,
    hRangeLimit,
    wRangeLimit: num(src.wRangeLimit || src["宽度极差允许值"]) || 4,
    sourceSummary: str(src.sourceSummary || src.summary || src["识别依据"]),
  };
}

function localExtractDrawing(text) {
  const raw = String(text || "");
  const pickNum = (patterns) => {
    for (const p of patterns) {
      const m = raw.match(p);
      if (m) return Number(m[1]);
    }
    return null;
  };
  const drawingNo = (raw.match(/(15G365-\d|20G367-\d|[A-Z0-9]+[-_][A-Z0-9-]+)/i) || [,""])[1];
  const steelMatch = raw.match(/(?:钢筋|规格)[^\n\rΦ]*?(Φ\s*\d{2})/i) || raw.match(/(Φ\s*\d{2})/i);
  return normalizeDrawingParams({
    drawingNo,
    componentType: raw.includes("剪力墙") ? "剪力墙" : "",
    thickness: pickNum([/厚度[^\d]{0,8}(\d+(?:\.\d+)?)/, /墙厚[^\d]{0,8}(\d+(?:\.\d+)?)/]),
    exposed: pickNum([/外露(?:长度)?[^\d]{0,8}(\d+(?:\.\d+)?)/, /伸出(?:长度)?[^\d]{0,8}(\d+(?:\.\d+)?)/]),
    steel: steelMatch ? steelMatch[1] : "",
    sleeve: pickNum([/套筒[^\d]{0,8}(\d+)/, /灌浆套筒[^\d]{0,8}(\d+)/]),
    ring: pickNum([/吊环(?:高度)?[^\d]{0,8}(\d+(?:\.\d+)?)/]),
    sourceSummary: "DeepSeek 不可用时由本地规则抽取，请人工复核关键值。",
  });
}

async function extractDrawingWithAI(text) {
  if (!AI_ENABLED) throw new Error("AI 未配置 API Key");
  const messages = [
    {
      role: "system",
      content: "你是装配式混凝土构件图纸参数抽取助手。请只输出 JSON，不要解释。字段：drawingNo, componentType, thickness, exposed, steel, sleeve, ring, diagonalLimit, hRangeLimit, wRangeLimit, sourceSummary。数值单位统一为 mm 或数量；未知字段用 null 或空字符串。",
    },
    {
      role: "user",
      content: "请从以下图纸/OCR文字中抽取设计参数：\n" + String(text || "").slice(0, 12000),
    },
  ];
  const reply = await callDeepSeek(messages, { temperature: 0.1, max_tokens: 600 });
  const parsed = extractJsonObject(reply);
  if (!parsed) throw new Error("AI 未返回有效 JSON");
  return normalizeDrawingParams(parsed);
}

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");

/* 首次运行（数据为空）注入演示记录，便于质量看板 / 一码溯源展示 */
function seedDemo() {
  try {
    const cur = JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]");
    if (cur.length) return;
  } catch { /* fallthrough */ }
  const pad = (n) => String(n).padStart(2, "0");
  const sites = ["和美乡村1号房", "和美乡村2号房", "和美乡村3号房"];
  const types = ["剪力墙1", "剪力墙2", "叠合板", "预制楼梯"];
  const rates = [98, 96, 94, 92, 88, 100, 99, 95, 76, 91, 97, 85];
  const base = Date.now() - 18 * 36e5;
  const out = rates.map((rate, i) => {
    const status = rate >= 90 ? "合格" : rate >= 70 ? "预警" : "不合格";
    const mkWall = (n) => ({
      matchSession: sites[i % 3], teamId: "2025" + pad((i % 6) + 1),
      componentType: types[(i + n) % 4], drawingNo: "15G365-" + ((i % 2) + 1),
      cid: `WQ-3F-A${i + 1}-${pad(n)}`, pid: "HMXC-2025-" + pad(i + 1), grid: `A / A${i + 1}`,
      steps: { size: { done: true, pass: true }, line: { done: true, pass: true },
               fix: { done: true, pass: rate >= 80 }, rebar: { done: i % 5 !== 0, pass: rate >= 90 } },
      sleeveTotal: 8, sleeveFailed: rate >= 90 ? 0 : 1,
    });
    return {
      id: "PC-" + (base + i * 36e5), uploadTime: new Date(base + i * 36e5).toLocaleString("zh-CN"),
      workstationNo: "GW-" + pad(i + 1), recorder: ["张工", "李工", "王工"][i % 3], crew: "起重工/钢筋工",
      passRate: rate, status, walls: { 1: mkWall(1), 2: mkWall(2) },
    };
  });
  fs.writeFileSync(DATA_FILE, JSON.stringify(out, null, 2), "utf8");
}
seedDemo();

function readRecords() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8") || "[]"); }
  catch { return []; }
}
function writeRecords(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf8");
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".mp4": "video/mp4",
};

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
  res.end(body);
}

function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname);
  if (rel === "/" || rel === "") rel = "/index.html";
  const blocked = rel.replace(/\\/g, "/").toLowerCase();
  if (
    blocked === "/backend" ||
    blocked.startsWith("/backend/") ||
    blocked.includes("ai-config") ||
    blocked.includes("records.json")
  ) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("Forbidden");
  }
  // 防目录穿越
  const filePath = path.join(ROOT, path.normalize(rel).replace(/^(\.\.[/\\])+/, ""));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("404 Not Found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS 预检
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" });
    return res.end();
  }

  // ---- API ----
  if (pathname === "/api/health") return sendJSON(res, 200, { ok: true, time: Date.now() });

  // AI 是否可用
  if (pathname === "/api/ai/health") return sendJSON(res, 200, { enabled: AI_ENABLED, model: AI_CFG.model });

  // AI 对话/分析代理（key 不出服务端）
  if (pathname === "/api/ai" && req.method === "POST") {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 2e6) req.destroy(); });
    req.on("end", async () => {
      try {
        const { messages, temperature, max_tokens } = JSON.parse(body || "{}");
        if (!Array.isArray(messages) || !messages.length) return sendJSON(res, 400, { error: "messages 不能为空" });
        const content = await callDeepSeek(messages, { temperature, max_tokens });
        sendJSON(res, 200, { content });
      } catch (e) { sendJSON(res, 502, { error: e.message }); }
    });
    return;
  }

  if (pathname === "/api/drawing/extract" && req.method === "POST") {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 2e6) req.destroy(); });
    req.on("end", async () => {
      try {
        const { text } = JSON.parse(body || "{}");
        if (!text || String(text).trim().length < 5) return sendJSON(res, 400, { error: "请提供图纸 OCR 文字或图纸参数文本" });
        try {
          const params = await extractDrawingWithAI(text);
          sendJSON(res, 200, { params, source: "deepseek" });
        } catch (e) {
          const params = localExtractDrawing(text);
          sendJSON(res, 200, { params, source: "local", warning: e.message });
        }
      } catch (e) { sendJSON(res, 400, { error: e.message }); }
    });
    return;
  }

  if (pathname === "/api/records" && req.method === "GET") {
    return sendJSON(res, 200, readRecords());
  }
  if (pathname === "/api/records" && req.method === "POST") {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 25e6) req.destroy(); });
    req.on("end", () => {
      try {
        const rec = JSON.parse(body || "{}");
        rec.id = rec.id || ("PC-" + Date.now());
        rec.uploadTime = rec.uploadTime || new Date().toLocaleString("zh-CN");
        const list = readRecords();
        list.push(rec);
        writeRecords(list);
        sendJSON(res, 200, rec);
      } catch (e) { sendJSON(res, 400, { error: "invalid json" }); }
    });
    return;
  }
  if (pathname.startsWith("/api/records/") && (req.method === "PUT" || req.method === "DELETE")) {
    const id = decodeURIComponent(pathname.slice("/api/records/".length));
    if (!id) return sendJSON(res, 400, { error: "record id required" });
    if (req.method === "DELETE") {
      const list = readRecords();
      const next = list.filter((r) => r.id !== id);
      writeRecords(next);
      return sendJSON(res, 200, { ok: true, deleted: list.length - next.length });
    }
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 25e6) req.destroy(); });
    req.on("end", () => {
      try {
        const patch = JSON.parse(body || "{}");
        const list = readRecords();
        const idx = list.findIndex((r) => r.id === id);
        if (idx < 0) return sendJSON(res, 404, { error: "record not found" });
        list[idx] = Object.assign({}, list[idx], patch, { id, updatedAt: new Date().toLocaleString("zh-CN") });
        writeRecords(list);
        sendJSON(res, 200, list[idx]);
      } catch (e) { sendJSON(res, 400, { error: "invalid json" }); }
    });
    return;
  }
  if (pathname === "/api/stats" && req.method === "GET") {
    const list = readRecords();
    return sendJSON(res, 200, {
      total: list.length,
      qualified: list.filter((x) => x.status === "合格").length,
      warning: list.filter((x) => x.status === "预警").length,
      unqualified: list.filter((x) => x.status === "不合格").length,
    });
  }

  // ---- 静态文件 ----
  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log("==================================================");
  console.log("  装配智建·和美乡村 平台 后端已启动");
  console.log("  访问地址:  http://localhost:" + PORT);
  console.log("  数据文件:  " + DATA_FILE);
  console.log("  AI 接入:   " + (AI_ENABLED ? "已启用 DeepSeek（" + AI_CFG.model + "）" : "未配置（数字人/核对将回退模拟）"));
  console.log("  按 Ctrl+C 退出");
  console.log("==================================================");
});
