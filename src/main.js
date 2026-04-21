import './style.css';
import { t, getCurrentLang, getQuizFilename, initI18n, setLanguage, applyTranslations, translateTag } from './i18n.js';

// --- State Management ---
let quizzesData = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let isTransitioning = false;
let currentRadarChart = null;

// --- DOM Elements ---
const views = {
  hub: document.getElementById('view-hub'),
  intro: document.getElementById('view-intro'),
  quiz: document.getElementById('view-quiz'),
  result: document.getElementById('view-result'),
};

const dom = {
  btnIntroBack: document.getElementById('btn-intro-back'),
  introTitle: document.getElementById('intro-title'),
  introDescription: document.getElementById('intro-description'),
  introTags: document.getElementById('intro-tags'),
  btnStartQuiz: document.getElementById('btn-start-quiz'),

  quizGrid: document.getElementById('quiz-grid'),
  exploreGrid: document.getElementById('explore-grid'),
  btnBackHub: document.getElementById('btn-back-hub'),
  btnResultHome: document.getElementById('btn-result-home'),
  btnHomeLinks: document.querySelectorAll('.btn-home'),
  
  quizProgressText: document.getElementById('quiz-progress-text'),
  quizProgressBar: document.getElementById('quiz-progress-bar'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  
  resultTitle: document.getElementById('result-title'),
  resultDescription: document.getElementById('result-description'),
  radarChartContainer: document.getElementById('radar-chart-container'),
  radarChart: document.getElementById('radar-chart'),
  resultCommentContainer: document.getElementById('result-comment-container'),
  resultComment: document.getElementById('result-comment'),
  btnRetake: document.getElementById('btn-retake'),
  btnShare: document.getElementById('btn-share'),
  toast: document.getElementById('toast'),
  navTabs: document.querySelectorAll('.nav-tab'),
  adOverlay: document.getElementById('ad-overlay'),
  adOverlayContent: document.getElementById('ad-overlay-content'),
  btnCloseAd: document.getElementById('btn-close-ad'),
  langSelector: document.getElementById('lang-selector'),
};

// --- Tracking Utility ---
function trackPageView(pagePath, pageTitle) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      send_to: 'G-VPY9J8FWSR'
    });
  }
}

// --- Load Quiz Data ---
async function loadQuizData() {
  const filename = getQuizFilename();
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}${filename}`);
    if (!res.ok) throw new Error(`Failed to load ${filename}`);
    quizzesData = await res.json();
  } catch (err) {
    console.warn(`Failed to load ${filename}, falling back to quizzes.json`);
    // Fallback to Chinese version
    const res = await fetch(`${import.meta.env.BASE_URL}quizzes.json`);
    if (!res.ok) throw new Error('Failed to load quizzes');
    quizzesData = await res.json();
  }
}

// --- Initialization ---
async function init() {
  try {
    // Initialize i18n first
    initI18n();
    
    // Load quiz data based on detected language
    await loadQuizData();
    
    renderHub();
    setupEventListeners();
    handleRoute(window.location.hash);
  } catch (err) {
    console.error(err);
    alert(t('error_load'));
  }
}

// --- Routing & History API ---
function handleRoute(hash) {
  if (hash.startsWith('#quiz=')) {
    const quizId = hash.replace('#quiz=', '');
    const quiz = quizzesData.find(q => q.id === quizId);
    if (quiz) {
      showIntro(quiz);
    } else {
      switchView('hub');
    }
  } else if (hash.startsWith('#result=')) {
     // Optional: allow direct linking to results if we persist score in URL
     switchView('hub'); 
  } else {
    switchView('hub');
  }
}

window.addEventListener('popstate', () => {
  // If user clicks back button, refresh the view based on hash
  // Also reset state if going back to hub
  if (!window.location.hash || window.location.hash === '') {
    resetQuizState();
    switchView('hub');
  } else {
    handleRoute(window.location.hash);
  }
});

// --- View Switching ---
function switchView(viewName) {
  Object.values(views).forEach(el => {
    el.classList.remove('active');
    el.classList.add('hidden');
    el.style.opacity = '0';
  });

  const activeView = views[viewName];
  activeView.classList.remove('hidden');
  
  // slight delay for rendering before fading in
  setTimeout(() => {
    activeView.classList.add('active');
    activeView.style.opacity = '1';
  }, "50");
}

// --- Render Hub ---
function renderHub(filterTag = '全部') {
  trackPageView('/', 'Daily Quiz | 每日一測');
  dom.quizGrid.innerHTML = '';
  
  const filteredQ = filterTag === '全部' 
    ? quizzesData 
    : quizzesData.filter(q => q.tags && q.tags.includes(filterTag));
    
  filteredQ.forEach((quiz, index) => {
    const row = document.createElement('div');
    row.className = 'quiz-list-item';
    row.innerHTML = `
      <div class="flex items-center gap-5 w-full">
        <span class="text-ghibli-text-light text-sm font-medium min-w-[28px] text-right">${String(index + 1).padStart(2, '0')}</span>
        <div class="flex-1 min-w-0">
          <h3 class="text-lg font-bold text-ghibli-text mb-1 truncate">${quiz.title}</h3>
          <p class="text-ghibli-text-light text-sm truncate">${quiz.description}</p>
        </div>
        <div class="hidden sm:flex gap-1.5 flex-shrink-0">
          ${quiz.tags.slice(0, 2).map(tg => `<span class="px-2 py-0.5 bg-[#E5E2DC] text-[#7A756D] rounded-full text-xs whitespace-nowrap">${tg}</span>`).join('')}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#C4BEB5] flex-shrink-0"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    `;
    row.addEventListener('click', () => {
      window.location.hash = `#quiz=${quiz.id}`;
    });
    dom.quizGrid.appendChild(row);
  });
}

