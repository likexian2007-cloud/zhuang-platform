# 开发交接说明（给接手者 / Codex）

> 项目：装配智建·和美乡村 装配式智慧建造指挥中心
> 路径：`C:\Users\likex\Desktop\zhuang`
> 形态：**纯前端单页应用（SPA）+ 零依赖 Node 后端**，无构建步骤、无框架。先读完本文件再动手。

---

## 0. 一句话定位
对照 PPT/展演稿/原型，做一套“能演示也能用”的装配式施工质量平台：数据大屏 + 双墙体吊装记录（含图纸 AI 核对、超差报警）+ 智慧工地（人机料法环 + AI 数字人）+ 施工流程 + 创新成果 + 一码溯源。参考布局来自 `../PINGTAI/匠心筑馆智慧管理平台-指定版.html`（指挥中心风格）。

---

## 1. 架构（务必先理解）

**单页应用，无刷新切换。** 入口只有 `index.html`，它只放一个头部容器 `#ccHead` 和视图容器 `#view`。

脚本加载顺序（**顺序不能乱**）：
```
common.js          → 提供 window.Platform（数据层/AI/工具/报警声）
mod-*.js           → 每个模块把自己 push 进 window.MODULES（此时只注册，不渲染）
app.js（最后）     → 读取 MODULES，构建指挥中心头部+导航，启动路由
```

**模块契约**——每个 `mod-*.js` 这样注册：
```js
(window.MODULES = window.MODULES || []).push({
  id: "xxx",            // 唯一，作为 hash 路由 #xxx
  label: "导航名",
  icon: "fa-xxx",       // Font Awesome 4
  render(el){ el.innerHTML = `...`; this.setup?.(el); },  // 懒渲染一次，结果被缓存
  onShow(el){ /* 每次切到该模块时调用，用于刷新数据/图表 */ },
});
```
路由在 `app.js`：`go(id)` 把所有 section 隐藏、目标 `display:block`，全局函数 `window.AppGo(id)` 可编程切换。导航点击用事件委托 `[data-go]`。

**数据层**：`window.Platform`
- `Store.list() / add(rec) / findByCid(cid) / stats() / seedIfEmpty()` —— 有后端走 `/api/records`，否则 localStorage，自动降级。
- `AI.available()` / `AI.chat(messages, opts)` —— 经后端 `/api/ai` 调 DeepSeek。
- 工具：`$ (=getElementById)`, `$$`, `fmt`, `pad`, `now`, `toast`, `startSiren/stopSiren`。

**后端**：`backend/server.js`，纯 Node 内置模块、**零第三方依赖**。托管静态文件 + REST：
`/api/health` `/api/records`(GET/POST) `/api/stats` `/api/ai`(POST) `/api/ai/health`。
DeepSeek key 在 `backend/ai-config.json`（已 `.gitignore`，env `DEEPSEEK_API_KEY` 可覆盖）。

---

## 2. 必须知道的坑（踩过的）

1. **SPA 可见性别用 `opacity:0→1` 过渡/动画做**。后台或无头标签页会节流动画并把它钉在 0% 帧 → 整页透明白屏。规则：`.view-section{opacity:1}` 常驻可见，花哨效果只用**纯位移** `slideIn`（见 theme.css）。新模块别破坏这条。
2. **所有模块 DOM 同时存在**（隐藏的是 `display:none`），且 `Platform.$` 是全局 `getElementById`。**ID 必须全局唯一**。现状：huijian 用 `workstationNo`/带墙号后缀的 id，gongdi 用 `kPeople/gdClock/chat...`，dashboard 用 `fPeople/fWind...`。**新模块的 id 一律加前缀**避免撞车。
3. **隐藏模块的定时器要空转**。gongdi/dashboard 的 setInterval 里有 `if(!root.classList.contains('active')) return;`。新加动画/轮询照此办理，否则后台一直跑、还会让截图工具卡住。
4. **照片是 `blob:` 内存地址，没有持久化**（刷新即失效，一码溯源也读不到真实照片）——这是已知最大短板，见路线图。
5. **“图纸识别”目前是假的**：上传文件只触发个定时器，真正填的是按“图纸编号”查 `PRESET` 表的预设值（mod-huijian.js 里 `PRESET`/`applyPreset`）。不是 OCR。
6. **AI 只在后端在线时是真的**；`file://` 直接打开或纯静态托管时，数字人和图纸核对会自动回退到内置应答（不报错）。别把 key 写进任何前端文件。
7. 数据文件 `backend/data/records.json` 首启会 seed 12 条演示数据（`seedDemo`）。改 schema 时记得兼容旧数据/或清空重 seed。

---

