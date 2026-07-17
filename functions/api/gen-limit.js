import { json, handleOptions, clientIp, getGenCount, DAILY_GEN_LIMIT } from '../_lib/quiz.js';
import { makeStore } from '../_lib/store.js';

export const onRequestOptions = handleOptions;

export async function onRequestGet({ request, env }) {
  let used = 0;
  try {
    if (env.DB) used = await getGenCount(makeStore(env), clientIp(request));
  } catch (_) { used = 0; }
  return json({ used, limit: DAILY_GEN_LIMIT, remaining: Math.max(0, DAILY_GEN_LIMIT - used) });
}
