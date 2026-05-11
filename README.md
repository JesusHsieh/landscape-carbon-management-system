# NCMS — Landscape Carbon Management System
# 景觀碳管理系統

> **Frontend Prototype / Design-stage Demo**  
> 本專案為設計階段前端原型，所有數值與計算結果僅供概念展示，不可作為正式碳盤查依據。

---

## 線上預覽 Live Demo

🔗 https://jesushsieh.github.io/landscape-carbon-management-system/

---

## 專案概述

NCMS（Landscape Carbon Management System）是一套針對景觀專案所建立的前端原型系統，用於探索景觀設計階段中的碳排、碳匯、生命週期評估與減碳決策支援。

本專案目前定位為 **Frontend Prototype / Design-stage Demo**，主要目的是建立「景觀 × 碳管理 × 設計決策」的系統架構，而非正式碳盤查工具。

---

## English Summary

NCMS is a frontend prototype for a landscape carbon management and decision-support platform.

The system maps landscape design elements — materials, vegetation, soil management, and maintenance — into a comparable carbon management framework, helping designers understand how different design choices affect long-term carbon performance during the design stage.

All data, emission factors, sequestration values, and calculations are currently **mock data and simplified models for design-stage demonstration only**.

It is **not** intended for third-party verification, carbon credit application, official carbon accounting, or regulatory reporting.

---

## 專案目的

- 探索景觀設計如何導入碳管理與淨零思維
- 建立景觀專案生命週期碳排與碳匯的基本架構
- 模擬材料、植栽、土壤與維護對長期碳表現的影響
- 建立設計階段的方案比較與減碳策略判斷邏輯
- 作為未來導入真實資料、計算模型、API 或資料庫的系統基礎

---

## 核心概念

NCMS 的核心架構包含三個主要碳管理面向：

### 1. Materials｜材料碳排
分析景觀工程中材料生產、運輸與施工階段所產生的隱含碳排，例如混凝土、石材、鋪面材料、鋼材與木材等。

### 2. Nature｜自然碳匯
模擬植栽碳匯與土壤固碳潛力，包含喬木成長、既有樹保留、土壤改良、有機覆蓋與長期碳累積。

### 3. Maintenance｜維護碳排
估算長期維護管理所造成的排放，例如修剪、割草、灌溉、補植、機具使用與材料更換。

---

## 主要功能

| 模組 | 說明 |
|------|------|
| **Dashboard** | 即時 KPI 總覽：總碳排、年度碳匯、淨碳抵平年份、30 年淨碳排、資料可信度，數值由 projectStore 動態計算 |
| **Boundary** | 定義 LCA 生命週期評估邊界（A1–A5、B2–B7、C、植栽碳匯、土壤碳匯）與評估年限 |
| **Site Data** | 基地基本資訊與環境條件輸入 |
| **BOQ** | 工程數量清單展示，材料用量、運距與碳排熱點可視化分析 |
| **Materials** | 建材碳排係數管理與材料碳熱點分析 |
| **Vegetation** | 植栽碳匯模型：樹種選擇、成長曲線、成活率估算與 30 年累積碳匯 |
| **Soil** | 土壤碳潛力評估：表土保留、土壤改良、有機覆蓋等介入措施 |
| **Maintenance** | 維護情境比較：低維護 / 中等 / 高維護 / 基準情境，長期碳排估算 |
| **Engine** | 生命週期碳排計算引擎，整合各模組數值進行匯整運算 |
| **Scenario** | 多方案情境比較（Baseline / Low Carbon / Nature Positive） |
| **Reduction** | 減碳策略清單與優先順序建議 |
| **Reporting** | 景觀碳管理報告預覽，含摘要、量化數值、免責聲明，支援多版本輸出 |
| **Sources** | 碳排係數來源登錄與可信度分級（A / B / C / Demo）；**Climatiq API 即時搜尋**，搜尋結果可一鍵匯入係數庫 |
| **Data Input** | 手動資料輸入頁：6 個分頁（專案設定、BOQ、植栽、土壤、維護、碳係數），支援草稿儲存與 localStorage 保存 |
| **System Status** | 系統資訊、模組運行狀態與 Prototype 聲明 |

---

## 前端資料架構

> v0.2 起已將單一 App.tsx（3,554 行）拆分為模組化結構。

