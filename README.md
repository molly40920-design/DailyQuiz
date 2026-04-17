# Daily Quiz (每日一測)

Daily Quiz 是一個具備「日系動畫與質感漫畫風 (Story-Driven Anime/Ghibli-inspired)」的綜合型心理測驗 Web 應用程式。初期包含 20 個戀愛心理測驗，並具備優雅順暢的單頁面 (SPA) 互動體驗與高度防呆設計。

## 專案特色

1. **極致的視覺與過場**：全面採用低飽和度自然色系 (莫蘭迪色)、柔和的圓角與精緻陰影，搭配滑順的淡入淡出動畫，提供玩家治癒的測驗歷程。
2. **嚴密的防呆邊界處理**：
   - **防止連點計分異常**：每次點擊後即鎖定按鈕，防止快速連擊造成總分溢出或跳題。
   - **路由與狀態還原**：透過 History API (`pushState`)，在使用者途中點擊上一頁時會優雅地攔截並還原狀態至大廳，不會將錯誤資料殘留至下一場測驗。
   - **重測歸零**：點擊「再測一次」保證所有陣列長度與積分變數 `totalScore` 徹底歸零。
3. **優雅的分享機制**：預設喚起原生 Web Share API，桌機或不支援環境則降級為一鍵複製網址，並伴隨輕巧的 Toast 提示。

## 開發技術棧

- 前端：HTML5, JavaScript (ES6 Modules), Tailwind CSS (套用設定檔建構)
- 建構工具：Vite
- 資料庫：純靜態 JSON (`public/quizzes.json`)

## 如何啟動專案 (本機測試)

1. 先確保您已安裝 [Node.js](https://nodejs.org/)。
2. 在專案根目錄開啟終端機。
3. 安裝依賴套件：
   ```bash
   npm install
   ```
4. 啟動開發者伺服器：
   ```bash
   npm run dev
   ```
5. 在終端機中點開 `http://localhost:5173` 即可預覽。

---

## 如何使用 Python 腳本批次生成測驗

本專案附帶了使用 OpenAI API 的自動生成腳本，可以用以生成額外的測驗。

1. 切換至腳本目錄並安裝依賴 (強烈建議使用虛擬環境 venv)：
   ```bash
   cd scripts
   pip install -r requirements.txt
   ```
2. 設定您的 API 金鑰。(此處以 Windows 環境為例)
   ```bash
   set OPENAI_API_KEY=您的_API_KEY
   ```
   *(註：如果您使用別的相容 OpenAI 的服務如 DeepSeek 或第三方代理，可使用 `set OPENAI_BASE_URL=https://...` 覆寫端點。)*
3. 執行生成腳本：
   ```bash
   python generate_quizzes.py
   ```
   腳本將自動爬梳 `../public/quizzes.json`，依序請求 API 並將新生成的 15 筆測驗 `append` 到該檔案中。
