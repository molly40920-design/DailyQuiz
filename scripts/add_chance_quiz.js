const fs = require('fs');
const path = require('path');

const quizzesPath = path.join(__dirname, '..', 'public', 'quizzes.json');

const newQuiz = {
  id: "q-chance-with-him",
  title: "我跟他有機會嗎？",
  description: "透過日常互動與細微的觀察，測出你們之間的發展潛力，看看他是否對你也有好感。",
  category: "romance",
  tags: ["戀愛", "曖昧", "測心意"],
  questions: [
    {
      text: "Q1：你們平時私下聊天的頻率大約是？",
      options: [
        { text: "每天都聊，有時還會聊到深夜或分享生活瑣事", score: 4 },
        { text: "兩三天一次，通常是有具體事情才找，但也會閒聊幾句", score: 3 },
        { text: "偶爾才聊，而且大部分都是我主動開話題", score: 2 },
        { text: "幾乎沒在私下聊天，頂多是一大群人時會講到話", score: 1 }
      ]
    },
    {
      text: "Q2：如果你主動約他單獨出去（例如看電影、吃飯），他通常會怎麼回答？",
      options: [
        { text: "很開心答應，甚至會主動提議去哪裡或吃什麼", score: 4 },
        { text: "會答應，但可能會說「如果有空的話」或是要再對一下時間", score: 3 },
        { text: "經常以「最近很忙」婉拒，或是說「下次有機會再看看」", score: 2 },
        { text: "我還沒有勇氣約他單獨出去過", score: 1 }
      ]
    },
    {
      text: "Q3：當你因為某件事感到低落或遇到困難時，他的反應是？",
      options: [
        { text: "馬上察覺到我不對勁，並主動關心、安慰或提供實質幫助", score: 4 },
        { text: "如果我主動提起，他會願意聽我說並給予一些建議", score: 3 },
        { text: "似乎沒有特別察覺，或者只是客套地問一句「還好嗎」", score: 2 },
        { text: "我們交集不多，他應該不知道我心情不好", score: 1 }
      ]
    },
    {
      text: "Q4：在一群人聚會的場合中，你覺得他對你的態度如何？",
      options: [
        { text: "眼神時常交會，感覺他會特別照顧我或找機會跟我單獨說話", score: 4 },
        { text: "像一般朋友一樣自然互動，跟對待其他人差不多", score: 3 },
        { text: "他比較常跟別人講話，我們之間沒有太多特別的交流", score: 2 },
        { text: "幾乎沒有互動，或者他根本沒注意到我的存在", score: 1 }
      ]
    },
    {
      text: "Q5：他對你回訊息的速度和內容通常是？",
      options: [
        { text: "通常很快就回，而且內容豐富，有時還會主動延續話題或分享照片", score: 4 },
        { text: "速度不一定，有空就回，內容長短視當時的話題而定", score: 3 },
        { text: "回得很慢，有時還會隔天才回，且通常只是簡短的幾個字", score: 2 },
        { text: "常常已讀不回，或是我不傳他就不會主動傳", score: 1 }
      ]
    },
    {
      text: "Q6：他有曾經跟你分享過他的心事或比較私人的事情嗎？",
      options: [
        { text: "經常分享，我覺得他對我滿信任的，連脆弱面或前任的事都說過", score: 4 },
        { text: "偶爾會提一些，通常是遇到比較大的工作壓力或挫折時", score: 3 },
        { text: "很少，我們的對話基本上大都停留在表面的事物或共同興趣上", score: 2 },
        { text: "從來沒有，他對我來說還是個充滿謎團的人", score: 1 }
      ]
    },
    {
      text: "Q7：當你提到其他異性（或潛在對象）時，他的反應是？",
      options: [
        { text: "似乎有些在意，會追問對方是誰，或是半開玩笑地吃醋", score: 4 },
        { text: "當作八卦在聽，偶爾還會用客觀角度幫我分析一下", score: 3 },
        { text: "沒什麼特別反應，就像在聽別人的故事一樣平淡", score: 2 },
        { text: "我們從來沒聊過這種話題", score: 1 }
      ]
    },
    {
      text: "Q8：他對你的外表變化有過什麼評價或特別注意嗎？",
      options: [
        { text: "有，他曾經稱讚過我今天的穿著，或是立刻發現我換了髮型", score: 4 },
        { text: "偶爾會順口稱讚一句「不錯喔」或是「這件衣服滿好看的」", score: 3 },
        { text: "好像沒什麼注意，即使我精心打扮他也沒太大的反應", score: 2 },
        { text: "從沒提過，我們之間似乎不會討論這類話題", score: 1 }
      ]
    },
    {
      text: "Q9：你們之間有專屬的「默契」或「內部笑話」嗎？",
      options: [
        { text: "很多！只要一個眼神或是某個詞，就會知道對方在想什麼並相視而笑", score: 4 },
        { text: "有一兩個只有我們懂的哏，偶爾會拿出來開玩笑", score: 3 },
        { text: "幾乎沒有，我們的相處比較像是普通的同學或同事", score: 2 },
        { text: "完全沒有這種東西", score: 1 }
      ]
    },
    {
      text: "Q10：直覺來說，你覺得他知道你對他有好感嗎？",
      options: [
        { text: "我想他應該多多少少有感覺到，我們的互動其實有點曖昧", score: 4 },
        { text: "他可能有點困惑，不確定我對他到底是友情還是有其他意思", score: 3 },
        { text: "他應該完全不知道，我隱藏得很好（或者他真的很木頭）", score: 2 },
        { text: "我覺得他根本沒有在往這方面想", score: 1 }
      ]
    }
  ],
  results: [
    {
      min: 34,
      max: 40,
      title: "雙向奔赴的超強微電流",
      description: "恭喜你！你們之間散發著強烈的曖昧氣息，他對你絕對有特殊的好感。你們的互動已經超越了普通朋友，只差一個人先開口或是一個推波助瀾的時機。現在的你只需要順其自然，或許主動製造一點點小浪漫，就能試著戳破這層窗戶紙！",
      comment: "專屬解析：勇敢一點，愛情可能就在你觸手可及的地方。",
      radarData: {
        labels: ["曖昧指數", "好感度", "互動頻率", "發展潛力", "心跳指數"],
        values: [95, 90, 88, 92, 98]
      }
    },
    {
      min: 26,
      max: 33,
      title: "友達以上，戀人未滿",
      description: "你們目前的關係非常不錯！他把你當作是很重要、很聊得來的朋友，甚至可能對你有一點點好感，只是還沒完全昇華成愛情。你們之間有著良好的互動基礎，建議你可以嘗試在相處中加入一些「專屬感」或稍微超越朋友界限的小舉動，慢慢讓他意識到你的獨特魅力。",
      comment: "專屬解析：這是一個很好的起點，慢慢加溫，讓他逐漸習慣你的存在。",
      radarData: {
        labels: ["曖昧指數", "好感度", "互動頻率", "發展潛力", "心跳指數"],
        values: [75, 80, 85, 80, 70]
      }
    },
    {
      min: 18,
      max: 25,
      title: "溫馨陪伴的普通朋友",
      description: "在他心裡，你是個好相處、值得信賴的朋友。雖然目前看起來還沒有太多愛情的火花，但他並不排斥與你互動。如果你想更進一步，可能需要慢慢改變你們目前的相處模式，讓他看到你不同於平常的屬性，或是創造更多可以單獨深入交流的機會。",
      comment: "專屬解析：不要著急，愛情有時候需要更多的時間來培養與發現。",
      radarData: {
        labels: ["曖昧指數", "好感度", "互動頻率", "發展潛力", "心跳指數"],
        values: [40, 50, 60, 55, 45]
      }
    },
    {
      min: 10,
      max: 17,
      title: "單相思的平行線",
      description: "你們目前的交集還不太多，或者他還沒有意識到你的存在與心意。這份喜歡可能還處於你個人的暗戀、單相思階段。先不要氣餒！如果真的很喜歡他，建議先從建立共通話題、增加曝光率開始，慢慢拉近彼此的距離，先成為能自然聊天的人吧！",
      comment: "專屬解析：每一段深刻的感情，都是從陌生人開始的，先試著讓他記住你吧。",
      radarData: {
        labels: ["曖昧指數", "好感度", "互動頻率", "發展潛力", "心跳指數"],
        values: [20, 30, 35, 40, 25]
      }
    }
  ]
};

try {
  let quizzes = [];
  if (fs.existsSync(quizzesPath)) {
    const data = fs.readFileSync(quizzesPath, 'utf8');
    quizzes = JSON.parse(data);
  }
  
  // Check if it already exists
  const exists = quizzes.some(q => q.id === newQuiz.id);
  if (exists) {
    console.log("Quiz already exists, updating...");
    quizzes = quizzes.map(q => q.id === newQuiz.id ? newQuiz : q);
  } else {
    console.log("Adding new quiz...");
    quizzes.unshift(newQuiz); // Add to the beginning to show up first
  }
  
  fs.writeFileSync(quizzesPath, JSON.stringify(quizzes, null, 2));
  console.log("Successfully updated quizzes.json");
} catch (error) {
  console.error("Error writing to quizzes.json:", error);
}
