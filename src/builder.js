// AI quiz-generator wizard: mode → input → generating → preview/edit → publish.
// Renders into #view-builder.
import { genApi } from './gen-api.js';

let _switchView = null;
const state = {
  mode: 'personality',
  topic: '',
  questionCount: 8,
  typeCount: 4,
  style: 'fun',
  config: null,
  publishedUrl: '',
};

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function el() { return document.getElementById('view-builder'); }
function toast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('opacity-0');
  setTimeout(() => t.classList.add('opacity-0'), 2000);
}

function shell(inner) {
  return `
    <header class="mb-8 flex items-center justify-between max-w-2xl mx-auto">
      <button data-act="home" class="text-ghibli-text-light hover:text-ghibli-text transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span>回首頁</span>
      </button>
      <span class="text-lg font-bold tracking-tight text-ghibli-text">AI 測驗產生器</span>
      <div class="w-[72px]"></div>
    </header>
    <div class="max-w-2xl mx-auto">${inner}</div>`;
}

export function showBuilder(switchView) {
  _switchView = switchView;
  state.config = null;
  state.publishedUrl = '';
  renderModeStep();
  switchView('builder');
  refreshLimit();
}

function bindHome() {
  el().querySelectorAll('[data-act="home"]').forEach((b) => b.addEventListener('click', () => { window.location.hash = ''; }));
}

async function refreshLimit() {
  try {
    const { remaining, limit } = await genApi.limit();
    const box = el().querySelector('#gen-remaining');
    if (box) box.textContent = `今日剩餘生成次數：${remaining} / ${limit}`;
  } catch (_) { /* ignore */ }
}

// --- Step 1: mode select ---
function renderModeStep() {
  el().innerHTML = shell(`
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-bold text-ghibli-text mb-2">想做哪一種測驗？</h2>
      <p class="text-ghibli-text-light text-sm">選一種模式，接著輸入主題就能一鍵生成</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button data-mode="personality" class="mode-card text-left bg-ghibli-card rounded-2xl p-6 shadow-soft border-2 border-transparent hover:border-ghibli-primary transition-all">
        <div class="text-4xl mb-3">🧠</div>
        <h3 class="font-bold text-ghibli-text mb-1">心理分析型</h3>
        <p class="text-sm text-ghibli-text-light">沒有標準答案，依作答傾向測出人格類型，附綜合指數與雷達圖。</p>
      </button>
      <button data-mode="knowledge" class="mode-card text-left bg-ghibli-card rounded-2xl p-6 shadow-soft border-2 border-transparent hover:border-ghibli-primary transition-all">
        <div class="text-4xl mb-3">🏆</div>
        <h3 class="font-bold text-ghibli-text mb-1">知識問答型</h3>
        <p class="text-sm text-ghibli-text-light">每題有正解，答完看答對率與稱號，全對才拿得到最高稱號。</p>
      </button>
    </div>
    <p id="gen-remaining" class="text-center text-xs text-ghibli-text-light mt-8"></p>`);
  bindHome();
  el().querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    state.mode = b.getAttribute('data-mode');
    renderInputStep();
  }));
  refreshLimit();
}

