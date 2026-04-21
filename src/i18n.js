// --- i18n Module ---

const translations = {
  'zh-TW': {
    site_title: 'Daily Quiz',
    site_subtitle: '探索你的潛意識，遇見未知的故事',
    tab_all: '全部',
    tab_love: '戀愛',
    tab_personality: '人格',
    btn_back: '返回',
    btn_back_home: '返回首頁',
    btn_home: '回首頁',
    btn_start: '開始測驗',
    btn_retake: '再測一次',
    btn_share: '分享測驗',
    result_label: '測驗結果',
    result_analysis: '專屬解析',
    explore_title: '推薦探索',
    ad_label: '✨ 特別活動推薦',
    ad_overlay_label: '為您推薦',
    toast_copied: '已複製連結到剪貼簿！',
    share_title: 'Daily Quiz - {quiz}',
    share_text: '神準！我在心理測驗獲得了「{result}」，快來測測看！',
    error_load: '載入題庫失敗，請重新整理網頁。',
    fallback_title: '神秘的未知結果',
    fallback_desc: '你的分數超出了我們的計算，你是個獨特的存在。',
    radar_label: '屬性強度',
  },
  en: {
    site_title: 'Daily Quiz',
    site_subtitle: 'Explore your subconscious, discover untold stories',
    tab_all: 'All',
    tab_love: 'Love',
    tab_personality: 'Personality',
    btn_back: 'Back',
    btn_back_home: 'Back to Home',
    btn_home: 'Home',
    btn_start: 'Start Quiz',
    btn_retake: 'Retake',
    btn_share: 'Share',
    result_label: 'Quiz Result',
    result_analysis: 'Analysis',
    explore_title: 'Explore More',
    ad_label: '✨ Featured Event',
    ad_overlay_label: 'Recommended',
    toast_copied: 'Link copied to clipboard!',
    share_title: 'Daily Quiz - {quiz}',
    share_text: 'So accurate! I got "{result}" in a quiz. Come try it!',
    error_load: 'Failed to load quizzes. Please refresh the page.',
    fallback_title: 'Mysterious Unknown',
    fallback_desc: 'Your score is beyond our calculations — you are truly unique.',
    radar_label: 'Attribute Strength',
  },
  ja: {
    site_title: 'Daily Quiz',
    site_subtitle: '潜在意識を探り、未知の物語に出会う',
    tab_all: 'すべて',
    tab_love: '恋愛',
    tab_personality: '性格',
    btn_back: '戻る',
    btn_back_home: 'ホームに戻る',
    btn_home: 'ホーム',
    btn_start: 'テスト開始',
    btn_retake: 'もう一度',
    btn_share: 'シェア',
    result_label: 'テスト結果',
    result_analysis: '専属分析',
    explore_title: 'おすすめ',
    ad_label: '✨ おすすめイベント',
    ad_overlay_label: 'おすすめ',
    toast_copied: 'リンクをコピーしました！',
    share_title: 'Daily Quiz - {quiz}',
    share_text: '当たりすぎ！心理テストで「{result}」になりました。あなたも試してみて！',
    error_load: '読み込みに失敗しました。ページを更新してください。',
    fallback_title: '神秘的な未知の結果',
    fallback_desc: 'あなたのスコアは計算の範囲外です。あなたはユニークな存在です。',
    radar_label: '属性強度',
  },
  ko: {
    site_title: 'Daily Quiz',
    site_subtitle: '잠재의식을 탐험하고, 미지의 이야기를 만나보세요',
    tab_all: '전체',
    tab_love: '연애',
    tab_personality: '성격',
    btn_back: '뒤로',
    btn_back_home: '홈으로 돌아가기',
    btn_home: '홈',
    btn_start: '테스트 시작',
    btn_retake: '다시 하기',
    btn_share: '공유하기',
    result_label: '테스트 결과',
    result_analysis: '맞춤 분석',
    explore_title: '추천 탐험',
    ad_label: '✨ 추천 이벤트',
    ad_overlay_label: '추천',
    toast_copied: '링크가 복사되었습니다!',
    share_title: 'Daily Quiz - {quiz}',
    share_text: '정확해! 심리테스트에서 "{result}"를 받았어. 너도 해봐!',
    error_load: '로딩 실패. 페이지를 새로고침 해주세요.',
    fallback_title: '신비로운 미지의 결과',
    fallback_desc: '당신의 점수는 계산 범위를 초과했습니다. 당신은 특별한 존재입니다.',
    radar_label: '속성 강도',
  },
};

// Tag translation mapping (Chinese tag -> i18n key)
const tagKeyMap = {
  '全部': 'tab_all',
  '戀愛': 'tab_love',
  '人格': 'tab_personality',
};

const SUPPORTED_LANGS = ['zh-TW', 'en', 'ja', 'ko'];
const STORAGE_KEY = 'dailyquiz_lang';

let currentLang = 'zh-TW';

/**
 * Detect the best language to use.
 * Priority: localStorage > navigator.language > default (zh-TW)
 */
function detectLanguage() {
  // 1. Check localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) {
    return stored;
  }

  // 2. Check browser language
  const browserLang = navigator.language || navigator.userLanguage || '';
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('ja')) return 'ja';
  if (browserLang.startsWith('ko')) return 'ko';

  // 3. Default
  return 'zh-TW';
}

/**
 * Get a translated string by key. Supports {placeholder} replacement.
 */
export function t(key, params = {}) {
  const dict = translations[currentLang] || translations['zh-TW'];
  let str = dict[key] || translations['zh-TW'][key] || key;
  
  // Replace placeholders like {quiz}, {result}
  Object.keys(params).forEach(k => {
    str = str.replace(`{${k}}`, params[k]);
  });
  
  return str;
}

/**
 * Get the current language code.
 */
export function getCurrentLang() {
  return currentLang;
}

/**
 * Get the quiz JSON filename for the current language.
 * zh-TW uses 'quizzes.json', others use 'quizzes_{lang}.json'
 */
export function getQuizFilename() {
  if (currentLang === 'zh-TW') return 'quizzes.json';
  return `quizzes_${currentLang}.json`;
}

/**
 * Apply translations to all elements with [data-i18n] attribute.
 */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  
  // Update html lang attribute
  const langMap = { 'zh-TW': 'zh-TW', en: 'en', ja: 'ja', ko: 'ko' };
  document.documentElement.lang = langMap[currentLang] || 'zh-TW';
}

/**
 * Set the language, save to localStorage, and apply.
 * Returns true if quiz data needs to be reloaded (language actually changed).
 */
export function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return false;
  const changed = lang !== currentLang;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations();
  
  // Update selector if it exists
  const selector = document.getElementById('lang-selector');
  if (selector) selector.value = lang;
  
  return changed;
}

/**
 * Initialize i18n: detect language, apply translations, set up selector.
 */
export function initI18n() {
  currentLang = detectLanguage();
  applyTranslations();
  
  // Set selector value
  const selector = document.getElementById('lang-selector');
  if (selector) {
    selector.value = currentLang;
  }
}

/**
 * Translate a Chinese filter tag to its localized display text.
 */
export function translateTag(chineseTag) {
  const key = tagKeyMap[chineseTag];
  return key ? t(key) : chineseTag;
}
