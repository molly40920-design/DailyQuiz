import fs from 'fs';
const file = 'd:/Anti/DailyQuiz/public/quizzes.json';
let data = JSON.parse(fs.readFileSync(file, 'utf8'));

const tagsMapping = {
  "q1": ["溫柔陪伴", "精神共鳴", "生活樂趣", "智性吸引", "情緒穩定"],
  "q2": ["依賴度", "傲嬌度", "熱情度", "獨立性", "行動力"],
  "q3": ["浪漫熱情", "默默守護", "正向樂觀", "深沉執著", "儀式感"],
  "q4": ["焦慮感", "逃避感", "信任度", "溝通力", "獨立自主"],
  "love-manual-quiz": ["獨立自由", "包容忍耐", "熱情主動", "細膩敏感", "理性分析"]
};

const valuesConfig = [
  [85, 70, 40, 50, 90], // rank 1
  [60, 90, 50, 70, 80], // rank 2
  [75, 40, 95, 60, 70], // rank 3
  [90, 60, 30, 95, 80]  // rank 4
];

const commentsConfig = [
  "專屬解析：保持你現在的步調非常好，但偶爾也可以試著向對方展露脆弱的一面，這能讓你們的關係更加深刻。",
  "專屬解析：你的包容力是關係中最大的潤滑劑，但請記得，將自己的感受放在首位同樣重要，不要委屈了自己。",
  "專屬解析：你充滿熱情的愛意總是能感染對方，試著在激情過後，靜下心來傾聽對方細微的聲音。",
  "專屬解析：在追求極致的愛戀與理想時，試著給彼此留一點呼吸的空間，距離有時能產生不可思議的美感。"
];

data.forEach(q => {
  const labels = tagsMapping[q.id] || ["特質A", "特質B", "特質C", "特質D", "特質E"];
  q.results.forEach((r, idx) => {
    r.comment = commentsConfig[idx % 4];
    r.radarData = {
      labels: labels,
      values: valuesConfig[idx % 4].map(v => v + Math.floor(Math.random() * 10 - 5)) // Add minor randomness for uniqueness
    };
    
    // Ensure bounds
    r.radarData.values = r.radarData.values.map(v => Math.min(100, Math.max(10, v)));
  });
});

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Quizzes updated successfully.');
