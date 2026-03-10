interface ChipProps {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, selected = false, disabled = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'px-4 py-2 text-xs tracking-widest uppercase border transition-colors',
        selected
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-300 hover:border-black',
        disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
