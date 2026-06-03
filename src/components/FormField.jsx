export default function FormField({ label, required, children, hint }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${className}`}
      {...props}
    />
  );
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={`w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
