export function PagerButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-sm bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-content transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:bg-base-300 disabled:text-base-content/40"
    >
      {label}
    </button>
  );
}
