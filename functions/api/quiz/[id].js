import { json, errorJson, handleOptions } from '../../_lib/quiz.js';
import { makeStore } from '../../_lib/store.js';

export const onRequestOptions = handleOptions;

export async function onRequestGet({ params, env }) {
  if (!env.DB) return errorJson('伺服器尚未設定儲存空間', 500);
  const store = makeStore(env);
  const id = (params.id || '').toString();
  if (!/^[0-9A-Za-z]{4,16}$/.test(id)) return errorJson('測驗代碼格式錯誤', 400);

  const raw = await store.get(`quiz:${id}`);
  if (!raw) return errorJson('找不到這個測驗', 404);

  let config;
  try { config = JSON.parse(raw); } catch (_) { return errorJson('測驗資料損毀', 500); }

  return json({ id, quizConfig: config });
}
