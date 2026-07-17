// Shared helpers for the AI quiz-generator Pages Functions.
// Files/dirs prefixed with "_" are not routed by Cloudflare Pages, so this is
// import-only.

export const DAILY_GEN_LIMIT = 10;
export const INDEX_KEY = 'index:published';
export const INDEX_CAP = 200;

// --- HTTP helpers ---
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });
}

export function errorJson(message, status = 400) {
  return json({ error: message }, status);
}

export function handleOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

// --- Short IDs (base62, crypto-random, no deps) ---
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function shortId(len = 8) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = '';
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

// --- Rate limiting (per IP per day) ---
export function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || 'unknown';
}

function rlKey(ip) {
  const day = new Date().toISOString().slice(0, 10);
  return `rl:gen:${ip}:${day}`;
}

export async function getGenCount(store, ip) {
  const v = await store.get(rlKey(ip));
  return v ? parseInt(v, 10) || 0 : 0;
}

// Best-effort increment; never let a counter failure block a successful gen.
export async function bumpGenCount(store, ip) {
  try {
    const key = rlKey(ip);
    const current = await getGenCount(store, ip);
    await store.put(key, String(current + 1), 60 * 60 * 48);
  } catch (_) { /* ignore */ }
}

// --- Style code -> Chinese label ---
export function styleName(style) {
  return { fun: '趣味輕鬆', serious: '專業認真', literary: '文青感性' }[style] || '趣味輕鬆';
}

// --- Prompts (from the quiz-generator skill, verbatim) ---
export function buildPersonalityPrompt(topic, questionCount, typeCount, style) {
  const sName = styleName(style);
  return `你是一位資深的測驗設計師，擅長製作有深度且引人入勝的趣味測驗。

請根據以下需求，設計一個完整的測驗，輸出嚴格遵守指定的 JSON 格式：

**最重要的規則**：結果類型的 name 必須直接回答主題問題。
例如：
- 主題「你適合養哪種狗」→ 類型 name 應該是「黃金獵犬」「柴犬」「哈士奇」「貴賓犬」
- 主題「你是哪種咖啡」→ 類型 name 應該是「美式黑咖啡」「焦糖拿鐵」「抹茶歐蕾」
- 主題「你的戀愛腦指數」→ 類型 name 應該是「超級戀愛腦」「鋼鐵直心」
類型名稱絕對不能是抽象人格（如「熱血探險家」「溫柔守護者」），除非主題本身就是測人格。

【需求】
- 主題：${topic}
- 題目數量：${questionCount} 題
- 結果類型數量：${typeCount} 種
- 風格：${sName}
- 語言：繁體中文

【JSON 格式要求】
{
  "title": "測驗標題（簡潔吸睛，8字以內）",
  "subtitle": "副標題（一句話說明測驗目的）",
  "description": "測驗簡介（1-2句話，用於社群分享預覽）",
  "emoji": "一個代表測驗主題的 emoji",
  "icon": "Lucide icon 名稱（代表測驗主題，例如：heart, brain, flame, zap, star, sparkles, flower-2, crown, shield, eye, sun, moon, compass, anchor, gem, target, ghost, music, palette, coffee, cake, cat, dog, fish, bird）",
  "accentColor": "主題色 hex（例如 #667eea）",
  "gradientFrom": "漸層起始色 hex",
  "gradientTo": "漸層結束色 hex",
  "startHint": "開始前的提示語",
  "resultLabel": "結果的分類名詞（不含「指數」，例如：人格、體質、等級、戀愛腦、社恐）",
  "indexLabel": "儀表板顯示的指數名稱（含「指數」兩字，例如：戀愛腦指數、社恐指數、拖延指數）",
  "radarTitle": "雷達圖標題（例如：人格分佈）",
  "shareText": "分享時的行動呼籲語（例如：你也來測測看！）",
  "typeKeys": ["type1_key", "type2_key", ...],
  "radarLabels": ["類型1簡稱", "類型2簡稱", ...],
  "questions": [
    {
      "id": "q1",
      "text": "題目（15-20字以內，簡短有力）",
      "options": [
        { "text": "選項描述（15字以內）", "weights": { "type1_key": 3, "type2_key": 1 } },
        { "text": "選項B描述", "weights": { "type2_key": 3, "type3_key": 1 } },
        { "text": "選項C描述", "weights": { "type3_key": 3, "type1_key": 1 } },
        { "text": "選項D描述", "weights": { "type4_key": 3, "type2_key": 1 } }
      ]
    }
  ],
  "types": {
    "type1_key": {
      "name": "類型名稱（必須直接回答主題問題，2-6字）",
      "icon": "Lucide icon 名稱",
      "emoji": "代表 emoji",
      "color": "#hex 色碼",
      "gradient": "linear-gradient(135deg, #色1, #色2)",
      "subtitle": "一句話描述此類型",
      "description": "詳細性格描述（60-100字）",
      "traits": ["特質1", "特質2", "特質3", "特質4"],
      "advice": "給此類型的建議（30-50字）"
    }
  },
  "indexLevels": [
    { "min": 85, "label": "等級名稱（最高）", "color": "#f5576c", "desc": "一句話描述" },
    { "min": 65, "label": "等級名稱（偏高）", "color": "#f093fb", "desc": "一句話描述" },
    { "min": 40, "label": "等級名稱（中等）", "color": "#667eea", "desc": "一句話描述" },
    { "min": 0, "label": "等級名稱（最低）", "color": "#4ade80", "desc": "一句話描述" }
  ]
}

【設計原則】
1. 每題必須有 4 個選項
2. 權重值使用 0-3 的整數，主要類型權重 3，次要類型權重 1
3. 每個選項的 weights 只需包含相關的 typeKey
4. 題目用情境描述，避免直接問「你是不是...」
5. 題目不超過 20 字，選項不超過 15 字
6. typeKeys 使用英文小寫，用連字號分隔（例如 deep-thinker）
7. 描述文字要有溫度、有趣且具洞察力
8. 選擇與主題搭配的配色方案
9. radarLabels 的數量必須等於 typeKeys 的數量
10. 每個 type 的 color 要與其性格特質氛圍匹配
11. indexLevels 必須按 min 值從大到小排列（85→65→40→0）
12. typeKeys 必須按照從「程度最高/最強烈」到「程度最低/最冷靜」的順序排列

請直接輸出 JSON，不要添加任何解釋文字。`;
}

