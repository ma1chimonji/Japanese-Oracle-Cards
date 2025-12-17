(function(){
  const $ = (s)=>document.querySelector(s);

  /* --- 1. カードデータ (JSオブジェクト形式に修正済み) --- */
  const ORACLE_DECK = [
    // 第一の柱：神々のカード
    {id:1, category:"god", name:"天之御中主神", en:"Ame-no-Minakanushi", icon:"🌌", advice:"根源、宇宙の中心。恐れを手放し、大いなる流れに身を委ねなさい。"},
    {id:2, category:"god", name:"高御産巣日神/神産巣日神", en:"Musubi Gods", icon:"☯", advice:"結び、調和。陰と陽のバランスを取り、新しいものを生み出す時です。"},
    {id:3, category:"god", name:"天照大御神", en:"Amaterasu", icon:"☀", advice:"光、慈愛。隠れるのをやめ、あなたの光で周囲を照らしなさい。"},
    {id:4, category:"god", name:"月読命", en:"Tsukuyomi", icon:"🌙", advice:"静寂、神秘。直感と内なる声に耳を澄ませ、リズムを整えなさい。"},
    {id:5, category:"god", name:"須佐之男命", en:"Susanoo", icon:"⚔", advice:"誠実さ、浄化。自分の中の荒ぶる感情を受け入れ、力に変えなさい。"},
    {id:6, category:"god", name:"伊邪那岐命", en:"Izanagi", icon:"🏔", advice:"具現化、形にする力。迷いを捨て、意志を持って現実を創りなさい。"},
    {id:7, category:"god", name:"伊邪那美命", en:"Izanami", icon:"🔥", advice:"破壊と再生。終わらせることで、新しい循環が始まります。"},
    {id:8, category:"god", name:"天手力男神", en:"Tajikarao", icon:"💪", advice:"剛力、突破。思考するより、今は身体を使って行動する時です。"},
    {id:9, category:"god", name:"天宇受売命", en:"Ame-no-Uzume", icon:"💃", advice:"情熱、芸能。恥じらいを捨て、心から楽しみ、表現しなさい。"},
    {id:10, category:"god", name:"猿田彦大神", en:"Sarutahiko", icon:"👺", advice:"道開き、決断。迷いが晴れ、進むべき最短ルートが見えてきます。"},
    {id:11, category:"god", name:"邇邇芸命", en:"Ninigi", icon:"🌾", advice:"天と地の統合。理想を現実に落とし込み、実らせる時期です。"},
    {id:12, category:"god", name:"木花咲耶姫", en:"Konohanasakuya", icon:"🌸", advice:"繁栄、美。今この瞬間の美しさと喜びを最大限に味わいなさい。"},
    {id:13, category:"god", name:"磐長姫", en:"Iwanagahime", icon:"🪨", advice:"不動、グラウンディング。見た目より本質的な強さと永続性を選びなさい。"},
    {id:14, category:"god", name:"玉依毘売命", en:"Tamayorihime", "icon":"🔮", advice:"浄化、母性。古い感情を水に流し、新しい魂を受け入れなさい。"},
    {id:15, category:"god", name:"大国主神", en:"Okuninushi", icon:"🐇", advice:"ハート、縁。頭で考えるのをやめ、心の声に従ってご縁を大切に。"},
    {id:16, category:"god", name:"事代主神", en:"Kotoshironushi", icon:"🎣", advice:"知恵、笑顔。深刻にならず、ユーモアを持って物事を受け止めなさい。"},
    {id:17, category:"god", name:"少名毘古那神", en:"Sukunabikona", icon:"💊", advice:"協力、ユーモア。小さな相棒や協力者を大切に。笑いが薬になります。"},
    {id:18, category:"god", name:"建御雷之男神", en:"Takemikazuchi", icon:"⚡", advice:"決断、雷。迷いを断ち切り、直感に従って行動を起こす時です。"},
    {id:19, category:"god", name:"経津主神", en:"Futsunushi", icon:"🗡", advice:"明晰さ、切り拓く。研ぎ澄まされた精神で、不要なものを断ち切りなさい。"},
    {id:20, category:"god", name:"宇迦之御魂神", en:"Ukanomitama", icon:"🦊", advice:"豊穣、収穫。努力が実り、豊かな恵みを受け取る準備をしなさい。"},
    {id:21, category:"god", name:"綿津見三神", en:"Watatsumi", icon:"🌊", advice:"海、冒険。未知の世界へ飛び込む勇気を。海原があなたを待っています。"},
    {id:22, category:"god", name:"宗像三女神", en:"Munakata", icon:"🚢", advice:"道、再出発。流れに身を任せれば安全です。旅立ちの時。"},
    {id:23, category:"god", name:"塩椎神", en:"Shiotsuchi", icon:"🧂", advice:"導き、潮流。潮目が変わります。執着を手放し、知識を活かしなさい。"},
    {id:24, category:"god", name:"菊理媛神", en:"Kukurihime", icon:"🎀", advice:"調停、統合。対立するもの同士を繋ぎ、新しい価値を生み出します。"},
    {id:25, category:"god", name:"久延毘古", en:"Kuebiko", icon:"🌾", advice:"知恵、静観。動かずに観察することで、全ての答えが得られます。"},
    {id:26, category:"god", name:"日本武尊", en:"Yamatotakeru", icon:"⚔", advice:"挑戦、完全燃焼。困難に立ち向かい、自分の意志を貫き通しなさい。"},
    
    // 第二の柱：精霊たち
    {id:27, category:"spirit", name:"龍神", en:"Dragon Spirit", icon:"🐉", advice:"強運、上昇気流。巨大なエネルギーが動いています。流れに乗って上昇しなさい。"},
    {id:28, category:"spirit", name:"天翔ける天狗", en:"Tengu", icon:"👺", advice:"飛躍、集中力。高い視点から物事を見て、一気に壁を飛び越えなさい。"},
    {id:29, category:"spirit", name:"白狐", en:"White Fox", icon:"🦊", advice:"変化、直感。予期せぬ変化が訪れます。柔軟に姿を変えて対応しなさい。"},
    {id:30, category:"spirit", name:"河童", en:"Kappa", icon:"🥒", advice:"感情、癒やし。感情の川をせき止めないで。泣きたい時は泣いていいのです。"},
    {id:31, category:"spirit", name:"無邪気な座敷わらし", en:"Zashiki-warashi", icon:"🧸", advice:"遊び心、豊かさ。深刻さを捨て、子供のような心で今を楽しみなさい。"},
    {id:32, category:"spirit", name:"ユーモラスなシーサー", en:"Shisa", icon:"🦁", advice:"守護、笑い。ネガティブなものを笑い飛ばし、自分の境界線を守りなさい。"},
    {id:33, category:"spirit", name:"陽気なキジムナー", en:"Kijimuna", icon:"🔥", advice:"純粋さ、火の精。好きなことに熱中し、純粋な好奇心を大切にしなさい。"},
    {id:34, category:"spirit", name:"恥ずかしがり屋のコロボックル", en:"Koropokkuru", icon:"🍀", advice:"自然、思いやり。足元の小さな幸せや、見えない優しさに気づきなさい。"},
    {id:35, category:"spirit", name:"鬼", en:"Oni", icon:"👹", advice:"力、抑圧からの解放。自分の中の「恐れ」や「怒り」を認め、力に変えなさい。"},
    {id:36, category:"spirit", name:"人魚", en:"Mermaid", icon:"🧜", advice:"融合、歌。異なる世界を繋ぎなさい。あなたの声を響かせる時です。"},
    
    // 第三の柱：生命
    {id:37, category:"life", name:"甦りの鳳凰", en:"Phoenix", icon:"🔥", advice:"復活、再生。古い自分は灰となり、新しく生まれ変わる準備ができました。"},
    {id:38, category:"life", name:"標の八咫烏", en:"Yatagarasu", icon:"🦅", advice:"方向性、ゴール。正しい道が示されています。迷わずその方角へ進みなさい。"},
    {id:39, category:"life", name:"時を告げる鶏", en:"Rooster", icon:"🐓", advice:"目覚め、夜明け。新しいサイクルの始まりです。声を上げて宣言しなさい。"},
    {id:40, category:"life", name:"恩返しの鶴", en:"Crane", icon:"🦢", advice:"感謝、調和。受け取った恩や愛に気づき、感謝の気持ちを表現しなさい。"},
    {id:41, category:"life", name:"勇気ある大狼", en:"Wolf", icon:"🐺", advice:"誇り、群れ。仲間を信頼し、自分の役割に誇りを持って行動しなさい。"},
    {id:42, category:"life", name:"神の使いの鹿", en:"Deer", icon:"🦌", advice:"繊細さ、聴く力。微細なサインに気づいてください。静けさの中に答えがあります。"},
    {id:43, category:"life", name:"知恵ある熊", en:"Bear", icon:"🐻", advice:"休息、内省。今は動く時ではありません。冬眠のように力を蓄えなさい。"},
    {id:44, category:"life", name:"変容する蝶", en:"Butterfly", icon:"🦋", advice:"変容、飛躍。サナギの時間は終わりました。美しく羽ばたく時です。"},
    {id:45, category:"life", name:"粘り強いガジュマル", en:"Banyan Tree", icon:"🌳", advice:"忍耐、基盤。焦る必要はありません。今はしっかりと根を張る時期です。"},
    
    // 第四の柱：大地
    {id:46, category:"land", name:"悠久の富士山", en:"Mt. Fuji", icon:"🗻", advice:"不動、目標。あなたは守られています。どっしりと構え、高い目標を見据えて。"},
    {id:47, category:"land", name:"清らかな滝", en:"Waterfall", icon:"💧", advice:"浄化、洗い流す。過去の感情やわだかまりを水に流し、クリアになりなさい。"},
    {id:48, category:"land", name:"さざめく川", en:"River", icon:"🏞", advice:"流れ、継続。立ち止まらずに流れ続けなさい。海へとたどり着くでしょう。"},
    {id:49, category:"land", name:"煌めく希望の虹", en:"Rainbow", icon:"🌈", advice:"希望、架け橋。雨は止み、光が差しています。未来への希望を持ち続けなさい。"},
    {id:50, category:"land", name:"神秘の洞窟", en:"Cave", icon:"🕳", advice:"内省、潜伏。外の世界を遮断し、自分自身の内側深く潜る時間が必要です。"},
    {id:51, category:"land", name:"祈りの磐座", en:"Iwakura", icon:"🪨", advice:"信仰、意志。固い意志を持ちなさい。あなたの祈りは天に届いています。"},
    {id:52, category:"land", name:"風神", en:"Fujin", icon:"🍃", advice:"情報、変化。新しい風が吹いています。変化を恐れず、情報を活用しなさい。"},
    {id:53, category:"land", name:"雷神", en:"Raijin", icon:"⚡", advice:"衝撃、覚醒。稲妻のようなインスピレーションが、現状を打破します。"}
  ];

  /* --- 2. スプレッド定義 --- */
  const spreads = {
    // 1枚引き
    oneCard: { name: "一霊（今日の神託）", positions: [ {id:1, mean:"御神託", pos:[50,50]} ] },
    
    // 3枚引き (過去・現在・未来)
    threePillars: { name: "三柱（過去・現在・未来）", positions: [ 
      {id:1, mean:"過去(根)", pos:[20, 50]}, 
      {id:2, mean:"現在(幹)", pos:[50, 50]}, 
      {id:3, mean:"未来(枝)", pos:[80, 50]} 
    ]},
    
    // 鳥居スプレッド (4枚: 結界と突破)
    torii: { name: "鳥居（結界と突破）", positions: [ 
      {id:1, mean:"現状", pos:[30, 50]}, 
      {id:2, mean:"障害/課題", pos:[70, 50]}, 
      {id:3, mean:"天啓(上)", pos:[50, 20]}, 
      {id:4, mean:"基盤(下)", pos:[50, 80]} 
    ]},
    
    // 産霊(むすび)スプレッド (5枚: 二者択一)
    musubi: { name: "産霊（二者択一）", positions: [
      {id:1, mean:"岐路", pos:[80, 50]},
      {id:2, mean:"道A", pos:[30, 25]},
      {id:3, mean:"道B", pos:[30, 75]},
      {id:4, mean:"Aの結末", pos:[55, 25]},
      {id:5, mean:"Bの結末", pos:[55, 75]}
    ]},
    
    // 社(やしろ)スプレッド (6枚: 全体運)
    shrine: { name: "社（全体運）", positions: [
      {id:1, mean:"本質", pos:[50, 50]},       // 中心
      {id:2, mean:"願望", pos:[20, 50]},       // 上
      {id:3, mean:"潜在", pos:[80, 50]},       // 下
      {id:4, mean:"環境", pos:[50, 20]},       // 左
      {id:5, mean:"行動", pos:[50, 80]},       // 右
      {id:6, mean:"結論", pos:[50, 50], z:2, rotate: 90} // 中心に重ねる
    ]},

    // 頂いた画像のスプレッド
    letGoGrow: { name: "手放す/育てる", positions: [ 
      {id:1, mean:"手放すべきもの", pos:[50, 30]}, 
      {id:2, mean:"育てるべき本質", pos:[50, 70]} 
    ]},
    
    essentialKey: { name: "必要不可欠な鍵", positions: [ 
      {id:1, mean:"現在の状況", pos:[45, 50]}, 
      {id:2, mean:"過去の出来事", pos:[50, 25]}, 
      {id:3, mean:"自分の能力", pos:[35, 75]}, 
      {id:4, mean:"情熱・興味", pos:[25, 85], rotate: 20}, 
      {id:5, mean:"起こりうる結果", pos:[55, 75]} 
    ]},

    lifePath: { name: "人生の道", positions: [
      {id:1, mean:"人生の道", pos:[30, 30]},
      {id:2, mean:"影", pos:[30, 70]},
      {id:3, mean:"去年", pos:[60, 20]},
      {id:4, mean:"今年", pos:[60, 50]},
      {id:5, mean:"来年", pos:[60, 80]}
    ]}
  };

  /* --- 3. Particle System (演出用) --- */
  class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.ambientParticles = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      for(let i=0; i<40; i++) this.ambientParticles.push(this.createAmbient());
      this.animate();
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    createAmbient() {
      return { 
        x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, 
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() + 0.2) * 0.5, 
        size: Math.random() * 4 + 2, rotation: Math.random() * 360, 
        color: Math.random() > 0.7 ? '#ffd700' : '#ffc0cb', alpha: Math.random() * 0.4 + 0.1 
      };
    }
    createExplosion(x, y) {
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.particles.push({ 
          x: x, y: y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, 
          size: Math.random() * 4 + 2, alpha: 1, decay: 0.015, rotation: Math.random() * 360,
          color: Math.random() > 0.5 ? '#d4af37' : '#ffb7c5'
        });
      }
    }
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ambientParticles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rotation += 1;
        if(p.x < 0) p.x = this.canvas.width; if(p.x > this.canvas.width) p.x = 0; if(p.y > this.canvas.height) p.y = 0;
        this.ctx.save(); this.ctx.translate(p.x, p.y); this.ctx.rotate(p.rotation * Math.PI / 180);
        this.ctx.fillStyle = p.color; this.ctx.globalAlpha = p.alpha;
        this.ctx.beginPath(); this.ctx.ellipse(0, 0, p.size, p.size/2, 0, 0, Math.PI * 2); this.ctx.fill(); this.ctx.restore();
      });
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx; p.y += p.vy; p.alpha -= p.decay; p.rotation += 5;
        if (p.alpha <= 0) { this.particles.splice(i, 1); } 
        else { 
          this.ctx.save(); this.ctx.translate(p.x, p.y); this.ctx.rotate(p.rotation * Math.PI / 180);
          this.ctx.fillStyle = p.color; this.ctx.globalAlpha = p.alpha;
          this.ctx.beginPath(); this.ctx.ellipse(0, 0, p.size, p.size/2, 0, 0, Math.PI * 2); this.ctx.fill(); this.ctx.restore();
        }
      }
      requestAnimationFrame(() => this.animate());
    }
  }

  /* --- 4. Main Logic --- */
  const el = { 
    select: $('#spreadSelect'), btn: $('#deployBtn'), saveBtn: $('#saveBtn'), 
    container: $('#spread-container'), list: $('#history'), main: $('main'), 
    drawer: $('#drawer'), toggle: $('#drawerToggle'), welcome: $('#welcomeMsg') 
  };
  
  const particles = new ParticleSystem('particle-canvas');
  let isDrawerOpen = false;
  let drawnIds = []; // 重複防止用リスト

  el.toggle.onclick = () => { isDrawerOpen = !isDrawerOpen; el.drawer.classList.toggle('active', isDrawerOpen); };

  function init(){
    for(const key in spreads){
      const opt = document.createElement('option');
      opt.value = key; opt.textContent = spreads[key].name;
      el.select.appendChild(opt);
    }
    el.select.value = 'oneCard';
  }

  el.btn.onclick = () => {
    const spreadKey = el.select.value;
    const spreadData = spreads[spreadKey];
    
    el.container.innerHTML = '';
    el.welcome.classList.add('hidden');
    drawnIds = []; // 重複リストをクリア

    if(window.innerWidth <= 768) { el.drawer.classList.remove('active'); isDrawerOpen = false; }

    addLog('拝礼', `展開: ${spreadData.name}`);
    spreadData.positions.forEach(pos => createCardSlot(pos));
  };

  function createCardSlot(posInfo){
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    
    slot.style.top = `${posInfo.pos[0]}%`;
    slot.style.left = `${posInfo.pos[1]}%`;
    if(posInfo.rotate) slot.style.transform = `rotate(${posInfo.rotate}deg)`;
    if(posInfo.z) slot.style.zIndex = posInfo.z;

    // 裏面に意味を表示
    slot.innerHTML = `
      <div class="card">
        <div class="card-face card-back">
          <span class="back-id">${posInfo.id}</span>
          <span class="back-mean">${posInfo.mean}</span>
        </div>
        <div class="card-face card-front"></div>
      </div>
    `;

    slot.onclick = function(e){
      if(this.classList.contains('flipped')) return;
      
      const rect = el.main.getBoundingClientRect();
      particles.createExplosion(e.clientX - rect.left, e.clientY - rect.top);
      
      // ★ 重複なし抽選ロジック ★
      let available = ORACLE_DECK.filter(c => !drawnIds.includes(c.id));
      if(available.length === 0) { available = ORACLE_DECK; drawnIds = []; }
      
      const c = available[Math.floor(Math.random() * available.length)];
      drawnIds.push(c.id);

      // カテゴリ判定
      let catClass = "category-god";
      let catLabel = "神";
      if(c.category === "spirit") { catClass = "category-spirit"; catLabel = "精霊"; }
      if(c.category === "life")   { catClass = "category-life";   catLabel = "生命"; }
      if(c.category === "land")   { catClass = "category-land";   catLabel = "大地"; }

      const front = this.querySelector('.card-front');
      front.classList.add(catClass);

      front.innerHTML = `
        <div class="pos-badge">${posInfo.mean}</div>
        <div class="card-content">
          <span class="category-badge" style="font-size:9px; border:1px solid currentColor; border-radius:4px; padding:2px 6px;">${catLabel}</span>
          <div class="kami-icon">${c.icon}</div>
          <div class="card-name-jp">${c.name}</div>
          <div class="card-name-en">${c.en}</div>
          <div class="card-meaning">${c.advice}</div>
        </div>
      `;
      
      this.classList.add('flipped');
      addLog(c.name, `[${catLabel}] ${posInfo.mean}`);
    };
    
    el.container.appendChild(slot);
  }

  function addLog(header, detail){
    const li = document.createElement('li');
    li.innerHTML = `<div class="log-header"><span>${header}</span></div><div class="log-detail">${detail}</div>`;
    el.list.prepend(li);
  }

  el.saveBtn.onclick = function(){
    const t = el.main;
    const txt = el.saveBtn.textContent;
    el.saveBtn.textContent = "保存中...";
    html2canvas(t, { backgroundColor: '#1a0b1e', scale: 2, logging: false, useCORS: true }).then(canvas => {
      const link = document.createElement('a');
      link.download = `oracle_${new Date().getTime()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      el.saveBtn.textContent = txt;
    }).catch(err => {
      console.error(err);
      alert("画像の保存に失敗しました");
      el.saveBtn.textContent = txt;
    });
  };

  init();
})();