// --- Step 2: input form ---
function renderInputStep() {
  const isK = state.mode === 'knowledge';
  const placeholder = isK
    ? '例如：灌籃高手冷知識、台灣地理常識、寶可夢一二代'
    : '例如：你適合養哪種狗、你是哪種咖啡、你的拖延症有多嚴重';
  el().innerHTML = shell(`
    <button data-act="back" class="text-sm text-ghibli-text-light mb-4 flex items-center gap-1 hover:text-ghibli-text">‹ 換個模式</button>
    <div class="bg-ghibli-card rounded-2xl p-6 md:p-8 shadow-soft border border-black/5">
      <div class="flex items-center gap-2 mb-6">
        <span class="text-2xl">${isK ? '🏆' : '🧠'}</span>
        <span class="font-bold text-ghibli-text">${isK ? '知識問答型' : '心理分析型'}</span>
      </div>

      <label class="block text-sm font-bold text-ghibli-text mb-2">測驗主題</label>
      <textarea id="f-topic" rows="2" maxlength="100" placeholder="${placeholder}"
        class="w-full px-4 py-3 rounded-xl border border-black/10 bg-white text-ghibli-text outline-none focus:border-ghibli-primary resize-none">${esc(state.topic)}</textarea>
      <p class="text-right text-xs text-ghibli-text-light mt-1"><span id="topic-count">0</span> / 100</p>

      <label class="block text-sm font-bold text-ghibli-text mb-2 mt-4">題目數量：<span id="qc-val">${state.questionCount}</span> 題</label>
      <input id="f-qc" type="range" min="5" max="15" value="${state.questionCount}" class="w-full accent-ghibli-primary">

      <div id="tc-wrap" class="${isK ? 'hidden' : ''}">
        <label class="block text-sm font-bold text-ghibli-text mb-2 mt-4">結果類型數：<span id="tc-val">${state.typeCount}</span> 種</label>
        <input id="f-tc" type="range" min="3" max="8" value="${state.typeCount}" class="w-full accent-ghibli-primary">
      </div>

      <label class="block text-sm font-bold text-ghibli-text mb-2 mt-4">風格</label>
      <div class="grid grid-cols-3 gap-2" id="f-style">
        <button data-style="fun" class="style-opt py-2 rounded-xl border text-sm">趣味輕鬆</button>
        <button data-style="serious" class="style-opt py-2 rounded-xl border text-sm">專業認真</button>
        <button data-style="literary" class="style-opt py-2 rounded-xl border text-sm">文青感性</button>
      </div>

      <button id="f-gen" class="w-full mt-7 py-3.5 rounded-full bg-ghibli-primary text-white font-bold shadow-soft hover:-translate-y-0.5 transition-all disabled:opacity-50">✨ 生成測驗</button>
      <p id="gen-remaining" class="text-center text-xs text-ghibli-text-light mt-4"></p>
    </div>`);
  bindHome();
  el().querySelector('[data-act="back"]').addEventListener('click', renderModeStep);

  const topic = el().querySelector('#f-topic');
  const tcount = el().querySelector('#topic-count');
  const syncCount = () => { tcount.textContent = topic.value.length; state.topic = topic.value; };
  topic.addEventListener('input', syncCount); syncCount();

  const qc = el().querySelector('#f-qc');
  qc.addEventListener('input', () => { state.questionCount = +qc.value; el().querySelector('#qc-val').textContent = qc.value; });
  const tc = el().querySelector('#f-tc');
  if (tc) tc.addEventListener('input', () => { state.typeCount = +tc.value; el().querySelector('#tc-val').textContent = tc.value; });

  const paintStyle = () => el().querySelectorAll('.style-opt').forEach((b) => {
    const on = b.getAttribute('data-style') === state.style;
    b.classList.toggle('border-ghibli-primary', on);
    b.classList.toggle('text-ghibli-primary', on);
    b.classList.toggle('font-bold', on);
    b.classList.toggle('border-black/10', !on);
    b.classList.toggle('text-ghibli-text-light', !on);
  });
  el().querySelectorAll('.style-opt').forEach((b) => b.addEventListener('click', () => { state.style = b.getAttribute('data-style'); paintStyle(); }));
  paintStyle();

  el().querySelector('#f-gen').addEventListener('click', doGenerate);
  refreshLimit();
}

// --- Step 3: generating ---
let progressTimer = null;
function renderGeneratingStep() {
  el().innerHTML = shell(`
    <div class="bg-ghibli-card rounded-2xl p-8 shadow-soft border border-black/5 text-center py-16">
      <div class="text-5xl mb-6 animate-pulse">✨</div>
      <h2 class="text-xl font-bold text-ghibli-text mb-2">AI 正在出題中…</h2>
      <p class="text-sm text-ghibli-text-light mb-8">約需 20~40 秒，請稍候</p>
      <div class="w-full max-w-sm mx-auto h-3 bg-black/5 rounded-full overflow-hidden">
        <div id="gen-bar" class="h-full bg-ghibli-primary rounded-full transition-all duration-500" style="width:5%"></div>
      </div>
      <p id="gen-pct" class="text-sm text-ghibli-text-light mt-3">5%</p>
    </div>`);
  bindHome();
  let pct = 5;
  progressTimer = setInterval(() => {
    pct = Math.min(95, pct + (2 + Math.random() * 5));
    const bar = el().querySelector('#gen-bar');
    const label = el().querySelector('#gen-pct');
    if (bar) bar.style.width = `${pct}%`;
    if (label) label.textContent = `${Math.round(pct)}%`;
  }, 700);
}
function stopProgress(done) {
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
  if (done) {
    const bar = el().querySelector('#gen-bar');
    const label = el().querySelector('#gen-pct');
    if (bar) bar.style.width = '100%';
    if (label) label.textContent = '100%';
  }
}

