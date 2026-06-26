/* ====================== 模块：施工流程 / 创新成果 / AI作业票 / 一码溯源 ====================== */
(function () {
  // 注入静态模块所需样式（一次）
  if (!document.getElementById("staticStyle")) {
    const s = document.createElement("style"); s.id = "staticStyle";
    s.textContent = `
    .phase{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}.phase .ph{flex:1;min-width:200px;border:1px solid var(--line);border-radius:12px;padding:14px 16px;background:linear-gradient(160deg,rgba(20,32,60,.7),rgba(10,17,34,.7))}.phase .ph h4{margin:0 0 6px;font-size:15px;color:#9fe9ff}
    .step{display:flex;gap:16px;margin-bottom:14px}.step .sn{flex-shrink:0;width:46px;height:46px;border-radius:13px;display:grid;place-items:center;font-weight:900;font-size:18px;color:#021;background:linear-gradient(135deg,var(--cyan),var(--primary))}.step h3{margin:0 0 4px;font-size:16px}
    .sub{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.sub span{font-size:12px;padding:4px 10px;border-radius:8px;background:rgba(56,189,248,.1);border:1px solid var(--line);color:#cbd5e1}
    .note{margin-top:8px;font-size:13px;color:var(--text-dim);border-left:3px solid var(--success);padding-left:10px}
    .tool{display:flex;align-items:center;gap:10px}.tool .ti{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-size:18px;background:linear-gradient(135deg,#6366f1,#a855f7)}
    .innov{position:relative;padding-left:18px}.innov::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:3px;background:linear-gradient(180deg,var(--cyan),var(--purple))}.innov h3{margin:0 0 6px;font-size:17px}
    .num-big{font-size:30px;font-weight:900;background:linear-gradient(90deg,#fff,#9fe9ff);-webkit-background-clip:text;background-clip:text;color:transparent}
    .award{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid rgba(148,163,184,.12)}.award .ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex-shrink:0;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff}
    .scene{text-align:center;padding:18px 12px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(160deg,rgba(20,32,60,.7),rgba(10,17,34,.7))}.scene i{font-size:30px;color:var(--cyan)}.scene b{display:block;margin-top:8px}
    .searchbar{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}.searchbar input{flex:1;min-width:220px}
    .cidpill{display:inline-block;margin:4px 6px 0 0;padding:5px 12px;border-radius:8px;cursor:pointer;font-size:13px;background:rgba(56,189,248,.1);border:1px solid var(--line);color:#cbd5e1}.cidpill:hover{border-color:var(--cyan);color:#fff}
    .timeline .ev{display:flex;gap:14px;padding-bottom:16px;position:relative}.timeline .ev::before{content:"";position:absolute;left:16px;top:34px;bottom:-2px;width:2px;background:var(--line)}.timeline .ev:last-child::before{display:none}.timeline .ev .dotc{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-size:14px;z-index:1}
    .trace-photos{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.trace-photos img{width:92px;height:92px;object-fit:cover;border-radius:8px;border:1px solid var(--line-strong);background:#06101f}
    .idcard{display:flex;gap:18px;flex-wrap:wrap;align-items:center}.idcard .qr{background:#0b1220;padding:10px;border-radius:12px;border:1px solid var(--line)}
    .ticket-form label{display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-dim)}.ticket-form input,.ticket-form select{width:100%}
    .ticket-meter{height:10px;border-radius:999px;background:#07101f;border:1px solid var(--line);overflow:hidden}.ticket-meter i{display:block;height:100%;width:0;background:linear-gradient(90deg,#22c55e,#06b6d4);transition:width .25s ease}
    .risk-list{display:grid;gap:8px}.risk-item{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:1px solid var(--line);border-radius:10px;background:rgba(15,23,42,.58)}.risk-item i{margin-top:2px}.risk-item.bad i{color:#fca5a5}.risk-item.good i{color:#6ee7b7}.ticket-card{border-left:3px solid var(--cyan)}
    .ops-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px}.ops-tabs button{border:1px solid var(--line);background:rgba(15,23,42,.65);color:var(--text-dim);border-radius:9px;padding:8px 12px;font-weight:800}.ops-tabs button.on{color:#021;background:linear-gradient(135deg,var(--cyan),#38bdf8);border-color:transparent}.ops-view{display:none}.ops-view.on{display:block}.work-card{border-left:3px solid var(--cyan);background:rgba(15,23,42,.55);border-radius:10px;padding:12px;margin-bottom:10px}.heat-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}.heat-cell{border:1px solid var(--line);border-radius:10px;padding:12px;text-align:center;background:rgba(15,23,42,.55)}.heat-cell.hot{border-color:rgba(239,68,68,.45);background:rgba(239,68,68,.12)}.heat-cell.warn{border-color:rgba(245,158,11,.45);background:rgba(245,158,11,.10)}.score-row{display:grid;grid-template-columns:1fr 80px 90px;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid rgba(148,163,184,.12)}.score-bar{height:8px;border-radius:999px;background:#07101f;overflow:hidden;border:1px solid var(--line)}.score-bar i{display:block;height:100%;background:linear-gradient(90deg,#22c55e,#06b6d4)}
    code,pre{font-family:Consolas,Menlo,monospace}pre{background:#05070f;border:1px solid var(--line);border-radius:10px;padding:12px 14px;overflow:auto;font-size:13px;color:#9fe9ff}`;
    document.head.appendChild(s);
  }
  const M = (window.MODULES = window.MODULES || []);

  /* ---------------- 施工流程 ---------------- */
  M.push({ id: "liucheng", label: "施工流程", icon: "fa-list-ol", render(el) {
    el.innerHTML = `
    <h2 class="section-title"><span class="i"></span>标准施工流程 · “缩模验工艺，五步定标准，参数控精度”</h2>
    <p class="muted" style="margin:0 0 18px">本项目施工严格围绕“人机料法环”管理核心，系统划分为 <b style="color:#9fe9ff">准备 → 施工 → 工完场清</b> 三个阶段；以 a 轴与 2 轴为轴线吊装和美乡村 3 号房 1/2 号剪力墙。</p>
    <div class="phase">
      <div class="ph"><h4><i class="fa fa-check-square-o"></i> 准备阶段</h4><div class="muted" style="font-size:13px">安全技术交底 · 工具设备检查 · 外观尺寸测量</div></div>
      <div class="ph"><h4><i class="fa fa-cogs"></i> 施工阶段</h4><div class="muted" style="font-size:13px">五步标准化流程，速度 + 精度双达标</div></div>
      <div class="ph"><h4><i class="fa fa-trash-o"></i> 工完场清</h4><div class="muted" style="font-size:13px">工具归位 · 资料整理 · 垃圾分类（回收率 90%）</div></div>
    </div>
    <div class="card" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span>准备阶段 · 安全技术交底</div>
      <div class="grid g3">
        <div><div class="chip">三确认</div><p class="muted" style="font-size:13px">确认环境安全 · 确认设备完好 · 确认构件合格</p></div>
        <div><div class="chip">一复核</div><p class="muted" style="font-size:13px">复核施工方案</p></div>
        <div><div class="chip">两到位</div><p class="muted" style="font-size:13px">安全交底到位 · 责任分工到位</p></div>
      </div><div class="note">未达标准，坚决不试吊；作业超限，立停、报告、复核后再启动。</div></div>
    <div class="card" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span>施工阶段 · 五步标准流程</div>
      <div class="step"><div class="sn">1</div><div><h3>定位弹线 <span class="badge cyan">墙体边线 + 双控线</span></h3><div class="muted" style="font-size:14px">采用粉斗弹线，线条清晰，从源头杜绝定位偏移，确保构件对接。</div><div class="sub"><span>① 定位划点</span><span>② 弹墙体边线</span><span>③ 弹墙体控制线</span><span>影像采集留痕</span></div></div></div>
      <div class="step"><div class="sn">2</div><div><h3>基层处理 <span class="badge cyan">钢筋清理 · 基层质控</span></h3><div class="muted" style="font-size:14px">钢筋除锈彻底，确保与灌浆料粘结力；钢筋定位与图纸相符；测量垂直度与外露长度。</div><div class="sub"><span>① 钢筋除锈</span><span>② 钢筋定位及测量</span><span>③ 基层凿毛</span></div><div class="note">凿毛深度 ≥3mm，面积占比 >80%；外露长度 ≥8d，符合锚固规范。</div></div></div>
      <div class="step"><div class="sn">3</div><div><h3>垫片找平 <span class="badge cyan">垫片位置标高双控</span></h3><div class="muted" style="font-size:14px">地面设置垫片并标高找平，保证墙体垂直；架设水准仪测量后视点高度与垫片高度。</div><div class="sub"><span>① 放置垫片（距边线 ≥40mm）</span><span>② 架设水准仪</span><span>③ 测量读数</span></div></div></div>
      <div class="step"><div class="sn">4</div><div><h3>吊装固定 <span class="badge cyan">速度 + 精度双达标</span></h3><div class="muted" style="font-size:14px">连接吊具→试吊（高度 300mm 停顿 3 秒）→吊运落位→安装斜支撑临时固定→数显靠尺测量垂直度。</div><div class="sub"><span>① 连接吊具（夹角 >45°）</span><span>② 试吊及吊运</span><span>③ 落位及固定</span><span>④ 测量垂直度</span></div><div class="note">无关人员禁止入内，安全距离 ≥ 构件高度的 1.5 倍；激光定位器对孔，吊装效率提升超 15%。</div></div></div>
      <div class="step"><div class="sn">5</div><div><h3>节点连接 <span class="badge cyan">规范化 + 团队协作</span></h3><div class="muted" style="font-size:14px">安装钢筋连接套筒→插放纵筋→放置纵筋定位器→斜扣绑扎法绑扎→布置保护层卡子→防侧漏胶条→模板选型与对拉螺杆固定。</div><div class="sub"><span>① 插放纵筋</span><span>② 绑扎钢筋</span><span>③ 安装模板</span></div><div class="note">纵筋定位器精准固定纵筋位置，绑扎不偏移；模板接缝间隙 ≤3mm（塞尺检测），斜支撑安装牢固。</div></div></div>
    </div>
    <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span>配套创新工具</div>
      <div class="grid g3">
        <div class="tool"><div class="ti"><i class="fa fa-crosshairs"></i></div><div><b>激光定位器</b><div class="muted" style="font-size:12px">替代镜面反射，快速精准对孔，零碰撞</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-arrows-v"></i></div><div><b>数显靠尺</b><div class="muted" style="font-size:12px">垂直度可视化，误差 ±0.1mm/m</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-align-justify"></i></div><div><b>纵筋定位器</b><div class="muted" style="font-size:12px">固定纵筋位置，绑扎不偏移</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-microchip"></i></div><div><b>装配慧检 AI 系统</b><div class="muted" style="font-size:12px">数据比对 · 超差报警 · 图纸核对</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-rss"></i></div><div><b>环境检测器</b><div class="muted" style="font-size:12px">风速 / 温度实时判定作业条件</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-sitemap"></i></div><div><b>智慧工地平台</b><div class="muted" style="font-size:12px">人机料法环全要素监控</div></div></div>
      </div>
    </div>`;
  }});

  /* ---------------- 创新成果 ---------------- */
  M.push({ id: "chengguo", label: "创新成果", icon: "fa-trophy", render(el) {
    el.innerHTML = `
    <h2 class="section-title"><span class="i"></span>项目创新 · 三大创新点</h2>
    <div class="grid g3" style="margin-bottom:26px">
      <div class="card glow"><span class="chip">创新点一</span><div class="innov" style="margin-top:12px"><h3>质量管控数字化</h3><p class="muted" style="font-size:14px">自主研发<b style="color:#9fe9ff">装配慧检 AI 系统</b>，智慧工地全时监控，解决纸质易污损、难追溯、效率低的痛点。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge cyan">实时采集</span><span class="badge cyan">智能比对</span><span class="badge cyan">超差报警</span><span class="badge cyan">图纸核对</span></div></div></div>
      <div class="card glow"><span class="chip">创新点二</span><div class="innov" style="margin-top:12px"><h3>施工工具革新化</h3><p class="muted" style="font-size:14px">吊装定位激光化、纵筋定位精准化，<b style="color:#9fe9ff">速装周期短、易操队伍熟、质控数据明、隐患皆消除</b>。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge green">激光定位器</span><span class="badge green">数显靠尺</span><span class="badge green">纵筋定位器</span></div></div></div>
      <div class="card glow"><span class="chip">创新点三</span><div class="innov" style="margin-top:12px"><h3>工艺流程精益化</h3><p class="muted" style="font-size:14px">缩模验工艺、五步定标准、参数控精度，形成<b style="color:#9fe9ff">乡村可复制</b>的预制构件施工方案。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge amber">1:5 缩尺模型</span><span class="badge amber">标准五步</span><span class="badge amber">参数控精度</span></div></div></div>
    </div>
    <h2 class="section-title"><span class="i"></span>项目成果 · 关键成果</h2>
    <div class="card" style="margin-bottom:26px">
      <div class="award"><div class="ic"><i class="fa fa-trophy"></i></div><div><b>装配式建筑施工多维度协同系统及应用方法</b><div class="muted" style="font-size:13px">《一种用于装配式墙面砖镶贴和嵌缝精度的设备及方法》，对人员、机械、工序一体化协同管控优化，荣获“鲁新杯”山东省建设建材系统“五小”创新成果竞赛<b style="color:#fcd34d">一等奖</b>。效率提升超 30%，整体施工周期缩短 15%。</div></div></div>
      <div class="award"><div class="ic"><i class="fa fa-file-text"></i></div><div><b>行业标准编制成果</b><div class="muted" style="font-size:13px">参与校企合作企业牵头编制《装配式节能结构一体化混凝土墙板应用技术规程》（CECS 标准），填补该领域行业规范空白，为技术落地、产品推广及质量管控提供权威标准依据。</div></div></div>
      <div class="award" style="border:0"><div class="ic"><i class="fa fa-flask"></i></div><div><b>质量技术攻坚</b><div class="muted" style="font-size:13px">攻关完成《降低装配式混凝土保护层开裂率》成果，显著提升构件耐久性与施工稳定性，荣获 2025 年工程建设质量管理小组成果大赛<b style="color:#fcd34d">二等奖</b>。</div></div></div>
    </div>
    <h2 class="section-title"><span class="i"></span>应用价值</h2>
    <div class="grid g3" style="margin-bottom:18px">
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>产教融合价值</div><div class="grid g2" style="text-align:center;margin-bottom:10px"><div><div class="num-big">30.7%</div><div class="mute2" style="font-size:12px">技能提升</div></div><div><div class="num-big">100%</div><div class="mute2" style="font-size:12px">素质提升</div></div></div><p class="muted" style="font-size:13px;margin:0">以 95% 高装配率施工流程、毫米级精度构件安装融入课程体系，学生通过模块拼装、标准化实训直接掌握行业急需技能。</p></div>
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>行业价值</div><div class="grid g2" style="text-align:center;margin-bottom:10px"><div><div class="num-big">20%</div><div class="mute2" style="font-size:12px">建材损耗降低</div></div><div><div class="num-big">95%</div><div class="mute2" style="font-size:12px">高装配率</div></div></div><p class="muted" style="font-size:13px;margin:0">打造“低碳高效 + 乡村适配”创新应用范本，契合国家“双碳”战略，为行业绿色转型提供可落地参考。</p></div>
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>推广价值</div><div class="grid g3" style="margin:6px 0 10px"><div class="scene"><i class="fa fa-home"></i><b style="font-size:13px">乡村新居</b></div><div class="scene"><i class="fa fa-wheelchair"></i><b style="font-size:13px">养老配套</b></div><div class="scene"><i class="fa fa-soccer-ball-o"></i><b style="font-size:13px">体育场馆</b></div></div><p class="muted" style="font-size:13px;margin:0">多场景可复制的绿色建造方案，可在城市更新、灾后重建、文旅配套等同类场景快速复制推广。</p></div>
    </div>
    <div class="card glow" style="text-align:center;padding:30px"><div class="section-title" style="justify-content:center;font-size:18px"><span class="i"></span>展望未来</div><p style="max-width:760px;margin:6px auto;color:var(--text-dim);line-height:1.9">推动“智慧建房”如搭积木般简单普惠，让乡村施工队伍易学易用；为每栋农房建立全生命周期“数字档案”，通过一码溯源实现长效智能运维。<br><b style="color:#9fe9ff">用创新筑巢，为乡亲圆梦，为建设宜居宜业和美乡村贡献新时代青春力量！</b></p></div>`;
  }});

  /* ---------------- AI 作业票 ---------------- */
  M.push({ id: "zuoyepiao", label: "AI作业票", icon: "fa-wpforms",
    render(el) {
      el.innerHTML = `
      <h2 class="section-title"><span class="i"></span>AI 作业票 · 三确认一复核两到位</h2>
      <p class="muted" style="margin:0 0 18px">对照稿子中的吊装关键控制点，把“未达标准，坚决不试吊；作业超限，立停、报告、复核后再启动”做成可执行判定。DeepSeek 在线时会生成专业整改闭环建议，离线时按本地规则兜底。</p>
      <div class="grid g3" style="margin-bottom:18px">
        <div class="card glow"><div class="section-title" style="font-size:15px"><span class="i"></span>准吊指数</div><div class="num-big" id="ticketScore">--%</div><div class="ticket-meter"><i id="ticketBar"></i></div><p class="muted" id="ticketScoreText" style="font-size:13px;margin:10px 0 0">等待现场数据复核</p></div>
        <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>控制口令</div><p id="ticketCommand" style="font-size:20px;font-weight:900;margin:0;color:#9fe9ff">先复核，再试吊</p><p class="muted" style="font-size:13px;margin:10px 0 0">自动输出“准许试吊”或“立停-报告-复核-整改”。</p></div>
        <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>AI 状态</div><span id="ticketAiBadge" class="badge amber">检测中...</span><p class="muted" style="font-size:13px;margin:10px 0 0">Key 只在后端保存，前端只调用代理接口。</p></div>
      </div>
      <div class="cols2">
        <div class="card">
          <div class="section-title" style="font-size:16px"><span class="i"></span>现场复核录入</div>
          <div class="grid g3 ticket-form">
            <label>风速 m/s<input id="tkWind" type="number" step="0.1" value="4.2"></label>
            <label>温度 ℃<input id="tkTemp" type="number" step="0.1" value="22"></label>
            <label>吊具夹角 °<input id="tkAngle" type="number" step="1" value="58"></label>
            <label>试吊高度 mm<input id="tkTrialHeight" type="number" step="1" value="300"></label>
            <label>停顿秒数<input id="tkPause" type="number" step="0.5" value="3"></label>
            <label>安全距离倍数<input id="tkDistance" type="number" step="0.1" value="1.6"></label>
            <label>凿毛深度 mm<input id="tkRoughDepth" type="number" step="0.1" value="3.2"></label>
            <label>凿毛面积 %<input id="tkRoughArea" type="number" step="1" value="86"></label>
            <label>垫片距边线 mm<input id="tkGasket" type="number" step="1" value="45"></label>
            <label>构件编号<input id="tkCid" value="WQ-3F-A5-01"></label>
            <label>施工轴线<input id="tkGrid" value="3号房 a轴/2轴"></label>
            <label>责任班组<input id="tkTeam" value="装配一组"></label>
          </div>
          <div class="grid g2 ticket-form" style="margin-top:14px">
            <label>套筒通透<select id="tkSleeve"><option value="1">已全数通透</option><option value="0">存在未通透</option></select></label>
            <label>构件合格<select id="tkComponent"><option value="1">外观/尺寸合格</option><option value="0">构件待整改</option></select></label>
            <label>设备完好<select id="tkDevice"><option value="1">吊具设备完好</option><option value="0">设备异常</option></select></label>
            <label>安全交底<select id="tkBrief"><option value="1">已交底到位</option><option value="0">未交底</option></select></label>
            <label>责任分工<select id="tkDuty"><option value="1">已分工到人</option><option value="0">未分工</option></select></label>
            <label>方案复核<select id="tkPlan"><option value="1">已复核方案</option><option value="0">未复核</option></select></label>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
            <button id="btnTicketRun" class="btn btn-cyan"><i class="fa fa-magic"></i> 生成AI作业票</button>
            <button id="btnTicketFix" class="btn btn-primary"><i class="fa fa-wrench"></i> 一键整改闭环</button>
            <button id="btnTicketClear" class="btn btn-ghost"><i class="fa fa-trash-o"></i> 清空历史</button>
          </div>
        </div>
        <div class="card">
          <div class="section-title" style="font-size:16px"><span class="i"></span>判定与AI建议</div>
          <div id="ticketRisk" class="risk-list"></div>
          <div id="ticketReport" class="card ticket-card" style="margin-top:14px;background:rgba(6,16,31,.72)"><span class="mute2">点击生成后显示作业票和整改建议。</span></div>
        </div>
      </div>
      <div class="card" style="margin-top:18px">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><div class="section-title" style="font-size:16px;margin:0"><span class="i"></span>作业票历史</div><span class="badge cyan" id="ticketCount">0 条</span></div>
        <div id="ticketHistory" style="margin-top:12px"></div>
      </div>`;
      this.setup(el);
    },
    onShow(el) { if (this._refresh) this._refresh(); },
    setup(root) {
      const { toast, now, AI } = window.Platform;
      const q = (id) => root.querySelector("#" + id);
      const key = "zhuang_work_tickets_v1";
      const fields = ["tkWind", "tkTemp", "tkAngle", "tkTrialHeight", "tkPause", "tkDistance", "tkRoughDepth", "tkRoughArea", "tkGasket", "tkCid", "tkGrid", "tkTeam", "tkSleeve", "tkComponent", "tkDevice", "tkBrief", "tkDuty", "tkPlan"];
      const num = (id) => Number(q(id).value || 0);
      const yes = (id) => q(id).value === "1";
      function load() { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } }
      function save(list) { localStorage.setItem(key, JSON.stringify(list.slice(0, 30))); }
      function readData() {
        return {
          cid: q("tkCid").value.trim() || "未填写",
          grid: q("tkGrid").value.trim() || "未填写",
          team: q("tkTeam").value.trim() || "未填写",
          wind: num("tkWind"), temp: num("tkTemp"), angle: num("tkAngle"),
          trialHeight: num("tkTrialHeight"), pause: num("tkPause"), distance: num("tkDistance"),
          roughDepth: num("tkRoughDepth"), roughArea: num("tkRoughArea"), gasket: num("tkGasket"),
          sleeve: yes("tkSleeve"), component: yes("tkComponent"), device: yes("tkDevice"),
          brief: yes("tkBrief"), duty: yes("tkDuty"), plan: yes("tkPlan"),
        };
      }
      function checks(d) {
        return [
          { k: "环境安全", ok: d.wind <= 10.8 && d.temp >= 5 && d.temp <= 38, good: `风速 ${d.wind}m/s、温度 ${d.temp}℃，符合吊装窗口`, bad: `风速需≤10.8m/s且温度宜 5-38℃，当前 ${d.wind}m/s / ${d.temp}℃` },
          { k: "设备完好", ok: d.device && d.angle > 45, good: `设备完好，吊具夹角 ${d.angle}° >45°`, bad: `设备需完好且吊具夹角>45°，当前 ${d.angle}°` },
          { k: "构件合格", ok: d.component && d.sleeve, good: "构件外观/尺寸合格，灌浆套筒已全数通透", bad: "构件或套筒通透性未满足，禁止试吊" },
          { k: "方案复核", ok: d.plan, good: "施工方案已复核", bad: "施工方案未复核" },
          { k: "两到位", ok: d.brief && d.duty, good: "安全交底和责任分工均已到位", bad: "安全交底或责任分工未到位" },
          { k: "试吊控制", ok: Math.abs(d.trialHeight - 300) <= 20 && d.pause >= 3 && d.distance >= 1.5, good: `试吊 ${d.trialHeight}mm、停顿 ${d.pause}s、安全距离 ${d.distance}倍`, bad: `试吊需约300mm停顿≥3s，安全距离≥1.5倍；当前 ${d.trialHeight}mm/${d.pause}s/${d.distance}倍` },
          { k: "基层与垫片", ok: d.roughDepth >= 3 && d.roughArea >= 80 && d.gasket > 40, good: `凿毛 ${d.roughDepth}mm / ${d.roughArea}%，垫片距边 ${d.gasket}mm`, bad: `凿毛需≥3mm且面积≥80%，垫片距边线>40mm；当前 ${d.roughDepth}mm/${d.roughArea}%/${d.gasket}mm` },
        ];
      }
      function renderRisk(items) {
        q("ticketRisk").innerHTML = items.map((x) => `<div class="risk-item ${x.ok ? "good" : "bad"}"><i class="fa ${x.ok ? "fa-check-circle" : "fa-exclamation-triangle"}"></i><div><b>${x.k}</b><div class="muted" style="font-size:13px">${x.ok ? x.good : x.bad}</div></div></div>`).join("");
      }
      function localReport(d, items) {
        const fails = items.filter((x) => !x.ok);
        if (!fails.length) return `【准许试吊】${d.cid}（${d.grid}）三确认、一复核、两到位均满足；按试吊300mm停顿3秒、无关人员保持≥1.5倍构件高度安全距离执行，关键节点继续拍照上传。`;
        return `【立停-报告-复核-整改】${d.cid} 存在 ${fails.length} 项风险：${fails.map((x) => x.k).join("、")}。请立即停止试吊，通知项目技术负责人复核，完成整改并重新生成作业票后再启动。`;
      }
      function renderHistory() {
        const list = load();
        q("ticketCount").textContent = list.length + " 条";
        q("ticketHistory").innerHTML = list.length ? list.map((t) => `<div class="award"><div class="ic" style="background:${t.pass ? "linear-gradient(135deg,#10b981,#06b6d4)" : "linear-gradient(135deg,#f59e0b,#ef4444)"}"><i class="fa ${t.pass ? "fa-check" : "fa-warning"}"></i></div><div><b>${t.cid} · ${t.command}</b><div class="muted" style="font-size:13px">${t.time} · ${t.grid} · ${t.team} · 准吊指数 ${t.score}%</div><div class="mute2" style="font-size:12px;margin-top:4px">${t.summary}</div></div></div>`).join("") : '<span class="mute2">暂无历史作业票。</span>';
      }
      async function generate(fixOnly) {
        const d = readData();
        const items = checks(d);
        const pass = items.every((x) => x.ok);
        const score = Math.round(items.filter((x) => x.ok).length / items.length * 100);
        const command = pass ? "准许试吊" : "立停-报告-复核-整改";
        q("ticketScore").textContent = score + "%";
        q("ticketBar").style.width = score + "%";
        q("ticketCommand").textContent = command;
        q("ticketCommand").style.color = pass ? "#6ee7b7" : "#fca5a5";
        q("ticketScoreText").textContent = pass ? "全部关键项达标，可进入试吊确认" : "存在未达标项，禁止试吊";
        renderRisk(items);
        let report = localReport(d, items);
        q("ticketReport").innerHTML = `<b>${fixOnly ? "整改闭环生成中" : "AI 作业票生成中"}...</b><div class="muted" style="font-size:13px;margin-top:8px">${report}</div>`;
        try {
          if (await AI.available()) {
            const prompt = `请基于装配式剪力墙吊装作业票数据，输出一份简洁专业的${fixOnly ? "整改闭环单" : "AI作业票"}。要求包含：判定口令、主要风险、整改措施、复核要求、拍照留痕点。数据=${JSON.stringify({ data: d, checks: items, pass, score }, null, 2)}`;
            report = await AI.chat([
              { role: "system", content: "你是装配式混凝土构件安装的质量安全总工，回答必须专业、具体、适合施工现场执行，控制在260字内。" },
              { role: "user", content: prompt },
            ], { max_tokens: 620, temperature: 0.35 });
          }
        } catch (e) {
          report += `\n\n（AI代理暂不可用，已使用本地规则生成；原因：${e.message}）`;
        }
        q("ticketReport").innerHTML = `<b>${command} · ${d.cid}</b><pre style="white-space:pre-wrap;margin:10px 0 0;color:#dbeafe">${report}</pre>`;
        const list = load();
        list.unshift({ id: Date.now(), time: now(), cid: d.cid, grid: d.grid, team: d.team, score, pass, command, summary: report.slice(0, 120) });
        save(list);
        renderHistory();
        toast(pass ? "作业票已生成：准许试吊" : "作业票已生成：需整改复核");
      }
      fields.forEach((id) => q(id).addEventListener("change", () => {
        const d = readData(); const items = checks(d); const score = Math.round(items.filter((x) => x.ok).length / items.length * 100);
        q("ticketScore").textContent = score + "%"; q("ticketBar").style.width = score + "%"; renderRisk(items);
      }));
      q("btnTicketRun").addEventListener("click", () => generate(false));
      q("btnTicketFix").addEventListener("click", () => generate(true));
      q("btnTicketClear").addEventListener("click", () => { if (confirm("确认清空作业票历史？")) { localStorage.removeItem(key); renderHistory(); toast("作业票历史已清空"); } });
      AI.available().then((ok) => { q("ticketAiBadge").className = "badge " + (ok ? "green" : "amber"); q("ticketAiBadge").textContent = ok ? "DeepSeek 在线" : "本地规则兜底"; });
      this._refresh = renderHistory;
      renderHistory();
      const d = readData(); renderRisk(checks(d));
    },
  });

  /* ---------------- AI 闭环中心 ---------------- */
  M.push({ id: "aiCenter", label: "AI闭环中心", icon: "fa-magic",
    render(el) {
      el.innerHTML = `
      <h2 class="section-title"><span class="i"></span>AI 闭环中心 · 派单 / 规范 / 日志 / 评分</h2>
      <p class="muted" style="margin:0 0 18px">面向真实施工管理，把“发现问题”继续推进到“AI派单、规范依据、整改复检、日志归档、班组评分”，让平台从展示型看板变成可执行的质量闭环系统。</p>
      <div class="ops-tabs">
        <button class="on" data-ops="orders"><i class="fa fa-tasks"></i> 整改派单</button>
        <button data-ops="spec"><i class="fa fa-book"></i> 规范助手</button>
        <button data-ops="log"><i class="fa fa-file-text-o"></i> AI施工日志</button>
        <button data-ops="risk"><i class="fa fa-area-chart"></i> 风险热力/班组评分</button>
      </div>

      <div class="ops-view on" id="ops_orders">
        <div class="cols2">
          <div class="card">
            <div class="section-title" style="font-size:16px"><span class="i"></span>AI 整改派单</div>
            <div class="grid g2 ticket-form">
              <label>问题类型<select id="woType"><option>尺寸超差</option><option>套筒不通透</option><option>钢筋偏位</option><option>安全距离不足</option><option>BHI健康预警</option></select></label>
              <label>风险等级<select id="woLevel"><option>一般</option><option>较大</option><option>重大</option></select></label>
              <label>构件/区域<input id="woCid" value="WQ-3F-A5-01"></label>
              <label>责任班组<input id="woTeam" value="装配一组"></label>
            </div>
            <label class="muted" style="display:block;margin-top:12px">问题描述<textarea id="woDesc" rows="4" placeholder="例如：第1面墙高度三点差值超过10mm，需复核垫片标高和斜支撑固定。"></textarea></label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
              <button id="btnCreateWO" class="btn btn-cyan"><i class="fa fa-magic"></i> AI生成整改工单</button>
              <button id="btnSeedWO" class="btn btn-ghost"><i class="fa fa-refresh"></i> 注入示例工单</button>
            </div>
          </div>
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div class="section-title" style="font-size:16px;margin:0"><span class="i"></span>闭环工单</div><span id="woCount" class="badge cyan">0项</span></div>
            <div id="woList" style="margin-top:12px"></div>
          </div>
        </div>
      </div>

      <div class="ops-view" id="ops_spec">
        <div class="cols2">
          <div class="card">
            <div class="section-title" style="font-size:16px"><span class="i"></span>AI 规范知识库问答</div>
            <textarea id="specQ" rows="5" placeholder="问：吊装前需要检查哪些条件？灌浆套筒不通透怎么处理？裂缝监测报警怎么办？"></textarea>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
              <button id="btnSpecAsk" class="btn btn-cyan"><i class="fa fa-comments"></i> AI查询规范</button>
              <button class="btn btn-ghost btn-sm spec-fast" data-q="吊装前三确认一复核两到位怎么执行？">吊装前复核</button>
              <button class="btn btn-ghost btn-sm spec-fast" data-q="灌浆套筒不通透如何整改复检？">套筒整改</button>
            </div>
          </div>
          <div class="card">
            <div class="section-title" style="font-size:16px"><span class="i"></span>规范答复</div>
            <div id="specAns" class="ai-report">等待提问。AI 会结合装配式施工标准、质量验收和现场安全管理要点回答。</div>
          </div>
        </div>
      </div>

      <div class="ops-view" id="ops_log">
        <div class="card">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><div class="section-title" style="font-size:16px;margin:0"><span class="i"></span>AI 施工日志 / 日报</div><button id="btnGenLog" class="btn btn-cyan"><i class="fa fa-file-text-o"></i> 生成今日施工日志</button></div>
          <div id="dailyLog" class="ai-report" style="margin-top:12px">将自动汇总吊装记录、质量合格率、整改工单、风险点和次日计划。</div>
        </div>
      </div>

      <div class="ops-view" id="ops_risk">
        <div class="cols2">
          <div class="card">
            <div class="section-title" style="font-size:16px"><span class="i"></span>轴线/构件风险热力图</div>
            <div id="heatMap" class="heat-grid"></div>
          </div>
          <div class="card">
            <div class="section-title" style="font-size:16px"><span class="i"></span>班组质量评分榜</div>
            <div id="teamScore"></div>
          </div>
        </div>
      </div>`;
      this.setup(el);
    },
    onShow(el) { if (this._refresh) this._refresh(); },
    setup(root) {
      const { toast, now, Store, AI } = window.Platform;
      const q = (id) => root.querySelector("#" + id);
      const key = "zhuang_workorders_v1";
      const load = () => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
      const save = (list) => localStorage.setItem(key, JSON.stringify(list.slice(0, 60)));
      const localAdvice = (d) => {
        const map = {
          "尺寸超差": "复核测量基准线、垫片标高和斜支撑固定，整改后对同组高度/宽度三点复测，偏差合格后销项。",
          "套筒不通透": "暂停灌浆，清理套筒孔道并通球复验，保留复检照片和编号，合格后再进入节点连接。",
          "钢筋偏位": "复核轴线和定位器，调整纵筋位置，确保外露长度、间距和保护层满足图纸要求。",
          "安全距离不足": "立即清场，设置警戒线，安全距离不小于构件高度1.5倍，重新交底后作业。",
          "BHI健康预警": "提高传感器采样频率，复核裂缝、倾角、位移点位，形成运维巡检工单并归档。",
        };
        return map[d.type] || "按预警-派单-整改-复检-销项流程闭环，关键节点拍照留痕。";
      };
      function renderOrders() {
        const list = load();
        q("woCount").textContent = list.length + "项";
        q("woList").innerHTML = list.length ? list.map((o) => `<div class="work-card"><div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><b>${o.type} · ${o.cid}</b><span class="badge ${o.status === "已销项" ? "green" : o.level === "重大" ? "red" : "amber"}">${o.status}</span></div><div class="muted" style="font-size:13px;margin:6px 0">${o.team} · ${o.level}风险 · ${o.time}</div><div style="font-size:13px;line-height:1.7;color:#dbeafe;white-space:pre-wrap">${o.advice}</div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn btn-sm btn-ghost wo-next" data-id="${o.id}">${o.status === "已销项" ? "重新打开" : "推进状态"}</button></div></div>`).join("") : '<span class="mute2">暂无整改工单。</span>';
        root.querySelectorAll(".wo-next").forEach((btn) => btn.addEventListener("click", () => {
          const list = load();
          const item = list.find((x) => String(x.id) === btn.dataset.id);
          if (item) item.status = item.status === "待整改" ? "待复检" : item.status === "待复检" ? "已销项" : "待整改";
          save(list); renderOrders(); renderRisk();
        }));
      }
      async function createOrder() {
        const d = { type: q("woType").value, level: q("woLevel").value, cid: q("woCid").value.trim() || "未填写", team: q("woTeam").value.trim() || "未分配", desc: q("woDesc").value.trim() || "现场发现质量/安全风险，需整改闭环。" };
        let advice = localAdvice(d);
        try {
          if (await AI.available()) {
            advice = await AI.chat([
              { role: "system", content: "你是装配式建筑质量安全总监，请生成可执行整改工单，包含原因、整改步骤、复检标准、照片留痕点、截止要求，180字内。" },
              { role: "user", content: JSON.stringify(d, null, 2) },
            ], { max_tokens: 520, temperature: 0.35 });
          }
        } catch (e) { advice += `\n（AI暂不可用，已使用本地规则：${e.message}）`; }
        const list = load();
        list.unshift({ id: Date.now(), time: now(), status: "待整改", advice, ...d });
        save(list); renderOrders(); renderRisk(); toast("整改工单已生成");
      }
      function seedOrders() {
        const list = load();
        [
          { type: "尺寸超差", level: "较大", cid: "WQ-3F-A5-01", team: "装配一组", desc: "高度三点差值超过10mm" },
          { type: "套筒不通透", level: "重大", cid: "WQ-3F-A6-02", team: "装配二组", desc: "灌浆套筒通透性不足" },
          { type: "BHI健康预警", level: "一般", cid: "3号房-运维点位T02", team: "运维组", desc: "倾角监测进入关注区间" },
        ].forEach((d, i) => list.unshift({ id: Date.now() + i, time: now(), status: i === 0 ? "待复检" : "待整改", advice: localAdvice(d), ...d }));
        save(list); renderOrders(); renderRisk(); toast("示例工单已注入");
      }
      const specLocal = (text) => {
        if (/套筒|灌浆/.test(text)) return "套筒不通透应暂停进入下一工序，清孔、通球或内窥复核，确认孔道畅通后再灌浆；复检照片、套筒编号和责任人需同步归档。";
        if (/吊装|三确认|试吊/.test(text)) return "吊装前执行三确认（环境安全、设备完好、构件合格）、一复核（方案复核）、两到位（安全交底、责任分工）。试吊约300mm并停顿3秒，安全距离不小于构件高度1.5倍。";
        if (/裂缝|倾角|位移|BHI|健康/.test(text)) return "运维监测发现裂缝、倾角或位移异常时，应提高采样频率，复核传感器和构件节点，按预警等级生成巡检工单并跟踪销项。";
        return "建议按“标准依据-现场复核-整改措施-复检销项-资料归档”的格式处理，并将关键节点照片绑定到构件二维码。";
      };
      async function askSpec() {
        const text = q("specQ").value.trim();
        if (!text) return alert("请输入规范问题");
        q("specAns").classList.add("loading");
        q("specAns").textContent = "AI 正在查询规范知识库...";
        let ans = specLocal(text);
        try {
          if (await AI.available()) {
            ans = await AI.chat([
              { role: "system", content: "你是装配式混凝土建筑施工规范助手。回答要引用施工/验收/安全管理要点，给出可执行步骤，避免编造具体条文号，220字内。" },
              { role: "user", content: text },
            ], { max_tokens: 560, temperature: 0.25 });
          }
        } catch (e) { ans += `\n\n（AI暂不可用，已使用本地规范库：${e.message}）`; }
        q("specAns").classList.remove("loading");
        q("specAns").textContent = ans;
      }
      async function genLog() {
        const recs = await Store.list();
        const orders = load();
        const stats = await Store.stats().catch(() => ({}));
        const payload = { date: new Date().toLocaleDateString("zh-CN"), recordCount: recs.length, qualified: stats.qualified, warning: stats.warning, unqualified: stats.unqualified, openOrders: orders.filter((o) => o.status !== "已销项").length, orders: orders.slice(0, 6) };
        let text = `【施工日志】${payload.date}\n今日累计记录 ${payload.recordCount} 条，合格 ${payload.qualified || 0} 条，预警 ${payload.warning || 0} 条，不合格 ${payload.unqualified || 0} 条；未销项工单 ${payload.openOrders} 项。明日重点复核尺寸超差、套筒通透和BHI运维点位。`;
        q("dailyLog").classList.add("loading");
        q("dailyLog").textContent = "AI 正在汇总施工日志...";
        try {
          if (await AI.available()) {
            text = await AI.chat([
              { role: "system", content: "你是项目技术负责人，请生成装配式施工日报，包含完成情况、质量问题、整改闭环、安全环境、明日计划，260字内。" },
              { role: "user", content: JSON.stringify(payload, null, 2) },
            ], { max_tokens: 720, temperature: 0.35 });
          }
        } catch (e) { text += `\n\n（AI暂不可用，已使用本地日报模板：${e.message}）`; }
        q("dailyLog").classList.remove("loading");
        q("dailyLog").textContent = text;
      }
      async function renderRisk() {
        const recs = await Store.list().catch(() => []);
        const orders = load();
        const zones = ["A1", "A2", "A3", "A4", "A5", "A6"];
        q("heatMap").innerHTML = zones.map((z, idx) => {
          const count = orders.filter((o) => (o.cid || "").includes(String(idx + 1)) || (o.cid || "").includes(z)).length + recs.filter((r) => JSON.stringify(r).includes(`A${idx + 1}`) && r.status !== "合格").length;
          const cls = count >= 3 ? "hot" : count >= 1 ? "warn" : "";
          return `<div class="heat-cell ${cls}"><b>${z}轴</b><div class="num-big" style="font-size:24px">${count}</div><div class="mute2" style="font-size:12px">${count ? "需复核" : "正常"}</div></div>`;
        }).join("");
        const teams = ["装配一组", "装配二组", "运维组", "质量组"].map((t) => {
          const open = orders.filter((o) => o.team === t && o.status !== "已销项").length;
          const closed = orders.filter((o) => o.team === t && o.status === "已销项").length;
          return { t, score: Math.max(72, 100 - open * 8 + closed * 2), open };
        }).sort((a, b) => b.score - a.score);
        q("teamScore").innerHTML = teams.map((x) => `<div class="score-row"><div><b>${x.t}</b><div class="score-bar"><i style="width:${x.score}%"></i></div></div><b>${x.score}</b><span class="badge ${x.open ? "amber" : "green"}">${x.open}未销项</span></div>`).join("");
      }
      root.querySelectorAll(".ops-tabs button").forEach((btn) => btn.addEventListener("click", () => {
        root.querySelectorAll(".ops-tabs button").forEach((b) => b.classList.toggle("on", b === btn));
        root.querySelectorAll(".ops-view").forEach((v) => v.classList.toggle("on", v.id === "ops_" + btn.dataset.ops));
        if (btn.dataset.ops === "risk") renderRisk();
      }));
      root.querySelectorAll(".spec-fast").forEach((btn) => btn.addEventListener("click", () => { q("specQ").value = btn.dataset.q; askSpec(); }));
      q("btnCreateWO").addEventListener("click", createOrder);
      q("btnSeedWO").addEventListener("click", seedOrders);
      q("btnSpecAsk").addEventListener("click", askSpec);
      q("btnGenLog").addEventListener("click", genLog);
      this._refresh = () => { renderOrders(); renderRisk(); };
      renderOrders(); renderRisk();
    },
  });

  /* ---------------- 一码溯源 ---------------- */
  M.push({ id: "trace", label: "一码溯源", icon: "fa-qrcode",
    render(el) {
      el.innerHTML = `
      <h2 class="section-title"><span class="i"></span>一码溯源 · 构件唯一“数字身份证”</h2>
      <p class="muted" style="margin:0 0 18px">为每个构件建立唯一数字身份，把 AI 数字表格、拍照留痕与检测数据一一绑定，扫码即可全生命周期信息化追溯与管理。</p>
      <div class="card" style="margin-bottom:18px">
        <div class="searchbar"><input id="cidInput" placeholder="输入构件 ID（cid），如 WQ-3F-A5-01" /><button id="btnSearch" class="btn btn-cyan"><i class="fa fa-search"></i> 查询溯源</button><button id="btnScan" class="btn btn-ghost"><i class="fa fa-qrcode"></i> 模拟扫码</button></div>
        <div class="muted" style="font-size:13px">已入库构件（点击快速查询）：</div>
        <div id="cidList" style="margin-top:6px"></div>
      </div>
      <div id="traceResult"></div>`;
      this.setup(el);
    },
    onShow(el) { if (this._list) this._list(); },
    setup(root) {
      const { $, Store, toast } = window.Platform;
      const STEP_NAMES = { size: "墙体尺寸检查", line: "定位弹线", fix: "固定安装", rebar: "钢筋绑扎" };
      const q = (id) => root.querySelector("#" + id);
      const listCids = async () => {
        const all = await Store.list(); const cids = [];
        all.forEach((r) => { if (r.walls) Object.values(r.walls).forEach((w) => { if (w.cid && !cids.includes(w.cid)) cids.push(w.cid); }); });
        q("cidList").innerHTML = cids.slice(0, 16).map((c) => `<span class="cidpill">${c}</span>`).join("") || '<span class="mute2">暂无数据，请先在“装配慧检”上传记录。</span>';
        root.querySelectorAll(".cidpill").forEach((p) => p.addEventListener("click", () => { q("cidInput").value = p.textContent; search(); }));
        return cids;
      };
      this._list = listCids;
      const verdict = (v) => v === true ? '<span class="badge green">合格</span>' : v === false ? '<span class="badge red">不合格</span>' : '<span class="badge">未判定</span>';
      function initialCidFromUrl() {
        const direct = new URLSearchParams(location.search).get("cid");
        if (direct) return direct;
        const hash = location.hash.split("?")[1] || "";
        return new URLSearchParams(hash).get("cid") || "";
      }
      async function search() {
        const cid = q("cidInput").value.trim(); if (!cid) { q("traceResult").innerHTML = ""; return; }
        const recs = await Store.findByCid(cid);
        if (!recs.length) { q("traceResult").innerHTML = `<div class="card" style="text-align:center;padding:30px"><i class="fa fa-search" style="font-size:30px;color:var(--text-mute)"></i><div class="muted" style="margin-top:10px">未找到构件 <b>${cid}</b> 的溯源记录</div></div>`; return; }
        const r = recs[recs.length - 1];
        const wallNo = Object.keys(r.walls).find((k) => (r.walls[k].cid || "").trim() === cid) || "1";
        const w = r.walls[wallNo]; const stCls = r.status === "合格" ? "green" : r.status === "预警" ? "amber" : "red";
        const steps = w.steps || {};
        const timeline = Object.keys(STEP_NAMES).map((k) => {
          const s = steps[k] || {};
          const done = s.done;
          const photos = Array.isArray(s.photos) ? s.photos : [];
          const c = s.pass === false ? "red" : done ? "green" : "amber";
          const photoHtml = photos.length ? `<div class="trace-photos">${photos.map((p, idx) => {
            const src = typeof p === "string" ? p : p.dataUrl;
            const title = typeof p === "string" ? `照片${idx + 1}` : `${p.name || "照片"} · ${p.time || ""}`;
            return src ? `<img src="${src}" alt="${title}" title="${title}">` : "";
          }).join("")}</div>` : "";
          return `<div class="ev"><div class="dotc" style="background:${c === "green" ? "rgba(16,185,129,.18)" : c === "red" ? "rgba(239,68,68,.18)" : "rgba(245,158,11,.18)"};border:1px solid var(--line)"><i class="fa ${done ? "fa-check" : "fa-clock-o"}" style="color:${c === "green" ? "#6ee7b7" : c === "red" ? "#fca5a5" : "#fcd34d"}"></i></div><div style="flex:1"><b>${STEP_NAMES[k]}</b> ${verdict(s.pass)}<div class="mute2" style="font-size:12px">${done ? `已完成拍照留痕 · ${photos.length} 张照片` : "待完成"}</div>${photoHtml}</div></div>`;
        }).join("");
        q("traceResult").innerHTML = `
        <div class="card glow" style="margin-bottom:16px"><div class="section-title" style="font-size:16px"><span class="i"></span>构件数字身份证 · ${cid}</div>
          <div class="idcard"><div class="qr" id="qrHolder"></div><div style="flex:1;min-width:260px"><div class="grid g2">
            <div><div class="mute2" style="font-size:12px">构件类型</div><b>${w.componentType || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">施工场地</div><b>${w.matchSession || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">图纸编号</div><b>${w.drawingNo || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">楼栋/轴线</div><b>${w.grid || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">项目编号</div><b>${w.pid || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">套筒通透</div><b>${(w.sleeveTotal || 0) - (w.sleeveFailed || 0)}/${w.sleeveTotal || 0}</b></div>
            <div><div class="mute2" style="font-size:12px">记录人</div><b>${r.recorder || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">上传时间</div><b>${r.uploadTime || "-"}</b></div>
          </div><div style="margin-top:12px;display:flex;gap:10px;align-items:center"><span class="badge ${stCls}" style="font-size:14px;padding:6px 14px">综合判定：${r.status || "-"}</span><span class="badge cyan">合格率 ${r.passRate ?? "-"}%</span></div></div></div>
        </div>
        <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span>关键工序留痕（全生命周期）</div><div class="timeline">${timeline}</div><div class="muted" style="font-size:12px;margin-top:6px">记录ID：${r.id} · 工位号：${r.workstationNo || "-"} · 施工队伍：${w.teamId || "-"}</div></div>`;
        const holder = q("qrHolder"); holder.innerHTML = "";
        const qrUrl = location.href.split("#")[0].split("?")[0] + `?cid=${encodeURIComponent(cid)}#trace`;
        new QRCode(holder, { text: qrUrl, width: 150, height: 150, colorDark: "#00e5ff", colorLight: "#0b1220", correctLevel: QRCode.CorrectLevel.L });
      }
      q("btnSearch").addEventListener("click", search);
      q("cidInput").addEventListener("keydown", (e) => { if (e.key === "Enter") search(); });
      q("btnScan").addEventListener("click", async () => { const cids = await listCids(); if (!cids.length) { alert("暂无可扫码的构件，请先上传记录。"); return; } q("cidInput").value = cids[Math.floor(Math.random() * cids.length)]; toast("模拟扫码成功"); search(); });
      listCids().then(() => { const cid = initialCidFromUrl(); if (cid) { q("cidInput").value = cid; search(); } });
    },
  });
})();
