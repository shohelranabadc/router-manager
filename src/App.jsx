import { useState, useCallback, useMemo } from 'react';
import { useData } from './hooks/useData';
import FloorCard from './components/FloorCard';
import RouterDetail from './components/RouterDetail';
import AddFloorModal from './components/AddFloorModal';
import AddRouterModal from './components/AddRouterModal';
import SettingsSheet from './components/SettingsSheet';
import Toast from './components/Toast';

export default function App() {
  const { data, stats, addFloor, editFloor, deleteFloor, addRouter, editRouter, deleteRouter, exportData, importData, resetToDefault } = useData();
  const [search, setSearch] = useState('');
  const [floorFilter, setFloorFilter] = useState('all');
  const [toast, setToast] = useState('');
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRouter, setSelectedRouter] = useState(null);
  const [addFloorOpen, setAddFloorOpen] = useState(false);
  const [editFloorData, setEditFloorData] = useState(null);
  const [addRouterOpen, setAddRouterOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const showToast = useCallback((msg) => setToast(msg), []);

  const copyText = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => showToast('✓ কপি হয়েছে')).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      showToast('✓ কপি হয়েছে');
    });
  }, [showToast]);

  const filteredFloors = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.floors.filter(f => {
      const matchFloor = floorFilter === 'all' || f.floorName === floorFilter;
      if (!q) return matchFloor;
      const matchName = f.deptName.toLowerCase().includes(q) || f.floorName.toLowerCase().includes(q);
      const matchRouter = f.routers.some(r => r.ip.includes(q) || r.name.toLowerCase().includes(q));
      return matchFloor && (matchName || matchRouter);
    });
  }, [data.floors, search, floorFilter]);

  const handleRouterClick = (floor, router) => {
    setSelectedFloor(floor); setSelectedRouter(router); setDetailOpen(true);
  };

  const handleEditRouter = (form) => {
    editRouter(selectedFloor.id, selectedRouter.id, form);
    setSelectedRouter(r => ({ ...r, ...form }));
    showToast('✓ আপডেট হয়েছে');
  };

  const handleDeleteRouter = () => {
    deleteRouter(selectedFloor.id, selectedRouter.id);
    showToast('✓ রাউটার মুছা হয়েছে');
  };

  const handleEditFloor = (floor) => {
    setEditFloorData(floor); setAddFloorOpen(true);
  };

  const handleDeleteFloor = (floorId) => {
    const floor = data.floors.find(f => f.id === floorId);
    if (window.confirm(`"${floor?.deptName}" বিভাগ এবং এর ${floor?.routers.length}টি রাউটার মুছে যাবে। নিশ্চিত?`)) {
      deleteFloor(floorId);
      showToast('✓ বিভাগ মুছা হয়েছে');
    }
  };

  const handleSaveFloor = (floorName, deptName) => {
    if (editFloorData) {
      editFloor(editFloorData.id, floorName, deptName);
      showToast('✓ বিভাগ আপডেট হয়েছে');
    } else {
      addFloor(floorName, deptName);
      showToast('✓ নতুন বিভাগ যোগ হয়েছে');
    }
    setEditFloorData(null);
  };

  const handleAddRouter = (floorId, routerData) => {
    addRouter(floorId, routerData);
    showToast('✓ রাউটার যোগ হয়েছে');
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 pb-24 max-w-lg mx-auto">

        {/* Top Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 sticky top-0 z-30">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-lg">🌐</div>
            <div className="flex-1">
              <h1 className="font-bold text-base leading-none">ICT Router Manager</h1>
              <p className="text-xs text-slate-400 mt-0.5">{stats.totalFloors} বিভাগ · {stats.totalRouters} রাউটার</p>
            </div>
            <button onClick={() => setDark(d => !d)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              {dark ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setSettingsOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              ⚙️
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="বিভাগ বা IP দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">✕</button>
              )}
            </div>
          </div>

          {/* Floor Filter */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
            {['all', ...stats.floorNames].map(f => (
              <button key={f} onClick={() => setFloorFilter(f)}
                className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full transition-colors ${
                  floorFilter === f
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}>
                {f === 'all' ? 'সব তলা' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-4">
          {filteredFloors.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-sm">কোনো ফলাফল পাওয়া যায়নি</p>
              {search && <button onClick={() => setSearch('')} className="text-emerald-500 text-sm mt-2">সার্চ মুছুন</button>}
            </div>
          ) : (
            (() => {
              // Group by floor name
              const groups = {};
              filteredFloors.forEach(f => {
                if (!groups[f.floorName]) groups[f.floorName] = [];
                groups[f.floorName].push(f);
              });
              return Object.entries(groups).map(([floorName, floors]) => (
                <div key={floorName}>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 mt-1">{floorName}</p>
                  {floors.map((floor, idx) => (
                    <FloorCard
                      key={floor.id}
                      floor={floor}
                      colorIndex={idx}
                      onRouterClick={handleRouterClick}
                      onEditFloor={() => handleEditFloor(floor)}
                      onDeleteFloor={() => handleDeleteFloor(floor.id)}
                      onCopy={copyText}
                    />
                  ))}
                </div>
              ));
            })()
          )}
        </div>

        {/* FAB */}
        <div className="fixed bottom-6 right-4 z-20">
          {fabOpen && (
            <div className="absolute bottom-14 right-0 flex flex-col gap-2 items-end mb-1">
              <button onClick={() => { setFabOpen(false); setEditFloorData(null); setAddFloorOpen(true); }}
                className="flex items-center gap-2 bg-white dark:bg-slate-700 shadow-lg rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                🏢 নতুন বিভাগ
              </button>
              <button onClick={() => { setFabOpen(false); setAddRouterOpen(true); }}
                className="flex items-center gap-2 bg-white dark:bg-slate-700 shadow-lg rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap">
                🌐 নতুন রাউটার
              </button>
            </div>
          )}
          <button onClick={() => setFabOpen(o => !o)}
            className={`w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg flex items-center justify-center text-2xl transition-transform duration-200 ${fabOpen ? 'rotate-45' : ''}`}>
            +
          </button>
        </div>

        {/* Modals */}
        <RouterDetail
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          router={selectedRouter}
          floor={selectedFloor}
          onEdit={handleEditRouter}
          onDelete={handleDeleteRouter}
          onCopy={copyText}
        />

        <AddFloorModal
          open={addFloorOpen}
          onClose={() => { setAddFloorOpen(false); setEditFloorData(null); }}
          onSave={handleSaveFloor}
          editData={editFloorData}
        />

        <AddRouterModal
          open={addRouterOpen}
          onClose={() => setAddRouterOpen(false)}
          floors={data.floors}
          onSave={handleAddRouter}
        />

        <SettingsSheet
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          onExport={exportData}
          onImport={importData}
          onReset={resetToDefault}
          stats={stats}
        />

        <Toast message={toast} onClose={() => setToast('')} />

        {/* FAB backdrop */}
        {fabOpen && <div className="fixed inset-0 z-10" onClick={() => setFabOpen(false)} />}
      </div>
    </div>
  );
}
