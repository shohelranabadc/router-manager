import { useState } from 'react';

const COLORS = [
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
];

function colorFor(id) {
  const n = parseInt(id.replace(/\D/g, '').slice(-3), 10) || 0;
  return COLORS[n % COLORS.length];
}

export default function FloorCard({ floor, colorIndex, onRouterClick, onEditFloor, onDeleteFloor, onCopy }) {
  const [open, setOpen] = useState(false);
  const [showFloorMenu, setShowFloorMenu] = useState(false);
  const color = colorFor(floor.id + colorIndex);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden mb-3">
      {/* Floor Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${color}`}>
          🌐
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{floor.deptName}</p>
          <p className="text-xs text-slate-400 mt-0.5">{floor.floorName} · {floor.routers.length}টি রাউটার</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={e => { e.stopPropagation(); setShowFloorMenu(v => !v); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative"
          >
            ⋮
            {showFloorMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl shadow-lg z-20 min-w-[140px] overflow-hidden">
                <button onClick={e => { e.stopPropagation(); setShowFloorMenu(false); onEditFloor(); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-600">✏️ এডিট করুন</button>
                <button onClick={e => { e.stopPropagation(); setShowFloorMenu(false); onDeleteFloor(); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">🗑 বিভাগ মুছুন</button>
              </div>
            )}
          </button>
          <span className={`text-slate-400 transition-transform duration-200 text-lg ${open ? 'rotate-180' : ''}`}>⌄</span>
        </div>
      </div>

      {/* Routers List */}
      {open && (
        <div className="border-t border-slate-100 dark:border-slate-700">
          {floor.routers.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-5">কোনো রাউটার নেই</p>
          ) : (
            floor.routers.map(router => (
              <div
                key={router.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 last:border-0 cursor-pointer active:bg-slate-50 dark:active:bg-slate-700/40 transition-colors"
                onClick={() => onRouterClick(floor, router)}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-0.5"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{router.name}</p>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">{router.ip}</p>
                </div>
                <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                  <button onClick={() => onCopy(router.ip)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    IP
                  </button>
                  <button onClick={() => onCopy(router.pass)}
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    🔑
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">›</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
