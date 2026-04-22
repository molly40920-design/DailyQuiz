const fs = require('fs');
const path = require('path');

const enQuiz = {
  id: "love-brain-quiz",
  title: "Love Brain Index Test",
  description: "Does your IQ drop to zero when you fall in love? Or do you remain totally rational? Take these 10 situational questions to find out your 'Love Brain' index.",
  category: "romance",
  tags: ["Love", "Psychology"],
  questions: [
    { text: "Your partner said something hurtful today. Your first reaction?", options: [
      { text: "Assume they were just angry and make excuses for them", score: 4 },
      { text: "Feel sad initially, but a little coaxing makes you forgive", score: 3 },
      { text: "Directly point out the problem and demand an apology", score: 2 },
      { text: "Calmly analyze their intention and secretly deduct points", score: 1 }
    ]},
    { text: "In the early dating stage, they suddenly act cold. What do you do?", options: [
      { text: "Feel anxious and constantly reflect on whether you did wrong", score: 4 },
      { text: "Test the waters, but give up if they stay cold", score: 3 },
      { text: "Play it cool and refocus on your own life", score: 2 },
      { text: "Decide they are emotionally unstable and cut them off", score: 1 }
    ]},
    { text: "All your friends warn you, 'This person is not right for you.' You would...", options: [
      { text: "Nod on the outside, but continue loving them blindly", score: 4 },
      { text: "Listen, but believe your love can change them", score: 3 },
      { text: "Start evaluating the relationship and raise your guard", score: 2 },
      { text: "Hit the brakes immediately if friends have valid points", score: 1 }
    ]},
    { text: "If love has a max score of 100, what score do you give them at start?", options: [
      { text: "100 instantly! Once in love, they are perfect", score: 4 },
      { text: "80. First impressions were great so they start high", score: 3 },
      { text: "A passing 50. Let them slowly earn points", score: 2 },
      { text: "0. Everyone starts as strangers; that's only fair", score: 1 }
    ]},
    { text: "Your partner commits a cardinal sin but cries for forgiveness.", options: [
      { text: "Feel uncontrollably sorry and forgive immediately", score: 4 },
      { text: "Be furious, but ultimately give them one more chance", score: 3 },
      { text: "Forgive, but set strict probation and clear boundaries", score: 2 },
      { text: "Rules are rules. Crossing the line means permanent exit", score: 1 }
    ]},
    { text: "You have weekend plans with friends, but your partner wants to see you.", options: [
      { text: "Cancel on friends; my partner comes first", score: 4 },
      { text: "Try to compromise by asking if partner can join", score: 3 },
      { text: "Reassure them, but stick to original plans", score: 2 },
      { text: "Tell them to find something to do; don't mess with my schedule", score: 1 }
    ]},
    { text: "In a stable relationship, do you change your style for them?", options: [
      { text: "Absolutely, I'll change into whatever they like", score: 4 },
      { text: "I'll cater to their taste occasionally", score: 3 },
      { text: "Consider good suggestions but keep my own style", score: 2 },
      { text: "Never. They have to accept the real me", score: 1 }
    ]},
    { text: "Your partner puts a new password on their phone and acts secretive.", options: [
      { text: "Feel uneasy, but convince yourself to 'give privacy'", score: 4 },
      { text: "Overthink endlessly, but afraid to ask and ruin things", score: 3 },
      { text: "Ask directly and demand a reasonable explanation", score: 2 },
      { text: "Pretend not to notice, start gathering evidence to leave", score: 1 }
    ]},
    { text: "Looking back, what is usually your main reason for breaking up?", options: [
      { text: "Enduring countless disappointments until my heart breaks", score: 4 },
      { text: "Realizing they will never change, and leaving sadly", score: 3 },
      { text: "Noticing mismatched future goals; preferring short-term pain", score: 2 },
      { text: "Crossed my bottom line or lost feelings. Decisive", score: 1 }
    ]},
    { text: "To you, what is the ideal state of love?", options: [
      { text: "Sticking together daily to share everything", score: 4 },
      { text: "Mutual reliance; they are my strongest safe haven", score: 3 },
      { text: "Independent but supportive; we shine individually", score: 2 },
      { text: "Just icing on the cake; I can live well without romance", score: 1 }
    ]}
  ],
  results: [
    {
      min: 10, max: 17,
      title: "Love Brain 0%: The Cold Rationalist",
      description: "Your brain is bulletproof! You are a pragmatist in love. Sweet words do nothing to you; you value actions over promises. Even when dating, you always put your own feelings and career absolutely first.",
      comment: "Exclusive Analysis: Being wide awake protects you from getting hurt, but letting your guard down sometimes isn't a bad experience.",
      radarData: { labels: ["Impulse", "Filter", "Protection", "Sacrifice", "Friction"], values: [20, 10, 95, 15, 10] }
    },
    {
      min: 18, max: 25,
      title: "Love Brain 30%: The Flexible Warrior",
      description: "You balance reason and emotion perfectly. You enjoy the romance, but your boundaries are firm. If they show red flags, you immediately retract and prepare to exit gracefully.",
      comment: "Exclusive Analysis: This principled style is very healthy! Keep it up, and you'll find happiness without losing yourself.",
      radarData: { labels: ["Impulse", "Filter", "Protection", "Sacrifice", "Friction"], values: [45, 30, 80, 40, 30] }
    },
    {
      min: 26, max: 33,
      title: "Love Brain 75%: The Romantic with a Pink Filter",
      description: "You definitely have a love brain! Once you like someone, you view them through an ultra-thick beauty filter. When issues arise, you easily soften and make excuses for them.",
      comment: "Exclusive Analysis: Your gentleness is a great asset, but if the filter cracks, be brave enough to admit it instead of lying to yourself.",
      radarData: { labels: ["Impulse", "Filter", "Protection", "Sacrifice", "Friction"], values: [80, 75, 40, 75, 65] }
    },
    {
      min: 34, max: 40,
      title: "Love Brain 999%: Hopeless Pure Love Devotee",
      description: "Severe terminal love brain! When in love, your IQ zeroes out, and the world is just them. You endlessly compromise and sacrifice. If they are happy, you swallow any grievance.",
      comment: "Exclusive Analysis: Pure love is invincible! But a relationship should make both of you shine, not dim your light to illuminate them. Love yourself more!",
      radarData: { labels: ["Impulse", "Filter", "Protection", "Sacrifice", "Friction"], values: [95, 99, 10, 95, 90] }
    }
  ]
};

