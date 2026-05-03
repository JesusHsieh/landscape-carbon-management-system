/**
 * NCMS Mock Data v0.1
 */

export const mockProject = {
  name: "台北數位森林公園專案",
  subName: "Taipei Digital Forest Park Project",
  phase: "細部設計階段 Detailed Design",
  id: "PRJ-2024-LD-008",
  area: 18500,
  boundary: {
    years: 30,
    modules: [
      { id: 'a13', label: 'A1-A3 材料生產', active: true },
      { id: 'a4', label: 'A4 材料運輸', active: true },
      { id: 'a5', label: 'A5 施工安裝', active: true },
      { id: 'b24', label: 'B2-B4 維護修繕', active: true },
      { id: 'b67', label: 'B6-B7 營運能源/用水', active: true },
      { id: 'c', label: 'C 退役處理', active: true },
      { id: 'sink_v', label: '植栽碳匯', active: true },
      { id: 'sink_s', label: '土壤碳匯', active: true },
    ]
  }
};

export const dashboardKPIs = [
  { label: "預估總碳排", value: "1,284.5", unit: "tCO2e", trend: "-12.5%", color: "text-accent" },
  { label: "年度總碳匯", value: "42.8", unit: "tCO2e/yr", trend: "+24.0%", color: "text-primary" },
  { label: "淨碳抵平年份", value: "Year 24", unit: "", trend: "中位情境", color: "text-secondary" },
  { label: "30 年淨碳排", value: "-186.4", unit: "tCO2e", trend: "已達長期碳正效益", color: "text-primary" },
];

export const lcaLifecycleData = [
  { stage: 'A1-A3', emission: 450 },
  { stage: 'A4', emission: 120 },
  { stage: 'A5', emission: 280 },
  { stage: 'B2-B4', emission: 150 },
  { stage: 'B6-B7', emission: 80 },
  { stage: 'C', emission: 50 },
  { stage: 'Sink', sink: -1920 }, // Total 30 years
];

export const emissionScopeData = [
  { name: '材料', value: 45 },
  { name: '運輸', value: 15 },
  { name: '施工', value: 20 },
  { name: '維護', value: 10 },
  { name: '能源', value: 5 },
  { name: '廢棄物', value: 5 },
];

export const netCarbonCurve = Array.from({ length: 31 }, (_, i) => {
  const emission = 850 + (i * 15); // Build + recurring maintenance
  const sink = (i ** 1.8) * 4.5; // Growth curves
  return {
    year: i,
    累積排放: Math.round(emission),
    累積碳匯: Math.round(sink),
    淨碳排: Math.round(emission - sink)
  };
});

export const boqData = {
  pavements: [
    { item: '花崗石鋪面', material: '花崗石', area: 1200, thick: 50, life: 30, distance: 450, carbon: 420 },
    { item: '透水磚鋪面', material: '再生混凝土磚', area: 2400, thick: 60, life: 20, distance: 45, carbon: 180 },
    { item: '混凝土鋪面', material: 'C210混凝土', area: 800, thick: 100, life: 40, distance: 30, carbon: 310 },
    { item: '木平台', material: '防腐松木', area: 350, thick: 30, life: 15, distance: 120, carbon: -45 }, // Sequestration in material
  ],
  vegetation: [
    { type: '大喬木', count: 42, growth: '快速', sink30: 840, maintenance: '強' },
    { type: '中喬木', count: 68, growth: '中速', sink30: 520, maintenance: '中' },
    { type: '灌木', count: 1200, growth: '快速', sink30: 220, maintenance: '中' },
    { type: '草坪', count: 4500, growth: '極快', sink30: 45, maintenance: '極強' },
  ]
};

export const plantSpecies = [
  { name: '樟樹', scName: 'Cinnamomum camphora', speed: '中', sink: '高', moisture: '中', bio: '高' },
  { name: '茄苳', scName: 'Bischofia javanica', speed: '快', sink: '高', moisture: '高', bio: '極高' },
  { name: '台灣欒樹', scName: 'Koelreuteria elegans', speed: '中', sink: '中', moisture: '中', bio: '高' },
];

export const scenarioData = [
  { metric: '初始碳排', Baseline: 100, LowCarbon: 82, Natural: 75 },
  { metric: '碳匯總量', Baseline: 60, LowCarbon: 65, Natural: 100 },
  { metric: '維護碳排', Baseline: 80, LowCarbon: 70, Natural: 40 },
  { metric: '景觀美學', Baseline: 90, LowCarbon: 85, Natural: 95 },
  { metric: '生物多樣性', Baseline: 50, LowCarbon: 60, Natural: 100 },
];

export const reductionStrategies = [
  { name: '減少硬鋪面比例', impact: '高', effort: '中', priority: 'P1' },
  { name: '使用低碳混凝土', impact: '中', effort: '低', priority: 'P1' },
  { name: '提高喬木覆蓋率', impact: '極高', effort: '中', priority: 'P1' },
  { name: '低維護地被替代', impact: '中', effort: '低', priority: 'P2' },
];

export const sourceConfidence = [
  { name: '電力排碳係數', source: '經濟部能源署', value: '0.495', grade: 'A' },
  { name: '混凝土 EPD', source: '廠商提供', value: '245', grade: 'B' },
  { name: '樟樹固碳係數', source: '林務局研究', value: '18.5', grade: 'B' },
  { name: '施工機具耗能', source: '學術論文', value: '動態', grade: 'C' },
];
