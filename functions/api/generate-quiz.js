import {
  json, errorJson, handleOptions, clientIp,
  getGenCount, bumpGenCount, DAILY_GEN_LIMIT,
  buildPersonalityPrompt, buildKnowledgePrompt,
  callGemini, parseQuizJson, validateGenerated,
} from '../_lib/quiz.js';
import { makeStore } from '../_lib/store.js';

export const onRequestOptions = handleOptions;

export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) return errorJson('伺服器尚未設定生成金鑰', 500);
  if (!env.DB) return errorJson('伺服器尚未設定儲存空間', 500);
  const store = makeStore(env);

  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return errorJson('請求格式錯誤');
  }

  const topic = (payload.topic || '').toString().trim();
  const mode = payload.mode === 'knowledge' ? 'knowledge' : 'personality';
  let questionCount = parseInt(payload.questionCount, 10);
  let typeCount = parseInt(payload.resultTypeCount, 10);
  const style = payload.style || 'fun';

  if (topic.length < 2 || topic.length > 100) {
    return errorJson('主題請輸入 2~100 個字');
  }
  if (!Number.isFinite(questionCount)) questionCount = 8;
  questionCount = Math.max(5, Math.min(15, questionCount));
  if (!Number.isFinite(typeCount)) typeCount = 4;
  typeCount = Math.max(3, Math.min(8, typeCount));

  // Rate limit (fail-open on counter errors)
  const ip = clientIp(request);
  try {
    const used = await getGenCount(store, ip);
    if (used >= DAILY_GEN_LIMIT) {
      return errorJson(`今日生成次數已達上限（每日 ${DAILY_GEN_LIMIT} 次），請明天再來`, 429);
    }
  } catch (_) { /* fail open */ }

  const isKnowledge = mode === 'knowledge';
  const prompt = isKnowledge
    ? buildKnowledgePrompt(topic, questionCount, style)
    : buildPersonalityPrompt(topic, questionCount, typeCount, style);

  const gen = await callGemini(env, prompt);
  if (!gen.ok) return errorJson(gen.error, 502);

  const parsed = parseQuizJson(gen.text);
  if (!parsed.ok) return errorJson(parsed.error, 502);

  const validated = validateGenerated(parsed.config, isKnowledge);
  if (!validated.ok) return errorJson(validated.error, 502);

  // Count this successful generation (never blocks the response)
  await bumpGenCount(store, ip);

  let remaining = null;
  try { remaining = Math.max(0, DAILY_GEN_LIMIT - (await getGenCount(store, ip))); } catch (_) {}

  return json({ quizConfig: validated.config, remaining });
}