export function buildKnowledgePrompt(topic, questionCount, style) {
  const sName = styleName(style);
  return `你是一位資深的測驗設計師，擅長製作有趣、有鑑別度的知識問答測驗。

請根據以下需求，設計一個「有標準答案」的知識問答測驗，輸出嚴格遵守指定的 JSON 格式：

【需求】
- 主題：${topic}
- 題目數量：${questionCount} 題（每題只有一個正確答案）
- 風格：${sName}
- 語言：繁體中文

【JSON 格式要求】
{
  "mode": "knowledge",
  "title": "測驗標題（簡潔吸睛，10字以內，例如：灌籃高手真粉檢定）",
  "subtitle": "副標題（一句話說明測驗目的）",
  "description": "測驗簡介（1-2句話，用於社群分享預覽）",
  "emoji": "一個代表測驗主題的 emoji",
  "icon": "Lucide icon 名稱（例如：trophy, brain, book-open, gamepad-2, music, film, flag, star, target, zap, globe, landmark, palette, coffee）",
  "accentColor": "主題色 hex（例如 #f59e0b）",
  "gradientFrom": "漸層起始色 hex",
  "gradientTo": "漸層結束色 hex",
  "startHint": "開始前的提示語（例如：全部答對才配稱真粉！）",
  "resultLabel": "稱號",
  "shareText": "分享時的行動呼籲語（例如：你也來挑戰看看！）",
  "questions": [
    {
      "id": "q1",
      "text": "題目（知識問答題，答案必須客觀正確且無爭議，25字以內）",
      "options": [
        { "text": "選項A（15字以內）" },
        { "text": "選項B" },
        { "text": "選項C" },
        { "text": "選項D" }
      ],
      "correct": 0,
      "explanation": "正解說明（20-40字，說明為什麼這是正確答案）"
    }
  ],
  "levels": [
    { "min": 100, "name": "最高稱號（只有全對才能獲得）", "icon": "crown", "emoji": "👑", "color": "#f59e0b", "gradient": "linear-gradient(135deg, #f59e0b, #ef4444)", "subtitle": "一句話描述此等級", "description": "此等級的分析結論（60-100字）", "traits": ["特質1", "特質2", "特質3", "特質4"], "advice": "給此等級玩家的話（30-50字）" },
    { "min": 80, "name": "第二級稱號", "icon": "medal", "emoji": "🥇", "color": "#hex", "gradient": "linear-gradient(...)", "subtitle": "...", "description": "...", "traits": ["..."], "advice": "..." },
    { "min": 60, "name": "第三級稱號", "icon": "star", "emoji": "⭐", "color": "#hex", "gradient": "linear-gradient(...)", "subtitle": "...", "description": "...", "traits": ["..."], "advice": "..." },
    { "min": 30, "name": "第四級稱號", "icon": "sprout", "emoji": "🌱", "color": "#hex", "gradient": "linear-gradient(...)", "subtitle": "...", "description": "...", "traits": ["..."], "advice": "..." },
    { "min": 0, "name": "最低稱號（幾乎全錯，例如：路過的假粉）", "icon": "ghost", "emoji": "👻", "color": "#hex", "gradient": "linear-gradient(...)", "subtitle": "...", "description": "...", "traits": ["..."], "advice": "..." }
  ]
}

【設計原則】
1. 每題必須有 4 個選項，correct 是正確選項的索引（0~3）；正確答案的位置要平均分佈在 0~3，絕對不要集中在同一個位置
2. 題目必須有客觀標準答案，不能出有爭議、主觀、或答案會隨時間改變的題目
3. 錯誤選項要有迷惑性（似是而非），不要一眼就能看出是錯的
4. 題目難度要有層次：約 1/3 簡單題、1/3 中等題、1/3 困難題
5. levels 必須剛好 5 個，min 由高到低依序為 100、80、60、30、0
6. min:100 的稱號只有「全對」才拿得到，名稱要有「真粉／大師／傳說」的榮耀感
7. min:0 的稱號是給幾乎全錯的玩家，要幽默好笑但不能羞辱人
8. 每個 level 的 description 是給該等級玩家的分析結論，要呼應主題
9. 5 個 level 的 color 由高分到低分要從暖色漸變到冷色

請直接輸出 JSON，不要添加任何解釋文字。`;
}

