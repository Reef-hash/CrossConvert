interface ToolSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ToolSearchBar = ({ value, onChange, placeholder = 'Search tools' }: ToolSearchBarProps) => (
  <div className="relative w-full">
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-zinc-300 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none ring-0 transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-100"
    />
  </div>
);
