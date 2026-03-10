import Chip from '../../components/ui/Chip';

interface OptionSelectorProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

export default function OptionSelector({
  label,
  options,
  selected,
  onSelect,
}: OptionSelectorProps) {
  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
        {label}
        {selected && <span className="text-black ml-2 normal-case tracking-normal">{selected}</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>
    </div>
  );
}