async function doGenerate() {
  if (state.topic.trim().length < 2) { toast('請輸入至少 2 個字的主題'); return; }
  renderGeneratingStep();
  try {
    const { quizConfig } = await genApi.generate({
      topic: state.topic.trim(),
      mode: state.mode,
      questionCount: state.questionCount,
      resultTypeCount: state.typeCount,
      style: state.style,
    });
    state.config = quizConfig;
    stopProgress(true);
    setTimeout(renderPreviewStep, 400);
  } catch (e) {
    stopProgress(false);
    el().querySelector('.bg-ghibli-card').innerHTML = `
      <div class="text-center py-8">
        <p class="text-4xl mb-4">😵</p>
        <p class="font-bold text-ghibli-text mb-4">${esc(e.message || '生成失敗，請再試一次')}</p>
        <button data-act="retry" class="px-6 py-2.5 bg-ghibli-primary text-white rounded-full">返回重試</button>
      </div>`;
    el().querySelector('[data-act="retry"]').addEventListener('click', renderInputStep);
  }
}

// --- Step 4: preview & edit ---
function renderPreviewStep() {
  const c = state.config;
  const isK = c.mode === 'knowledge';
  el().innerHTML = shell(`
    <div class="text-center mb-6">
      <span class="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style="background:${isK ? '#f59e0b' : '#8b5cf6'}">${isK ? '🏆 知識問答' : '🧠 心理分析'}</span>
      <h2 class="text-2xl font-bold text-ghibli-text">預覽 & 微調</h2>
      <p class="text-sm text-ghibli-text-light mt-1">點任何文字即可編輯${isK ? '；點選項左邊的圓圈可改正解' : ''}</p>
    </div>

    <div class="bg-ghibli-card rounded-2xl p-6 shadow-soft border border-black/5 mb-5 text-center">
      <div class="text-4xl mb-2">${esc(c.emoji || '🧠')}</div>
      <div contenteditable="true" data-path="title" class="text-xl font-bold text-ghibli-text outline-none focus:bg-ghibli-bg rounded px-2">${esc(c.title)}</div>
      <div contenteditable="true" data-path="subtitle" class="text-sm text-ghibli-text-light outline-none focus:bg-ghibli-bg rounded px-2 mt-1">${esc(c.subtitle || '')}</div>
    </div>

    <div id="q-list" class="flex flex-col gap-4"></div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <button data-act="regen" class="px-6 py-3 border-2 border-ghibli-primary text-ghibli-primary font-medium rounded-full hover:bg-ghibli-primary hover:text-white transition-colors">重新生成</button>
      <button data-act="publish" class="px-8 py-3 bg-ghibli-primary text-white font-bold rounded-full shadow-soft hover:-translate-y-0.5 transition-all">發佈 & 取得分享連結</button>
    </div>`);
  bindHome();

  const list = el().querySelector('#q-list');
  c.questions.forEach((q, qi) => list.appendChild(renderQuestionEditor(q, qi, isK)));

  // contenteditable write-back for title/subtitle
  el().querySelectorAll('[data-path]').forEach((node) => {
    node.addEventListener('input', () => { c[node.getAttribute('data-path')] = node.textContent; });
  });

  el().querySelector('[data-act="regen"]').addEventListener('click', renderInputStep);
  el().querySelector('[data-act="publish"]').addEventListener('click', doPublish);
}

