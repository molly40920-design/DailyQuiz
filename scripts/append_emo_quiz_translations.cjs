const fs = require('fs');
const path = require('path');

const enQuiz = {
  id: "midnight-emo-quiz",
  title: "Midnight EMO Frequency Quiz",
  description: "Social butterfly by day, social phobic by night? Discover your 'midnight inner monologue' type and see if you're a Revenge Bedtime Champion or Schrödinger's Melancholy Clown!",
  category: "psychological",
  tags: ["Psychology", "Fun"],
  questions: [
    { text: "It's 1 AM, your phone screen is still on. What are you looking at?", options: [
      { text: "Funny shorts or memes, can't stop scrolling, brain is hyper", score: 1 },
      { text: "Scrolling through others' stories, feeling a bit anxious and comparing", score: 2 },
      { text: "Listening to sad songs, staring at chat logs of someone who won't contact you anymore", score: 3 },
      { text: "Already on Do Not Disturb, just checking the time before going back to sleep", score: 4 }
    ]},
    { text: "Suddenly recalling something wrong you said in public 5 years ago. Your reaction?", options: [
      { text: "Whatever! Who remembers it now? Quick, watch the next video to distract", score: 1 },
      { text: "Twisting in bed, mentally rehearsing 100 times 'what I should have said'", score: 2 },
      { text: "Feeling like a failure who always messes up, letting out a long sigh", score: 3 },
      { text: "5 years ago? I don't even remember what I had for dinner yesterday", score: 4 }
    ]},
    { text: "A friend texts at 2 AM: 'I'm so sad...'. What do you do?", options: [
      { text: "Send 10 dark humor memes or funny stickers to force a laugh", score: 1 },
      { text: "Analyze the situation with them, ending up getting anxious yourself", score: 2 },
      { text: "Instantly reply 'What's wrong? I'm here', totally empathizing and almost crying", score: 3 },
      { text: "See it at 8 AM, calmly reply: 'Sorry I was asleep, are you okay?'", score: 4 }
    ]},
    { text: "While taking a shower, what's running through your mind?", options: [
      { text: "Holding a solo concert, or rehearsing an award acceptance speech", score: 1 },
      { text: "Reviewing everything that happened today, criticizing your own performance", score: 2 },
      { text: "Pondering the meaning of life, the end of the universe, and why nobody understands you", score: 3 },
      { text: "Spacing out. Thinking the water is a bit hot, turning it down", score: 4 }
    ]},
    { text: "Seeing a super EMO (emotional) long post on Threads. What do you do?", options: [
      { text: "Swipe away. Too long, I only want funny stuff", score: 1 },
      { text: "Quietly finish reading, think 'Wow this is literally me', and heart it", score: 2 },
      { text: "Can't help but leave a comforting comment, feeling everyone has it hard", score: 3 },
      { text: "Think 'This person has too much free time', close the app and sleep", score: 4 }
    ]},
    { text: "If your 'midnight mood' were a song, what genre would it be?", options: [
      { text: "EDM Party: Brain spinning, getting hyped, don't want the day to end", score: 1 },
      { text: "Indie Rock: Full of murmurs, confusion, and unanswered questions", score: 2 },
      { text: "Ballad: A sad love song that almost makes you cry on the first note", score: 3 },
      { text: "White Noise: Calm, peaceful, only the sound of rhythmic breathing", score: 4 }
    ]},
    { text: "You have an important early morning interview/date tomorrow. Your state tonight?", options: [
      { text: "Tell yourself to sleep early, but fingers can't stop scrolling until the last minute", score: 1 },
      { text: "Lie in bed frantically rehearsing all possible disasters, can't sleep at all", score: 2 },
      { text: "Worry about performing poorly, lose confidence, sink into a low mood spiral", score: 3 },
      { text: "Set three alarms, fall asleep the second you hit the pillow", score: 4 }
    ]},
    { text: "If you could invent a magic pill, what would you want it to cure?", options: [
      { text: "The 'clown mask syndrome' of feeling like a joke at night", score: 1 },
      { text: "The 'severe mental drain' of overthinking someone's casual words", score: 2 },
      { text: "The 'midnight fragility' of inexplicably feeling lonely and wanting to cry", score: 3 },
      { text: "No need for pills, my mental and physical state is healthy as steel", score: 4 }
    ]},
    { text: "When you feel overwhelmed by emotions, how do you usually vent?", options: [
      { text: "Binge eating midnight snacks or shopping, filling the void with dopamine", score: 1 },
      { text: "Posting cryptic complaints on a private account or Threads that only you understand", score: 2 },
      { text: "Crying hard, or writing a long memo essay that will never be sent", score: 3 },
      { text: "Sleep. After waking up, the world will return to normal", score: 4 }
    ]},
    { text: "To sum up, what does 'midnight' mean to you?", options: [
      { text: "My only 'free time' of the day, absolutely nobody can take it away", score: 1 },
      { text: "A cruel mirror reflecting all the anxiety and insecurity hidden during the day", score: 2 },
      { text: "A giant bomb shelter where I can secretly lick my wounds", score: 3 },
      { text: "It's just the brain's time to repair and recharge, what else?", score: 4 }
    ]}
  ],
  results: [
    {
      min: 10, max: 15,
      title: "【Revenge Bedtime Champion】",
      description: "'I'm not staying up late, I'm reclaiming the freedom I couldn't get during the day.' Your EMO frequency is very low because you simply don't have time to be sad! You refuse to sleep because midnight is the only time you control. A normal person by day, a web-surfing master by night. As long as your phone has battery, you can party till dawn.",
      comment: "Exclusive Analysis: Your hidden toxicity is using temporary pleasure to numb yourself, escaping real-world pressure. Try sleeping earlier and bringing that control back to your daytime!",
      radarData: { labels: ["Night Owl", "Corporate Slave", "Stability", "Overthinking", "Empathy"], values: [99, 90, 70, 40, 50] }
    },
    {
      min: 16, max: 25,
      title: "【Midnight Ruminator】",
      description: "'At 2 AM, I promptly recall a wrong sentence I said 5 years ago, and feel too awkward to sleep.' Your EMO is anxiety-driven. A strict disciplinary committee lives in your brain, replaying all your awkward moments and wrong decisions every midnight. Others have long forgotten, but you still punish yourself.",
      comment: "Exclusive Analysis: Your hidden toxicity is severe mental drain, torturing yourself with others' mistakes or your own minor flaws. Let it go, nobody really cares about 5 years ago!",
      radarData: { labels: ["Night Owl", "Corporate Slave", "Stability", "Overthinking", "Empathy"], values: [80, 60, 40, 95, 70] }
    },
    {
      min: 26, max: 33,
      title: "【Schrödinger's Melancholy Clown】",
      description: "'Post about how terrible I feel, but immediately reply \"Haha I'm fine\" when someone comforts me.' You have pure midnight EMO constitution. Highly empathetic, you easily feel lonely at night. Magically, after a good sleep, you switch back to a sunny personality as if the crying person wasn't you.",
      comment: "Exclusive Analysis: Your hidden toxicity is carrying others' emotions while craving salvation yet pushing away care. It's okay to admit your fragility!",
      radarData: { labels: ["Night Owl", "Corporate Slave", "Stability", "Overthinking", "Empathy"], values: [60, 50, 30, 85, 99] }
    },
    {
      min: 34, max: 40,
      title: "【Iron-Walled Sleep God】",
      description: "'What is EMO? Can I eat it? As long as I sleep fast enough, sadness can't catch me.' You are the rarest human! Extremely rational and emotionally stable, you believe a good sleep is better than self-pity. Others' EMO stories sound like alien language to you.",
      comment: "Exclusive Analysis: Your hidden toxicity is that your excessive rationality sometimes makes sensitive friends think you are cold-blooded. Showing a little human touch occasionally isn't bad!",
      radarData: { labels: ["Night Owl", "Corporate Slave", "Stability", "Overthinking", "Empathy"], values: [20, 70, 99, 20, 40] }
    }
  ]
};