## 3. 约定（保持一致）

- **原生 JS / HTML / CSS，不引框架、不加构建步骤。** 后端保持零依赖（只用 Node 内置模块）。
- 复用 `theme.css` 的设计令牌（`--cyan --primary --line` 等）和现成类：`.card .card.glow`、`.grid.g2/.g3/.g4`、`.kpi`、`.badge[.green/.red/.amber/.cyan]`、`.btn[.btn-primary/.btn-cyan...]`、`.section-title`、`.dot`。新组件优先用这些，别引入新主题。
- UI 全中文；图标用 Font Awesome 4（`fa fa-xxx`）。
- 改动后**务必两条路径都验证**：① `node backend/server.js`（在线/真 AI）② 直接开 `index.html`（离线/回退）。

---

## 4. 怎么跑 / 怎么测

- 启动：双击 `启动平台.bat`，或 `cd backend && node server.js` → http://localhost:8080
- 真 AI 需联网；`backend/ai-config.json` 要有有效 DeepSeek key。
- 预览工具配置见 `.claude/launch.json`（名称 `zhuang`）。注意：预览/无头环境里 CSS 动画被节流（见坑1）、截图常因持续动画超时——用 `preview_eval` 读 DOM/几何来验证，别只靠截图。
- 部署：纯静态，整个文件夹传 GitHub Pages / Netlify 即可（已带 `.nojekyll`）。静态托管无后端 → AI 自动回退。

---

## 5. 后续路线图（按价值排序，建议照此推进）

**P0 — 决定“真平台 vs demo”的：**
1. **照片持久化**。把上传图片压缩转 base64 存库（注意 localStorage 5MB 上限，量大改用 IndexedDB；后端模式可存文件并在记录里存路径）。然后在**一码溯源**里真正展示构件照片。当前 `mod-huijian.js` 的 `state.walls[w].steps[s].photos` 存的是 blob URL，要换成可持久的形式并随 `Store.add` 一起落库。
2. **真实图纸识别**（替换 P RESET 假识别）。可选：①前端 Tesseract.js 做 OCR 提取图纸数值；②让用户把图纸关键参数贴进来，交给 DeepSeek 抽取结构化设计值；③接视觉大模型（注意 `deepseek-chat` 是纯文本，需另选带视觉的模型/服务）。把抽取到的设计值填进现有“图纸值”字段即可复用后续核对逻辑。

**P1 — 体验/可用性：**
3. **移动端适配**。现场施工员用手机：指挥中心头部（状态条+绿条+一排芯片）窄屏会挤、录入表单偏密。做一套 ≤640px 的布局（头部收起为抽屉、表单单列）。
4. **AI 流式输出**。`/api/ai` 现在等整段返回；数字人改成 SSE/流式逐字显示，体验更像真助手（后端用 DeepSeek `stream:true` 转发）。
5. **AI 交互细节**：请求中断（切走时 abort）、超时/限流的友好提示、连续提问的上下文长度控制。

**P2 — 完整度：**
6. **多构件类型**。现在写死“双剪力墙 16 项检验”。叠合板/预制楼梯检验项不同，应做成由“构件类型/图纸”驱动的检验项配置（数据驱动渲染表单）。
7. **图纸核对覆盖更全**：纳入钢筋中心 X/Y 定位、吊钉、预埋内丝等（需对应设计基准值）。
8. **登录页**（可选，贴合“指挥中心”定位，参考平台是 admin/admin）。
9. **数据导出/导入**：记录导出 JSON/Excel 备份、批量导入。

---

## 6. 安全提醒
- **DeepSeek key 不要进前端、不要进公开仓库**。只放 `backend/ai-config.json`（已 gitignore）。
- 现用的 key 曾在对话中明文出现，**建议尽快在 DeepSeek 控制台重置**并替换 `ai-config.json`。

---

## 7. 文件地图
```
index.html              SPA 外壳
assets/app.js           头部+导航+路由
assets/common.js        Platform：Store / AI / 工具 / 报警声
assets/mod-dashboard.js 智慧大屏
assets/mod-huijian.js   装配慧检（录入+图纸AI核对+看板）★逻辑最重
assets/mod-gongdi.js    智慧工地（人机料法环+AI数字人）
assets/mod-static.js    流程/成果/溯源/部署 四个模块
assets/theme.css        主题+指挥中心样式（设计令牌在 :root）
assets/logo.svg         Logo（亦作 favicon）
backend/server.js       零依赖后端（静态+记录API+DeepSeek代理）
backend/ai-config.json  密钥（gitignore，需自配）
```
有疑问先全局搜关键词，再动手。改完两路径都自测。祝顺利。
