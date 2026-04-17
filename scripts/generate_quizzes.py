import json
import os
import time
from openai import OpenAI

# ==========================================
# 設定區
# 可以透過環境變數設定，或直接在此修改
# ==========================================
API_KEY = os.getenv("OPENAI_API_KEY", "your-api-key-here")
BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4o") # 或是使用 gemini / deepseek 等模型，請確認支援 response_format={"type":"json_object"}
QUIZZES_FILE = "../public/quizzes.json"
NUM_QUIZZES_TO_GENERATE = 15

# 初始化 OpenAI Client
client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

prompt_template = """
你是一個高品質心理測驗設計專家。請產生一個高質感的「戀愛心理測驗」JSON 資料，主題自由發揮（例如：潛意識、戀愛人格、情侶互動、依附類型等），但一定要與戀愛、浪漫、愛情相關。內容風格請保持溫暖、治癒與故事感。

請確保 questions 剛好有 10 題，每題 4 個選項，選項的 score 屬性請「隨機」對應 1, 2, 3, 4，不要按照規律（以避免玩家輕易猜出分數）。

你必須回傳合法的 JSON Object，符合以下 Schema:
{
  "id": "自動產生",
  "title": "測驗標題 (約 8-15 字)",
  "description": "簡短的測驗描述 (約 30-50 字，營造治癒氛圍)",
  "category": "romance",
  "tags": ["戀愛", "自訂標籤1", "自訂標籤2"],
  "questions": [
    {
      "text": "情境與問題描述...",
      "options": [
        { "text": "選項 A", "score": 1 },
        { "text": "選項 B", "score": 2 },
        { "text": "選項 C", "score": 3 },
        { "text": "選項 D", "score": 4 }
      ]
    }
  ],
  "results": [
    { "min": 10, "max": 17, "title": "...", "description": "對應總分 10-17 分的專屬結果與解析" },
    { "min": 18, "max": 25, "title": "...", "description": "對應總分 18-25 分的專屬結果與解析" },
    { "min": 26, "max": 33, "title": "...", "description": "對應總分 26-33 分的專屬結果與解析" },
    { "min": 34, "max": 40, "title": "...", "description": "對應總分 34-40 分的專屬結果與解析" }
  ]
}
請只回傳 JSON Object，不要有 markdown code block 及其他對話。
"""

def generate_quiz(index):
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "你是一個專業的心理測驗設計專家與 JSON 產生器。"},
                {"role": "user", "content": prompt_template}
            ],
            temperature=0.8,
            response_format={ "type": "json_object" } # 強制要求 JSON
        )
        
        content = response.choices[0].message.content
        quiz_data = json.loads(content)
        # 覆寫固定欄位確保安全
        quiz_data["id"] = f"quiz-auto-{int(time.time())}-{index}"
        quiz_data["category"] = "romance"
        return quiz_data
        
    except json.JSONDecodeError:
        print(f"Error: API 返回的不是合法的 JSON 格式。")
        return None
    except Exception as e:
        print(f"Error generating quiz {index}: {e}")
        return None

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_file = os.path.join(script_dir, QUIZZES_FILE)

    if not os.path.exists(target_file):
        print(f"Error: 找不到 {target_file}")
        return
        
    with open(target_file, "r", encoding="utf-8") as f:
        try:
            quizzes = json.load(f)
        except json.JSONDecodeError:
            print("Error: 無法解析現有的 quizzes.json")
            return
            
    print(f"目前有 {len(quizzes)} 個測驗，開始批次生成 {NUM_QUIZZES_TO_GENERATE} 個新測驗...")
    
    success_count = 0
    for i in range(1, NUM_QUIZZES_TO_GENERATE + 1):
        print(f"[{i}/{NUM_QUIZZES_TO_GENERATE}] 生成中...")
        new_quiz = generate_quiz(i)
        
        if new_quiz:
            quizzes.append(new_quiz)
            success_count += 1
            # 立即存檔，避免中途中斷遺失進度
            with open(target_file, "w", encoding="utf-8") as out_f:
                json.dump(quizzes, out_f, ensure_ascii=False, indent=2)
            print(f"  -> 成功新增: {new_quiz.get('title')}")
        else:
            print("  -> 生成失敗，跳過。")
            
        time.sleep(1.5) # 避免觸發 API Rate limit
        
    print(f"\n批次生成完成！成功新增了 {success_count} 個測驗，總數量達到 {len(quizzes)}。")

if __name__ == "__main__":
    if API_KEY == "your-api-key-here":
        print("警告: 尚未設定 OPENAI_API_KEY，您可能會遇到驗證錯誤。")
    main()
