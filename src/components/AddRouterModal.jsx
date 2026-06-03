import { useState, useEffect } from 'react';
import BottomSheet from './BottomSheet';
import FormField, { Input, Select } from './FormField';

export default function AddRouterModal({ open, onClose, floors, onSave, defaultFloorId }) {
  const [form, setForm] = useState({ floorId: '', name: '', ip: '', user: 'admin', pass: '', note: '' });

  useEffect(() => {
    if (open) {
      setForm({ floorId: defaultFloorId || floors[0]?.id || '', name: '', ip: '', user: 'admin', pass: '', note: '' });
    }
  }, [open, defaultFloorId, floors]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.floorId && form.name.trim() && form.ip.trim() && form.pass.trim();

  const save = () => {
    if (!valid) return;
    onSave(form.floorId, { name: form.name.trim(), ip: form.ip.trim(), user: form.user.trim() || 'admin', pass: form.pass.trim(), note: form.note.trim() });
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="নতুন রাউটার যোগ করুন">
      <FormField label="বিভাগ নির্বাচন করুন" required>
        <Select value={form.floorId} onChange={e => set('floorId', e.target.value)}>
          {floors.map(f => <option key={f.id} value={f.id}>{f.floorName} — {f.deptName}</option>)}
        </Select>
      </FormField>
      <FormField label="রাউটারের নাম" required>
        <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="যেমন: TP-Link WR940N #1" />
      </FormField>
      <FormField label="IP ঠিকানা" required>
        <Input value={form.ip} onChange={e => set('ip', e.target.value)} placeholder="192.168.x.x" inputMode="numeric" />
      </FormField>
      <FormField label="অ্যাডমিন Username" required>
        <Input value={form.user} onChange={e => set('user', e.target.value)} placeholder="admin" autoCapitalize="off" />
      </FormField>
      <FormField label="পাসওয়ার্ড" required>
        <Input type="text" value={form.pass} onChange={e => set('pass', e.target.value)} placeholder="পাসওয়ার্ড লিখুন" autoCapitalize="off" autoComplete="off" />
      </FormField>
      <FormField label="নোট (ঐচ্ছিক)">
        <Input value={form.note} onChange={e => set('note', e.target.value)} placeholder="যেমন: সার্ভার রুমের পাশে" />
      </FormField>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <button onClick={onClose} className="border border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm font-medium">বাতিল</button>
        <button onClick={save} disabled={!valid}
          className="bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl py-3 text-sm font-medium transition-colors">
          যোগ করুন
        </button>
      </div>
    </BottomSheet>
  );
}
