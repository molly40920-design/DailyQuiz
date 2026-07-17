// Client for the AI quiz-generator Pages Functions.
// Same-origin deployment, so relative /api paths are correct.
const API = `${location.origin}/api`;

async function postJson(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '發生錯誤，請稍後再試');
  return data;
}

async function getJson(path) {
  const res = await fetch(`${API}${path}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || '發生錯誤，請稍後再試');
  return data;
}

export const genApi = {
  generate: (payload) => postJson('/generate-quiz', payload),
  publish: (quizConfig) => postJson('/publish-quiz', { quizConfig }),
  limit: () => getJson('/gen-limit'),
  getQuiz: (id) => getJson(`/quiz/${encodeURIComponent(id)}`),
  list: (limit = 60) => getJson(`/list-quizzes?limit=${limit}`),
};