const jaQuiz = JSON.parse(JSON.stringify(enQuiz));
jaQuiz.title = "恋愛脳指数テスト";
jaQuiz.description = "恋をするとIQがゼロになる？それとも常に冷静？10のシチュエーション質問であなたの「恋愛脳」度を測定します。";
jaQuiz.tags = ["恋愛", "心理"];
jaQuiz.questions[0].text = "今日、相手が少しキツいことを言いました。あなたの最初の反応は？";
jaQuiz.questions[0].options = [{text:"機嫌が悪いだけだと思い、自動的に言い訳を探す",score:4},{text:"悲しいが、少しなだめられると許してしまう",score:3},{text:"問題点を直接指摘し、謝罪を要求する",score:2},{text:"冷静に意図を分析し、心の中で大きく減点する",score:1}];
jaQuiz.questions[1].text = "付き合い始めの時期、相手が急に冷たくなりました。どうしますか？";
jaQuiz.questions[1].options = [{text:"不安になり、自分が何か間違えたかと反省し続ける",score:4},{text:"少し探りを入れるが、冷たいままなら諦める",score:3},{text:"相手が動かないなら自分も動かず、自分の生活に集中する",score:2},{text:"情緒不安定で面倒な人だと判断し、即座に関係を断つ",score:1}];
jaQuiz.questions[2].text = "友達全員が「あの人はやめたほうがいい」と忠告してきました。";
jaQuiz.questions[2].options = [{text:"表面上は頷くが、実際は盲目的に愛し続ける",score:4},{text:"聞き入れるが、自分の愛で相手を変えられると信じる",score:3},{text:"関係を真剣に見直し、警戒心を強める",score:2},{text:"友達の指摘が客観的で正当なら、すぐにブレーキをかける",score:1}];
jaQuiz.questions[3].text = "恋愛の満点が100点の場合、付き合い始めの相手に何点を与えますか？";
jaQuiz.questions[3].options = [{text:"即座に100点！恋をしたら完璧な存在になる",score:4},{text:"80点。第一印象が良いので高い点からスタートする",score:3},{text:"ギリギリの50点。徐々に点数を稼いでもらう",score:2},{text:"0点。最初はみんな他人、それが公平だ",score:1}];
jaQuiz.questions[4].text = "相手があなたの絶対に許せないミスをしたが、泣いて許しを乞いました。";
jaQuiz.questions[4].options = [{text:"かわいそうに思い、つい心が揺れて許してしまう",score:4},{text:"激怒するが、最終的にもう一度だけチャンスを与える",score:3},{text:"許すが、厳密な観察期間と境界線を設定する",score:2},{text:"原則は原則。一線を越えたら絶対に別れる",score:1}];
jaQuiz.questions[5].text = "友達と週末の予定を入れていたが、恋人が急に会いたいと言ってきた。";
jaQuiz.questions[5].options = [{text:"迷わず友達との約束をキャンセル。恋人が最優先",score:4},{text:"恋人を連れて行けないか調整を試みる",score:3},{text:"なだめつつも、当初の予定通り友達に会いに行く",score:2},{text:"自分で何か探すように言い、予定を邪魔させない",score:1}];
jaQuiz.questions[6].text = "安定した関係の中で、無意識に相手の好みに合わせて変えますか？";
jaQuiz.questions[6].options = [{text:"完全に変える。相手が好きなら喜んで合わせる",score:4},{text:"時折相手の好みに合わせて少し妥協する",score:3},{text:"良い提案は参考にするが、自分のスタイルは保つ",score:2},{text:"絶対にしない。私を好きならありのままを受け入れるべき",score:1}];
jaQuiz.questions[7].text = "相手が急に携帯にパスワードを設定し、隠すようになりました。";
jaQuiz.questions[7].options = [{text:"不安だが、「プライバシーを尊重しよう」と自分に言い聞かせる",score:4},{text:"無限に考えすぎるが、関係が壊れるのが怖くて聞けない",score:3},{text:"直接尋ね、合理的な説明を求める",score:2},{text:"気づかないふりをして、別れの準備のためにこっそり証拠を集める",score:1}];
jaQuiz.questions[8].text = "過去を振り返って、あなたの別れの主な原因は何ですか？";
jaQuiz.questions[8].options = [{text:"数え切れないほどの失望と悔しさに耐えきれなくなった",score:4},{text:"相手が決して変わらないと気づき、悲しみながら去る",score:3},{text:"将来の目標が合わないと気づき、早めに終わらせる",score:2},{text:"一線を越えられたか、冷めたか。非常に決断が早い",score:1}];
jaQuiz.questions[9].text = "あなたにとって、理想の恋愛状態とは？";
jaQuiz.questions[9].options = [{text:"毎日一緒にいて全てを共有したい、世界には二人だけ",score:4},{text:"お互いに頼り合い、相手が最強の避難場所",score:3},{text:"自立しながら支え合い、それぞれが輝く",score:2},{text:"ただのオマケ。恋愛がなくても十分幸せに生きられる",score:1}];
jaQuiz.results[0] = {min:10,max:17,title:"恋愛脳指数 0%: 冷静沈着な冷徹マシーン",description:"あなたの脳は防弾仕様！恋愛でも実用主義者で、甘い言葉は通じず、約束より行動を重視します。",comment:"専用解析: 常に警戒するのは傷つかないためですが、時には防備を解いて純粋な恋愛を楽しむのも悪くありません。",radarData:{labels:["衝動","フィルター","自己防衛","自己犠牲","精神疲労"],values:[20,10,95,15,10]}};
jaQuiz.results[1] = {min:18,max:25,title:"恋愛脳指数 30%: 臨機応変な恋愛戦士",description:"理知と感情を完璧に使い分けます。ロマンスを楽しみますが、境界線は厳守。相手に赤い旗が見えれば、即座に身を引きます。",comment:"専用解析: この原則に基づくスタイルは非常に健康的です！自分を見失うことなく幸せを見つけられるでしょう。",radarData:{labels:["衝動","フィルター","自己防衛","自己犠牲","精神疲労"],values:[45,30,80,40,30]}};
jaQuiz.results[2] = {min:26,max:33,title:"恋愛脳指数 75%: ピンクのフィルターを持つロマンチスト",description:"あなたは間違いなく少し恋愛脳です！好きな人を超極厚の美顔フィルター越しに見てしまいます。問題が起きても、すぐに心軟かくなり言い訳を探します。",comment:"専用解析: あなたの優しさは素晴らしい資産ですが、フィルターが割れた時は自己欺瞞せず勇気を持って認めてください。",radarData:{labels:["衝動","フィルター","自己防衛","自己犠牲","精神疲労"],values:[80,75,40,75,65]}};
jaQuiz.results[3] = {min:34,max:40,title:"恋愛脳指数 999%: 救いようのない純愛の神",description:"重度の末期恋愛脳！恋愛中はIQがゼロになり、世界は相手だけになります。相手が喜ぶなら、どんな苦痛も飲み込んで無限に妥協・犠牲にします。",comment:"専用解析: 純愛は無敵！しかし、恋愛は二人とも輝かせるべきであり、相手を照らすために自分の光を消さないでください。",radarData:{labels:["衝動","フィルター","自己防衛","自己犠牲","精神疲労"],values:[95,99,10,95,90]}};

