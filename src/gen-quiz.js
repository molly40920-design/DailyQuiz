// Player for AI-generated quizzes. Self-contained: it renders its own
// intro / question / result flow into #view-genquiz and never touches the
// engine that drives the 28 curated quizzes.
import { genApi } from './gen-api.js';
import { analyze, analyzeK } from './gen-engine.js';

let Q = null;
let ans = [];
let idx = 0;
let _switchView = null;
let radarChart = null;

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function el() { return document.getElementById('view-genquiz'); }

function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('opacity-0');
  setTimeout(() => t.classList.add('opacity-0'), 2000);
}

function headerBar() {
  return `
    <header class="mb-8 flex items-center justify-between max-w-2xl mx-auto">
      <button data-act="home" class="text-ghibli-text-light hover:text-ghibli-text transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span>回首頁</span>
      </button>
      <span class="text-lg font-bold tracking-tight text-ghibli-text">Daily Quiz</span>
      <div class="w-[72px]"></div>
    </header>`;
}

export async function showGenQuiz(id, switchView) {
  _switchView = switchView;
  Q = null; ans = []; idx = 0;
  el().innerHTML = `${headerBar()}<div class="max-w-2xl mx-auto text-center py-20 text-ghibli-text-light">載入測驗中…</div>`;
  bindHome();
  switchView('genquiz');

  try {
    const data = await genApi.getQuiz(id);
    Q = data.quizConfig;
    ans = [];
    renderIntro();
  } catch (e) {
    el().innerHTML = `${headerBar()}
      <div class="max-w-2xl mx-auto text-center py-20">
        <p class="text-5xl mb-4">🔍</p>
        <p class="text-ghibli-text font-bold mb-2">${esc(e.message || '找不到這個測驗')}</p>
        <button data-act="home" class="mt-4 px-6 py-2 bg-ghibli-primary text-white rounded-full">回首頁</button>
      </div>`;
    bindHome();
  }
}

function bindHome() {
  el().querySelectorAll('[data-act="home"]').forEach((b) => {
    b.addEventListener('click', () => { window.location.hash = ''; });
  });
}

function isKnowledge() { return Q && Q.mode === 'knowledge'; }

function renderIntro() {
  const grad = `linear-gradient(135deg, ${Q.gradientFrom || Q.accentColor || '#FF8E9E'}, ${Q.gradientTo || Q.accentColor || '#FFB6C1'})`;
  const badge = isKnowledge()
    ? `<span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style="background:#f59e0b">🏆 知識問答</span>`
    : `<span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style="background:#8b5cf6">🧠 心理分析</span>`;

  el().innerHTML = `${headerBar()}
    <div class="max-w-xl mx-auto">
      <div class="bg-ghibli-card rounded-3xl p-8 md:p-10 shadow-soft text-center border border-black/5">
        <div class="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-5" style="background:${grad}">${esc(Q.emoji || '🧠')}</div>
        ${badge}
        <h2 class="text-2xl md:text-3xl font-bold mb-3 text-ghibli-text">${esc(Q.title)}</h2>
        <p class="text-ghibli-text-light mb-2">${esc(Q.subtitle || '')}</p>
        <p class="text-sm text-ghibli-text-light mb-6">${esc(Q.description || '')}</p>
        <div class="text-xs text-ghibli-text-light mb-6 flex items-center justify-center gap-3">
          <span>共 ${Q.questions.length} 題</span>
          ${Q.startHint ? `<span>·</span><span>${esc(Q.startHint)}</span>` : ''}
        </div>
        <button data-act="start" class="w-full py-3.5 rounded-full text-white font-bold shadow-soft hover:-translate-y-0.5 transition-all" style="background:${grad}">開始測驗</button>
      </div>
      <p class="text-center text-xs text-ghibli-text-light mt-6">此測驗由使用者透過 AI 生成</p>
    </div>`;
  bindHome();
  el().querySelector('[data-act="start"]').addEventListener('click', () => { idx = 0; ans = []; renderQuestion(); });
}