const jaQuiz = JSON.parse(JSON.stringify(enQuiz));
jaQuiz.title = "ディープナイトEMO頻度図鑑";
jaQuiz.description = "昼間は陽キャ、夜は陰キャ？あなたの「深夜の脳内劇場」タイプを診断し、報復性夜更かしチャンピオンか、シュレーディンガーの憂鬱ピエロかを確認しましょう！";
jaQuiz.tags = ["心理", "おもしろ"];
jaQuiz.questions[0].text = "午前1時、スマホの画面はまだ点灯しています。何を見ていますか？";
jaQuiz.questions[0].options = [{text:"面白動画やミーム、止まらなくて脳が興奮状態",score:1},{text:"他人のストーリーをひたすら見て、少し比較して焦る",score:2},{text:"悲しい歌を聴きながら、もう連絡の来ない人のトーク履歴を見つめる",score:3},{text:"すでにおやすみモード。時間を確認してまた寝るだけ",score:4}];
jaQuiz.questions[1].text = "5年前、人前で言い間違えたことを急に思い出しました。反応は？";
jaQuiz.questions[1].options = [{text:"まあいいや！今誰が覚えてるの？早く次の動画を見て気を紛らわそう",score:1},{text:"ベッドで身悶えし、「あの時こう返すべきたった」と脳内で100回シミュレーションする",score:2},{text:"自分はいつも失敗ばかりするダメ人間だと感じ、長いため息をつく",score:3},{text:"5年前のこと？昨日の夕食に何を食べたかすら覚えてない",score:4}];
jaQuiz.questions[2].text = "深夜2時に友人から「すごく悲しい...」とメッセージが。どうする？";
jaQuiz.questions[2].options = [{text:"ブラックジョークの画像やスタンプを10枚送って無理やり笑わせようとする",score:1},{text:"一緒に原因を分析し、結果的に自分まで焦り始める",score:2},{text:"秒で「どうしたの？私がいるよ」と返し、完全に共感して自分も泣きそうになる",score:3},{text:"翌朝8時に見て、冷静に「ごめん昨晩爆睡してた、大丈夫？」と返す",score:4}];
jaQuiz.questions[3].text = "シャワーを浴びている時、脳内では通常何が展開されていますか？";
jaQuiz.questions[3].options = [{text:"ソロライブの開催、または授賞式のスピーチの練習",score:1},{text:"今日の出来事を全て振り返り、自分のダメだった所を反省する",score:2},{text:"人生の意味、宇宙の果て、そしてなぜ誰も私を理解してくれないのかを考える",score:3},{text:"無の境地。お湯が少し熱いなと思い、温度を下げる",score:4}];
jaQuiz.questions[4].text = "SNSで超EMO（感情的）な長文投稿を見かけました。どうする？";
jaQuiz.questions[4].options = [{text:"スワイプ。長すぎる、面白いものだけ見たい",score:1},{text:"黙って最後まで読み、「これ完全に私のことだ」と思い、そっといいねを押す",score:2},{text:"みんな辛いんだなと思い、思わず慰めのコメントを残す",score:3},{text:"「暇な人だな」と思い、アプリを閉じて寝る準備をする",score:4}];
jaQuiz.questions[5].text = "あなたの「深夜の感情」を曲に例えるなら、どんなジャンル？";
jaQuiz.questions[5].options = [{text:"EDMパーティー：脳がフル回転、夜更けほどハイになり、今日を終わらせたくない",score:1},{text:"インディーズバンド：つぶやき、迷い、そして答えのない疑問に満ちている",score:2},{text:"バラード：イントロが流れただけで涙が出そうになる悲しいラブソング",score:3},{text:"ホワイトノイズ：波風立たず、ただ規則正しい呼吸音だけ",score:4}];
jaQuiz.questions[6].text = "翌朝、超重要な面接やデートがあります。前夜のあなたの状態は？";
jaQuiz.questions[6].options = [{text:"早く寝ようと言い聞かせるが、指が止まらずギリギリまでスマホをいじる",score:1},{text:"ベッドに横たわり、明日起こり得るあらゆる災難を想定して全く眠れない",score:2},{text:"うまくできないのではと心配し、自信を失って落ち込みループにハマる",score:3},{text:"アラームを3つセットし、枕に頭が触れた瞬間に即寝",score:4}];
jaQuiz.questions[7].text = "もし特効薬を発明できるなら、自分の何を治したいですか？";
jaQuiz.questions[7].options = [{text:"夜になると自分がピエロのように思える「おどけ仮面症候群」",score:1},{text:"他人の何気ない一言で色々妄想してしまう「重度の精神疲労」",score:2},{text:"深夜になると無性に孤独で泣きたくなる「深夜脆弱シンドローム」",score:3},{text:"薬は不要。今の私は心身ともに鋼のように健康だ",score:4}];
jaQuiz.questions[8].text = "感情が爆発しそうな時、通常どうやって発散しますか？";
jaQuiz.questions[8].options = [{text:"夜食を爆食いするか爆買いし、物質とドーパミンで虚無感を埋める",score:1},{text:"裏アカやSNSで自分にしか分からないような遠回しな愚痴を投稿する",score:2},{text:"大泣きするか、絶対に送信しない長文のメモ書きエッセイを書く",score:3},{text:"一晩寝る。寝て起きれば世界は元通りになる",score:4}];
jaQuiz.questions[9].text = "結論として、あなたにとって「深夜」とはどのような存在ですか？";
jaQuiz.questions[9].options = [{text:"1日で唯一の「自由時間」、誰にも奪わせない",score:1},{text:"昼間隠していた焦りや不安を全て映し出す、残酷な照魔鏡",score:2},{text:"こっそり傷を舐めることができる、巨大な防空壕",score:3},{text:"ただ脳を修復し充電するための時間、他に何がある？",score:4}];
jaQuiz.results[0] = {min:10,max:15,title:"【報復性夜更かしチャンピオン】",description:"「夜更かししてるんじゃない、昼間得られなかった自由を取り戻してるんだ。」あなたのEMO頻度は非常に低いです。悲しんでいる暇がないからです！深夜こそ唯一自分がコントロールできる時間。昼間は常識人、夜はネットサーフィンの達人。スマホの充電が続く限り、夜明けまでハイでいられます。",comment:"専用解析: 隠れた毒性は、一時的な快楽で自分を麻痺させ、現実の逃避をしていること。少し早く寝て、そのコントロール感を昼間に戻してみましょう！",radarData:{labels:["夜更かし度","社畜度","安定性","妄想度","共感力"],values:[99,90,70,40,50]}};
jaQuiz.results[1] = {min:16,max:25,title:"【ミッドナイト反芻アニマル】",description:"「深夜2時、5年前に言い間違えた一言を正確に思い出し、気まずくて眠れない。」あなたのEMOは不安型です。脳内に厳しい風紀委員が住んでおり、毎晩あなたの気まずい瞬間や間違った決断を狂ったようにリプレイします。他人はとうの昔に忘れているのに、あなただけが自分を罰し続けています。",comment:"専用解析: 隠れた毒性は重度の精神疲労。他人のミスや自分の小さな欠点で自分を痛めつけるのが得意。自分を許して、5年前のことなんて誰も気にしてません！",radarData:{labels:["夜更かし度","社畜度","安定性","妄想度","共感力"],values:[80,60,40,95,70]}};
jaQuiz.results[2] = {min:26,max:33,title:"【シュレーディンガーの憂鬱ピエロ】",description:"「自分がダメだと投稿し、慰められると秒で『大丈夫笑』と返す。」あなたは純血の深夜EMO体質。共感力が高く、夜は孤独を感じがちです。不思議なことに、一晩寝るとすぐに明るいキャラに切り替わり、昨夜泣いていたのが自分ではないかのようになります。",comment:"専用解析: 隠れた毒性は、他人の感情を背負いすぎ、救いを求めながらも気遣いを突き放すこと。自分の弱さを認めても恥ずかしくありませんよ！",radarData:{labels:["夜更かし度","社畜度","安定性","妄想度","共感力"],values:[60,50,30,85,99]}};
jaQuiz.results[3] = {min:34,max:40,title:"【鉄壁の冷酷な眠りの神】",description:"「EMOって何？食べれる？早く寝れば悲しみは私に追いつけない。」あなたはSNS上で最も希少な人類です！極めて理性的で情緒が安定しており、自己憐憫に時間を費やすより寝た方がマシだと考えています。他人のEMO投稿はあなたにとって宇宙語のようなものです。",comment:"専用解析: 隠れた毒性は、時に理性的すぎて、敏感な友人から冷血だと思われること。たまには人間味を見せるのも悪くありません！",radarData:{labels:["夜更かし度","社畜度","安定性","妄想度","共感力"],values:[20,70,99,20,40]}};

