import {
  json, errorJson, handleOptions, clientIp,
  shortId, validateForPublish, cardFromConfig, prependIndex,
} from '../_lib/quiz.js';
import { makeStore } from '../_lib/store.js';

export const onRequestOptions = handleOptions;

export async function onRequestPost({ request, env }) {
  if (!env.DB) return errorJson('伺服器尚未設定儲存空間', 500);
  const store = makeStore(env);

  let payload;
  try {
    payload = await request.json();
  } catch (_) {
    return errorJson('請求格式錯誤');
  }

  const config = payload.quizConfig;
  const check = validateForPublish(config);
  if (!check.ok) return errorJson(check.error);

  // Stamp server-side; never trust client-supplied timestamps
  config.publishedAt = new Date().toISOString();

  // Generate a unique short id
  let id = shortId(8);
  for (let i = 0; i < 5; i++) {
    const exists = await store.get(`quiz:${id}`);
    if (!exists) break;
    id = shortId(8);
  }

  // Store quiz config in D1 (expire after 90 days, matching Quiz Hub)
  await store.put(`quiz:${id}`, JSON.stringify(config), 86400 * 90);

  // Publisher IP kept in a SEPARATE meta key — never inside the public config
  try {
    await store.put(`meta:${id}`, JSON.stringify({ ip: clientIp(request), at: config.publishedAt }), 86400 * 90);
  } catch (_) { /* non-fatal */ }

  try {
    await prependIndex(store, cardFromConfig(id, config));
  } catch (_) { /* listing is best-effort */ }

  const origin = new URL(request.url).origin;
  return json({ id, url: `${origin}/#play=${id}` });
}