function renderQuestion() {
  if (idx >= Q.questions.length) { showResult(); return; }
  const q = Q.questions[idx];
  const accent = Q.accentColor || '#FF8E9E';
  const pct = Math.round(((idx) / Q.questions.length) * 100);

  el().innerHTML = `${headerBar()}
    <div class="max-w-2xl mx-auto">
      <div class="mb-8">
        <div class="flex justify-between text-sm text-ghibli-text-light mb-2">
          <span>${idx + 1} / ${Q.questions.length}</span>
        </div>
        <div class="w-full h-2 bg-black/5 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300" style="width:${pct}%;background:${accent}"></div>
        </div>
      </div>
      <h2 class="text-xl md:text-2xl font-bold text-ghibli-text mb-8 text-center leading-relaxed">${esc(q.text)}</h2>
      <div class="flex flex-col gap-3" id="gen-options"></div>
    </div>`;
  bindHome();

  const box = el().querySelector('#gen-options');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'w-full text-left px-5 py-4 rounded-2xl bg-ghibli-card border border-black/5 shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all text-ghibli-text';
    btn.innerHTML = `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 text-white" style="background:${accent}">${String.fromCharCode(65 + i)}</span>${esc(opt.text)}`;
    btn.addEventListener('click', () => {
      ans[idx] = i;
      idx++;
      renderQuestion();
    });
    box.appendChild(btn);
  });
}

function showResult() {
  if (isKnowledge()) return showResultKnowledge();
  return showResultPersonality();
}

function analysisCard(item, accent) {
  const paras = String(item.description || '').split('\n').filter(Boolean)
    .map((p) => `<p class="mb-2">${esc(p)}</p>`).join('');
  const traits = (item.traits || [])
    .map((t) => `<span class="px-3 py-1 rounded-full text-sm" style="background:${hexA(accent, 0.12)};color:${accent}">${esc(t)}</span>`).join('');
  return `
    <div class="bg-ghibli-card rounded-2xl p-6 shadow-soft border border-black/5 text-left mb-6">
      <div class="text-ghibli-text leading-relaxed">${paras}</div>
      ${traits ? `<div class="flex flex-wrap gap-2 mt-4">${traits}</div>` : ''}
      ${item.advice ? `<div class="mt-4 p-4 rounded-xl text-sm text-ghibli-text-light" style="background:${hexA(accent, 0.07)}"><strong style="color:${accent}">建議 </strong>${esc(item.advice)}</div>` : ''}
    </div>`;
}

function hexA(hex, a) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return `rgba(255,142,158,${a})`;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function shareRow(shareText) {
  return `
    <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <button data-act="retake" class="px-8 py-3 bg-transparent border-2 border-ghibli-primary text-ghibli-primary font-medium rounded-full hover:bg-ghibli-primary hover:text-white transition-colors">再測一次</button>
      <button data-act="share" class="px-8 py-3 bg-ghibli-primary text-white font-medium rounded-full shadow-soft hover:-translate-y-0.5 transition-all">分享測驗</button>
    </div>
    ${shareText ? `<p class="text-center text-sm text-ghibli-text-light mt-4">${esc(shareText)}</p>` : ''}`;
}

function bindResultActions(shareMsg) {
  bindHome();
  const r = el().querySelector('[data-act="retake"]');
  if (r) r.addEventListener('click', () => { idx = 0; ans = []; renderQuestion(); });
  const s = el().querySelector('[data-act="share"]');
  if (s) s.addEventListener('click', () => {
    const url = window.location.href;
    const text = `${shareMsg}\n${url}`;
    if (navigator.share) { navigator.share({ title: Q.title, text: shareMsg, url }).catch(() => {}); }
    else { navigator.clipboard.writeText(text).then(() => toast('已複製連結到剪貼簿！')).catch(() => {}); }
  });
}

