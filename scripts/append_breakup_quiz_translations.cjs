const fs = require('fs');
const path = require('path');

const enQuiz = {
  id: "breakup-assessment-quiz",
  title: "Should We Break Up? Relationship Checkup",
  description: "A deep dive into your relationship status. Through 10 real-life scenarios, discover if it's time to let go or if your relationship just needs some repair.",
  category: "romance",
  tags: ["Love", "Psychology", "Quiz"],
  questions: [
    { text: "When you think about your 'five-year plan', what's your first reaction?", options: [
      { text: "He's not in the picture at all, and I even feel he'd be an obstacle.", score: 1 },
      { text: "The future feels blurry, and I dare not think about him being in it.", score: 2 },
      { text: "I sometimes worry our future paths differ, but I still want to try.", score: 3 },
      { text: "Every image of the future includes him, and I'm really looking forward to it.", score: 4 }
    ]},
    { text: "When you two have an argument recently, how does it usually end?", options: [
      { text: "It's never resolved, ending in silent treatment or personal attacks.", score: 1 },
      { text: "I compromise just to avoid fighting, but I feel very wronged inside.", score: 2 },
      { text: "I get mad at the moment, but we talk it out and understand each other later.", score: 3 },
      { text: "We rarely have huge fights; we discuss rationally and find common ground.", score: 4 }
    ]},
    { text: "Looking back, what is the main reason you are 'still' with him right now?", options: [
      { text: "Just out of habit, fear of being alone, or thinking breaking up is a hassle.", score: 1 },
      { text: "He has some good qualities, and I hate to give up the current stability.", score: 2 },
      { text: "Even though his flaws give me headaches, I still care deeply about him.", score: 3 },
      { text: "Because being with him makes me a better, happier version of myself.", score: 4 }
    ]},
    { text: "If starting tomorrow, he never changed his 'fatal flaw', could you accept it?", options: [
      { text: "Absolutely not. I've already had enough and feel suffocated.", score: 1 },
      { text: "It would be very painful. I might explode if I endure it a bit longer.", score: 2 },
      { text: "I'd feel a bit helpless, but I'm willing to tolerate or find a balance.", score: 3 },
      { text: "Totally fine. Nobody is perfect, and I love every part of him.", score: 4 }
    ]},
    { text: "When something happy or upsetting happens outside, who do you want to share it with first?", options: [
      { text: "Definitely not him. Telling him might even ruin my mood.", score: 1 },
      { text: "It used to be him, but now it's usually my best friends.", score: 2 },
      { text: "I'd still want to tell him, even though he might not get my point sometimes.", score: 3 },
      { text: "Of course him! He's always my safe haven and personal cheerleader.", score: 4 }
    ]},
    { text: "When you're with him, do you feel you can be your 'true self'?", options: [
      { text: "Not at all. I constantly walk on eggshells around him; it's suffocating.", score: 1 },
      { text: "Half and half. I hide many thoughts and feelings from him.", score: 2 },
      { text: "Mostly yes, I just actively avoid certain trigger topics.", score: 3 },
      { text: "100% yes. Even at my absolute worst, I feel completely relaxed around him.", score: 4 }
    ]},
    { text: "Regarding your physical intimacy (holding hands, hugs, or sex), what is the current state?", options: [
      { text: "I even slightly reject his touch; I have absolutely zero interest.", score: 1 },
      { text: "It feels like a routine, or the frequency has dropped to freezing point.", score: 2 },
      { text: "Sometimes it feels a bit plain, but I still love the warmth of his hugs.", score: 3 },
      { text: "Extremely compatible. Holding hands or hugging still gives me butterflies.", score: 4 }
    ]},
    { text: "When you see other happy couples, what goes through your mind?", options: [
      { text: "Intensely jealous, even thinking 'why is my relationship so terrible'.", score: 1 },
      { text: "I feel their partners are better, and start feeling dissatisfied with mine.", score: 2 },
      { text: "I occasionally compare, but I know every relationship has its own issues.", score: 3 },
      { text: "We have our own unique way of being happy; no need to envy others.", score: 4 }
    ]},
    { text: "If you were single right now, knowing what you know about him, would you still choose to date him?", options: [
      { text: "Absolutely not. I even feel like I was blind back then.", score: 1 },
      { text: "Probably not. This relationship drains way too much of my energy.", score: 2 },
      { text: "I probably still would. After all, we have many irreplaceable good memories.", score: 3 },
      { text: "Without a doubt! If I could choose a hundred times, I'd still choose him.", score: 4 }
    ]},
    { text: "Deep down, what outcome do you actually hope to get from this quiz?", options: [
      { text: "I hope it tells me to 'break up now', giving me the courage and an excuse to leave.", score: 1 },
      { text: "I hope it makes the decision for me, because I'm too drained to think.", score: 2 },
      { text: "I hope it tells me 'it's salvageable' and how to repair the relationship.", score: 3 },
      { text: "Just taking it out of curiosity; I know we won't actually break up.", score: 4 }
    ]}
  ],
  results: [
    {
      min: 10, max: 16,
      title: "【Red Alert: It's time to let yourself go】",
      description: "Your subconscious has already given you the answer. This relationship is currently toxic and oppressive, constantly draining your confidence and energy. You're likely staying only because of fear of change or the sunk cost.",
      comment: "Exclusive Analysis: Love shouldn't make you feel suffocated. Please face your inner voice bravely. Only by leaving the wrong person can you free your hands to embrace the right self. It's time to cut your losses.",
      radarData: { labels: ["Mental Drain", "Desire to Breakup", "Communication Failure", "Future Consensus", "Lingering Feelings"], values: [95, 90, 85, 10, 15] }
    },
    {
      min: 17, max: 25,
      title: "【Battery Depleted: Suffocating Bottleneck】",
      description: "Your relationship is sick. The past passion has been worn out by daily quarrels, indifference, or misunderstandings. You're in a 'tasteless to eat, but a pity to throw away' state, feeling tired but not knowing how to fix it.",
      comment: "Exclusive Analysis: Pretending everything is fine will only make it worse. You need a deeply honest 'heart-to-heart', or even consider taking a break to calm down. If neither is willing to change, letting go might just be a matter of time.",
      radarData: { labels: ["Mental Drain", "Desire to Breakup", "Communication Failure", "Future Consensus", "Lingering Feelings"], values: [80, 65, 75, 30, 40] }
    },
    {
      min: 26, max: 33,
      title: "【Adjustment Period: The love is there, but needs a tune-up】",
      description: "The foundation of your relationship is still there; you're just encountering some practical friction or communication blind spots. Your confusion comes from differences in habits, not a fundamental lack of love.",
      comment: "Exclusive Analysis: Romance doesn't stay in the honeymoon phase forever. This is a turning point. Try shifting from 'what are you mad about' to 'how can we fix this'. With more tolerance and less impulsiveness, you will get through this.",
      radarData: { labels: ["Mental Drain", "Desire to Breakup", "Communication Failure", "Future Consensus", "Lingering Feelings"], values: [40, 20, 30, 70, 85] }
    },
    {
      min: 34, max: 40,
      title: "【Solid as a Rock: Just a temporary doubt, don't worry】",
      description: "Your relationship is incredibly healthy and stable! You might have just had a small fight, or are simply curious. Deep down, you know they are the right one. You have great communication and a shared vision of the future.",
      comment: "Exclusive Analysis: Congratulations on having a fairytale-like relationship! Occasional friction is just the spice of life. Remember to give them a big hug tonight and tell them how much you love them!",
      radarData: { labels: ["Mental Drain", "Desire to Breakup", "Communication Failure", "Future Consensus", "Lingering Feelings"], values: [10, 5, 10, 95, 99] }
    }
  ]
};

