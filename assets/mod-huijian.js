/* ====================== 模块：装配慧检 AI（数据录入 + 图纸AI核对 + 质量看板） ====================== */
(window.MODULES = window.MODULES || []).push({
  id: "huijian", label: "装配慧检·录入", icon: "fa-clipboard",
  render(el) {
    el.innerHTML = `
    <div class="seg no-print">
      <button data-view="record" class="active">数据录入</button>
      <button data-view="quality">质量看板</button>
    </div>

    <div class="card" style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
      <div style="font-weight:700"><i class="fa fa-tasks" style="color:var(--cyan)"></i> 双墙体吊装总进度（拍照 + 判定）</div>
      <div style="flex:1;min-width:200px"><div class="bar-wrap"><div id="progressBar" class="bar"></div></div></div>
      <div id="progressText" class="muted" style="font-size:13px">完成度：0%</div>
    </div>

    <main id="pageRecord">
      <div class="card glow" id="recordForm">
        <div style="text-align:center;margin-bottom:18px">
          <h1 style="font-size:22px;font-weight:900">“装配式建筑构件安装” 预制构件吊装记录表<span class="muted" style="font-size:14px">（双墙体版）</span></h1>
          <hr class="hr" style="max-width:520px;margin:12px auto" />
          <div class="grid g4" style="text-align:left">
            <label class="field"><span>工位号</span><input id="workstationNo" placeholder="输入工位号" /></label>
            <label class="field"><span>记录人</span><input id="recorder" placeholder="如张三" /></label>
            <label class="field"><span>开始时间</span><input type="time" id="startTime" /></label>
            <label class="field"><span>施工人员</span><input id="crew" placeholder="姓名/岗位/电话" /></label>
          </div>
        </div>

        <section class="card" style="margin-bottom:16px;border-color:rgba(239,68,68,.3)">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div class="section-title" style="margin:0"><span class="i" style="background:linear-gradient(180deg,#f87171,#ef4444)"></span><i class="fa fa-bell" style="color:#f87171"></i> AI 报警中心</div>
            <label style="font-size:13px;color:var(--text-dim);display:inline-flex;align-items:center;gap:6px">报警开关 <input type="checkbox" id="aiSwitch" checked style="width:auto" /></label>
          </div>
          <div class="muted" style="font-size:13px;margin-top:8px">同一组数据输入完成后，若 <b style="color:#fca5a5">最大值 − 最小值 &gt; 10mm</b> 即触发 <b style="color:#fca5a5">大框 + 警报声</b>。</div>
          <div style="display:flex;align-items:center;gap:12px;margin-top:12px">
            <span>报警数量：</span><span id="aiCount" class="badge">0</span>
            <span id="aiLevelDot" class="dot green"></span><span id="aiLevelText" class="muted" style="font-size:13px">正常</span>
          </div>
          <ul id="aiList" style="margin-top:8px;padding-left:20px;font-size:13px;color:var(--text-dim)"></ul>
        </section>

        <div id="wallsMount"></div>

        <!-- 图纸导入 · AI 自动核对 -->
        <section class="card glow" style="margin-bottom:16px;border-color:rgba(56,189,248,.4)">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
            <div class="section-title" style="margin:0"><span class="i"></span><i class="fa fa-file-text-o"></i> 图纸导入 · AI 自动核对</div>
            <span class="badge cyan">实测实量 ⇄ 原始图纸</span>
          </div>
          <p class="muted" style="font-size:13px;margin:8px 0 12px">上传清晰图纸图片或粘贴图纸参数文字后，系统先做 OCR/文本读取，再由 DeepSeek 抽取设计值，与上方实测数据逐项校对。</p>
          <div class="grid g2" id="dwgUploads"></div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">
            <button id="btnAICheck" class="btn btn-cyan"><i class="fa fa-magic"></i> AI 自动核对</button>
            <button id="btnAICheckClear" class="btn btn-ghost btn-sm">清空核对</button>
            <span id="checkSummary" class="badge" style="align-self:center">尚未核对</span>
          </div>
          <div id="checkResult" style="margin-top:14px"></div>
        </section>

        <section class="card" style="margin-bottom:16px">
          <div class="section-title"><span class="i"></span><i class="fa fa-pencil"></i> 签名与二维码</div>
          <div class="grid g2">
            <div>
              <label class="muted" style="display:block;margin-bottom:6px">记录人签名：</label>
              <canvas id="recorderSignature" width="400" height="150" style="background:#0a1020;border:1px dashed var(--line-strong);border-radius:10px;width:100%"></canvas>
              <div style="margin-top:8px;display:flex;gap:8px">
                <button id="clearRecorder" class="btn btn-sm btn-ghost">清除</button>
                <button id="saveRecorder" class="btn btn-sm btn-primary">保存签名</button>
              </div>
            </div>
            <div>
              <label class="muted" style="display:block;margin-bottom:6px">构件二维码（扫码显示：构件信息 + 判定 + 完成度 + 报警 + 记录人）</label>
              <div class="qrbox scan-line" style="display:flex;align-items:center;justify-content:center;min-height:230px;border:1px dashed var(--line-strong);border-radius:12px;background:rgba(2,6,23,.4)"><div id="qrcode">生成后显示二维码</div></div>
              <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
                <button id="btnGenQR" class="btn btn-sm btn-cyan"><i class="fa fa-qrcode"></i> 生成二维码</button>
                <button id="btnDLQR" class="btn btn-sm btn-ghost"><i class="fa fa-download"></i> 下载为JPG</button>
              </div>
              <input id="qrLink" readonly class="ro" style="margin-top:8px" placeholder="二维码文本（仅供检查）" />
            </div>
          </div>
        </section>

        <div class="no-print" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:8px">
          <button id="saveData" class="btn btn-primary"><i class="fa fa-save"></i> 保存数据</button>
          <button id="uploadData" class="btn btn-purple"><i class="fa fa-upload"></i> 一键上传到质量监测系统</button>
            <button id="exportPdf" class="btn btn-green"><i class="fa fa-file-pdf-o"></i> 导出PDF</button>
            <button id="exportJson" class="btn btn-ghost"><i class="fa fa-download"></i> 导出JSON</button>
            <button id="resetForm" class="btn btn-danger"><i class="fa fa-refresh"></i> 重置表单</button>
        </div>
      </div>
    </main>

    <main id="pageQuality" style="display:none">
      <div class="card" style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div class="section-title" style="margin:0"><span class="i"></span><i class="fa fa-dashboard"></i> 建筑构件质量监测看板</div>
        <div class="muted" style="font-size:13px"><i class="fa fa-clock-o"></i> <span id="qmTime">--</span> &nbsp; <i class="fa fa-refresh"></i> <span id="qmUpdate">未更新</span></div>
      </div>
      <div class="grid g4" id="qmCards" style="margin-bottom:16px"></div>
      <div class="card" style="margin-bottom:16px">
        <div class="section-title" style="font-size:16px"><span class="i"></span>最近上传的吊装记录</div>
        <div style="overflow-x:auto"><table>
          <thead><tr><th>记录ID</th><th>构件ID</th><th>类型</th><th>施工场地</th><th>上传时间</th><th>合格率</th><th>进度</th><th>判定</th><th>操作</th></tr></thead>
          <tbody id="qmList"></tbody>
        </table></div>
      </div>
      <div class="card">
        <div class="section-title" style="font-size:16px"><span class="i"></span>质量趋势与分布</div>
        <div class="grid" style="grid-template-columns:2fr 1fr">
          <div class="card" style="background:rgba(2,6,23,.3)"><canvas id="qualityTrend" height="130"></canvas></div>
          <div class="card" style="background:rgba(2,6,23,.3)"><canvas id="qualityDist" height="130"></canvas></div>
        </div>
      </div>
    </main>

    <div id="alarmModal" class="modal" role="dialog" aria-modal="true">
      <div class="mask"></div>
      <div class="panel pulseRed">
        <div class="alarm-head"><div class="alarm-title"><i class="fa fa-exclamation-triangle"></i> 紧急报警</div>
          <button id="alarmCloseTop" class="btn btn-sm btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.4)">静音并关闭</button></div>
        <div class="alarm-body"><div style="color:#fca5a5;font-weight:800;margin-bottom:10px">发现以下严重超限项：</div>
          <ul id="alarmList"></ul><div class="mute2" style="font-size:12px;margin-top:12px">提示：请立即暂停作业，复核数据后再继续操作。</div></div>
        <div class="alarm-actions"><button id="alarmAck" class="btn btn-danger"><i class="fa fa-volume-off"></i> 我已知悉（消音）</button><button id="alarmClose" class="btn btn-ghost">关闭</button></div>
      </div>
    </div>`;
    this.setup(el);
  },

  onShow() { /* 看板在切换到 quality 标签时刷新 */ },

  setup(root) {
    const { $, fmt, now, toast, Store, startSiren, stopSiren, AI } = window.Platform;
    const STEPS_PER_WALL = [
      { id: "size", name: "墙体尺寸检查完成后" }, { id: "line", name: "定位弹线完成后" },
      { id: "fix", name: "固定安装完成后" }, { id: "rebar", name: "钢筋绑扎完成后" },
    ];
    const WALLS = [1, 2];
    const state = { walls: {} };
    WALLS.forEach((w) => { state.walls[w] = { steps: {} }; STEPS_PER_WALL.forEach((s) => (state.walls[w].steps[s.id] = { photos: [], pass: null, done: false })); });
    let aiEnabled = true, aiAlertCache = new Set(), recorderSig = null, lastSavedRecordId = null;

    /* 图纸预设（按图纸编号识别设计值） */
    const PRESET = {
      "15G365-1": { thickness: 200, exposed: 120, steel: "Φ14", sleeve: 8, ring: 150 },
      "15G365-2": { thickness: 200, exposed: 128, steel: "Φ16", sleeve: 8, ring: 150 },
      "20G367-2": { thickness: 140, exposed: 112, steel: "Φ14", sleeve: 6, ring: 120 },
      "_default": { thickness: 200, exposed: 120, steel: "Φ14", sleeve: 8, ring: 150 },
    };

    function buildWall(wall) { /* 与原版一致的检验表单 */
      return `
      <section class="card" style="margin-bottom:16px">
        <div class="wall-head"><i class="fa fa-building-o" style="color:var(--cyan)"></i><h2>第${wall === 1 ? "一" : "二"}面墙体 · 数据记录</h2></div>
        <div class="section-title" style="font-size:15px"><span class="i"></span>一、基础信息</div>
        <div class="grid g3">
          <label class="field"><span>施工场地</span><select id="matchSession${wall}"><option value="">请选择</option><option>和美乡村1号房</option><option>和美乡村2号房</option><option>和美乡村3号房</option></select></label>
          <label class="field"><span>施工队伍</span><input id="teamId${wall}" placeholder="如202401" /></label>
          <label class="field"><span>构件类型</span><select id="componentType${wall}"><option value="">请选择</option><option>剪力墙1</option><option>剪力墙2</option><option>叠合板</option><option>预制楼梯</option></select></label>
          <label class="field"><span>图纸编号</span><select id="drawingNo${wall}"><option value="">请选择</option><option>15G365-1</option><option>15G365-2</option><option>20G367-2</option></select></label>
          <label class="field"><span>构件ID（cid）</span><input id="cid${wall}" placeholder="如：WQ-3F-A5-0123" /></label>
          <label class="field"><span>项目编号（pid）</span><input id="pid${wall}" placeholder="如：HMXC-2025-01" /></label>
          <label class="field"><span>楼栋/轴线（grid）</span><input id="grid${wall}" placeholder="如：A / A5" /></label>
        </div>
        <hr class="hr" />
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="section-title" style="font-size:15px;margin:0"><span class="i"></span>二、主要检验项目<span class="muted" style="font-size:12px;font-weight:400">（同组差值&gt;10mm 报警）</span></div>
          <button type="button" class="btn btn-sm btn-ghost btnToggleChecks" data-wall="${wall}">展开/收起</button>
        </div>
        <div class="checksWrap" data-wall="${wall}" style="margin-top:12px">
          <div class="item"><label>1. 外观检查（有“√”，无“×”）</label>
            <div class="grid g3 radioline">
              ${["rebar:露筋","honey:蜂窝","hole:孔洞","slag:夹渣","loose:疏松","crack:裂缝"].map(p=>{const[k,t]=p.split(":");return `<div><label><input type="radio" name="app_${k}${wall}" value="√"> ${t}</label><label><input type="radio" name="app_${k}${wall}" value="×" checked> 无${t}</label></div>`}).join("")}
            </div></div>
          <div class="item"><label>2. 高度（左/中/右三点）</label><div class="grid g4">
            <input id="hL${wall}" type="number" step="0.1" placeholder="左" class="group-h${wall}"><input id="hM${wall}" type="number" step="0.1" placeholder="中" class="group-h${wall}"><input id="hR${wall}" type="number" step="0.1" placeholder="右" class="group-h${wall}"><input id="hMax${wall}" type="number" readonly placeholder="三点最大偏差" class="ro"></div></div>
          <div class="item"><label>3. 宽度（上/中/下三点）</label><div class="grid g4">
            <input id="wT${wall}" type="number" step="0.1" placeholder="上" class="group-w${wall}"><input id="wM${wall}" type="number" step="0.1" placeholder="中" class="group-w${wall}"><input id="wB${wall}" type="number" step="0.1" placeholder="下" class="group-w${wall}"><input id="wMax${wall}" type="number" readonly placeholder="三点最大偏差" class="ro"></div></div>
          <div class="item"><label>4. 厚度（允许偏差 ±2mm）</label><div class="grid g3">
            <input id="tD${wall}" type="number" placeholder="图纸"><input id="tA${wall}" type="number" step="0.1" placeholder="实测"><input id="tDev${wall}" type="number" readonly placeholder="偏差" class="ro"></div></div>
          <div class="item"><label>5. 对角线尺寸（允许差 ≤3mm）</label><div class="grid g3">
            <input id="d1${wall}" type="number" step="0.1" placeholder="对角1"><input id="d2${wall}" type="number" step="0.1" placeholder="对角2"><input id="dDiff${wall}" type="number" readonly placeholder="差值" class="ro"></div></div>
          <div class="item"><label>6. 上端连接钢筋中心定位（三根钢筋 X/Y 实测，mm）</label><div class="grid g4">
            <input id="rb1x${wall}" type="number" step="0.1" placeholder="#1 X"><input id="rb1y${wall}" type="number" step="0.1" placeholder="#1 Y"><input id="rb2x${wall}" type="number" step="0.1" placeholder="#2 X"><input id="rb2y${wall}" type="number" step="0.1" placeholder="#2 Y"><input id="rb3x${wall}" type="number" step="0.1" placeholder="#3 X"><input id="rb3y${wall}" type="number" step="0.1" placeholder="#3 Y"></div></div>
          <div class="item"><label>7. 上端连接钢筋外露长度（允许偏差 +10/-5 mm）</label><div class="grid g3">
            <input id="sLenD${wall}" type="number" placeholder="图纸"><input id="sLenA${wall}" type="number" step="0.1" placeholder="实测"><input id="sLenDev${wall}" type="number" readonly placeholder="偏差" class="ro"></div></div>
          <div class="item"><label>8. 构件上端连接钢筋规格</label><div class="grid g2">
            <select id="steelSpecD${wall}"><option value="">图纸规格</option><option>Φ12</option><option>Φ14</option><option>Φ16</option><option>Φ18</option></select>
            <select id="steelSpecA${wall}"><option value="">实际规格</option><option>Φ12</option><option>Φ14</option><option>Φ16</option><option>Φ18</option><option>其他</option></select></div>
            <input id="steelSpecDefect${wall}" style="margin-top:8px" placeholder="记录不满足要求的钢筋（满足可留空）"></div>
          <div class="item"><label>9. 吊钉纵横两个方向的中心线位置</label><div class="grid g4">
            <input id="nLongD${wall}" type="number" step="0.1" placeholder="纵向图纸"><input id="nLongA${wall}" type="number" step="0.1" placeholder="纵向实际"><input id="nHorD${wall}" type="number" step="0.1" placeholder="横向图纸"><input id="nHorA${wall}" type="number" step="0.1" placeholder="横向实际"></div>
            <input id="nDefect${wall}" style="margin-top:8px" placeholder="记录偏差最大且不满足要求的吊钉（满足可留空）"></div>
          <div class="item"><label>10. 吊环高度测量（mm）</label><div class="grid g3">
            <input id="ringHeightD${wall}" type="number" step="0.1" placeholder="图纸高度"><input id="ringHeightA${wall}" type="number" step="0.1" placeholder="实测高度"><input id="ringHeightDev${wall}" type="number" readonly placeholder="偏差" class="ro"></div></div>
          <div class="item"><label>11. 预埋内丝（斜支撑预留孔）</label><div class="grid g4">
            <input id="thLongD${wall}" type="number" step="0.1" placeholder="纵向图纸"><input id="thLongA${wall}" type="number" step="0.1" placeholder="纵向实际"><input id="thHorD${wall}" type="number" step="0.1" placeholder="横向图纸"><input id="thHorA${wall}" type="number" step="0.1" placeholder="横向实际"></div>
            <input id="thDefect${wall}" style="margin-top:8px" placeholder="记录偏差最大且不满足要求的预埋内丝（满足可留空）"></div>
          <div class="item"><label>12. 灌浆套筒通透性</label><div class="grid g3">
            <input id="sleeveTotal${wall}" type="number" value="8" placeholder="套筒总数"><input id="sleevePassed${wall}" type="number" readonly value="0" class="ro" placeholder="通透数"><input id="sleeveFailed${wall}" type="number" readonly value="0" class="ro" placeholder="不通透数"></div>
            <div style="margin-top:8px"><button id="btnGenSleeve${wall}" type="button" class="btn btn-sm btn-ghost"><i class="fa fa-list-ul"></i> 生成选项</button>
              <div id="sleeveItems${wall}" class="muted" style="margin-top:8px;font-size:13px">点击“生成选项”后可逐一勾选通透/不通透</div>
              <input id="sleeveFailedNos${wall}" style="margin-top:8px" placeholder="不通透编号（如：1,3,5）"></div></div>
          <div class="item"><label>13. 后视点高度与垫片高度测量（mm）</label>
            <input id="backsightHeight${wall}" type="number" step="0.1" placeholder="后视点高度" style="margin-bottom:8px">
            <div class="muted" style="font-size:12px;margin-bottom:6px">8 个垫片高度：</div>
            <div class="grid g4">${[1,2,3,4,5,6,7,8].map(i=>`<input id="gasket${wall}_${i}" type="number" step="0.1" placeholder="垫片${i}">`).join("")}</div></div>
          ${STEPS_PER_WALL.map((s,idx)=>{const names=["墙体尺寸","定位弹线","固定安装","钢筋绑扎"];return `
          <div class="item" style="position:relative">
            <div style="display:flex;align-items:center;justify-content:space-between"><label style="margin:0">${14+idx}. ${names[idx]}拍照上传</label><span id="badge_${s.id}${wall}" class="badge">未完成</span></div>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:8px">
              <label class="upload" style="flex:1;min-width:160px;border:2px dashed var(--line-strong);border-radius:12px;padding:14px;text-align:center;cursor:pointer;background:rgba(2,6,23,.35);color:var(--text-dim);font-size:14px"><input id="file_${s.id}${wall}" type="file" accept="image/*" capture="environment" multiple style="display:none"><i class="fa fa-camera"></i> 点击拍照 / 上传</label>
              <label class="field" style="min-width:150px"><span>结果判定</span><select id="verdict_${s.id}${wall}"><option value="">未判定</option><option value="pass">合格</option><option value="fail">不合格</option></select></label>
            </div>
            <div id="photos_${s.id}${wall}" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"></div>
          </div>`}).join("")}
          <div class="item"><label>18. 底板插筋等其他部位异常情况</label>
            <div class="grid g2 radioline">
              <div><div class="muted" style="font-size:12px;margin-bottom:4px">是否存在不满足图纸要求</div><label><input type="radio" name="hasAbnormal${wall}" value="是"> 是</label><label><input type="radio" name="hasAbnormal${wall}" value="否" checked> 否</label></div>
              <div><div class="muted" style="font-size:12px;margin-bottom:4px">是否需要变更</div><label><input type="radio" name="needChange${wall}" value="是"> 是</label><label><input type="radio" name="needChange${wall}" value="否" checked> 否</label></div></div>
            <textarea id="abnormalDesc${wall}" rows="2" style="margin-top:8px" placeholder="如：底板插筋垂直度偏差5mm"></textarea></div>
        </div>
      </section>`;
    }
    $("wallsMount").innerHTML = WALLS.map(buildWall).join("");

    /* 图纸上传块 */
    $("dwgUploads").innerHTML = WALLS.map((wall) => `
      <div class="card" style="background:rgba(2,6,23,.3)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <b>第${wall}面墙 · 原始图纸</b><span id="dwgBadge${wall}" class="badge">未导入</span></div>
        <label class="upload" style="display:block;border:2px dashed var(--line-strong);border-radius:12px;padding:16px;text-align:center;cursor:pointer;background:rgba(2,6,23,.35);color:var(--text-dim);font-size:13px;margin-top:10px">
          <input id="dwgFile${wall}" type="file" accept="image/*" style="display:none"><i class="fa fa-cloud-upload"></i> 上传清晰图纸图片做 OCR</label>
        <textarea id="dwgText${wall}" rows="4" style="margin-top:10px" placeholder="也可粘贴图纸参数文字，例如：图纸15G365-1，墙厚200mm，钢筋外露120mm，钢筋Φ14，套筒8个，吊环高度150mm"></textarea>
        <div id="dwgInfo${wall}" class="muted" style="font-size:12px;margin-top:8px">支持图片 OCR 或手动粘贴参数；抽取结果会自动填入上方“图纸值”。</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
          <button id="dwgOcr${wall}" class="btn btn-sm btn-ghost"><i class="fa fa-eye"></i> OCR 识别图片文字</button>
          <button id="dwgRecognize${wall}" class="btn btn-sm btn-cyan"><i class="fa fa-magic"></i> AI 抽取设计值</button>
          <button id="dwgPreset${wall}" class="btn btn-sm btn-ghost"><i class="fa fa-database"></i> 使用图集预设</button>
        </div>
      </div>`).join("");

    /* ---------- 报警模态 ---------- */
    function openAlarmModal(messages) { const list = $("alarmList"); list.innerHTML = ""; messages.forEach((m) => { const li = document.createElement("li"); li.textContent = m; list.appendChild(li); }); $("alarmModal").classList.add("show"); startSiren(); if (navigator.vibrate) navigator.vibrate([250, 150, 250, 150, 250]); }
    function closeAlarmModal() { $("alarmModal").classList.remove("show"); }
    $("alarmAck").addEventListener("click", () => { stopSiren(); closeAlarmModal(); });
    $("alarmClose").addEventListener("click", closeAlarmModal);
    $("alarmCloseTop").addEventListener("click", () => { stopSiren(); closeAlarmModal(); });

    /* ---------- 视图切换 ---------- */
    root.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
      root.querySelectorAll(".seg button").forEach((x) => x.classList.remove("active")); b.classList.add("active");
      const v = b.dataset.view; $("pageRecord").style.display = v === "record" ? "" : "none"; $("pageQuality").style.display = v === "quality" ? "" : "none";
      if (v === "quality") renderQuality();
    }));

    function updateProgressBar() { const total = WALLS.length * STEPS_PER_WALL.length; let done = 0; WALLS.forEach((w) => STEPS_PER_WALL.forEach((s) => { if (state.walls[w].steps[s.id].done) done++; })); const pct = Math.round((done / total) * 100); $("progressBar").style.width = pct + "%"; $("progressText").textContent = `完成度：${pct}%（${done}/${total}）`; }

    function groupSpread(vals) { const v = vals.map((x) => parseFloat(x)).filter((x) => !isNaN(x)); if (v.length < 2) return 0; return Math.max(...v) - Math.min(...v); }
    function recalcChecks(wall) {
      const hVals = [$(`hL${wall}`).value, $(`hM${wall}`).value, $(`hR${wall}`).value];
      $(`hMax${wall}`).value = hVals.filter((v) => v !== "").length ? fmt(groupSpread(hVals)) : "";
      const wVals = [$(`wT${wall}`).value, $(`wM${wall}`).value, $(`wB${wall}`).value];
      $(`wMax${wall}`).value = wVals.filter((v) => v !== "").length ? fmt(groupSpread(wVals)) : "";
      $(`tDev${wall}`).value = fmt(parseFloat($(`tA${wall}`).value || 0) - parseFloat($(`tD${wall}`).value || 0));
      $(`dDiff${wall}`).value = fmt(Math.abs(parseFloat($(`d1${wall}`).value || 0) - parseFloat($(`d2${wall}`).value || 0)));
      $(`sLenDev${wall}`).value = fmt(parseFloat($(`sLenA${wall}`).value || 0) - parseFloat($(`sLenD${wall}`).value || 0));
      $(`ringHeightDev${wall}`).value = fmt(parseFloat($(`ringHeightA${wall}`).value || 0) - parseFloat($(`ringHeightD${wall}`).value || 0));
      evaluateAI();
    }
    WALLS.forEach((wall) => { [`tD${wall}`,`tA${wall}`,`d1${wall}`,`d2${wall}`,`sLenD${wall}`,`sLenA${wall}`,`steelSpecD${wall}`,`steelSpecA${wall}`,`ringHeightD${wall}`,`ringHeightA${wall}`].forEach((id) => { const e = $(id); if (e) e.addEventListener("input", () => recalcChecks(wall)); }); });

    /* 套筒 */
    WALLS.forEach((wall) => { $(`btnGenSleeve${wall}`).addEventListener("click", () => {
      const total = parseInt($(`sleeveTotal${wall}`).value || "0"); if (total <= 0) { alert("请先填写套筒总数"); return; }
      const cont = $(`sleeveItems${wall}`); cont.innerHTML = ""; const group = document.createElement("div"); group.className = "grid g4";
      for (let i = 1; i <= total; i++) { const item = document.createElement("label"); item.style.cssText = "display:flex;align-items:center;gap:6px;font-size:13px"; item.innerHTML = `<input type="checkbox" id="sleeve_${wall}_${i}" checked style="width:auto"> <span>#${i} 通透</span>`; group.appendChild(item); }
      cont.appendChild(group);
      function recount() { let passed = 0, failedNos = []; for (let i = 1; i <= total; i++) { const cb = $(`sleeve_${wall}_${i}`); if (cb && cb.checked) passed++; else failedNos.push(i); } $(`sleevePassed${wall}`).value = passed; $(`sleeveFailed${wall}`).value = total - passed; $(`sleeveFailedNos${wall}`).value = failedNos.join(","); evaluateAI(); }
      cont.addEventListener("change", recount); recount();
    }); });

    /* 照片持久化 + 本地质量校验 */
    function blobToDataURL(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
    async function compressImage(file, maxSide = 1600, quality = 0.85) {
      const img = new Image(); const url = URL.createObjectURL(file); await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
      let w = img.naturalWidth, h = img.naturalHeight; if (Math.max(w, h) > maxSide) { if (w > h) { h = Math.round((h * maxSide) / w); w = maxSide; } else { w = Math.round((w * maxSide) / h); h = maxSide; } }
      const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h);
      const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", quality)); URL.revokeObjectURL(url);
      return { blob, width: w, height: h, name: (file.name || "photo").replace(/\.\w+$/, "") + "_c.jpg" };
    }
    function renderPhotoThumb(container, dataUrl, title) {
      const wrap = document.createElement("div");
      wrap.style.cssText = "position:relative";
      const img = new Image();
      img.style.cssText = "width:84px;height:84px;object-fit:cover;border-radius:10px;border:1px solid var(--line-strong)";
      img.src = dataUrl;
      img.title = title || "工序照片";
      wrap.appendChild(img);
      container.appendChild(wrap);
    }
    function verifyPhoto(wall, stepId) {
      const badge = $(`badge_${stepId}${wall}`);
      const photos = state.walls[wall].steps[stepId].photos;
      if (!photos.length) {
        badge.textContent = "未完成";
        badge.className = "badge";
        return;
      }
      const tiny = photos.some((p) => (p.width || 0) < 640 || (p.height || 0) < 480);
      if (tiny) {
        badge.textContent = "照片需复核";
        badge.className = "badge amber";
        state.walls[wall].steps[stepId].pass = null;
      } else {
        badge.textContent = "照片已留痕";
        badge.className = "badge green";
      }
    }
    function setupPhoto(wall, stepId) {
      $(`file_${stepId}${wall}`).addEventListener("change", async (e) => {
        const files = Array.from(e.target.files || []); if (!files.length) return;
        const badge = $(`badge_${stepId}${wall}`);
        badge.textContent = "压缩留痕中…"; badge.className = "badge cyan";
        for (const f of files) {
          const file = await compressImage(f, 1280, 0.78);
          const dataUrl = await blobToDataURL(file.blob);
          const photo = { dataUrl, name: file.name, width: file.width, height: file.height, time: now() };
          state.walls[wall].steps[stepId].photos.push(photo);
          renderPhotoThumb($(`photos_${stepId}${wall}`), dataUrl, photo.name);
        }
        state.walls[wall].steps[stepId].done = true; verifyPhoto(wall, stepId); updateProgressBar(); evaluateAI();
      });
      $(`verdict_${stepId}${wall}`).addEventListener("change", (e) => { state.walls[wall].steps[stepId].pass = e.target.value === "pass" ? true : e.target.value === "fail" ? false : null; evaluateAI(); });
    }
    WALLS.forEach((w) => STEPS_PER_WALL.forEach((s) => setupPhoto(w, s.id)));

    root.querySelectorAll(".btnToggleChecks").forEach((btn) => btn.addEventListener("click", () => { const wrap = root.querySelector(`.checksWrap[data-wall="${btn.dataset.wall}"]`); wrap.style.display = wrap.style.display === "none" ? "" : "none"; }));
    WALLS.forEach((wall) => root.querySelectorAll(`.group-h${wall},.group-w${wall}`).forEach((el) => { el.addEventListener("blur", () => { recalcChecks(wall); evaluateAI(true); }); el.addEventListener("change", () => evaluateAI(true)); }));

    /* AI 报警引擎 */
    function evaluateAI() {
      const list = [];
      WALLS.forEach((wall) => {
        const hVals = [$(`hL${wall}`).value, $(`hM${wall}`).value, $(`hR${wall}`).value], wVals = [$(`wT${wall}`).value, $(`wM${wall}`).value, $(`wB${wall}`).value];
        const hDiff = groupSpread(hVals), wDiff = groupSpread(wVals);
        if (hVals.filter((v) => v !== "").length >= 2 && hDiff > 10) list.push({ lvl: "red", msg: `第${wall}面墙 - 高度三点差值：${hDiff.toFixed(1)} mm（阈值>10）` });
        if (wVals.filter((v) => v !== "").length >= 2 && wDiff > 10) list.push({ lvl: "red", msg: `第${wall}面墙 - 宽度三点差值：${wDiff.toFixed(1)} mm（阈值>10）` });
        const sFail = parseInt($(`sleeveFailed${wall}`).value || 0), sTot = parseInt($(`sleeveTotal${wall}`).value || 0);
        const specD = $(`steelSpecD${wall}`).value, specA = $(`steelSpecA${wall}`).value;
        if (sFail > 0) list.push({ lvl: sTot && sFail / sTot >= 0.25 ? "amber" : "gray", msg: `第${wall}面墙 - 套筒不通透：${sFail}/${sTot} 个` });
        if (specD && specA && specD !== specA) list.push({ lvl: "amber", msg: `第${wall}面墙 - 钢筋规格不一致：图纸${specD}，实际${specA}` });
        const bad = Object.keys(state.walls[wall].steps).filter((k) => state.walls[wall].steps[k].pass === false);
        if (bad.length) list.push({ lvl: "red", msg: `第${wall}面墙 - 关键节点"不合格"：${bad.length} 项` });
      });
      const ul = $("aiList"); ul.innerHTML = "";
      list.forEach((it) => { const li = document.createElement("li"); const c = it.lvl === "gray" ? "cyan" : it.lvl; li.innerHTML = `<span class="dot ${c}"></span> ${it.msg}`; li.style.cssText = "list-style:none;display:flex;align-items:center;gap:8px;margin-bottom:5px"; ul.appendChild(li); });
      $("aiCount").textContent = list.length;
      const dot = $("aiLevelDot"), txt = $("aiLevelText");
      if (!list.length) { dot.className = "dot green"; txt.textContent = "正常"; } else if (list.some((x) => x.lvl === "red")) { dot.className = "dot red"; txt.textContent = "严重"; } else if (list.some((x) => x.lvl === "amber")) { dot.className = "dot amber"; txt.textContent = "预警"; } else { dot.className = "dot green"; txt.textContent = "正常"; }
      if (aiEnabled) { const reds = list.filter((x) => x.lvl === "red").map((x) => x.msg); const newOnes = reds.filter((m) => !aiAlertCache.has(m)); if (newOnes.length) { aiAlertCache = new Set(reds); openAlarmModal(newOnes); } else if (!reds.length) { aiAlertCache.clear(); stopSiren(); closeAlarmModal(); } }
      return list.length;
    }
    $("aiSwitch").addEventListener("change", (e) => { aiEnabled = e.target.checked; if (!aiEnabled) { stopSiren(); closeAlarmModal(); } });

    /* ====== 图纸导入 · AI 自动核对 ====== */
    const drawingFiles = {};
    function applyDrawingParams(wall, p, sourceLabel) {
      if (p.thickness != null) $(`tD${wall}`).value = p.thickness;
      if (p.exposed != null) $(`sLenD${wall}`).value = p.exposed;
      if (p.steel) $(`steelSpecD${wall}`).value = p.steel;
      if (p.sleeve != null) $(`sleeveTotal${wall}`).value = p.sleeve;
      if (p.ring != null) $(`ringHeightD${wall}`).value = p.ring;
      if (p.drawingNo) $(`drawingNo${wall}`).value = p.drawingNo;
      recalcChecks(wall);
      const bits = [
        p.thickness != null ? `厚度 ${p.thickness}mm` : null,
        p.exposed != null ? `外露 ${p.exposed}mm` : null,
        p.steel ? `钢筋 ${p.steel}` : null,
        p.sleeve != null ? `套筒 ${p.sleeve}` : null,
        p.ring != null ? `吊环 ${p.ring}mm` : null,
      ].filter(Boolean).join(" · ");
      $(`dwgBadge${wall}`).className = "badge green";
      $(`dwgBadge${wall}`).textContent = "已抽取";
      $(`dwgInfo${wall}`).innerHTML = `${sourceLabel || "AI"} 已抽取设计值：${bits || "未识别到有效参数"}。${p.sourceSummary ? `<br><span class="mute2">${p.sourceSummary}</span>` : ""}`;
    }
    function applyPreset(wall) {
      const dn = $(`drawingNo${wall}`).value; const p = PRESET[dn] || PRESET._default;
      applyDrawingParams(wall, Object.assign({ drawingNo: dn }, p, { sourceSummary: "来自内置图集预设，适合演示；正式核对应优先使用 OCR/AI 抽取。" }), "图集预设");
    }
    async function runDrawingOcr(wall) {
      const file = drawingFiles[wall];
      if (!file) { alert("请先上传清晰的图纸图片"); return; }
      if (!window.Tesseract) { alert("OCR 组件未加载，请检查网络后重试"); return; }
      $(`dwgBadge${wall}`).className = "badge cyan"; $(`dwgBadge${wall}`).textContent = "OCR中…";
      $(`dwgInfo${wall}`).textContent = "正在识别图纸图片文字，清晰图片通常需要 10-30 秒……";
      try {
        const result = await Tesseract.recognize(file, "chi_sim+eng");
        const text = (result.data && result.data.text || "").trim();
        $(`dwgText${wall}`).value = text;
        $(`dwgBadge${wall}`).className = "badge cyan"; $(`dwgBadge${wall}`).textContent = "OCR完成";
        $(`dwgInfo${wall}`).textContent = text ? "OCR 完成，请点击“AI 抽取设计值”。" : "OCR 未识别到文字，请粘贴图纸参数或换更清晰图片。";
      } catch (e) {
        $(`dwgBadge${wall}`).className = "badge red"; $(`dwgBadge${wall}`).textContent = "OCR失败";
        $(`dwgInfo${wall}`).textContent = "OCR 失败：" + e.message;
      }
    }
    async function runDrawingExtract(wall) {
      const text = $(`dwgText${wall}`).value.trim();
      if (!text) { alert("请先 OCR 图纸或粘贴图纸参数文字"); return; }
      $(`dwgBadge${wall}`).className = "badge cyan"; $(`dwgBadge${wall}`).textContent = "AI抽取中…";
      $(`dwgInfo${wall}`).textContent = "正在调用 DeepSeek 抽取结构化设计值……";
      try {
        if (await AI.available()) {
          const p = await AI.extractDrawing(text);
          applyDrawingParams(wall, p, "DeepSeek");
        } else {
          const p = localExtractDrawing(text);
          applyDrawingParams(wall, p, "本地解析");
        }
      } catch (e) {
        const p = localExtractDrawing(text);
        applyDrawingParams(wall, p, "本地解析");
        $(`dwgInfo${wall}`).insertAdjacentHTML("beforeend", `<br><span style="color:#fca5a5">DeepSeek 抽取失败：${e.message}，已使用本地规则兜底。</span>`);
      }
    }
    function localExtractDrawing(text) {
      const pickNum = (patterns) => {
        for (const p of patterns) {
          const m = text.match(p);
          if (m) return Number(m[1]);
        }
        return null;
      };
      const drawingNo = (text.match(/(15G365-\d|20G367-\d|[A-Z0-9]+[-_][A-Z0-9-]+)/i) || [,""])[1];
      const steel = (text.match(/(?:钢筋|规格)[^\n\rΦ]*?(Φ\s*\d{2})/i) || text.match(/(Φ\s*\d{2})/i) || [,""])[1].replace(/\s+/g, "");
      return {
        drawingNo,
        componentType: text.includes("剪力墙") ? "剪力墙" : "",
        thickness: pickNum([/厚度[^\d]{0,8}(\d+(?:\.\d+)?)/, /墙厚[^\d]{0,8}(\d+(?:\.\d+)?)/]),
        exposed: pickNum([/外露(?:长度)?[^\d]{0,8}(\d+(?:\.\d+)?)/, /伸出(?:长度)?[^\d]{0,8}(\d+(?:\.\d+)?)/]),
        steel,
        sleeve: pickNum([/套筒[^\d]{0,8}(\d+)/, /灌浆套筒[^\d]{0,8}(\d+)/]),
        ring: pickNum([/吊环(?:高度)?[^\d]{0,8}(\d+(?:\.\d+)?)/]),
        sourceSummary: "本地规则从文字中提取，建议人工复核关键数值。",
      };
    }
    WALLS.forEach((wall) => {
      $(`dwgPreset${wall}`).addEventListener("click", () => applyPreset(wall));
      $(`dwgOcr${wall}`).addEventListener("click", () => runDrawingOcr(wall));
      $(`dwgRecognize${wall}`).addEventListener("click", () => runDrawingExtract(wall));
      $(`dwgFile${wall}`).addEventListener("change", (e) => {
        if (!e.target.files || !e.target.files.length) return;
        drawingFiles[wall] = e.target.files[0];
        const badge = $(`dwgBadge${wall}`); badge.className = "badge cyan"; badge.textContent = "已选择";
        $(`dwgInfo${wall}`).textContent = "已选择图纸图片：" + drawingFiles[wall].name + "。请点击 OCR 识别图片文字。";
      });
    });

    function num(id) { const v = parseFloat($(id).value); return isNaN(v) ? null : v; }
    function checkWall(wall) {
      const rows = [];
      const push = (name, dwg, act, tol, pass, note) => { if (act === "" || act === null || act === undefined) return; rows.push({ name, dwg, act, tol, pass, note: note || "" }); };
      const tD = num(`tD${wall}`), tA = num(`tA${wall}`); if (tA !== null) { const dev = tA - (tD || 0); push("厚度", tD ?? "-", tA, "±2mm", Math.abs(dev) <= 2, (dev >= 0 ? "+" : "") + dev.toFixed(1) + "mm"); }
      const dDiff = num(`dDiff${wall}`); if (dDiff !== null && ($(`d1${wall}`).value || $(`d2${wall}`).value)) push("对角线差", "≤3", dDiff, "≤3mm", dDiff <= 3, dDiff.toFixed(1) + "mm");
      const hMax = num(`hMax${wall}`); if (hMax !== null && hMax !== 0) push("高度三点极差", "≤4", hMax, "≤4mm", hMax <= 4, hMax.toFixed(1) + "mm");
      const wMax = num(`wMax${wall}`); if (wMax !== null && wMax !== 0) push("宽度三点极差", "≤4", wMax, "≤4mm", wMax <= 4, wMax.toFixed(1) + "mm");
      const sD = num(`sLenD${wall}`), sA = num(`sLenA${wall}`); if (sA !== null) { const dev = sA - (sD || 0); push("钢筋外露长度", sD ?? "-", sA, "+10/-5mm", dev >= -5 && dev <= 10, (dev >= 0 ? "+" : "") + dev.toFixed(1) + "mm"); }
      const rD = num(`ringHeightD${wall}`), rA = num(`ringHeightA${wall}`); if (rA !== null) { const dev = rA - (rD || 0); push("吊环高度", rD ?? "-", rA, "±5mm", Math.abs(dev) <= 5, (dev >= 0 ? "+" : "") + dev.toFixed(1) + "mm"); }
      const specD = $(`steelSpecD${wall}`).value, specA = $(`steelSpecA${wall}`).value; if (specA) push("钢筋规格", specD || "-", specA, "一致", specD && specD === specA, specD === specA ? "一致" : "不一致");
      const sFail = parseInt($(`sleeveFailed${wall}`).value || 0), sTot = parseInt($(`sleeveTotal${wall}`).value || 0); if (sTot) push("灌浆套筒通透", sTot + " 全通透", (sTot - sFail) + "/" + sTot, "全通透", sFail === 0, sFail === 0 ? "全部通透" : sFail + " 个不通透");
      return rows;
    }
    function runAICheck() {
      let allRows = []; const perWall = {};
      WALLS.forEach((w) => { perWall[w] = checkWall(w); allRows = allRows.concat(perWall[w].map((r) => ({ ...r, wall: w }))); });
      if (!allRows.length) { $("checkResult").innerHTML = `<div class="muted" style="font-size:13px">尚无可核对的实测数据，请先在上方填写实测值，并导入/识别图纸设计值。</div>`; $("checkSummary").className = "badge amber"; $("checkSummary").textContent = "无数据"; return; }
      const fails = allRows.filter((r) => !r.pass);
      const html = WALLS.map((w) => {
        if (!perWall[w].length) return "";
        return `<div style="margin-bottom:12px"><div style="font-weight:700;margin-bottom:6px;color:#9fe9ff">第${w}面墙核对结果</div>
        <div style="overflow-x:auto"><table>
          <thead><tr><th>检验项目</th><th>图纸值</th><th>实测值</th><th>偏差</th><th>允许偏差</th><th>AI判定</th></tr></thead>
          <tbody>${perWall[w].map((r) => `<tr style="${r.pass ? "" : "background:rgba(239,68,68,.08)"}"><td>${r.name}</td><td class="mute2">${r.dwg}</td><td><b>${r.act}</b></td><td>${r.note}</td><td class="mute2">${r.tol}</td><td>${r.pass ? '<span class="badge green">合格</span>' : '<span class="badge red">超差</span>'}</td></tr>`).join("")}</tbody>
        </table></div></div>`;
      }).join("");
      const ok = fails.length === 0;
      $("checkResult").innerHTML = `<div class="card" style="background:rgba(2,6,23,.3);border-color:${ok ? "rgba(16,185,129,.4)" : "rgba(239,68,68,.4)"}">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <i class="fa ${ok ? "fa-check-circle" : "fa-exclamation-triangle"}" style="font-size:22px;color:${ok ? "#6ee7b7" : "#fca5a5"}"></i>
          <div><b style="font-size:16px">${ok ? "AI 核对通过：实测数据与图纸相符" : "AI 核对发现 " + fails.length + " 项超差"}</b>
          <div class="muted" style="font-size:12px">共核对 ${allRows.length} 项 · 合格 ${allRows.length - fails.length} 项 · 超差 ${fails.length} 项</div></div>
        </div>${html}
        ${fails.length ? `<div class="muted" style="font-size:12px;border-left:3px solid var(--danger);padding-left:10px">超差项：${fails.map((r) => `第${r.wall}墙 ${r.name}`).join("、")}，请复核或申请变更。</div>` : `<div class="muted" style="font-size:12px;border-left:3px solid var(--success);padding-left:10px">全部项目符合图纸设计要求，可进入下一道工序。</div>`}
      </div>`;
      $("checkSummary").className = "badge " + (ok ? "green" : "red");
      $("checkSummary").textContent = ok ? "核对通过" : "超差 " + fails.length + " 项";
      if (fails.length && aiEnabled) openAlarmModal(fails.map((r) => `图纸核对超差：第${r.wall}面墙 ${r.name}（实测 ${r.act}，允许 ${r.tol}）`));
      toast(ok ? "AI 核对通过" : "核对完成，发现超差 " + fails.length + " 项");
      genAIReport(allRows, fails, ok);
    }

    // DeepSeek 生成专业核对结论与整改建议（不可用时回退本地结论）
    async function genAIReport(rows, fails, ok) {
      const host = document.createElement("div"); host.style.marginTop = "14px";
      $("checkResult").appendChild(host);
      const live = await AI.available();
      if (!live) {
        host.innerHTML = `<div class="card" style="background:rgba(2,6,23,.3)"><div style="font-weight:700;margin-bottom:6px"><i class="fa fa-lightbulb-o" style="color:#fcd34d"></i> 智能核对结论（本地）</div>
          <div class="muted" style="font-size:13px">${ok ? "各检验项目均在图纸允许偏差范围内，符合设计要求，可进入下一道工序。" : "存在 " + fails.length + " 项超差：" + fails.map((r) => `第${r.wall}墙${r.name}`).join("、") + "。建议复核测量、查明原因（如垫片标高、模板支设、构件本身偏差），必要时申请设计变更，整改并复测合格后方可进入下一工序。"}<br><span class="mute2" style="font-size:12px">（启动平台后端并配置 DeepSeek 后，此处将由 AI 生成更专业的分析与规范引用。）</span></div></div>`;
        return;
      }
      host.innerHTML = `<div class="card" style="background:rgba(2,6,23,.3)"><div style="font-weight:700;margin-bottom:8px"><i class="fa fa-magic" style="color:var(--cyan)"></i> DeepSeek 智能核对分析 <span class="badge cyan" style="margin-left:6px">生成中…</span></div><div id="aiReportBody" class="muted" style="font-size:13.5px;line-height:1.85;white-space:pre-wrap"><span style="display:inline-block;width:18px;height:18px;border:2px solid var(--cyan);border-top:2px solid transparent;border-radius:50%;animation:spin 1s linear infinite;vertical-align:middle"></span> 正在依据规范分析核对结果……</div></div>`;
      const table = rows.map((r) => `第${r.wall}墙|${r.name}|图纸${r.dwg}|实测${r.act}|偏差${r.note}|允许${r.tol}|${r.pass ? "合格" : "超差"}`).join("\n");
      const messages = [
        { role: "system", content: "你是装配式混凝土建筑质量验收专家。基于给定的“预制剪力墙吊装记录图纸核对结果”，依据《混凝土结构工程施工质量验收规范》《装配式混凝土建筑技术标准》给出专业核对意见。请用如下结构简洁输出（总字数 250 字内）：①总体结论（是否符合图纸、能否进入下一工序）；②超差项原因分析与整改建议（逐条，无超差则写“无”）；③相关规范要点提示。不要寒暄。" },
        { role: "user", content: "核对结果（格式：墙号|项目|图纸值|实测值|偏差|允许偏差|判定）：\n" + table + `\n\n共 ${rows.length} 项，超差 ${fails.length} 项。` },
      ];
      try {
        const reply = await AI.chat(messages, { max_tokens: 700, temperature: 0.4 });
        const card = host.querySelector(".card");
        card.querySelector(".badge").className = "badge green"; card.querySelector(".badge").textContent = "DeepSeek";
        host.querySelector("#aiReportBody").textContent = reply;
      } catch (e) {
        host.querySelector("#aiReportBody").innerHTML = `<span style="color:#fca5a5">AI 分析失败：${e.message}</span><br><span class="mute2">已保留上方确定性核对结果，可重试或检查后端/网络。</span>`;
      }
    }
    $("btnAICheck").addEventListener("click", runAICheck);
    $("btnAICheckClear").addEventListener("click", () => { $("checkResult").innerHTML = ""; $("checkSummary").className = "badge"; $("checkSummary").textContent = "尚未核对"; });

    /* 二维码 */
    function verdictText(v) { return v === true ? "合格" : v === false ? "不合格" : "未判定"; }
    function buildInfoQRText() {
      const total = WALLS.length * STEPS_PER_WALL.length; let done = 0; WALLS.forEach((w) => STEPS_PER_WALL.forEach((s) => { if (state.walls[w].steps[s.id].done) done++; }));
      const cids = WALLS.map((wall) => $(`cid${wall}`).value.trim()).filter(Boolean);
      const base = location.href.split("#")[0].split("?")[0];
      const firstCid = cids[0] || "";
      return `${base}?cid=${encodeURIComponent(firstCid)}&rid=${encodeURIComponent(lastSavedRecordId || "draft")}&p=${Math.round((done / total) * 100)}&a=${evaluateAI()}#trace`;
    }
    $("btnGenQR").addEventListener("click", () => { const box = $("qrcode"); box.innerHTML = ""; const text = buildInfoQRText(); $("qrLink").value = text; try { new QRCode(box, { text, width: 200, height: 200, colorDark: "#00e5ff", colorLight: "#0b1220", correctLevel: QRCode.CorrectLevel.L }); } catch (e) { box.innerHTML = '<div style="color:#f87171">二维码生成失败：内容过长</div>'; } });
    $("btnDLQR").addEventListener("click", () => { const canvas = root.querySelector("#qrcode canvas"); if (!canvas) { alert("请先生成二维码"); return; } const a = document.createElement("a"); a.href = canvas.toDataURL("image/jpeg", 0.95); a.download = "双墙体吊装记录二维码.jpg"; a.click(); });

    /* 签名 */
    (function initSign() {
      const c = $("recorderSignature"); const ctx = c.getContext("2d"); ctx.lineWidth = 2.4; ctx.lineCap = "round"; ctx.strokeStyle = "#9fe9ff";
      let drawing = false, lx = 0, ly = 0;
      const pos = (e) => { const r = c.getBoundingClientRect(); const sx = c.width / r.width, sy = c.height / r.height; const p = e.touches ? e.touches[0] : e; return [(p.clientX - r.left) * sx, (p.clientY - r.top) * sy]; };
      const start = (e) => { drawing = true; [lx, ly] = pos(e); }; const draw = (e) => { if (!drawing) return; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y); ctx.stroke(); [lx, ly] = [x, y]; }; const stop = () => (drawing = false);
      ["mousedown","mousemove","mouseup","mouseout"].forEach((t, i) => c.addEventListener(t, [start, draw, stop, stop][i]));
      ["touchstart","touchmove","touchend"].forEach((t, i) => c.addEventListener(t, (e) => { e.preventDefault(); [start, draw, stop][i](e); }));
      $("clearRecorder").addEventListener("click", () => { ctx.clearRect(0, 0, c.width, c.height); recorderSig = null; });
      $("saveRecorder").addEventListener("click", () => { recorderSig = c.toDataURL("image/png"); toast("签名已保存"); });
    })();

    /* 收集/保存/上传/PDF/重置 */
    function collectFormData() {
      const require = (id, msg) => { const v = $(id).value.trim(); if (!v) throw new Error(msg); return v; };
      const common = { workstationNo: require("workstationNo", "请填写工位号"), startTime: $("startTime").value, recorder: require("recorder", "请填写记录人"), crew: require("crew", "请填写施工人员信息"), signatures: { recorder: recorderSig }, meta: { uploadTime: now() } };
      const walls = {};
      WALLS.forEach((wall) => { walls[wall] = { matchSession: require(`matchSession${wall}`, `请选择第${wall}面墙施工场地`), teamId: require(`teamId${wall}`, `请填写第${wall}面墙施工队伍`), componentType: require(`componentType${wall}`, `请选择第${wall}面墙构件类型`), drawingNo: require(`drawingNo${wall}`, `请选择第${wall}面墙图纸编号`), cid: require(`cid${wall}`, `请填写第${wall}面墙构件ID`), pid: require(`pid${wall}`, `请填写第${wall}面墙项目编号`), grid: $(`grid${wall}`).value.trim(), steps: JSON.parse(JSON.stringify(state.walls[wall].steps)), sleeveFailed: parseInt($(`sleeveFailed${wall}`).value || 0), sleeveTotal: parseInt($(`sleeveTotal${wall}`).value || 0), abnormal: { hasAbnormal: root.querySelector(`input[name="hasAbnormal${wall}"]:checked`).value, needChange: root.querySelector(`input[name="needChange${wall}"]:checked`).value, desc: $(`abnormalDesc${wall}`).value.trim() } }; });
      if (!recorderSig) throw new Error('请完成记录人签名并点击"保存签名"');
      return { ...common, walls };
    }
    $("saveData").addEventListener("click", () => { try { const d = collectFormData(); localStorage.setItem("doubleWallLiftingRecord", JSON.stringify(d)); toast("本地保存成功：" + d.meta.uploadTime); } catch (e) { alert(e.message); } });
    $("uploadData").addEventListener("click", async () => {
      try {
        const d = collectFormData(); let passRate = 100;
        WALLS.forEach((wall) => { const total = parseInt($(`sleeveTotal${wall}`).value || 0), failed = parseInt($(`sleeveFailed${wall}`).value || 0); if (total > 0 && failed > 0) passRate -= Math.min(15, Math.round((failed / total) * 15)); STEPS_PER_WALL.forEach((s) => { if (!d.walls[wall].steps[s.id].done) passRate -= 3; if (d.walls[wall].steps[s.id].pass === false) passRate -= 5; }); });
        d.passRate = Math.max(0, Math.min(100, Math.round(passRate))); d.status = d.passRate >= 90 ? "合格" : d.passRate >= 70 ? "预警" : "不合格"; d.uploadTime = d.meta.uploadTime;
        const saved = await Store.add(d); lastSavedRecordId = saved.id || d.id; $("qmUpdate").textContent = now(); toast("已上传至质量监测系统 · 合格率 " + d.passRate + "%");
      } catch (e) { alert(e.message); }
    });
    $("exportPdf").addEventListener("click", () => { const { jsPDF } = window.jspdf; const doc = new jsPDF("l", "mm", "a4"); html2canvas($("recordForm"), { scale: 2, useCORS: true, backgroundColor: "#0b1220" }).then((canvas) => { const img = canvas.toDataURL("image/jpeg", 0.9); const imgWidth = 280, imgHeight = (canvas.height * imgWidth) / canvas.width; doc.addImage(img, "JPEG", 10, 10, imgWidth, imgHeight); if (imgHeight > 270) { doc.addPage(); doc.addImage(img, "JPEG", 10, 10 - imgHeight + 270, imgWidth, imgHeight); } doc.save(`${$("teamId1").value || "未知队伍"}-双墙体吊装记录表.pdf`); }); });
    $("exportJson").addEventListener("click", () => {
      try {
        const d = collectFormData();
        d.exportedAt = now();
        const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${$("workstationNo").value || "吊装记录"}-${Date.now()}.json`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      } catch (e) { alert(e.message); }
    });
    $("resetForm").addEventListener("click", () => {
      if (!confirm("确定重置表单？此操作将清除所有已填写数据！")) return;
      root.querySelectorAll("#recordForm input, #recordForm select, #recordForm textarea").forEach((el) => { if (el.type === "radio") el.checked = el.value === "×" || el.value === "否"; else if (el.type !== "checkbox" && !el.readOnly && el.type !== "file") el.value = ""; });
      WALLS.forEach((wall) => { STEPS_PER_WALL.forEach((s) => { const pc = $(`photos_${s.id}${wall}`); if (pc) pc.innerHTML = ""; const badge = $(`badge_${s.id}${wall}`); if (badge) { badge.className = "badge"; badge.textContent = "未完成"; } state.walls[wall].steps[s.id] = { photos: [], pass: null, done: false }; }); $(`sleeveItems${wall}`).innerHTML = "点击“生成选项”后可逐一勾选通透/不通透"; $(`sleevePassed${wall}`).value = 0; $(`sleeveFailed${wall}`).value = 0; $(`sleeveFailedNos${wall}`).value = ""; $(`sleeveTotal${wall}`).value = 8; $(`dwgBadge${wall}`).className = "badge"; $(`dwgBadge${wall}`).textContent = "未导入"; });
      const sc = $("recorderSignature"); sc.getContext("2d").clearRect(0, 0, sc.width, sc.height); recorderSig = null; $("qrcode").innerHTML = "生成后显示二维码"; $("qrLink").value = ""; $("checkResult").innerHTML = ""; $("checkSummary").className = "badge"; $("checkSummary").textContent = "尚未核对"; updateProgressBar(); evaluateAI(); stopSiren(); closeAlarmModal(); toast("表单已重置");
    });

    /* 质量看板 */
    let chartTrend = null, chartDist = null;
    async function renderQuality() {
      $("qmTime").textContent = now();
      const { total, qualified, warning, unqualified, list } = await Store.stats();
      $("qmCards").innerHTML = [{ label: "总记录", val: total, color: "#9fe9ff" }, { label: "合格", val: qualified, color: "#6ee7b7" }, { label: "预警", val: warning, color: "#fcd34d" }, { label: "不合格", val: unqualified, color: "#fca5a5" }].map((x) => `<div class="kpi"><div class="lbl">${x.label}</div><div class="val" style="background:none;color:${x.color}">${x.val}</div></div>`).join("");
      const tbody = $("qmList"); tbody.innerHTML = "";
      list.slice(-14).reverse().forEach((r) => { const total2 = WALLS.length * STEPS_PER_WALL.length; let done = 0; WALLS.forEach((w) => { const st = r.walls && r.walls[w] && r.walls[w].steps; if (st) Object.values(st).forEach((s) => { if (s.done) done++; }); }); const pct = Math.round((done / total2) * 100); const stCls = r.status === "合格" ? "green" : r.status === "预警" ? "amber" : "red"; const tr = document.createElement("tr"); tr.innerHTML = `<td>${r.id}</td><td>${(r.walls?.[1]?.cid)||"-"} / ${(r.walls?.[2]?.cid)||"-"}</td><td>${r.walls?.[1]?.componentType||"-"}</td><td>${r.walls?.[1]?.matchSession||"-"}</td><td class="mute2">${r.uploadTime||r.meta?.uploadTime||"-"}</td><td><b style="color:#9fe9ff">${r.passRate??"-"}</b></td><td>${pct}%</td><td><span class="badge ${stCls}">${r.status||"-"}</span></td><td><button class="btn btn-sm btn-ghost qmDel" data-id="${r.id}">删除</button></td>`; tbody.appendChild(tr); });
      const ctx1 = $("qualityTrend").getContext("2d"), ctx2 = $("qualityDist").getContext("2d");
      if (chartTrend) chartTrend.destroy(); if (chartDist) chartDist.destroy();
      Chart.defaults.color = "#94a3b8"; Chart.defaults.borderColor = "rgba(148,163,184,.12)";
      chartTrend = new Chart(ctx1, { type: "line", data: { labels: list.slice(-20).map((r) => (r.id || "").slice(-5)), datasets: [{ label: "合格率(%)", data: list.slice(-20).map((r) => r.passRate || 0), borderColor: "#00e5ff", backgroundColor: "rgba(0,229,255,.12)", tension: 0.35, fill: true, pointRadius: 3 }] }, options: { responsive: true, plugins: { legend: { display: false }, title: { display: true, text: "合格率趋势" } }, scales: { y: { min: 0, max: 100 } } } });
      chartDist = new Chart(ctx2, { type: "doughnut", data: { labels: ["合格", "预警", "不合格"], datasets: [{ data: [qualified, warning, unqualified], backgroundColor: ["#10b981", "#f59e0b", "#ef4444"], borderColor: "#0b1220", borderWidth: 2 }] }, options: { plugins: { legend: { position: "bottom" }, title: { display: true, text: "质量分布" } } } });
      $("qmUpdate").textContent = now();
    }
    $("qmList").addEventListener("click", async (e) => {
      const btn = e.target.closest(".qmDel"); if (!btn) return;
      if (!confirm("确定删除这条质量记录？")) return;
      await Store.remove(btn.dataset.id);
      toast("记录已删除");
      renderQuality();
    });

    /* 行内必要样式（动画） */
    if (!document.getElementById("hjSpin")) { const s = document.createElement("style"); s.id = "hjSpin"; s.textContent = "@keyframes spin{to{transform:rotate(360deg)}}.wall-head{display:flex;align-items:center;gap:10px;padding:10px 16px;background:linear-gradient(90deg,rgba(22,93,255,.22),transparent);border-radius:10px;margin-bottom:14px}.wall-head h2{font-size:17px;font-weight:800;color:#9fe9ff;margin:0}.item{margin-bottom:16px}.item>label{font-weight:700;color:#cbd5e1;display:block;margin-bottom:8px}.radioline label{display:inline-flex;align-items:center;gap:5px;margin-right:6px;font-size:13px;color:var(--text-dim)}.radioline input{width:auto}.seg{display:flex;gap:8px;background:rgba(2,6,23,.5);border:1px solid var(--line);border-radius:999px;padding:5px;width:max-content;margin:0 auto 18px}.seg button{border:0;background:transparent;color:var(--text-dim);font-weight:700;padding:8px 22px;border-radius:999px;cursor:pointer;transition:.2s}.seg button.active{background:linear-gradient(90deg,var(--primary),#3b82f6);color:#fff;box-shadow:0 0 14px rgba(56,189,248,.3)}"; document.head.appendChild(s); }

    updateProgressBar(); evaluateAI();
  },
});