```
src/
├── App.tsx                     # 主應用：layout、sidebar、routing（~280 行）
├── components/
│   └── ui/                     # 共用 UI 元件
│       ├── Card.tsx
│       ├── Metric.tsx
│       ├── SectionHeading.tsx
│       └── SidebarItem.tsx
├── constants/
│   └── navigation.ts           # 導覽項目定義
├── pages/                      # 各功能頁面元件
│   ├── Dashboard.tsx
│   ├── Boundary.tsx
│   ├── SiteData.tsx
│   ├── BOQ.tsx
│   ├── Materials.tsx
│   ├── Vegetation.tsx
│   ├── Soil.tsx
│   ├── Maintenance.tsx
│   ├── Engine.tsx
│   ├── Scenario.tsx
│   ├── ReductionStrategy.tsx
│   ├── Reporting.tsx
│   ├── Sources.tsx
│   ├── DataInput.tsx
│   └── SystemStatus.tsx
├── types/index.ts              # TypeScript 型別定義
├── data/
│   ├── mockData.ts             # 全域 Mock Data
│   └── defaults/               # 各模組預設值（可被 Data Input 覆寫）
│       ├── defaultProject.ts
│       ├── defaultBoundary.ts
│       ├── defaultBOQ.ts
│       ├── defaultMaterials.ts
│       ├── defaultVegetation.ts
│       ├── defaultSoil.ts
│       ├── defaultMaintenance.ts
│       ├── defaultFactors.ts
│       └── defaultScenario.ts
├── store/
│   └── projectStore.tsx        # React Context + useReducer 狀態管理
├── services/
│   └── climatiq.ts             # Climatiq API 客戶端（碳係數搜尋）
├── hooks/
│   └── useClimatiq.ts          # Climatiq React hook
├── utils/
│   ├── validation.ts           # 輸入驗證
│   └── carbonCalculations.ts  # Prototype 簡化碳排計算
└── lib/
    └── utils.ts                # cn() className 工具函式
```

---

## 技術堆疊

| 技術 | 版本 | 說明 |
|------|------|------|
| React | 19 | 前端框架 |
| TypeScript | 5.8 | 型別安全 |
| Vite | 6 | 建置工具 |
| Tailwind CSS | v4 | 樣式框架 |
| Recharts | 2 | 圖表元件 |
| Framer Motion | 12 | 動畫效果 |
| Lucide React | — | 圖示庫 |

---

## 本地開發

```bash
# 安裝依賴
npm install

# 設定環境變數（複製範本後填入 API Key）
cp .env.example .env.local

# 啟動開發伺服器（port 3002）
npm run dev

# 建置靜態輸出
npm run build

# 預覽建置結果
npm run preview
```

### 外部 API 設定

| 變數 | 說明 | 取得方式 |
|------|------|---------|
| `VITE_CLIMATIQ_API_KEY` | Climatiq 碳係數搜尋 API（免費 500 req/月） | [app.climatiq.io](https://app.climatiq.io) |

> 未設定 API Key 時系統仍可正常運作，Sources 頁面搜尋功能會顯示設定說明。

---

## 部署 GitHub Pages

本專案透過 GitHub Actions 自動部署。推送至 `main` 分支後，CI 會自動建置並發布至 GitHub Pages。

**啟用步驟：**
1. 在 GitHub 建立 repository 並推送程式碼
2. 到 `Settings → Pages → Build and deployment → Source` 選 **GitHub Actions**
3. 下次 `git push` 即自動觸發部署

---

## 資料狀態說明

| 狀態 | 說明 |
|------|------|
| `Mock Data` | 使用內建示範資料，可信度標記為 Demo |
| `user-partial` | 已有部分手動輸入，覆寫預設值 |
| `user` | 完整使用者輸入資料 |

Data Input 頁支援將輸入資料儲存至 `localStorage`（key: `ncms_project_v1`），重新開啟瀏覽器後可載入草稿。

---

## 免責聲明

本專案目前為**概念型前端原型**，所有資料、係數、碳匯數值與計算結果皆為設計階段展示與學習用途。

本系統目前**不適用**於：
- 第三方查證
- ISO 14064 正式盤查或查證
- 碳權申請
- 官方碳盤查
- 法規申報
- ESG 正式揭露報告

所有輸出結果僅供**設計階段概念比較、學習研究與系統原型展示**使用。

---

## Disclaimer

This project is a frontend prototype for a landscape carbon management and decision-support platform.

All data, emission factors, sequestration values, and calculations are currently mock data for design-stage demonstration only.

It is **not** intended for third-party verification, carbon credit application, official carbon accounting, ISO verification, ESG disclosure, or regulatory reporting.

