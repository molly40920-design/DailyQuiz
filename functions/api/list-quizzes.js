import { json, handleOptions, INDEX_KEY } from '../_lib/quiz.js';
import { makeStore } from '../_lib/store.js';

export const onRequestOptions = handleOptions;

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ quizzes: [] });

  let list = [];
  try {
    const raw = await makeStore(env).get(INDEX_KEY);
    if (raw) list = JSON.parse(raw);
  } catch (_) { list = []; }

  const url = new URL(request.url);
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit'), 10) || 60));

  // Normalise mode so the client can badge each card
  const quizzes = list.slice(0, limit).map((c) => ({
    ...c,
    mode: c.mode === 'knowledge' ? 'knowledge' : 'personality',
  }));

  return json({ quizzes });
}
