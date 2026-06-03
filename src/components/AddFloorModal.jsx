import { useState } from 'react';
import BottomSheet from './BottomSheet';
import FormField, { Input } from './FormField';

const COMMON_FLOORS = ['১ম তলা','২য় তলা','৩য় তলা','৪র্থ তলা','৫ম তলা','৬ষ্ঠ তলা','৭ম তলা','৮ম তলা','৯ম তলা','১০ম তলা','১১শ তলা','১২শ তলা'];

export default function AddFloorModal({ open, onClose, onSave, editData }) {
  const [floorName, setFloorName] = useState(editData?.floorName || '');
  const [deptName, setDeptName] = useState(editData?.deptName || '');

  const handleOpen = () => {
    setFloorName(editData?.floorName || '');
    setDeptName(editData?.deptName || '');
  };

  const save = () => {
    if (!floorName.trim() || !deptName.trim()) return;
    onSave(floorName.trim(), deptName.trim());
    setFloorName(''); setDeptName('');
    onClose();
  };

  return (
    <BottomSheet open={open} onClose={onClose} title={editData ? 'বিভাগ এডিট করুন' : 'নতুন বিভাগ/ফ্লোর যোগ করুন'}>
      <FormField label="তলার নাম" required hint="উদাহরণ: ১০ম তলা">
        <Input value={floorName} onChange={e => setFloorName(e.target.value)} placeholder="তলার নাম লিখুন" />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {COMMON_FLOORS.map(f => (
            <button key={f} onClick={() => setFloorName(f)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${floorName === f ? 'bg-emerald-500 text-white border-emerald-500' : 'border-slate-200 dark:border-slate-600 text-slate-500 hover:border-emerald-400'}`}>
              {f}
            </button>
          ))}
        </div>
      </FormField>
      <FormField label="বিভাগের নাম" required hint="উদাহরণ: চেয়ারম্যান দপ্তর">
        <Input value={deptName} onChange={e => setDeptName(e.target.value)} placeholder="বিভাগের নাম লিখুন" />
      </FormField>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button onClick={onClose} className="border border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm font-medium">বাতিল</button>
        <button onClick={save} disabled={!floorName.trim() || !deptName.trim()}
          className="bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl py-3 text-sm font-medium transition-colors">
          {editData ? 'আপডেট করুন' : 'যোগ করুন'}
        </button>
      </div>
    </BottomSheet>
  );
}
