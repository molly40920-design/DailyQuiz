const fs = require('fs');
const path = require('path');

const newQuiz = {
  id: "love-brain-quiz",
  title: "戀愛腦指數測驗",
  description: "一談戀愛就智商歸零？還是永遠保持人間清醒？透過 10 題情境測出你的戀愛腦程度。",
  category: "romance",
  tags: ["戀愛", "心理"],
  questions: [
    {
      text: "對方今天說了一句不太好聽的話，你的第一反應是？",
      options: [
        { text: "覺得他只是在氣頭上，自動幫他找藉口", score: 4 },
        { text: "當下雖然難過，但稍微哄一下就氣消了", score: 3 },
        { text: "直接點出他講話哪裡有問題，要求道歉", score: 2 },
        { text: "冷靜分析他的用意，在心裡默默大扣分", score: 1 }
      ]
    },
    {
      text: "剛進入曖昧期，對方突然開始忽冷忽熱，你會怎麼做？",
      options: [
        { text: "心情跟著七上八下，一直反省自己是不是做錯什麼", score: 4 },
        { text: "會主動丟球試探，但若他持續冷淡就算了", score: 3 },
        { text: "敵不動我不動，把重心放回自己的生活上", score: 2 },
        { text: "覺得這人情緒不穩定，太麻煩了直接放生", score: 1 }
      ]
    },
    {
      text: "身邊所有朋友苦口婆心勸你「這個人真的不適合你」，你會？",
      options: [
        { text: "表面點頭答應，實際上還是繼續愛得死去活來", score: 4 },
        { text: "會聽進去，但覺得自己用愛應該能改變他", score: 3 },
        { text: "會開始認真評估這段關係，增加防備心", score: 2 },
        { text: "只要朋友能講出具體客觀原因，我就立刻煞車", score: 1 }
      ]
    },
    {
      text: "如果愛情的總分是 100 分，剛交往時你會給對方幾分？",
      options: [
        { text: "直接 100 分！愛上了在我眼裡就是完美無缺", score: 4 },
        { text: "80 分，因為第一印象很好所以一開始分數就高", score: 3 },
        { text: "50 分及格邊緣，等著他慢慢表現加分", score: 2 },
        { text: "0 分，大家一開始都是陌生人，這很公平", score: 1 }
      ]
    },
    {
      text: "伴侶犯了一個你平常最無法忍受的錯誤，但他哭著求你原諒？",
      options: [
        { text: "看他這麼可憐，心一軟忍不住就原諒了", score: 4 },
        { text: "雖然非常生氣，但最後通常會再給他一次機會", score: 3 },
        { text: "會原諒，但設定極度嚴格的觀察期跟底線", score: 2 },
        { text: "原則就是原則，觸碰底線絕對慢走不送", score: 1 }
      ]
    },
    {
      text: "早就安排好週末跟朋友聚會，但另一半臨時說好想見你？",
      options: [
        { text: "毫不猶豫推掉朋友的約，另一半絕對是最重要的", score: 4 },
        { text: "試圖兩邊協調，問能不能帶著伴侶一起去", score: 3 },
        { text: "會好好安撫他，但依然照原定計畫赴約", score: 2 },
        { text: "叫他自己去找事情做，休想打亂我的既定行程", score: 1 }
      ]
    },
    {
      text: "在一段穩定的關係中，你會不自覺地為對方改變自己的喜好或穿搭嗎？",
      options: [
        { text: "完全會，只要是對方喜歡的樣子我都願意改", score: 4 },
        { text: "多少會受到一些影響，偶爾迎合他的口味", score: 3 },
        { text: "如果建議不錯會參考，但還是必須保有自己的風格", score: 2 },
        { text: "絕對不會，喜歡我就要完全接受我原本的樣子", score: 1 }
      ]
    },
    {
      text: "你發現另一半的手機突然設了新密碼，平常回訊息還會遮遮掩掩？",
      options: [
        { text: "雖然很不安，但說服自己要「給對方隱私」去逃避現實", score: 4 },
        { text: "開始瘋狂內耗，但不敢直接問，怕破壞感情", score: 3 },
        { text: "直接開門見山問清楚，要求一個合理的解釋", score: 2 },
        { text: "當作沒看到，但已經開始默默蒐集準備分手的證據", score: 1 }
      ]
    },
    {
      text: "回顧過去，你決定分手的主要原因通常是？",
      options: [
        { text: "真的受夠了無數次的失望跟委屈，心碎到極點", score: 4 },
        { text: "發現他真的永遠不會改，只好痛心離開", score: 3 },
        { text: "覺得雙方未來的目標不一致，長痛不如短痛", score: 2 },
        { text: "觸犯了我的底線或單純沒感覺了，非常果斷", score: 1 }
      ]
    },
    {
      text: "對你來說，愛情的理想狀態是什麼？",
      options: [
        { text: "每天都想黏在一起分享一切，全世界只有彼此", score: 4 },
        { text: "互相依賴，對方是我最堅強的避風港", score: 3 },
        { text: "平常獨立但能互相扶持，兩個人都能各自精彩", score: 2 },
        { text: "只是錦上添花，其實沒有愛情我也能過得很爽", score: 1 }
      ]
    }
  ],
  results: [
    {
      min: 10,
      max: 17,
      title: "戀愛腦指數 0%【人間清醒的冷酷兵器】",
      description: "你的大腦完全防彈！在愛情裡你也是個實用主義者，甜言蜜語對你來說不痛不癢，比起承諾你更看重實際行動。就算談戀愛，你依然把你自己的感受與事業放在絕對的首位。",
      comment: "專屬解析：雖然清醒不會受傷，但有時候試著放下防備，享受一下不用帶腦袋的單純戀愛，也是一種不錯的體驗喔。",
      radarData: {
        labels: ["感性衝動", "濾鏡厚度", "自我保護", "犧牲奉獻", "情緒內耗"],
        values: [20, 10, 95, 15, 10]
      }
    },
    {
      min: 18,
      max: 25,
      title: "戀愛腦指數 30%【進退自如的戀愛戰士】",
      description: "你能在理智與感性之間完美切換。你懂得享受戀愛的粉紅泡泡，但底線也被踩得很死。只要對方有不對勁的徵兆，你會立刻收起感性，隨時準備帥氣退場。",
      comment: "專屬解析：這種有原則的戀愛模式非常健康！只要繼續保持，你就能在愛情中獲得快樂而不會失去自我。",
      radarData: {
        labels: ["感性衝動", "濾鏡厚度", "自我保護", "犧牲奉獻", "情緒內耗"],
        values: [45, 30, 80, 40, 30]
      }
    },
    {
      min: 26,
      max: 33,
      title: "戀愛腦指數 75%【自帶粉紅濾鏡的浪漫派】",
      description: "你其實有一點小小的戀愛腦！一旦喜歡上一個人，你的眼睛會自動替他套上超厚的美顏濾鏡。遇到問題時，你經常心軟，總會自己幫對方找合理的藉口。",
      comment: "專屬解析：你的溫柔是愛情中最好的滋潤，但也別忘了，如果發現濾鏡碎了，請勇敢承認，不要自己騙自己。",
      radarData: {
        labels: ["感性衝動", "濾鏡厚度", "自我保護", "犧牲奉獻", "情緒內耗"],
        values: [80, 75, 40, 75, 65]
      }
    },
    {
      min: 34,
      max: 40,
      title: "戀愛腦指數 999%【無藥可救的純愛戰神】",
      description: "重度末期戀愛腦患者就是你！一陷入愛情，你的智商會瞬間清零，全世界只剩下對方。你可以為了愛無限妥協跟犧牲，只要對方開心，你什麼委屈都能吞。",
      comment: "專屬解析：純愛無敵！但愛情應該是讓兩個人都閃閃發光，而不是犧牲你的光芒去照亮別人。記得多愛自己一點！",
      radarData: {
        labels: ["感性衝動", "濾鏡厚度", "自我保護", "犧牲奉獻", "情緒內耗"],
        values: [95, 99, 10, 95, 90]
      }
    }
  ]
};

const quizzesPath = path.join(__dirname, '..', 'public', 'quizzes.json');
const data = JSON.parse(fs.readFileSync(quizzesPath, 'utf8'));

// check if exists
const existingIndex = data.findIndex(q => q.id === newQuiz.id);
if (existingIndex > -1) {
  data[existingIndex] = newQuiz;
} else {
  data.push(newQuiz);
}

fs.writeFileSync(quizzesPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated quizzes.json');
