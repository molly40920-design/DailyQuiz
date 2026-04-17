import './style.css';

// --- State Management ---
let quizzesData = [];
let currentQuiz = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let isTransitioning = false;

// --- DOM Elements ---
const views = {
  hub: document.getElementById('view-hub'),
  quiz: document.getElementById('view-quiz'),
  result: document.getElementById('view-result'),
};

const dom = {
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
  btnRetake: document.getElementById('btn-retake'),
  btnShare: document.getElementById('btn-share'),
  toast: document.getElementById('toast'),
};

// --- Initialization ---
async function init() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}quizzes.json`);
    if (!res.ok) throw new Error('Failed to load quizzes');
    quizzesData = await res.json();
    
    renderHub();
    setupEventListeners();
    handleRoute(window.location.hash);
  } catch (err) {
    console.error(err);
    alert('載入題庫失敗，請重新整理網頁。');
  }
}

// --- Routing & History API ---
function handleRoute(hash) {
  if (hash.startsWith('#quiz=')) {
    const quizId = hash.replace('#quiz=', '');
    const quiz = quizzesData.find(q => q.id === quizId);
    if (quiz) {
      startQuiz(quiz);
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
function renderHub() {
  dom.quizGrid.innerHTML = '';
  quizzesData.forEach((quiz, index) => {
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
          ${quiz.tags.slice(0, 2).map(t => `<span class="px-2 py-0.5 bg-[#E5E2DC] text-[#7A756D] rounded-full text-xs whitespace-nowrap">${t}</span>`).join('')}
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

function startQuiz(quiz) {
  resetQuizState();
  currentQuiz = quiz;
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
  const resultObj = currentQuiz.results.find(
    r => totalScore >= r.min && totalScore <= r.max
  );
  
  if (resultObj) {
    dom.resultTitle.textContent = resultObj.title;
    dom.resultDescription.textContent = resultObj.description;
  } else {
    dom.resultTitle.textContent = "神秘的未知結果";
    dom.resultDescription.textContent = "你的分數超出了我們的計算，你是個獨特的存在。";
  }

  window.history.replaceState({ view: 'result' }, null, `#result=${currentQuiz.id}-${totalScore}`);
  renderExplore();
  switchView('result');
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
  dom.btnBackHub.addEventListener('click', goHome);
  dom.btnResultHome.addEventListener('click', goHome);
  dom.btnHomeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      goHome();
    });
  });
  
  dom.btnRetake.addEventListener('click', () => {
    if (currentQuiz) {
      window.history.replaceState({ view: 'quiz' }, null, `#quiz=${currentQuiz.id}`);
      startQuiz(currentQuiz);
    } else {
      window.location.hash = '';
    }
  });

  dom.btnShare.addEventListener('click', async () => {
    if (isTransitioning) return;
    
    const urlStr = window.location.href.split('#')[0]; // share base hub url, or specific if desired. Realistically, usually share base url.
    const shareData = {
      title: `Daily Quiz - ${currentQuiz?.title || '心理測驗'}`,
      text: `神準！我在心理測驗獲得了「${dom.resultTitle.textContent}」，快來測測看！`,
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