const jaQuiz = JSON.parse(JSON.stringify(enQuiz));
jaQuiz.title = "別れるべき？恋愛関係の健康診断";
jaQuiz.description = "心に直球で響く関係性のチェックシート。10のリアルな状況から、あなたの今の恋愛状態を整理します。損切りすべきか、話し合って修復すべきか？";
jaQuiz.tags = ["恋愛", "心理", "診断"];
jaQuiz.questions[0].text = "「5年後の未来」を想像した時、直感的にどう感じますか？";
jaQuiz.questions[0].options = [{text:"未来の青写真に彼は全くおらず、むしろ足手まといだと感じる。",score:1},{text:"未来がぼやけていて、彼がいる日々を考えるのが怖い。",score:2},{text:"時々未来の方向性の違いを心配するが、それでも一緒に頑張りたい。",score:3},{text:"未来のすべての場面に彼がいて、とても楽しみにしている。",score:4}];
jaQuiz.questions[1].text = "最近二人が口論になった時、通常どうやって終わりますか？";
jaQuiz.questions[1].options = [{text:"常に解決せず、最後は無視、過去の掘り返し、または人格攻撃になる。",score:1},{text:"喧嘩を避けるために一方的に妥協するが、心の中では非常に不満。",score:2},{text:"その場では怒るが、後できちんと話し合い、相手を理解しようとする。",score:3},{text:"激しい喧嘩は滅多になく、問題があっても理性的にお互い納得する答えを見つける。",score:4}];
jaQuiz.questions[2].text = "思い返してみて、あなたが「今」まだ彼と一緒にいる最大の理由は何ですか？";
jaQuiz.questions[2].options = [{text:"ただの習慣、一人が怖い、または別れを切り出すのが面倒だから。",score:1},{text:"彼の条件が悪くないので、今の安定を手放すのが惜しい。",score:2},{text:"頭を悩ませる欠点はあるが、それでも彼のことが大切だから。",score:3},{text:"彼と一緒にいることで、自分がより良く、幸せな自分になれるから。",score:4}];
jaQuiz.questions[3].text = "もし彼が明日から、今の「致命的な欠点」を永遠に直さなかったら、受け入れられますか？";
jaQuiz.questions[3].options = [{text:"絶対に無理。今でも限界で、息が詰まりそう。",score:1},{text:"非常に苦しい。もう少し我慢したら完全に爆発すると思う。",score:2},{text:"少し呆れるが、受け入れるか、お互いの妥協点を見つけようとする。",score:3},{text:"完全に受け入れられる。人は完璧ではないし、彼のすべてを愛している。",score:4}];
jaQuiz.questions[4].text = "外で嬉しいことや悔しいことがあった時、最初に誰に話を聞いてほしいですか？";
jaQuiz.questions[4].options = [{text:"絶対に彼ではない。彼に話すと逆に水を差されたり気分が下がる。",score:1},{text:"以前は彼だったが、今は親友や他の友達に話すことが多い。",score:2},{text:"やはり彼に話したい。時々私のポイントを理解してくれないけど。",score:3},{text:"もちろん彼！彼は私にとって最大の安全基地で専属のチアリーダーだ。",score:4}];
jaQuiz.questions[5].text = "彼と一緒にいる時、「ありのままの自分」を出せていると感じますか？";
jaQuiz.questions[5].options = [{text:"全く出せない。常に彼の顔色をうかがい、抑圧されていると感じる。",score:1},{text:"半々。多くの悩みや本当の考えは彼に言えない。",score:2},{text:"大体出せているが、特定の地雷になりそうな話題は避けている。",score:3},{text:"100%出せる。彼の前なら一番ひどい姿でもリラックスできる。",score:4}];
jaQuiz.questions[6].text = "二人のスキンシップ（手を繋ぐ、ハグ、性生活）の現在の状態は？";
jaQuiz.questions[6].options = [{text:"触れられることすら少し拒絶感があり、全く気が進まない。",score:1},{text:"義務のようなもので、頻度も氷点下まで下がって情熱が持てない。",score:2},{text:"時々マンネリを感じるが、ハグの温もりは好きだ。",score:3},{text:"非常に相性が良い。手を繋いだりハグするだけで安心感とときめきを感じる。",score:4}];
jaQuiz.questions[7].text = "周りの幸せそうなカップルを見た時、心の中でどう思いますか？";
jaQuiz.questions[7].options = [{text:"とても羨ましく、「なんで私の恋愛はこんなにひどいんだろう」と思う。",score:1},{text:"他人の恋人の方が良く見え、自分の相手に対して不満を感じ始める。",score:2},{text:"時々比べることもあるが、どの恋愛にもそれぞれの課題があることを知っている。",score:3},{text:"私たちには私たちの幸せの形があるから、他人を羨む必要はないと思う。",score:4}];
jaQuiz.questions[8].text = "もしあなたが今フリーだとして、現在の彼についての理解を踏まえた上で、もう一度彼と付き合いますか？";
jaQuiz.questions[8].options = [{text:"絶対に付き合わない。当時の自分はどうかしていたと思うくらいだ。",score:1},{text:"たぶん付き合わない。この関係が自分のエネルギーをどれほど消耗させるか知っているから。",score:2},{text:"おそらく付き合うと思う。やはり二人にはかけがえのない思い出がたくさんあるから。",score:3},{text:"迷いなく付き合う！あと100回選べと言われても彼を選ぶ。",score:4}];
jaQuiz.questions[9].text = "この診断をしている時、心の奥底で本当はどんな結果が出ることを望んでいますか？";
jaQuiz.questions[9].options = [{text:"診断結果に「早く別れろ」と言ってほしい。離れるための勇気と言い訳が欲しい。",score:1},{text:"診断結果に決断を委ねたい。もう疲れ果てて考える気力がないから。",score:2},{text:"「まだ修復可能だ」と教えてほしい。どうやって関係を直せばいいか知りたい。",score:3},{text:"ただの好奇心でやっているだけ。私たちが別れないことは分かっている。",score:4}];
jaQuiz.results[0] = {min:10,max:16,title:"【レッドアラート：自分を解放する時】",description:"あなたの潜在意識はすでに答えを出しています。この関係は現在、有毒で抑圧的であり、あなたの自信とエネルギーを絶えず消耗させています。まだ留まっているのは、変化への恐れやサンクコスト（費やした時間）が惜しいからかもしれません。",comment:"専用解析：恋愛はあなたを窒息させるものではありません。勇気を出して自分の心の声に向き合ってください。間違った人から離れてこそ、正しい自分を抱きしめることができます。損切りする時です。",radarData:{labels:["精神疲労度","別れへの渇望","対話の不全","未来への共感","愛情の残骸"],values:[95,90,85,10,15]}};
jaQuiz.results[1] = {min:17,max:25,title:"【バッテリー切れ：息が詰まる停滞期】",description:"二人の感情は病んでいます。過去の情熱は、日常の口論や冷たさ、理解不足によってすり減ってしまいました。「味はしないが捨てるのは惜しい」という状態で、疲れ果てているのにどう解決すればいいか分からずにいます。",comment:"専用解析：何も問題ないふりを続けるのは状況を悪化させるだけです。極めて率直な「深い対話」が必要であり、冷却期間を置くことも考えるべきです。お互いに変わる気がないなら、手放すのは時間の問題かもしれません。",radarData:{labels:["精神疲労度","別れへの渇望","対話の不全","未来への共感","愛情の残骸"],values:[80,65,75,30,40]}};
jaQuiz.results[2] = {min:26,max:33,title:"【陣痛の調整期：愛はまだあるが、チューニングが必要】",description:"感情の土台はまだありますが、現在は現実的な摩擦やコミュニケーションの死角に直面しています。あなたの迷いは、根本的な愛情不足ではなく、お互いの習慣の違いから来ています。",comment:"専用解析：恋愛は永遠に熱愛期のままではありません。今は転換点です。「何に怒っているか」ではなく「どう解決するか」に焦点を移してみてください。もう少しの寛容さと、感情的にならないことで、必ずこの陣痛期を乗り越えられます。",radarData:{labels:["精神疲労度","別れへの渇望","対話の不全","未来への共感","愛情の残骸"],values:[40,20,30,70,85]}};
jaQuiz.results[3] = {min:34,max:40,title:"【盤石な関係：ただのちょっとした迷い。心配無用】",description:"二人の感情は非常に健康的で安定しています！この診断をやったのも、たまたま喧嘩したか、単なる好奇心でしょう。心の底では相手が運命の人だと分かっており、良好なコミュニケーションと未来への共通認識を持っています。",comment:"専用解析：おめでとうございます！まるでおとぎ話のような素晴らしい関係です。たまの摩擦は生活のスパイスに過ぎません。今夜は相手をきつく抱きしめて、どれだけ愛しているか伝えてあげてください！",radarData:{labels:["精神疲労度","別れへの渇望","対話の不全","未来への共感","愛情の残骸"],values:[10,5,10,95,99]}};