function showResultPersonality() {
  const r = analyze(Q, ans);
  const p = r.primary;
  const accent = p.color || Q.accentColor || '#FF8E9E';
  const grad = p.gradient || `linear-gradient(135deg, ${Q.gradientFrom || accent}, ${Q.gradientTo || accent})`;
  const ring = `conic-gradient(${r.level.color || accent} ${r.overall}%, #eee ${r.overall}% 100%)`;

  el().innerHTML = `${headerBar()}
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-8">
        <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4" style="background:${grad}">${esc(p.emoji || Q.emoji || '✨')}</div>
        <p class="text-sm text-ghibli-text-light mb-1">${esc(Q.resultLabel || '你的類型')}</p>
        <h2 class="text-3xl font-extrabold mb-2" style="color:${accent}">${esc(p.name)}</h2>
        <p class="text-ghibli-text-light">${esc(p.subtitle || '')}</p>
      </div>

      <div class="bg-ghibli-card rounded-2xl p-6 shadow-soft border border-black/5 flex items-center gap-5 mb-6">
        <div class="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center" style="background:${ring}">
          <div class="w-[76px] h-[76px] rounded-full bg-ghibli-card flex flex-col items-center justify-center">
            <span class="text-2xl font-extrabold" style="color:${r.level.color || accent}">${r.overall}</span>
            <span class="text-[10px] text-ghibli-text-light">${esc(Q.indexLabel || '指數')}</span>
          </div>
        </div>
        <div class="text-left">
          <p class="font-bold text-ghibli-text mb-1">${esc(r.level.label || '')}</p>
          <p class="text-sm text-ghibli-text-light">${esc(r.level.desc || '')}</p>
        </div>
      </div>

      ${analysisCard(p, accent)}

      <div class="bg-ghibli-card rounded-2xl p-6 shadow-soft border border-black/5 mb-2">
        <p class="text-center text-sm font-bold text-ghibli-text-light mb-3">${esc(Q.radarTitle || '分佈')}</p>
        <canvas id="gen-radar"></canvas>
      </div>

      ${shareRow(Q.shareText)}
    </div>`;

  bindResultActions(`我在「${Q.title}」測出我是「${p.name}」！`);
  drawRadar(Q.radarLabels || Q.typeKeys.map((k) => Q.types[k]?.name || k), Q.typeKeys.map((k) => r.pcts[k] || 0), accent);
  track('quiz_completed');
}

function showResultKnowledge() {
  const r = analyzeK(Q, ans);
  const lv = r.level;
  const accent = lv.color || Q.accentColor || '#f59e0b';
  const grad = lv.gradient || `linear-gradient(135deg, ${Q.gradientFrom || accent}, ${Q.gradientTo || accent})`;
  const ring = `conic-gradient(${accent} ${r.pct}%, #eee ${r.pct}% 100%)`;

  el().innerHTML = `${headerBar()}
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-8">
        <div class="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4" style="background:${grad}">${esc(lv.emoji || Q.emoji || '🏆')}</div>
        <p class="text-sm text-ghibli-text-light mb-1">${esc(Q.resultLabel || '稱號')}</p>
        <h2 class="text-3xl font-extrabold mb-2" style="color:${accent}">${esc(lv.name)}</h2>
        <p class="text-ghibli-text-light">${esc(lv.subtitle || '')}</p>
      </div>

      <div class="bg-ghibli-card rounded-2xl p-6 shadow-soft border border-black/5 flex items-center gap-5 mb-6">
        <div class="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center" style="background:${ring}">
          <div class="w-[76px] h-[76px] rounded-full bg-ghibli-card flex flex-col items-center justify-center">
            <span class="text-2xl font-extrabold" style="color:${accent}">${r.pct}%</span>
            <span class="text-[10px] text-ghibli-text-light">答對率</span>
          </div>
        </div>
        <div class="text-left">
          <p class="font-bold text-ghibli-text mb-1">答對 ${r.score} / ${r.n} 題</p>
          <p class="text-sm text-ghibli-text-light">${r.pct === 100 ? '完美全對！' : '再接再厲！'}</p>
        </div>
      </div>

      ${analysisCard(lv, accent)}
      ${shareRow(Q.shareText)}
    </div>`;

  bindResultActions(`我在「${Q.title}」答對 ${r.score}/${r.n} 題，獲得「${lv.name}」稱號！`);
  track('quiz_completed');
}

function drawRadar(labels, values, accent) {
  const canvas = el().querySelector('#gen-radar');
  if (!canvas || !window.Chart) return;
  if (radarChart) { radarChart.destroy(); radarChart = null; }
  radarChart = new window.Chart(canvas.getContext('2d'), {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: hexA(accent, 0.25),
        borderColor: accent,
        pointBackgroundColor: accent,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { r: { min: 0, max: 100, ticks: { display: false }, pointLabels: { font: { size: 12 } } } },
    },
  });
}

function track(event) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, { quiz_id: Q && Q.title, send_to: 'G-VPY9J8FWSR' });
    }
  } catch (_) { /* ignore */ }
}