// --- Gemini call with backoff retry ---
export async function callGemini(env, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
  const body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.9,
      maxOutputTokens: 16384,
      thinkingConfig: { thinkingBudget: 1024 },
    },
  });

  const delays = [2000, 5000, 10000];
  let lastErr = '生成服務暫時無法使用，請稍後再試';
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    let res;
    try {
      res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    } catch (e) {
      lastErr = '無法連線到生成服務，請稍後再試';
      if (attempt < delays.length) { await sleep(delays[attempt]); continue; }
      return { ok: false, error: lastErr };
    }

    if (res.status === 429 || res.status === 503) {
      lastErr = '生成服務忙碌中，請稍後再試';
      if (attempt < delays.length) { await sleep(delays[attempt]); continue; }
      return { ok: false, error: lastErr };
    }
    if (!res.ok) {
      return { ok: false, error: '生成遇到問題，請再試一次' };
    }

    const data = await res.json();
    const cand = data.candidates && data.candidates[0];
    if (cand && cand.finishReason === 'MAX_TOKENS') {
      return { ok: false, error: '內容太長被截斷，請減少題目數量後再試' };
    }
    const text = cand && cand.content && cand.content.parts && cand.content.parts[0] && cand.content.parts[0].text;
    if (!text) return { ok: false, error: '生成遇到問題，請再試一次' };
    return { ok: true, text };
  }
  return { ok: false, error: lastErr };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// --- Parse LLM JSON (with code-fence fallback) ---
export function parseQuizJson(text) {
  try {
    return { ok: true, config: JSON.parse(text) };
  } catch (_) {
    const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (!m) return { ok: false, error: '生成遇到問題，請再試一次' };
    try {
      return { ok: true, config: JSON.parse(m[1]) };
    } catch (_2) {
      return { ok: false, error: '生成遇到問題，請再試一次' };
    }
  }
}

// --- Validation (stamp mode server-side after validating) ---
export function validateGenerated(config, isKnowledge) {
  if (isKnowledge) {
    const qs = config && config.questions;
    const badQuestion = !Array.isArray(qs) || qs.length === 0 || qs.some((q) =>
      !q || !q.text || !Array.isArray(q.options) || q.options.length < 2 ||
      !Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length);
    if (!config || !config.title || badQuestion ||
        !Array.isArray(config.levels) || config.levels.length < 2) {
      return { ok: false, error: '生成的測驗不完整，請再試一次' };
    }
    config.mode = 'knowledge';
    return { ok: true, config };
  }
  if (!config || !config.title || !config.questions || !config.types || !config.typeKeys) {
    return { ok: false, error: '生成的測驗不完整，請再試一次' };
  }
  config.mode = 'personality';
  return { ok: true, config };
}

// --- Validation (publish endpoint) ---
export function validateForPublish(config) {
  const isKnowledge = config && config.mode === 'knowledge';
  if (!config || !config.title || !config.questions ||
      (isKnowledge
        ? (!Array.isArray(config.levels) || config.levels.length === 0)
        : !config.types)) {
    return { ok: false, error: '測驗資料不完整' };
  }
  if (config.questions.length < 3 || config.questions.length > 20) {
    return { ok: false, error: '題目數量必須在 3~20 之間' };
  }
  return { ok: true };
}

// --- Homepage index (compact cards) ---
export function cardFromConfig(id, config) {
  return {
    id,
    title: config.title,
    subtitle: config.subtitle || '',
    emoji: config.emoji || '🧠',
    icon: config.icon || 'sparkles',
    accentColor: config.accentColor || '#FF8E9E',
    mode: config.mode === 'knowledge' ? 'knowledge' : 'personality',
    questionCount: Array.isArray(config.questions) ? config.questions.length : 0,
    publishedAt: config.publishedAt,
  };
}

export async function prependIndex(store, card) {
  let list = [];
  try {
    const raw = await store.get(INDEX_KEY);
    if (raw) list = JSON.parse(raw);
  } catch (_) { list = []; }
  list = [card, ...list.filter((c) => c.id !== card.id)].slice(0, INDEX_CAP);
  await store.put(INDEX_KEY, JSON.stringify(list));
}