const koQuiz = JSON.parse(JSON.stringify(enQuiz));
koQuiz.title = "헤어질까 말까? 연애 상태 건강검진";
koQuiz.description = "마음을 찌르는 관계 체크리스트. 10가지 현실적인 상황을 통해 현재 연애 상태를 정리해드립니다. 손절해야 할지, 대화로 회복해야 할지 알아보세요.";
koQuiz.tags = ["연애", "심리", "테스트"];
koQuiz.questions[0].text = "'앞으로 5년'의 계획을 떠올렸을 때, 직관적인 반응은?";
koQuiz.questions[0].options = [{text:"미래 청사진에 그가 아예 없으며, 심지어 방해물처럼 느껴진다.",score:1},{text:"미래가 흐릿하고, 그가 있는 날들을 상상하기가 두렵다.",score:2},{text:"가끔 미래의 방향이 다를까 걱정되지만, 그래도 함께 노력하고 싶다.",score:3},{text:"미래의 모든 장면에 그가 있으며, 너무 기대된다.",score:4}];
koQuiz.questions[1].text = "최근 다퉜을 때, 보통 어떻게 마무리되나요?";
koQuiz.questions[1].options = [{text:"항상 해결되지 않고, 결국 잠수, 과거 들추기, 인신공격으로 이어진다.",score:1},{text:"싸우기 싫어서 일방적으로 타협하지만, 속으로는 매우 억울하다.",score:2},{text:"당시엔 화가 나지만, 나중에 대화로 풀고 상대를 이해하려 노력한다.",score:3},{text:"크게 싸우는 일이 드물고, 문제가 생겨도 이성적으로 논의해 합의점을 찾는다.",score:4}];
koQuiz.questions[2].text = "생각해보세요. 당신이 '지금' 아직도 그와 함께하는 가장 큰 이유는 무엇인가요?";
koQuiz.questions[2].options = [{text:"그저 익숙해져서, 혼자가 되는 게 두려워서, 또는 헤어지자고 말하기 귀찮아서.",score:1},{text:"그의 조건이 나쁘지 않아 현재의 안정감을 포기하기 아쉬워서.",score:2},{text:"골치 아픈 단점이 있긴 하지만, 그래도 그 사람 자체를 아끼니까.",score:3},{text:"그와 함께 있으면 내가 더 나은, 더 행복한 사람이 되니까.",score:4}];
koQuiz.questions[3].text = "만약 그가 내일부터 자신의 '치명적인 단점'을 영원히 고치지 않는다면, 받아들일 수 있나요?";
koQuiz.questions[3].options = [{text:"절대 안 된다. 지금도 한계고 숨이 막힐 지경이다.",score:1},{text:"매우 고통스러울 것이다. 조금만 더 참으면 완전히 폭발할 것 같다.",score:2},{text:"조금 체념하겠지만, 포용하려고 노력하거나 타협점을 찾을 것이다.",score:3},{text:"완전히 가능하다. 사람은 원래 완벽하지 않으며, 그의 모든 것을 사랑한다.",score:4}];
koQuiz.questions[4].text = "밖에서 기쁜 일이나 억울한 일이 생겼을 때, 가장 먼저 이야기하고 싶은 사람은 누구인가요?";
koQuiz.questions[4].options = [{text:"절대 그가 아니다. 그에게 말하면 오히려 분위기만 망칠 것 같다.",score:1},{text:"예전엔 그였지만, 지금은 주로 베프나 다른 친구들에게 말한다.",score:2},{text:"그래도 그에게 말하고 싶다. 가끔 내 포인트를 이해 못 할 때도 있지만.",score:3},{text:"당연히 그 사람! 그는 언제나 나의 가장 큰 안식처이자 전속 치어리더다.",score:4}];
koQuiz.questions[5].text = "그와 함께 있을 때, '진짜 내 모습'을 보여줄 수 있다고 느끼나요?";
koQuiz.questions[5].options = [{text:"전혀 아니다. 항상 그의 눈치를 살펴야 해서 억압받는 느낌이다.",score:1},{text:"반반이다. 많은 고민이나 진짜 속마음은 감히 말하지 못한다.",score:2},{text:"대부분 가능하다. 단지 특정 지뢰 주제만 의도적으로 피할 뿐이다.",score:3},{text:"100% 가능하다. 그 앞에서는 가장 망가진 모습이어도 편안하다.",score:4}];
koQuiz.questions[6].text = "두 사람의 스킨십(손잡기, 포옹, 성생활)의 현재 상태는 어떤가요?";
koQuiz.questions[6].options = [{text:"그의 손길이 닿는 것조차 약간 거부감이 들고, 전혀 의욕이 없다.",score:1},{text:"의무적인 일 같거나, 빈도가 빙점까지 떨어져 열정이 생기지 않는다.",score:2},{text:"가끔 밋밋하다고 느끼지만, 여전히 안았을 때의 온기를 좋아한다.",score:3},{text:"매우 잘 맞는다. 손을 잡거나 안기만 해도 여전히 안도감과 설렘을 느낀다.",score:4}];
koQuiz.questions[7].text = "주변의 행복한 커플들을 볼 때, 속으로 어떤 생각이 드나요?";
koQuiz.questions[7].options = [{text:"너무 부럽고, 심지어 '왜 내 연애는 이렇게 엉망일까' 자책하게 된다.",score:1},{text:"남의 연인이 더 나아 보이고, 내 상대에 대해 불만을 느끼기 시작한다.",score:2},{text:"가끔 비교하게 되지만, 모든 연애에는 각자의 과제가 있다는 걸 안다.",score:3},{text:"우리도 우리만의 행복한 방식이 있으니 남을 부러워할 필요가 없다고 생각한다.",score:4}];
koQuiz.questions[8].text = "만약 당신이 지금 싱글이라면, 현재 그에 대해 아는 것들을 바탕으로 다시 그와 사귀겠습니까?";
koQuiz.questions[8].options = [{text:"절대 안 사귄다. 그 당시 내가 정말 눈이 멀었구나 싶다.",score:1},{text:"아마 안 사귈 것이다. 이 관계가 내 에너지를 너무 많이 소모한다는 걸 아니까.",score:2},{text:"아마 그래도 사귈 것 같다. 우리 사이엔 대체할 수 없는 좋은 추억이 많으니까.",score:3},{text:"망설임 없이 사귈 것이다! 100번을 다시 선택하라고 해도 그를 택할 것이다.",score:4}];
koQuiz.questions[9].text = "이 테스트를 하는 동안, 마음속 깊은 곳에서는 어떤 결과가 나오길 진짜로 바라고 있나요?";
koQuiz.questions[9].options = [{text:"테스트가 내게 '빨리 헤어져'라고 말해서, 떠날 용기와 핑계를 주길 바란다.",score:1},{text:"테스트가 내 대신 결정해 주길 바란다. 이미 생각할 기력조차 남아있지 않으니까.",score:2},{text:"'아직 고칠 수 있어'라고 알려주고, 어떻게 관계를 회복해야 할지 말해주길 바란다.",score:3},{text:"그냥 호기심에 해보는 것일 뿐. 우리가 진짜 헤어지지 않을 거란 건 안다.",score:4}];
koQuiz.results[0] = {min:10,max:16,title:"【적색경보: 나를 놔줘야 할 시간】",description:"당신의 무의식은 이미 답을 내렸습니다. 이 관계는 현재 유독하고 억압적이며, 당신의 자신감과 에너지를 끊임없이 갉아먹고 있습니다. 아직 남아있는 이유는 아마도 변화에 대한 두려움이나 매몰비용(투자한 시간) 때문일 것입니다.",comment:"전용 해석: 사랑은 당신을 숨 막히게 해선 안 됩니다. 용기 내어 내면의 목소리를 마주하세요. 잘못된 사람을 떠나야만 비로소 제대로 된 자신을 끌어안을 수 있습니다. 이제 손절해야 할 때입니다.",radarData:{labels:["감정 소모","이별 갈망","대화 단절","미래 공감대","남은 미련"],values:[95,90,85,10,15]}};
koQuiz.results[1] = {min:17,max:25,title:"【배터리 방전: 숨 막히는 정체기】",description:"두 사람의 감정은 병들었습니다. 과거의 열정은 일상적인 다툼, 무관심, 몰이해에 깎여나갔습니다. '계륵' 같은 상태로 너무 지쳐있지만 어떻게 해결해야 할지 모르고 있습니다.",comment:"전용 해석: 아무 문제 없는 척 계속하는 건 상황을 악화시킬 뿐입니다. 극도로 솔직한 '깊은 대화'가 필요하며, 서로 냉정해질 시간(Break)을 가지는 것도 고려해봐야 합니다. 쌍방 모두 변할 의지가 없다면, 놓아주는 건 시간문제일지도 모릅니다.",radarData:{labels:["감정 소모","이별 갈망","대화 단절","미래 공감대","남은 미련"],values:[80,65,75,30,40]}};
koQuiz.results[2] = {min:26,max:33,title:"【성장통 시기: 사랑은 남았지만, 조율이 필요함】",description:"감정의 밑바탕은 여전히 남아있지만, 현재 현실적인 마찰이나 소통의 사각지대에 부딪혔습니다. 당신의 방황은 본질적인 애정 부족이 아니라 서로의 습관 차이에서 비롯된 것입니다.",comment:"전용 해석: 연애가 영원히 열애기일 수는 없습니다. 지금은 전환점입니다. '왜 화를 내는가'에서 '어떻게 해결할 것인가'로 초점을 옮겨보세요. 조금 더 포용하고 감정적인 대응을 줄인다면, 이 성장통을 반드시 이겨낼 수 있습니다.",radarData:{labels:["감정 소모","이별 갈망","대화 단절","미래 공감대","남은 미련"],values:[40,20,30,70,85]}};
koQuiz.results[3] = {min:34,max:40,title:"【바위 같은 굳건함: 그저 잠깐의 방황일 뿐, 걱정 마세요】",description:"두 사람의 관계는 매우 건강하고 안정적입니다! 이 테스트를 한 것도 우연히 다퉜거나 단순한 호기심 때문일 것입니다. 마음속 깊은 곳에선 상대가 운명의 사람이라는 걸 알고 있으며, 훌륭한 소통 방식과 미래에 대한 공감대를 가지고 있습니다.",comment:"전용 해석: 축하합니다! 동화 속 같은 훌륭한 연애를 하고 계시네요. 가끔의 마찰은 삶의 조미료일 뿐입니다. 오늘 밤 상대방을 꼭 안아주며 얼마나 사랑하는지 말해주세요!",radarData:{labels:["감정 소모","이별 갈망","대화 단절","미래 공감대","남은 미련"],values:[10,5,10,95,99]}};

const files = ['en', 'ja', 'ko'];
const quizesObj = { 'en': enQuiz, 'ja': jaQuiz, 'ko': koQuiz };

files.forEach(lang => {
  const p = path.join(__dirname, '..', 'public', `quizzes_${lang}.json`);
  let data = [];
  if (fs.existsSync(p)) {
    data = JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  const idx = data.findIndex(q => q.id === "breakup-assessment-quiz");
  
  if (idx > -1) {
    data[idx] = quizesObj[lang];
  } else {
    data.push(quizesObj[lang]);
  }
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
});

console.log('Appended breakup quiz translations to en, ja, ko files successfully');