// --- Quiz Engine ---
function resetQuizState() {
  currentQuiz = null;
  currentQuestionIndex = 0;
  totalScore = 0;
  isTransitioning = false;
}

function showIntro(quiz) {
  resetQuizState();
  currentQuiz = quiz;
  
  trackPageView(`/quiz/${quiz.id}`, `DailyQuiz-${quiz.title}`);
  
  dom.introTitle.textContent = quiz.title;
  dom.introDescription.textContent = quiz.description;
  
  dom.introTags.innerHTML = quiz.tags.map(tg => 
    `<span class="px-3 py-1 bg-[#E5E2DC] text-[#7A756D] rounded-full text-sm">${tg}</span>`
  ).join('');

  switchView('intro');
}

function startQuiz() {
  if (!currentQuiz) return;
  // reset state other than currentQuiz
  currentQuestionIndex = 0;
  totalScore = 0;
  isTransitioning = false;
  
  trackPageView(`/quiz/${currentQuiz.id}/play`, `DailyQuiz-${currentQuiz.title}`);

  switchView('quiz');
  renderQuestion();
}

function renderQuestion() {
  if (currentQuestionIndex >= currentQuiz.questions.length) {
    calculateResult();
    return;
  }

  isTransitioning = false; // unlock interaction
  const question = currentQuiz.questions[currentQuestionIndex];
  
  // Progress
  const currentNum = currentQuestionIndex + 1;
  const totalNum = currentQuiz.questions.length;
  dom.quizProgressText.textContent = `${currentNum} / ${totalNum}`;
  dom.quizProgressBar.style.width = `${(currentNum / totalNum) * 100}%`;

  // Question context
  // Fade out effect
  dom.questionText.style.opacity = '0';
  dom.optionsContainer.style.opacity = '0';
  
  setTimeout(() => {
    dom.questionText.textContent = question.text;
    dom.optionsContainer.innerHTML = '';
    
    question.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt.text;
      
      btn.addEventListener('click', () => handleOptionClick(opt.score, btn));
      dom.optionsContainer.appendChild(btn);
    });

    // Fade in
    dom.questionText.style.opacity = '1';
    dom.optionsContainer.style.opacity = '1';
  }, 200);
}

function handleOptionClick(score, btnElement) {
  if (isTransitioning) return; // Prevent double clicks
  isTransitioning = true;
  
  // UI feedback
  btnElement.classList.add('selected');
  
  // Record score
  totalScore += score;
  
  // Next question
  setTimeout(() => {
    currentQuestionIndex++;
    renderQuestion();
  }, 400); // 400ms delay for visual feedback
}

// --- Result & Sharing ---
function calculateResult() {
  isTransitioning = false; // unlock interaction for result page buttons
  const resultObj = currentQuiz.results.find(
    r => totalScore >= r.min && totalScore <= r.max
  );
  
  if (resultObj) {
    dom.resultTitle.textContent = resultObj.title;
    dom.resultDescription.textContent = resultObj.description;
    
    if (resultObj.comment) {
      dom.resultComment.textContent = resultObj.comment;
      dom.resultCommentContainer.classList.remove('hidden');
    } else {
      dom.resultCommentContainer.classList.add('hidden');
    }

    if (resultObj.radarData) {
      dom.radarChartContainer.classList.remove('hidden');
      renderRadarChart(resultObj.radarData);
    } else {
      dom.radarChartContainer.classList.add('hidden');
      if (currentRadarChart) {
        currentRadarChart.destroy();
        currentRadarChart = null;
      }
    }
  } else {
    dom.resultTitle.textContent = t('fallback_title');
    dom.resultDescription.textContent = t('fallback_desc');
    dom.resultCommentContainer.classList.add('hidden');
    dom.radarChartContainer.classList.add('hidden');
  }

  trackPageView(`/quiz/${currentQuiz.id}/result`, `DailyQuiz-${currentQuiz.title}`);
  window.history.replaceState({ view: 'result' }, null, `#result=${currentQuiz.id}-${totalScore}`);
  renderExplore();
  switchView('result');
  
  // Trigger overlay pop up ad after delay
  setTimeout(() => {
    if (views.result.classList.contains('active')) {
      showAdPopup();
    }
  }, 3000);
}

