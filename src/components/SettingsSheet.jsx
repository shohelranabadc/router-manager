import { useRef } from 'react';
import BottomSheet from './BottomSheet';

export default function SettingsSheet({ open, onClose, onExport, onImport, onReset, stats }) {
  const fileRef = useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        onImport(ev.target.result);
        onClose();
      } catch {
        alert('ফাইলটি সঠিক নয়। সঠিক JSON ব্যাকআপ ফাইল ব্যবহার করুন।');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="সেটিংস ও ব্যাকআপ">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{stats.totalFloors}</p>
          <p className="text-xs text-slate-500 mt-1">মোট বিভাগ</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalRouters}</p>
          <p className="text-xs text-slate-500 mt-1">মোট রাউটার</p>
        </div>
      </div>

      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">ডেটা ব্যাকআপ</h4>
      <div className="space-y-2.5 mb-6">
        <button onClick={onExport}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
          <span className="text-xl">⬇️</span>
          <div>
            <p className="font-medium">ডেটা এক্সপোর্ট করুন</p>
            <p className="text-xs text-slate-400">JSON ফাইলে সব ডেটা সেভ করুন</p>
          </div>
        </button>
        <button onClick={() => fileRef.current.click()}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left">
          <span className="text-xl">⬆️</span>
          <div>
            <p className="font-medium">ডেটা ইম্পোর্ট করুন</p>
            <p className="text-xs text-slate-400">আগের ব্যাকআপ ফাইল লোড করুন</p>
          </div>
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>

      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">বিপদজনক জোন</h4>
      <button onClick={() => { if (window.confirm('সব ডেটা মুছে ডিফল্টে ফিরে যাবে। নিশ্চিত?')) { onReset(); onClose(); } }}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-red-200 dark:border-red-800 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
        <span className="text-xl">🔄</span>
        <div>
          <p className="font-medium">ডিফল্টে রিসেট করুন</p>
          <p className="text-xs text-red-400">সব কাস্টম ডেটা মুছে যাবে</p>
        </div>
      </button>
    </BottomSheet>
  );
}
