import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Settings, Trees, FileText, ShieldCheck,
  Search, Leaf, Factory, AlertCircle, Box, Map, ClipboardList,
  Layers, Wrench, Calculator, Compass, TrendingDown, Info,
  Database, Menu, X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import * as mock from './data/mockData';
import { ProjectProvider } from './store/projectStore';
import SidebarItem from './components/ui/SidebarItem';

import Dashboard from './pages/Dashboard';
import Boundary from './pages/Boundary';
import SiteData from './pages/SiteData';
import BOQ from './pages/BOQ';
import Materials from './pages/Materials';
import Vegetation from './pages/Vegetation';
import Soil from './pages/Soil';
import Maintenance from './pages/Maintenance';
import Engine from './pages/Engine';
import Scenario from './pages/Scenario';
import ReductionStrategy from './pages/ReductionStrategy';
import Reporting from './pages/Reporting';
import Sources from './pages/Sources';
import DataInput from './pages/DataInput';
import SystemStatus from './pages/SystemStatus';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [prefs, setPrefs] = useState({
    language: '繁體中文',
    unit: 'kgCO2e',
    mode: 'Demo 模式',
    confidence: true,
    detail: '精簡',
    theme: '深色模式'
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: '專案總覽 Dashboard', icon: LayoutDashboard },
    { id: 'boundary', label: '專案邊界 Boundary', icon: Box },
    { id: 'site', label: '基地資料 Site Data', icon: Map },
    { id: 'boq', label: '工程數量 BOQ', icon: ClipboardList },
    { id: 'materials', label: '材料碳排 Materials', icon: Factory },
    { id: 'vegetation', label: '植栽碳匯 Vegetation', icon: Trees },
    { id: 'soil', label: '土壤碳 Soil', icon: Layers },
    { id: 'maintenance', label: '維護碳排 Maintenance', icon: Wrench },
    { id: 'engine', label: '碳排計算 Engine', icon: Calculator },
    { id: 'scenario', label: '情境比較 Scenario', icon: Compass },
    { id: 'reduction', label: '減碳策略 Reduction', icon: TrendingDown },
    { id: 'reporting', label: '報表輸出 Reporting', icon: FileText },
    { id: 'sources', label: '資料來源 Sources', icon: Info },
    { id: 'input', label: '數據輸入 Data Input', icon: Database },
    { id: 'admin', label: '系統狀態 System Status', icon: ShieldCheck },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center text-primary">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-6"
        />
        <p className="text-secondary font-mono tracking-widest text-[13px] uppercase font-bold">Initializing NCMS Engine...</p>
      </div>
    );
  }

  return (
    <ProjectProvider>
    <div className="flex h-screen bg-bg font-sans text-ink selection:bg-primary/30">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-sidebar border-r border-card-border p-4 flex flex-col hidden xl:flex">
        <div className="flex items-center gap-3 px-3 py-6">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Leaf className="w-5 h-5 text-bg" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-primary tracking-tighter leading-none block">NCMS</span>
            <span className="text-[13px] text-secondary uppercase font-bold tracking-widest mt-1 block">Landscape Carbon Management System</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-1 custom-scrollbar">
          {navItems.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-secondary uppercase tracking-tighter">System Info</span>
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(126,155,113,0.5)]" />
            </div>
            <div className="space-y-1">
              <p className="text-[13px] text-secondary/60">Mode: <span className="text-primary font-bold">Local Prototype</span></p>
              <p className="text-[13px] text-secondary/60">Data: <span className="text-accent font-bold">Mock Enabled</span></p>
              <p className="text-[13px] text-secondary/60">Confidence: <span className="text-ink">Demo</span></p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Mobile Nav --- */}
      <div className="xl:hidden">
        <button
          className="fixed top-4 left-4 z-50 bg-sidebar p-3 rounded-full border border-card-border shadow-lg"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <Menu className="w-5 h-5 text-primary" />
        </button>

        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileNavOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileNavOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-sidebar border-r border-card-border p-4 flex flex-col z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between px-3 py-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                    <Leaf className="w-5 h-5 text-bg" />
                  </div>
                  <div>
                    <span className="font-extrabold text-lg text-primary tracking-tighter leading-none block">NCMS</span>
                    <span className="text-[13px] text-secondary uppercase font-bold tracking-widest mt-1 block">Landscape Carbon Mgmt</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-2 text-secondary hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto px-1 custom-scrollbar mt-2">
                {navItems.map(item => (
                  <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileNavOpen(false); }}
                  />
                ))}
              </nav>

              <div className="mt-auto pt-4 border-t border-white/5">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-bold text-secondary uppercase tracking-tighter">System Info</span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(126,155,113,0.5)]" />
                  </div>
                  <p className="text-[13px] text-secondary/60">Mode: <span className="text-primary font-bold">Local Prototype</span></p>
                  <p className="text-[13px] text-secondary/60">Data: <span className="text-accent font-bold">Mock Enabled</span></p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-white/5 px-[40px] pl-[64px] xl:pl-[40px] h-20 flex items-center justify-between">
          <div className="animate-in slide-in-from-left duration-500">
            <h1 className="text-xl font-black text-ink tracking-tight flex items-center gap-2">
              {mock.mockProject.name}
              <span className="text-[13px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{activeTab}</span>
            </h1>
            <p className="text-[13px] text-secondary font-bold uppercase tracking-widest mt-1 opacity-70 italic">{mock.mockProject.phase}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="搜尋模組、材料、植栽或碳係數…"
                className="pl-10 pr-4 py-2 bg-white/5 border border-transparent rounded-xl text-[13px] focus:ring-1 focus:ring-primary/50 transition-all outline-none w-64 group-focus-within:bg-white/10"
              />
            </div>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               <button className="p-2 text-secondary hover:text-primary transition-colors relative group">
                 <AlertCircle className="w-5 h-5" />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-bg" />
                 <div className="absolute top-full right-0 mt-2 w-64 bg-card-bg border border-card-border p-4 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                    <h4 className="text-[13px] font-black text-secondary tracking-widest uppercase mb-3">通知 Notification</h4>
                    <div className="space-y-2 text-[13px]">
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <AlertCircle className="w-3 h-3 text-accent shrink-0" />
                          <span>有 9 筆係數需要人工確認</span>
                       </div>
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <Info className="w-3 h-3 text-primary shrink-0" />
                          <span>目前資料模式為 Mock Data</span>
                       </div>
                       <div className="p-2 bg-white/5 rounded-lg border border-white/5 flex gap-2">
                          <ShieldCheck className="w-3 h-3 text-secondary shrink-0" />
                          <span>報告僅供 Prototype 預覽</span>
                       </div>
                    </div>
                 </div>
               </button>
               <div className="flex items-center gap-3 group relative cursor-help">
                 <div className="text-right hidden sm:block">
                   <p className="text-[13px] font-bold text-ink">Jesus Hsieh</p>
                   <p className="text-[13px] text-secondary font-bold">Landscape Carbon Consultant</p>
                 </div>
                 <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-[13px]">JH</div>
                 <div className="absolute top-full right-0 mt-2 w-48 bg-card-bg border border-card-border p-4 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50">
                    <div className="space-y-3">
                       <div className="border-b border-white/5 pb-2">
                          <p className="text-[13px] text-secondary font-bold uppercase tracking-widest mb-1">使用者角色</p>
                          <p className="text-[13px] text-ink font-bold">Landscape Carbon Consultant</p>
                       </div>
                       <div className="border-b border-white/5 pb-2">
                          <p className="text-[13px] text-secondary font-bold uppercase tracking-widest mb-1">專案權限</p>
                          <p className="text-[13px] text-primary font-bold">Demo User</p>
                       </div>
                       <div className="space-y-1">
                          <button className="w-full text-left text-[13px] text-secondary hover:text-primary py-1 transition-colors">查看角色資訊</button>
                          <button className="w-full text-left text-[13px] text-secondary hover:text-primary py-1 transition-colors">Demo 權限說明</button>
                          <button className="w-full text-left text-[13px] text-accent/50 py-1 cursor-not-allowed" disabled>登出 (Demo only)</button>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </header>

        <div className="px-[40px] py-8 max-w-[1440px] mx-auto min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'boundary' && <Boundary />}
              {activeTab === 'site' && <SiteData />}
              {activeTab === 'boq' && <BOQ />}
              {activeTab === 'materials' && <Materials />}
              {activeTab === 'vegetation' && <Vegetation />}
              {activeTab === 'soil' && <Soil />}
              {activeTab === 'maintenance' && <Maintenance />}
              {activeTab === 'engine' && <Engine />}
              {activeTab === 'scenario' && <Scenario />}
              {activeTab === 'reduction' && <ReductionStrategy />}
              {activeTab === 'reporting' && <Reporting />}
              {activeTab === 'sources' && <Sources />}
              {activeTab === 'input' && <DataInput />}
              {activeTab === 'admin' && <SystemStatus />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- Floating Preferences --- */}
        <div className="fixed bottom-[40px] right-[40px] z-50">
           <AnimatePresence>
             {showPreferences && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="absolute bottom-16 right-0 w-72 bg-card-bg/95 backdrop-blur-2xl border border-card-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[32px] overflow-hidden"
               >
                 <div className="p-6 space-y-6">
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <h4 className="text-sm font-black text-primary">快速偏好設定</h4>
                     <Settings className="w-4 h-4 text-secondary/40" />
                   </div>

                   <div className="space-y-4">
                     <div className="space-y-2">
                       <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">語言 Language</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['繁體中文', 'English'].map(l => (
                           <button
                             key={l}
                             onClick={() => setPrefs({...prefs, language: l})}
                             className={cn("py-2 rounded-xl text-[13px] font-bold border transition-all", prefs.language === l ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {l}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">單位顯示 Unit Display</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['kgCO2e', 'tCO2e'].map(u => (
                           <button
                             key={u}
                             onClick={() => setPrefs({...prefs, unit: u})}
                             className={cn("py-2 rounded-xl text-[13px] font-bold border transition-all", prefs.unit === u ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {u}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">顯示模式 Mode</label>
                       <div className="grid grid-cols-1 gap-2">
                         {[
                           { m: 'Demo 模式', d: '適合簡報展示，資訊較精簡。' },
                           { m: 'Expert 模式', d: '顯示更多來源、公式與可信度。' },
                           { m: 'Report 模式', d: '接近報告輸出視角。' }
                         ].map(item => (
                           <button
                             key={item.m}
                             onClick={() => setPrefs({...prefs, mode: item.m})}
                             className={cn("p-3 rounded-2xl text-left border transition-all space-y-1", prefs.mode === item.m ? "bg-primary/20 border-primary/30" : "bg-white/5 border-white/5")}
                           >
                             <div className={cn("text-[13px] font-bold", prefs.mode === item.m ? "text-primary" : "text-ink")}>{item.m}</div>
                             <div className="text-[13px] text-secondary/60 leading-tight">{item.d}</div>
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                        <div className="space-y-0.5">
                           <div className="text-[13px] font-bold text-ink">可信度標籤 Overlay</div>
                           <div className="text-[13px] text-secondary/60">顯示 A-E 分級標籤</div>
                        </div>
                        <button
                          onClick={() => setPrefs({...prefs, confidence: !prefs.confidence})}
                          className={cn("w-10 h-5 rounded-full relative p-1 transition-colors", prefs.confidence ? "bg-primary" : "bg-white/10")}
                        >
                          <div className={cn("w-3 h-3 bg-white rounded-full transition-all", prefs.confidence ? "ml-5" : "ml-0")} />
                        </button>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">圖表細節 Chart Detail</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['精簡', '詳細'].map(d => (
                           <button
                             key={d}
                             onClick={() => setPrefs({...prefs, detail: d})}
                             className={cn("py-2 rounded-xl text-[13px] font-bold border transition-all", prefs.detail === d ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5")}
                           >
                             {d}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-[13px] text-secondary font-bold uppercase tracking-widest">主題 Theme</label>
                       <div className="grid grid-cols-2 gap-2">
                         {['深色模式', '淺色 (未來)'].map(t => (
                           <button
                             key={t}
                             onClick={() => t === '深色模式' ? setPrefs({...prefs, theme: t}) : undefined}
                             className={cn("py-2 rounded-xl text-[13px] font-bold border transition-all", prefs.theme === t ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-secondary border-white/5", t !== '深色模式' && "opacity-50 cursor-not-allowed")}
                           >
                             {t}
                           </button>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
           <button
             onClick={() => setShowPreferences(!showPreferences)}
             className={cn(
               "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-95 group",
               showPreferences ? "bg-white/10 text-primary border border-primary/30" : "bg-accent text-bg shadow-accent/20 hover:scale-110"
             )}
            >
             <Settings className={cn("w-6 h-6 transition-transform duration-500", showPreferences ? "rotate-90" : "group-hover:rotate-90")} />
           </button>
        </div>
      </main>
    </div>
    </ProjectProvider>
  );
}
