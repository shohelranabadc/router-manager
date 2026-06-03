import { useState } from 'react';
import BottomSheet from './BottomSheet';
import FormField, { Input } from './FormField';

function InfoRow({ label, value, onCopy, mono = false }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <span className="text-xs text-slate-400 w-24 shrink-0">{label}</span>
      <span className={`flex-1 text-sm break-all ${mono ? 'font-mono' : ''}`}>{value || '—'}</span>
      {onCopy && (
        <button onClick={() => onCopy(value)} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      )}
    </div>
  );
}

export default function RouterDetail({ open, onClose, router, floor, onEdit, onDelete, onCopy }) {
  const [showPass, setShowPass] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!router) return null;

  const startEdit = () => {
    setForm({ name: router.name, ip: router.ip, user: router.user, pass: router.pass, note: router.note || '' });
    setEditing(true);
  };

  const saveEdit = () => {
    if (!form.name || !form.ip || !form.pass) return;
    onEdit(form);
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete();
      setConfirmDelete(false);
      onClose();
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const copyAll = () => {
    const txt = `রাউটার: ${router.name}\nবিভাগ: ${floor.deptName} (${floor.floorName})\nIP: ${router.ip}\nUsername: ${router.user}\nPassword: ${router.pass}${router.note ? '\nনোট: ' + router.note : ''}`;
    onCopy(txt);
  };

  return (
    <BottomSheet open={open} onClose={() => { setEditing(false); setConfirmDelete(false); onClose(); }} title={editing ? 'রাউটার এডিট করুন' : router.name}>
      {!editing ? (
        <>
          <div className="text-xs text-emerald-600 font-medium mb-4 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-xl">
            📍 {floor.floorName} — {floor.deptName}
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl px-3 mb-4">
            <InfoRow label="IP ঠিকানা" value={router.ip} onCopy={onCopy} mono />
            <InfoRow label="Username" value={router.user} onCopy={onCopy} mono />
            <div className="flex items-center gap-3 py-3 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs text-slate-400 w-24 shrink-0">Password</span>
              <span className="flex-1 text-sm font-mono break-all">
                {showPass ? router.pass : '••••••••'}
              </span>
              <button onClick={() => setShowPass(v => !v)} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                {showPass ? '🙈' : '👁'}
              </button>
              <button onClick={() => onCopy(router.pass)} className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              </button>
            </div>
            {router.note && <InfoRow label="নোট" value={router.note} />}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <a href={`http://${router.ip}`} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-xl py-3 text-sm font-medium active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              অ্যাডমিন খুলুন
            </a>
            <button onClick={copyAll}
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-xl py-3 text-sm font-medium active:scale-95 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              সব কপি
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={startEdit}
              className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm font-medium active:scale-95 transition-transform">
              ✏️ এডিট করুন
            </button>
            <button onClick={handleDelete}
              className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium active:scale-95 transition-transform ${confirmDelete ? 'bg-red-500 text-white' : 'border border-red-200 text-red-500 dark:border-red-800'}`}>
              🗑 {confirmDelete ? 'নিশ্চিত করুন' : 'মুছুন'}
            </button>
          </div>
        </>
      ) : (
        <>
          <FormField label="রাউটারের নাম" required>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="যেমন: TP-Link WR940N #1" />
          </FormField>
          <FormField label="IP ঠিকানা" required>
            <Input value={form.ip} onChange={e => setForm(f => ({ ...f, ip: e.target.value }))} placeholder="192.168.x.x" />
          </FormField>
          <FormField label="অ্যাডমিন Username" required>
            <Input value={form.user} onChange={e => setForm(f => ({ ...f, user: e.target.value }))} placeholder="admin" />
          </FormField>
          <FormField label="পাসওয়ার্ড" required>
            <Input type="text" value={form.pass} onChange={e => setForm(f => ({ ...f, pass: e.target.value }))} placeholder="পাসওয়ার্ড" />
          </FormField>
          <FormField label="নোট">
            <Input value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="যেকোনো বাড়তি তথ্য" />
          </FormField>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button onClick={() => setEditing(false)} className="border border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm font-medium">বাতিল</button>
            <button onClick={saveEdit} className="bg-emerald-500 text-white rounded-xl py-3 text-sm font-medium">সংরক্ষণ</button>
          </div>
        </>
      )}
    </BottomSheet>
  );
}
