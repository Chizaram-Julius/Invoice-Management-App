import { useMemo } from "react";
import EmptyState from "../components/EmptyState";
import FilterDropdown from "../components/FilterDropdown";
import InvoiceCard from "../components/InvoiceCard";

export default function InvoicesPage({
  invoices,
  allInvoices,
  selectedStatuses,
  setSelectedStatuses,
  onSelectInvoice,
  onNewInvoice,
}) {
  const subtitle = useMemo(() => {
    if (invoices.length === 0) return "No invoices";
    if (selectedStatuses.length === 1) {
      return `There are ${invoices.length} total ${selectedStatuses[0]} invoices`;
    }
    return `There are ${allInvoices.length} total invoices`;
  }, [invoices.length, allInvoices.length, selectedStatuses]);

  return (
    <>
      <section className="mb-8 flex flex-wrap items-center justify-between gap-6 md:mb-14">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        </div>

        <div className="flex items-center gap-4 md:gap-10">
          <FilterDropdown
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
          />

          <button
            type="button"
            onClick={onNewInvoice}
            className="flex h-12 items-center gap-3 rounded-full bg-primary pl-2 pr-4 text-sm font-bold text-white transition hover:bg-primaryHover"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
              +
            </span>
            <span className="hidden sm:inline">New Invoice</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </section>

      {invoices.length === 0 ? (
        <EmptyState />
      ) : (
        <section className="space-y-4">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onClick={() => onSelectInvoice(invoice.id)}
            />
          ))}
        </section>
      )}
    </>
  );
}
