const statusStyles = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  draft: "bg-slate-500/10 text-slate-700 dark:bg-white/10 dark:text-white",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex min-w-[104px] items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold capitalize ${statusStyles[status]}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {status}
    </span>
  );
}
