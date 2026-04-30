# 🌍 世界旅人的故事地圖

一個讓旅人在世界地圖上留下故事的平台。不需要登入，直接開始分享。

---

## 功能

- 🗺️ 可縮放、可拖曳的世界地圖（Leaflet + OpenStreetMap）
- 📍 預設標記：印度/斯里蘭卡、印尼/東帝汶、以色列/巴勒斯坦、日本、中亞/巴爾幹、德國
- ✍️ 任意點擊地圖新增故事（標題、國家、內容、作者暱稱）
- 📖 點擊標記查看故事，支援同一地點多篇
- 💬 每篇故事可留言（暱稱 + 內容 + 時間）
- 🚀 無需登入、無需帳號

---

## 技術架構

| 層 | 技術 |
|---|---|
| 前端框架 | Next.js 14 (Pages Router) |
| 地圖 | Leaflet + OpenStreetMap |
| 資料庫 | Supabase (PostgreSQL) |
| 部署 | Vercel |
| 樣式 | 純 CSS (Playfair Display + DM Sans) |

---

## 快速部署步驟

### 1. 建立 Supabase 專案

1. 前往 [supabase.com](https://supabase.com) 建立免費帳號
2. 新建 Project
3. 進入 **SQL Editor**，貼上並執行 `supabase-schema.sql` 的全部內容
4. 在 **Project Settings → API** 找到：
   - `Project URL` → 即 `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → 即 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. 部署到 Vercel

**方法 A：透過 GitHub（推薦）**

1. 將此專案推送到 GitHub repository
2. 前往 [vercel.com](https://vercel.com)，點 **Add New Project**，匯入該 repo
3. 在 **Environment Variables** 填入：
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   ```
4. 點 **Deploy**，完成 🎉

**方法 B：Vercel CLI**

```bash
npm install -g vercel
cp .env.local.example .env.local
# 填入你的 Supabase 環境變數到 .env.local
vercel --prod
```

### 3. 本地開發

```bash
npm install
cp .env.local.example .env.local
# 編輯 .env.local 填入你的 Supabase 設定
npm run dev
# 開啟 http://localhost:3000
```

---

## 如何新增故事內容到預設標記

點擊地圖上的金色標記後，若要新增故事：
1. 先關閉側邊欄
2. 點右上角「**+ 新增故事**」按鈕
3. 點擊預設標記附近的地圖位置
4. 填入故事內容並送出

---

## 目錄結構

```
world-stories/
├── components/
│   ├── WorldMap.tsx       # 地圖主元件（Leaflet）
│   ├── StorySidebar.tsx   # 故事側邊欄 + 留言
│   └── AddStoryModal.tsx  # 新增故事彈窗
├── lib/
│   └── supabase.ts        # Supabase client + 型別 + 預設標記設定
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── styles/
│   └── globals.css        # 全域樣式
├── supabase-schema.sql    # 資料庫建表 SQL
└── .env.local.example     # 環境變數範本
```

---

## 自訂預設標記

編輯 `lib/supabase.ts` 中的 `PRESET_MARKERS` 陣列：

```ts
export const PRESET_MARKERS: PresetMarker[] = [
  { id: 'japan', label: '日本', lat: 36.2, lng: 138.2, region: 'East Asia' },
  // 新增更多…
]
```

---

## License

MIT