function renderQuestionEditor(q, qi, isK) {
  const wrap = document.createElement('div');
  wrap.className = 'bg-ghibli-card rounded-2xl p-5 shadow-soft border border-black/5';
  wrap.innerHTML = `
    <div class="flex gap-2 mb-3">
      <span class="text-ghibli-primary font-bold flex-shrink-0">Q${qi + 1}</span>
      <div contenteditable="true" class="q-text flex-1 font-bold text-ghibli-text outline-none focus:bg-ghibli-bg rounded px-1">${esc(q.text)}</div>
    </div>
    <div class="flex flex-col gap-2 pl-6"></div>
    ${isK ? `<div class="pl-6 mt-3 text-sm">
      <span class="text-xs font-bold text-ghibli-text-light">正解說明</span>
      <div contenteditable="true" class="q-exp text-ghibli-text-light outline-none focus:bg-ghibli-bg rounded px-1 mt-1">${esc(q.explanation || '')}</div>
    </div>` : ''}`;

  const optBox = wrap.querySelector('.flex.flex-col.gap-2');
  q.options.forEach((opt, oi) => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-2';
    const isCorrect = isK && q.correct === oi;
    row.innerHTML = `
      <button class="opt-mark w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border ${isCorrect ? 'bg-green-500 text-white border-green-500' : 'border-black/20 text-ghibli-text-light'}" ${isK ? '' : 'style="cursor:default"'}>${String.fromCharCode(65 + oi)}</button>
      <div contenteditable="true" class="opt-text flex-1 text-ghibli-text outline-none focus:bg-ghibli-bg rounded px-1 ${isCorrect ? 'font-bold' : ''}">${esc(opt.text)}</div>
      ${isCorrect ? '<span class="correct-flag text-xs text-green-600 font-bold flex-shrink-0">✓ 正解</span>' : ''}`;

    row.querySelector('.opt-text').addEventListener('input', (e) => { opt.text = e.target.textContent; });

    if (isK) {
      row.querySelector('.opt-mark').addEventListener('click', () => {
        q.correct = oi;
        repaintCorrect(optBox, q);
      });
    }
    optBox.appendChild(row);
  });

  wrap.querySelector('.q-text').addEventListener('input', (e) => { q.text = e.target.textContent; });
  const exp = wrap.querySelector('.q-exp');
  if (exp) exp.addEventListener('input', (e) => { q.explanation = e.target.textContent; });
  return wrap;
}

// Repaint only this question's correct-answer marks (no full re-render)
function repaintCorrect(optBox, q) {
  [...optBox.children].forEach((row, oi) => {
    const mark = row.querySelector('.opt-mark');
    const text = row.querySelector('.opt-text');
    const on = q.correct === oi;
    mark.className = `opt-mark w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border ${on ? 'bg-green-500 text-white border-green-500' : 'border-black/20 text-ghibli-text-light'}`;
    text.classList.toggle('font-bold', on);
    const existing = row.querySelector('.correct-flag');
    if (on && !existing) {
      const flag = document.createElement('span');
      flag.className = 'correct-flag text-xs text-green-600 font-bold flex-shrink-0';
      flag.textContent = '✓ 正解';
      row.appendChild(flag);
    } else if (!on && existing) {
      existing.remove();
    }
  });
}

async function doPublish() {
  const btn = el().querySelector('[data-act="publish"]');
  btn.disabled = true; btn.textContent = '發佈中…';
  try {
    const { url } = await genApi.publish(state.config);
    state.publishedUrl = url;
    renderPublishedStep(url);
  } catch (e) {
    toast(e.message || '發佈失敗，請再試一次');
    btn.disabled = false; btn.textContent = '發佈 & 取得分享連結';
  }
}

function renderPublishedStep(url) {
  el().innerHTML = shell(`
    <div class="bg-ghibli-card rounded-2xl p-8 shadow-soft border border-black/5 text-center py-14">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold text-ghibli-text mb-2">發佈成功！</h2>
      <p class="text-sm text-ghibli-text-light mb-6">你的測驗已上線，把連結分享出去吧</p>
      <div class="flex items-center gap-2 max-w-md mx-auto bg-ghibli-bg rounded-xl p-2 mb-6">
        <input id="pub-url" readonly value="${esc(url)}" class="flex-1 bg-transparent text-sm text-ghibli-text outline-none px-2">
        <button data-act="copy" class="px-4 py-2 bg-ghibli-primary text-white text-sm rounded-lg flex-shrink-0">複製</button>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button data-act="play" class="px-6 py-3 bg-ghibli-primary text-white font-bold rounded-full shadow-soft hover:-translate-y-0.5 transition-all">試玩看看</button>
        <button data-act="another" class="px-6 py-3 border-2 border-ghibli-primary text-ghibli-primary font-medium rounded-full hover:bg-ghibli-primary hover:text-white transition-colors">再做一個</button>
      </div>
    </div>`);
  bindHome();
  el().querySelector('[data-act="copy"]').addEventListener('click', () => {
    navigator.clipboard.writeText(url).then(() => toast('已複製連結！')).catch(() => {});
  });
  el().querySelector('[data-act="play"]').addEventListener('click', () => {
    const m = url.match(/#play=(.+)$/);
    if (m) window.location.hash = `#play=${m[1]}`;
  });
  el().querySelector('[data-act="another"]').addEventListener('click', renderModeStep);
}
