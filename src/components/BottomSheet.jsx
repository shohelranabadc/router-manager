import { useEffect, useRef } from 'react';

export default function BottomSheet({ open, onClose, title, children }) {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (e.target === ref.current) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="fixed inset-0 bg-black/50 z-40 flex items-end justify-center" onClick={e => e.target === ref.current && onClose()}>
      <div className="bg-white dark:bg-slate-800 rounded-t-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 z-10">
          <h3 className="font-semibold text-base">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            ✕
          </button>
        </div>
        <div className="px-5 py-4 pb-8">{children}</div>
      </div>
    </div>
  );
}
