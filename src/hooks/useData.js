import { useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'ict_router_data_v1';

function generateId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

export function useData() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  // Floor CRUD
  const addFloor = (floorName, deptName) => {
    const newFloor = { id: generateId('f'), floorName, deptName, routers: [] };
    setData(d => ({ ...d, floors: [...d.floors, newFloor] }));
    return newFloor.id;
  };

  const editFloor = (floorId, floorName, deptName) => {
    setData(d => ({
      ...d,
      floors: d.floors.map(f => f.id === floorId ? { ...f, floorName, deptName } : f)
    }));
  };

  const deleteFloor = (floorId) => {
    setData(d => ({ ...d, floors: d.floors.filter(f => f.id !== floorId) }));
  };

  // Router CRUD
  const addRouter = (floorId, routerData) => {
    const newRouter = { id: generateId('r'), ...routerData };
    setData(d => ({
      ...d,
      floors: d.floors.map(f =>
        f.id === floorId ? { ...f, routers: [...f.routers, newRouter] } : f
      )
    }));
  };

  const editRouter = (floorId, routerId, routerData) => {
    setData(d => ({
      ...d,
      floors: d.floors.map(f =>
        f.id === floorId
          ? { ...f, routers: f.routers.map(r => r.id === routerId ? { ...r, ...routerData } : r) }
          : f
      )
    }));
  };

  const deleteRouter = (floorId, routerId) => {
    setData(d => ({
      ...d,
      floors: d.floors.map(f =>
        f.id === floorId ? { ...f, routers: f.routers.filter(r => r.id !== routerId) } : f
      )
    }));
  };

  // Export / Import
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ict_routers_backup_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonStr) => {
    const parsed = JSON.parse(jsonStr);
    if (!parsed.floors) throw new Error('Invalid format');
    setData(parsed);
  };

  const resetToDefault = () => setData(INITIAL_DATA);

  const stats = {
    totalFloors: data.floors.length,
    totalRouters: data.floors.reduce((s, f) => s + f.routers.length, 0),
    floorNames: [...new Set(data.floors.map(f => f.floorName))].sort()
  };

  return { data, stats, addFloor, editFloor, deleteFloor, addRouter, editRouter, deleteRouter, exportData, importData, resetToDefault };
}
