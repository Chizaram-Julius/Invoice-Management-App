import { formatCurrency, formatDate } from "../utils/formatters";
import StatusBadge from "./StatusBadge";

export default function InvoiceCard({ invoice, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[20px] border border-transparent bg-white p-5 text-left shadow-sm transition hover:border-[#7C5DFA] dark:bg-[#1E2139]"
    >
      <div className="grid gap-4 md:grid-cols-[100px_1fr_1fr_auto_auto_24px] md:items-center">
        <p className="text-sm font-bold">
          <span className="text-[#7E88C3]">#</span>
          {invoice.id}
        </p>
        <p className="text-xs text-[#7E88C3]">
          Due {formatDate(invoice.paymentDue)}
        </p>
        <p className="text-xs text-[#7E88C3]">{invoice.clientName}</p>
        <p className="text-base font-bold">{formatCurrency(invoice.total)}</p>
        <StatusBadge status={invoice.status} />
        <span className="hidden text-lg font-bold text-[#7C5DFA] md:block">
          ›
        </span>
      </div>
    </button>
  );
}
