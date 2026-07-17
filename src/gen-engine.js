// Scoring engines for generated quizzes — pure functions, no dependencies.
// Q = quiz config, ans = array of chosen option indices per question.

export function analyze(Q, ans) {
  // 1. Sum weighted scores per type
  const scores = {};
  Q.typeKeys.forEach((k) => { scores[k] = 0; });
  Q.questions.forEach((q, qi) => {
    const chosen = q.options[ans[qi]];
    if (chosen && chosen.weights) {
      Object.entries(chosen.weights).forEach(([k, v]) => {
        if (scores[k] !== undefined) scores[k] += v;
      });
    }
  });

  // 2. Primary / secondary = two highest
  const sorted = [...Q.typeKeys].sort((a, b) => scores[b] - scores[a]);
  const primary = Q.types[sorted[0]];
  const secondary = Q.types[sorted[1]] || primary;

  // 3. Radar percentages (divide by max*1.1 so the top sits ~91%, off the edge)
  const maxScore = scores[sorted[0]] || 1;
  const pcts = {};
  Q.typeKeys.forEach((k) => { pcts[k] = Math.round((scores[k] / (maxScore * 1.1)) * 100); });

  // 4. Overall index: position-weighted. typeKeys MUST be strongest→weakest.
  const n = Q.typeKeys.length;
  let wSum = 0, wTotal = 0;
  Q.typeKeys.forEach((k, i) => {
    const intensity = n > 1 ? 1 - (i / (n - 1)) : 1;
    wSum += scores[k] * intensity;
    wTotal += scores[k];
  });
  const overall = wTotal > 0 ? Math.min(100, Math.round((wSum / wTotal) * 100)) : 50;
  const level = getLevel(Q, overall);
  return { primary, secondary, pcts, overall, scores, sortedKeys: sorted, level };
}

export function getLevel(Q, idx) {
  if (Q.indexLevels) {
    for (const lv of Q.indexLevels) { if (idx >= lv.min) return lv; }
  }
  if (idx >= 85) return { label: '超高', color: '#f5576c', desc: '指數爆表' };
  if (idx >= 65) return { label: '偏高', color: '#f093fb', desc: '相當明顯的傾向' };
  if (idx >= 45) return { label: '中等', color: '#667eea', desc: '有一定程度的傾向' };
  if (idx >= 25) return { label: '偏低', color: '#4ade80', desc: '輕微的傾向' };
  return { label: '極低', color: '#fbbf24', desc: '幾乎沒有這方面的傾向' };
}

export function analyzeK(Q, ans) {
  let score = 0;
  Q.questions.forEach((q, qi) => { if (ans[qi] === q.correct) score++; });
  const n = Q.questions.length;
  // floor, not round: only a genuine perfect run reaches 100 (min:100 title).
  const pct = n > 0 ? Math.floor((score / n) * 100) : 0;
  const levels = (Q.levels || []).slice().sort((a, b) => (b.min || 0) - (a.min || 0));
  const level = levels.find((l) => pct >= (l.min || 0))
    || levels[levels.length - 1]
    || { name: '挑戰完成', color: '#a78bfa', subtitle: '', description: '', traits: [], advice: '' };
  return { score, n, pct, level };
}
