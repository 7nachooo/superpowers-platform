interface Props {
  value: string;
}

const STATUS_MAP: Record<string, { bg: string; text: string; dot: string }> = {
  activo:    { bg: "bg-green-500/10",  text: "text-green-400",  dot: "bg-green-400" },
  active:    { bg: "bg-green-500/10",  text: "text-green-400",  dot: "bg-green-400" },
  pendiente: { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  pending:   { bg: "bg-yellow-500/10", text: "text-yellow-400", dot: "bg-yellow-400" },
  inactivo:  { bg: "bg-red-500/10",    text: "text-red-400",    dot: "bg-red-400" },
  inactive:  { bg: "bg-red-500/10",    text: "text-red-400",    dot: "bg-red-400" },
  completado:{ bg: "bg-blue-500/10",   text: "text-blue-400",   dot: "bg-blue-400" },
  completed: { bg: "bg-blue-500/10",   text: "text-blue-400",   dot: "bg-blue-400" },
};

export function StatusBadge({ value }: Props) {
  const key = value.toLowerCase().trim();
  const style = STATUS_MAP[key] ?? {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    dot: "bg-slate-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {value}
    </span>
  );
}