// --- Ad Presentation Logic ---
function showAdPopup() {
  const now = Date.now();
  const lastAdTime = sessionStorage.getItem('lastAdTime');
  const COOLDOWN_MS = 10000; // 10 seconds cooldown
  
  if (lastAdTime && now - parseInt(lastAdTime) < COOLDOWN_MS) {
    console.log('Ad popup blocked by cooldown.');
    return;
  }
  
  sessionStorage.setItem('lastAdTime', now.toString());
  
  if (dom.adOverlay) {
    dom.adOverlay.classList.remove('opacity-0', 'pointer-events-none');
    dom.adOverlayContent.classList.remove('scale-95');
  }
}

function closeAdPopup() {
  if (dom.adOverlay) {
    dom.adOverlay.classList.add('opacity-0', 'pointer-events-none');
    dom.adOverlayContent.classList.add('scale-95');
  }
}

function renderRadarChart(radarData) {
  if (currentRadarChart) {
    currentRadarChart.destroy();
  }
  
  const ctx = dom.radarChart.getContext('2d');
  
  currentRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: radarData.labels,
      datasets: [{
        label: t('radar_label'),
        data: radarData.values,
        backgroundColor: 'rgba(152, 168, 158, 0.3)',
        borderColor: 'rgba(122, 138, 128, 0.8)',
        pointBackgroundColor: 'rgba(122, 138, 128, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(122, 138, 128, 1)',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: { color: 'rgba(0, 0, 0, 0.05)' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
          pointLabels: {
            font: { family: "'Inter', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR', sans-serif", size: 13, weight: '500' },
            color: '#7A756D'
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(122, 138, 128, 0.9)',
          padding: 10,
          cornerRadius: 8,
          titleFont: { size: 14, family: "'Inter', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR', sans-serif" },
          bodyFont: { size: 13, family: "'Inter', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR', sans-serif" },
        }
      }
    }
  });
}

function renderExplore() {
  dom.exploreGrid.innerHTML = '';
  // Pick up to 3 random quizzes except the current one
  const others = quizzesData.filter(q => q.id !== currentQuiz.id);
  const shuffled = others.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);
  
  selected.forEach(quiz => {
    const el = document.createElement('div');
    el.className = 'flex flex-col bg-[#F4F1EA] p-4 rounded-2xl cursor-pointer hover:bg-[#E5E2DC] transition-colors';
    el.innerHTML = `<span class="text-ghibli-text font-medium mb-1">${quiz.title}</span>`;
    el.addEventListener('click', () => {
      window.location.hash = `#quiz=${quiz.id}`;
    });
    dom.exploreGrid.appendChild(el);
  });
}

function showToast() {
  dom.toast.style.opacity = '1';
  setTimeout(() => {
    dom.toast.style.opacity = '0';
  }, 2500);
}

function goHome() {
  resetQuizState();
  window.location.hash = '';
  switchView('hub');
}

function setupEventListeners() {
  // Language selector
  if (dom.langSelector) {
    dom.langSelector.addEventListener('change', async (e) => {
      const newLang = e.target.value;
      const changed = setLanguage(newLang);
      if (changed) {
        // Reload quiz data in the new language
        await loadQuizData();
        // Re-render current view
        resetQuizState();
        renderHub();
        switchView('hub');
        window.location.hash = '';
      }
    });
  }

  // Nav tabs - use data-filter attribute for filter logic
  if (dom.navTabs) {
    dom.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        dom.navTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filterTag = tab.getAttribute('data-filter') || '全部';
        renderHub(filterTag);
      });
    });
  }

  if (dom.btnCloseAd) {
    dom.btnCloseAd.addEventListener('click', closeAdPopup);
    dom.adOverlay.addEventListener('click', (e) => {
      if (e.target === dom.adOverlay) closeAdPopup();
    });
  }

  if (dom.btnIntroBack) {
    dom.btnIntroBack.addEventListener('click', () => {
      window.location.hash = ''; // go back to hub
    });
  }
  if (dom.btnStartQuiz) {
    dom.btnStartQuiz.addEventListener('click', startQuiz);
  }

  dom.btnBackHub.addEventListener('click', goHome);
  dom.btnResultHome.addEventListener('click', goHome);
  dom.btnHomeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      goHome();
    });
  });
  
  dom.btnRetake.addEventListener('click', () => {
    showAdPopup();
    setTimeout(() => {
      if (currentQuiz) {
        window.history.replaceState({ view: 'quiz' }, null, `#quiz=${currentQuiz.id}`);
        startQuiz();
      } else {
        window.location.hash = '';
      }
    }, 100);
  });

  dom.btnShare.addEventListener('click', async () => {
    if (isTransitioning) return;
    showAdPopup();
    
    const urlStr = window.location.href.split('#')[0];
    const shareData = {
      title: t('share_title', { quiz: currentQuiz?.title || 'Quiz' }),
      text: t('share_text', { result: dom.resultTitle.textContent }),
      url: urlStr,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("User cancelled share or error:", err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`).then(() => {
        showToast();
      }).catch(err => {
        console.error("Clipboard copy failed");
      });
    }
  });
}

// Start
document.addEventListener('DOMContentLoaded', init);