const koQuiz = JSON.parse(JSON.stringify(enQuiz));
koQuiz.title = "심야 EMO 빈도 도감";
koQuiz.description = "낮에는 인싸, 밤에는 아싸? 당신의 '심야 내면 극장' 유형을 테스트해보세요. 보복성 밤샘 챔피언인지, 슈뢰딩거의 우울한 광대인지 확인하세요!";
koQuiz.tags = ["심리", "유머"];
koQuiz.questions[0].text = "새벽 1시, 아직도 폰 화면이 켜져 있습니다. 주로 무엇을 보고 있나요?";
koQuiz.questions[0].options = [{text:"웃긴 숏폼이나 밈, 멈출 수가 없어 뇌가 각성 상태다",score:1},{text:"다른 사람들의 스토리를 보며 은근히 비교하고 불안해한다",score:2},{text:"슬픈 노래를 들으며 이제 연락 안 올 사람의 톡방을 본다",score:3},{text:"이미 방해금지 모드, 시간만 확인하고 다시 잘 준비를 한다",score:4}];
koQuiz.questions[1].text = "5년 전 사람들 앞에서 말실수했던 게 갑자기 떠올랐습니다. 반응은?";
koQuiz.questions[1].options = [{text:"에이! 지금 누가 기억해? 빨리 다음 영상 보면서 잊어버리자",score:1},{text:"침대에서 몸부림치며 '그때 이렇게 대답했어야 했는데'를 100번 시뮬레이션한다",score:2},{text:"나는 항상 망치기만 하는 루저라며 깊은 한숨을 쉰다",score:3},{text:"5년 전? 어제 저녁 뭐 먹었는지도 기억 안 나는데",score:4}];
koQuiz.questions[2].text = "친구가 새벽 2시에 '나 너무 우울해...'라고 보냈습니다. 어떻게 할까요?";
koQuiz.questions[2].options = [{text:"블랙 코미디 짤이나 엉뚱한 이모티콘 10개를 보내 억지로 웃기려 한다",score:1},{text:"같이 원인을 분석해주다가 나까지 불안해진다",score:2},{text:"칼답으로 '무슨 일이야? 내가 있잖아' 하며 폭풍 공감, 나도 눈물이 난다",score:3},{text:"다음 날 아침 8시에 보고 '미안 어제 뻗었어, 괜찮아?'라고 차분히 보낸다",score:4}];
koQuiz.questions[3].text = "샤워할 때, 머릿속에서는 주로 어떤 일이 벌어지나요?";
koQuiz.questions[3].options = [{text:"단독 콘서트 개최, 또는 수상 소감 연습",score:1},{text:"오늘 있었던 일을 복기하며 내 잘못을 자책한다",score:2},{text:"인생의 의미, 우주의 끝, 왜 아무도 날 이해 못 할까 고민한다",score:3},{text:"멍 때린다. 물이 좀 뜨겁네 하며 온도를 낮춘다",score:4}];
koQuiz.questions[4].text = "SNS에 누군가 엄청난 EMO(감성) 장문을 올린 걸 봤습니다. 어떻게 할까요?";
koQuiz.questions[4].options = [{text:"스와이프. 너무 길어, 난 재밌는 것만 볼래",score:1},{text:"조용히 끝까지 읽고 '이거 완전 내 얘기네' 하며 남몰래 좋아요를 누른다",score:2},{text:"세상 사람들 다 힘들구나 싶어 참지 못하고 위로의 댓글을 단다",score:3},{text:"'이 사람 진짜 한가하네' 생각하고 앱을 끄고 잔다",score:4}];
koQuiz.questions[5].text = "당신의 '심야 감성'을 노래 장르에 비유한다면?";
koQuiz.questions[5].options = [{text:"EDM 파티: 뇌가 풀가동, 늦을수록 하이텐션, 오늘을 끝내기 싫다",score:1},{text:"인디 밴드: 웅얼거림, 방황, 그리고 해답 없는 의문으로 가득하다",score:2},{text:"발라드: 전주만 나와도 눈물이 날 것 같은 슬픈 이별 노래",score:3},{text:"백색소음: 잔잔함, 오직 규칙적인 숨소리만 들린다",score:4}];
koQuiz.questions[6].text = "내일 아침 아주 중요한 면접/데이트가 있습니다. 전날 밤 당신의 상태는?";
koQuiz.questions[6].options = [{text:"일찍 자자고 다짐하지만 손가락을 멈추지 못해 끝까지 미룬다",score:1},{text:"침대에 누워 내일 일어날 온갖 재난 상황을 상상하느라 잠을 못 잔다",score:2},{text:"망칠까 봐 걱정하다 자신감을 잃고 우울의 늪에 빠진다",score:3},{text:"알람 3개를 맞추고 베개에 머리가 닿자마자 기절한다",score:4}];
koQuiz.questions[7].text = "특효약을 발명할 수 있다면, 당신의 어떤 점을 고치고 싶나요?";
koQuiz.questions[7].options = [{text:"밤만 되면 내가 삐에로 같아지는 '어릿광대 가면 증후군'",score:1},{text:"남의 무심한 한마디에 온갖 망상을 하는 '중증 정신 소모'",score:2},{text:"새벽만 되면 괜히 외롭고 울고 싶어지는 '심야 취약 증후군'",score:3},{text:"약은 필요 없다. 난 지금 심신이 강철처럼 건강하다",score:4}];
koQuiz.questions[8].text = "감정이 폭발할 것 같을 때, 주로 어떻게 푸나요?";
koQuiz.questions[8].options = [{text:"야식을 폭식하거나 폭풍 쇼핑, 물질과 도파민으로 공허함을 채운다",score:1},{text:"비계나 SNS에 나만 알아볼 수 있는 은근한 불평 글을 올린다",score:2},{text:"펑펑 울거나, 절대 보내지 않을 장문의 메모장 에세이를 쓴다",score:3},{text:"한숨 잔다. 자고 일어나면 세상은 다시 정상으로 돌아온다",score:4}];
koQuiz.questions[9].text = "결론적으로, 당신에게 '심야'란 어떤 존재인가요?";
koQuiz.questions[9].options = [{text:"하루 중 유일한 '자유 시간', 절대 뺏기기 싫다",score:1},{text:"낮에 숨겨둔 불안과 초조함을 다 비추는 잔혹한 거울",score:2},{text:"몰래 상처를 핥을 수 있는 거대한 방공호",score:3},{text:"그냥 뇌를 수리하고 충전하는 시간이지, 다른 게 있나?",score:4}];
koQuiz.results[0] = {min:10,max:15,title:"【보복성 밤샘 챔피언】",description:"'나는 밤을 새는 게 아니야, 낮에 얻지 못한 자유를 되찾는 거지.' 당신의 EMO 빈도는 매우 낮습니다. 슬퍼할 시간도 없기 때문이죠! 심야는 당신이 유일하게 통제할 수 있는 시간이라 자기 아깝습니다. 낮에는 정상인, 밤에는 네티즌 마스터. 폰 배터리만 있다면 동틀 때까지 놀 수 있습니다.",comment:"전용 해석: 숨겨진 독성은 일시적인 쾌락으로 자신을 마비시키고 현실을 도피하는 것입니다. 조금 일찍 자고 통제감을 낮으로 돌려보세요!",radarData:{labels:["밤샘 지수","사축 지수","안정성","망상 지수","공감 능력"],values:[99,90,70,40,50]}};
koQuiz.results[1] = {min:16,max:25,title:"【미드나잇 반추 동물】",description:"'새벽 2시, 5년 전 말실수를 정확히 떠올리고 이불킥하느라 못 잔다.' 당신의 EMO는 불안형입니다. 뇌 속에 엄격한 규율 위원회가 살고 있어 매일 밤 흑역사와 잘못된 결정을 미친 듯이 재생합니다. 남들은 다 잊었는데 당신만 스스로를 벌하고 있습니다.",comment:"전용 해석: 숨겨진 독성은 중증 정신 소모입니다. 남의 실수나 나의 작은 단점으로 자신을 괴롭히는 데 선수죠. 자신을 용서하세요, 5년 전 일은 아무도 신경 안 씁니다!",radarData:{labels:["밤샘 지수","사축 지수","안정성","망상 지수","공감 능력"],values:[80,60,40,95,70]}};
koQuiz.results[2] = {min:26,max:33,title:"【슈뢰딩거의 우울한 광대】",description:"'나 너무 쓰레기 같아 올려놓고, 남이 위로해주면 1초 만에 괜찮아ㅋㅋ 시전.' 당신은 순도 100% 심야 EMO 체질입니다. 공감 능력이 뛰어나 새벽에 고독을 잘 느낍니다. 신기하게도 하룻밤 자고 나면 언제 그랬냐는 듯 밝은 캐릭터로 돌아옵니다.",comment:"전용 해석: 숨겨진 독성은 남의 감정을 너무 많이 짊어지면서, 구원받길 원하면서도 위로를 밀어내는 것입니다. 약한 모습을 인정해도 괜찮아요!",radarData:{labels:["밤샘 지수","사축 지수","안정성","망상 지수","공감 능력"],values:[60,50,30,85,99]}};
koQuiz.results[3] = {min:34,max:40,title:"【철벽의 냉혹한 수면의 신】",description:"'EMO가 뭐야? 먹는 거야? 빨리 자면 슬픔이 날 쫓아오지 못해.' 당신은 SNS에서 가장 희귀한 인류입니다! 극도로 이성적이고 감정 기복이 없으며, 자기 연민에 빠질 바엔 꿀잠 자는 게 낫다고 생각합니다. 남들의 우울 글은 당신에겐 외계어 같습니다.",comment:"전용 해석: 숨겨진 독성은 때로 너무 이성적이라 예민한 친구들에게 피도 눈물도 없다고 여겨진다는 점입니다. 가끔은 인간미를 보여줘도 좋아요!",radarData:{labels:["밤샘 지수","사축 지수","안정성","망상 지수","공감 능력"],values:[20,70,99,20,40]}};

const files = ['en', 'ja', 'ko'];
const quizesObj = { 'en': enQuiz, 'ja': jaQuiz, 'ko': koQuiz };

files.forEach(lang => {
  const p = path.join(__dirname, '..', 'public', `quizzes_${lang}.json`);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const idx = data.findIndex(q => q.id === "midnight-emo-quiz");
  
  if (idx > -1) {
    data[idx] = quizesObj[lang];
  } else {
    data.push(quizesObj[lang]);
  }
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Appended EMO translations to en, ja, ko files successfully');
