import { useEffect, useRef } from "react";

export default function DeleteModal({ invoiceId, onCancel, onConfirm }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] rounded-panel bg-white p-8 outline-none dark:bg-cardDark"
      >
        <h2 className="mb-4 text-2xl font-bold">Confirm Deletion</h2>
        <p className="mb-6 text-sm leading-6 text-muted">
          Are you sure you want to delete invoice #{invoiceId}? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
