import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import DeleteModal from "./components/DeleteModal";
import InvoiceDrawer from "./components/InvoiceDrawer";
import { seedInvoices } from "./data/seedInvoices";
import { useLocalStorage } from "./hooks/useLocalStorage";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";
import InvoicesPage from "./pages/InvoicesPage";

export default function App() {
  const [invoices, setInvoices] = useLocalStorage(
    "invoice-app-data",
    seedInvoices,
  );
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const selectedInvoice = useMemo(
    () => invoices.find((invoice) => invoice.id === selectedInvoiceId) || null,
    [invoices, selectedInvoiceId],
  );

  const filteredInvoices = useMemo(() => {
    if (selectedStatuses.length === 0) return invoices;
    return invoices.filter((invoice) =>
      selectedStatuses.includes(invoice.status),
    );
  }, [invoices, selectedStatuses]);

  const handleSaveInvoice = (payload, mode) => {
    if (mode === "create") {
      setInvoices((prev) => [payload, ...prev]);
      setSelectedInvoiceId(payload.id);
    } else {
      setInvoices((prev) =>
        prev.map((item) => (item.id === payload.id ? payload : item)),
      );
      setSelectedInvoiceId(payload.id);
    }
    setDrawerMode(null);
  };

  const handleDeleteInvoice = () => {
    if (!selectedInvoice) return;
    setInvoices((prev) =>
      prev.filter((item) => item.id !== selectedInvoice.id),
    );
    setSelectedInvoiceId(null);
    setShowDeleteModal(false);
  };

  const handleMarkAsPaid = () => {
    if (!selectedInvoice || selectedInvoice.status !== "pending") return;

    setInvoices((prev) =>
      prev.map((item) =>
        item.id === selectedInvoice.id ? { ...item, status: "paid" } : item,
      ),
    );
  };

  return (
    <AppShell>
      {!selectedInvoice ? (
        <InvoicesPage
          invoices={filteredInvoices}
          allInvoices={invoices}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          onSelectInvoice={setSelectedInvoiceId}
          onNewInvoice={() => setDrawerMode("create")}
        />
      ) : (
        <InvoiceDetailsPage
          invoice={selectedInvoice}
          onBack={() => setSelectedInvoiceId(null)}
          onEdit={() => setDrawerMode("edit")}
          onDelete={() => setShowDeleteModal(true)}
          onMarkAsPaid={handleMarkAsPaid}
        />
      )}

      {drawerMode && (
        <InvoiceDrawer
          mode={drawerMode}
          invoice={drawerMode === "edit" ? selectedInvoice : null}
          invoices={invoices}
          onClose={() => setDrawerMode(null)}
          onSave={handleSaveInvoice}
        />
      )}

      {showDeleteModal && selectedInvoice && (
        <DeleteModal
          invoiceId={selectedInvoice.id}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteInvoice}
        />
      )}
    </AppShell>
  );
}