const koQuiz = JSON.parse(JSON.stringify(enQuiz));
koQuiz.title = "연애뇌 지수 테스트";
koQuiz.description = "사랑에 빠지면 IQ가 0이 되나요? 아니면 항상 이성적인가요? 10가지 상황 질문을 통해 당신의 '연애뇌' 지수를 측정해보세요.";
koQuiz.tags = ["연애", "심리"];
koQuiz.questions[0].text = "오늘 상대방이 약간 기분 나쁜 말을 했습니다. 첫 반응은?";
koQuiz.questions[0].options = [{text:"그냥 화가 난 것뿐이라며 속으로 변명해준다",score:4},{text:"처음엔 슬프지만 조금 달래주면 금세 용서한다",score:3},{text:"말의 문제점을 직접 지적하고 사과를 요구한다",score:2},{text:"의도를 냉정히 분석하고 속으로 크게 감점한다",score:1}];
koQuiz.questions[1].text = "썸 타는 시기에 상대방이 갑자기 차갑게 대한다면?";
koQuiz.questions[1].options = [{text:"불안해하며 내가 뭔가 잘못했는지 계속 반성한다",score:4},{text:"떠보긴 하지만 계속 차가우면 포기한다",score:3},{text:"상대가 움직이지 않으면 나도 내 생활에 집중한다",score:2},{text:"감정 기복이 심한 사람이라 판단하고 바로 끊어낸다",score:1}];
koQuiz.questions[2].text = "모든 친구들이 '그 사람은 진짜 아니야'라고 충고한다면?";
koQuiz.questions[2].options = [{text:"겉으론 알겠다고 하지만 속으론 여전히 맹목적으로 사랑한다",score:4},{text:"듣기는 하지만 내 사랑으로 그를 바꿀 수 있다고 믿는다",score:3},{text:"관계를 진지하게 재평가하고 경계심을 높인다",score:2},{text:"친구들의 지적이 객관적이고 타당하면 즉시 브레이크를 밟는다",score:1}];
koQuiz.questions[3].text = "연애의 만점이 100점이라면, 사귀기 시작할 때 몇 점을 주나요?";
koQuiz.questions[3].options = [{text:"시작부터 100점! 사랑에 빠지면 내 눈엔 완벽하다",score:4},{text:"80점. 첫인상이 좋았으니 높은 점수에서 시작한다",score:3},{text:"턱걸이 50점. 천천히 점수를 딸 기회를 준다",score:2},{text:"0점. 처음엔 다 타인이니 이게 공평하다",score:1}];
koQuiz.questions[4].text = "결코 용납할 수 없는 실수를 한 연인이 울며 용서를 구한다면?";
koQuiz.questions[4].options = [{text:"너무 불쌍해 보여 한순간 마음이 약해져 용서한다",score:4},{text:"매우 화가 나지만 결국 마지막으로 한 번의 기회를 준다",score:3},{text:"용서는 하되 매우 엄격한 관찰 기간과 경계를 설정한다",score:2},{text:"원칙은 원칙. 선을 넘었으니 단호하게 끝낸다",score:1}];
koQuiz.questions[5].text = "주말에 친구와 약속이 있는데, 연인이 갑자기 보고 싶다고 한다면?";
koQuiz.questions[5].options = [{text:"망설임 없이 친구 약속을 취소. 연인이 최우선이다",score:4},{text:"친구들 모임에 연인을 데려가도 될지 조율해본다",score:3},{text:"달래주긴 하지만 원래 계획대로 친구를 만나러 간다",score:2},{text:"혼자 할 일을 찾아보라고 하며 내 스케줄을 방해하지 못하게 한다",score:1}];
koQuiz.questions[6].text = "안정적인 관계에서 자신도 모르게 상대의 취향 맞춰 변화하나요?";
koQuiz.questions[6].options = [{text:"완전히 변한다. 상대가 좋아하는 모습이라면 기꺼이 바꾼다",score:4},{text:"어느 정도 영향을 받고 가끔 상대의 취향에 맞춰준다",score:3},{text:"좋은 제안은 참고하지만 내 원래 스타일은 유지한다",score:2},{text:"절대 안 바꾼다. 나를 좋아한다면 있는 그대로 받아들여야 한다",score:1}];
koQuiz.questions[7].text = "상대방이 갑자기 핸드폰에 비밀번호를 걸고 비밀스럽게 행동한다면?";
koQuiz.questions[7].options = [{text:"불안하지만 '사생활 존중'이라며 현실을 도피한다",score:4},{text:"미친 듯이 속앓이를 하지만 관계가 깨질까 봐 묻지도 못한다",score:3},{text:"직접 대놓고 물어보고 합리적인 해명을 요구한다",score:2},{text:"모른 척하지만 속으로 이별을 준비하며 증거를 모은다",score:1}];
koQuiz.questions[8].text = "과거를 돌아볼 때, 이별을 결심하는 주된 이유는 보통 무엇이었나요?";
koQuiz.questions[8].options = [{text:"수많은 실망과 억울함에 견디다 못해 마음이 완전히 부서졌을 때",score:4},{text:"그 사람이 절대 변하지 않을 거란 걸 깨닫고 가슴 아프게 떠날 때",score:3},{text:"미래의 목표가 확연히 다르다는 걸 느끼고 더 늦기 전에 끝낼 때",score:2},{text:"선을 넘었거나 단순히 감정이 식었을 때. 매우 단호하다",score:1}];
koQuiz.questions[9].text = "당신에게 이상적인 연애 상태란?";
koQuiz.questions[9].options = [{text:"매일 붙어 있고 모든 걸 공유하는 것, 세상엔 우리 둘뿐",score:4},{text:"서로 의지하며 상대가 나의 가장 든든한 피난처가 되는 것",score:3},{text:"평소엔 독립적이지만 필요할 때 힘이 되며 각자 빛나는 것",score:2},{text:"그저 금상첨화일 뿐, 연애가 없어도 충분히 잘 살아갈 수 있다",score:1}];
koQuiz.results[0] = {min:10,max:17,title:"연애뇌 지수 0%: 인간 각성 냉혹한 무기",description:"당신의 두뇌는 방탄! 사랑에서도 실용주의자이며 달콤한 말은 통하지 않습니다. 약속보단 행동을 중시하죠.",comment:"전용 해석: 항상 경계하는 것은 상처받지 않기 위함이지만, 가끔은 방어막을 내리고 단순한 연애를 즐겨보는 것도 나쁘지 않습니다.",radarData:{labels:["충동성","필터 두께","자기 보호","자기 희생","감정 소모"],values:[20,10,95,15,10]}};
koQuiz.results[1] = {min:18,max:25,title:"연애뇌 지수 30%: 유연한 연애 전사",description:"이성과 감성을 완벽하게 넘나듭니다. 로맨스를 즐기지만 경계선은 확고하죠. 상대방에게 적신호가 보이면 즉각 감정을 거둡니다.",comment:"전용 해석: 원칙 있는 당신의 연애 스타일은 매우 건강합니다! 앞으로도 자신을 잃지 않고 행복한 연애를 할 것입니다.",radarData:{labels:["충동성","필터 두께","자기 보호","자기 희생","감정 소모"],values:[45,30,80,40,30]}};
koQuiz.results[2] = {min:26,max:33,title:"연애뇌 지수 75%: 핑크빛 필터 장착 로맨티스트",description:"당신은 확실히 연애뇌 기질이 있습니다! 누군가를 좋아하면 엄청 두꺼운 보정 필터를 씌워버립니다. 문제가 생겨도 금세 마음이 약해지죠.",comment:"전용 해석: 당신의 다정함은 큰 장점이지만, 필터가 깨졌을 때 스스로를 속이지 말고 용기 있게 직면하세요.",radarData:{labels:["충동성","필터 두께","자기 보호","자기 희생","감정 소모"],values:[80,75,40,75,65]}};
koQuiz.results[3] = {min:34,max:40,title:"연애뇌 지수 999%: 구제 불능 순애보 신",description:"중증 말기 연애뇌! 사랑에 빠지면 IQ가 포맷되고 세상엔 그 사람뿐입니다. 상대가 기뻐한다면 어떤 희생도 마다하지 않습니다.",comment:"전용 해석: 순애보는 무적! 하지만 사랑은 두 사람 모두를 빛나게 해야지, 상대를 밝히기 위해 내 빛을 희생해선 안 됩니다.",radarData:{labels:["충동성","필터 두께","자기 보호","자기 희생","감정 소모"],values:[95,99,10,95,90]}};

const files = ['en', 'ja', 'ko'];
const quizesObj = { 'en': enQuiz, 'ja': jaQuiz, 'ko': koQuiz };

files.forEach(lang => {
  const p = path.join(__dirname, '..', 'public', `quizzes_${lang}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const idx = data.findIndex(q => q.id === "love-brain-quiz");
  
  if (idx > -1) {
    data[idx] = quizesObj[lang];
  } else {
    data.push(quizesObj[lang]);
  }
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Appended translations to en, ja, ko files successfully');
