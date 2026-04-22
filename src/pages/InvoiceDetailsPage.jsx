import { formatCurrency, formatDate } from "../utils/formatters";
import StatusBadge from "../components/StatusBadge";

export default function InvoiceDetailsPage({
  invoice,
  onBack,
  onEdit,
  onDelete,
  onMarkAsPaid,
}) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-8 flex items-center gap-4 text-sm font-bold hover:text-primary"
      >
        <span className="text-primary">‹</span>
        Go back
      </button>

      <div className="mb-6 flex flex-col gap-4 rounded-[20px] bg-white p-6 dark:bg-[#1E2139] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:justify-start md:gap-5">
          <span className="text-sm text-muted">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="hidden flex-wrap gap-2 md:flex">
          <button type="button" onClick={onEdit} className="btn-secondary">
            Edit
          </button>
          <button type="button" onClick={onDelete} className="btn-danger">
            Delete
          </button>
          <button
            type="button"
            onClick={onMarkAsPaid}
            disabled={invoice.status !== "pending"}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mark as Paid
          </button>
        </div>
      </div>

      <article className="rounded-[20px] bg-white p-6 dark:bg-[#1E2139] md:p-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-sm font-bold">
              <span className="text-mutedDark">#</span>
              {invoice.id}
            </h2>
            <p className="mt-2 text-sm text-muted">{invoice.description}</p>
          </div>

          <div className="text-sm leading-6 text-muted md:text-right">
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="mb-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm text-muted">Invoice Date</p>
              <p className="font-bold">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Payment Due</p>
              <p className="font-bold">{formatDate(invoice.paymentDue)}</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-muted">Bill To</p>
            <p className="mb-2 font-bold">{invoice.clientName}</p>
            <div className="text-sm leading-6 text-muted">
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-muted">Sent to</p>
            <p className="break-words font-bold">{invoice.clientEmail}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-[#F9FAFE] dark:bg-[#252945]">
          <div className="p-6 md:p-8">
            <div className="mb-6 hidden grid-cols-[1fr_80px_120px_120px] gap-4 text-sm text-muted md:grid">
              <p>Item Name</p>
              <p>QTY.</p>
              <p>Price</p>
              <p>Total</p>
            </div>

            <div className="space-y-6">
              {invoice.items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-2 md:grid-cols-[1fr_80px_120px_120px] md:gap-4"
                >
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-mutedDark">{item.quantity}</p>
                  <p className="text-sm text-mutedDark">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="font-bold">{formatCurrency(item.total)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-sidebar px-6 py-8 text-white dark:bg-black md:px-8">
            <p className="text-sm">Amount Due</p>
            <p className="text-2xl font-bold">
              {formatCurrency(invoice.total)}
            </p>
          </div>
        </div>
      </article>

      <div className="mt-14 flex flex-wrap gap-2 rounded-[20px] bg-white p-6 dark:bg-[#1E2139] md:hidden">
        <button type="button" onClick={onEdit} className="btn-secondary">
          Edit
        </button>
        <button type="button" onClick={onDelete} className="btn-danger">
          Delete
        </button>
        <button
          type="button"
          onClick={onMarkAsPaid}
          disabled={invoice.status !== "pending"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark as Paid
        </button>
      </div>
    </>
  );
}
