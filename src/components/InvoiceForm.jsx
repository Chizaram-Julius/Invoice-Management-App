import { useMemo, useState } from "react";
import {
  calculateInvoiceTotal,
  calculateItemTotal,
  calculatePaymentDue,
  generateInvoiceId,
} from "../utils/invoiceUtils";
import { validateInvoice } from "../utils/validateInvoice";

const createEmptyForm = () => ({
  id: "",
  createdAt: new Date().toISOString().slice(0, 10),
  paymentTerms: 30,
  paymentDue: "",
  description: "",
  clientName: "",
  clientEmail: "",
  status: "pending",
  senderAddress: { street: "", city: "", postCode: "", country: "" },
  clientAddress: { street: "", city: "", postCode: "", country: "" },
  items: [
    { id: crypto.randomUUID(), name: "", quantity: 1, price: 0, total: 0 },
  ],
  total: 0,
});

function FormInput({ label, value, onChange, error, type = "text" }) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="label-text">{label}</span>
        {error && (
          <span className="text-xs font-semibold text-danger">{error}</span>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-base h-11 ${error ? "input-error" : ""}`}
      />
    </label>
  );
}

function AddressGroup({ title, values, errors, prefix, onChange }) {
  return (
    <section>
      <h3 className="mb-5 text-xs font-bold text-primary">{title}</h3>

      <div className="space-y-5">
        <FormInput
          label="Street Address"
          value={values.street}
          error={errors[`${prefix}Street`]}
          onChange={(value) => onChange("street", value)}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <FormInput
            label="City"
            value={values.city}
            error={errors[`${prefix}City`]}
            onChange={(value) => onChange("city", value)}
          />
          <FormInput
            label="Post Code"
            value={values.postCode}
            error={errors[`${prefix}PostCode`]}
            onChange={(value) => onChange("postCode", value)}
          />
          <FormInput
            label="Country"
            value={values.country}
            error={errors[`${prefix}Country`]}
            onChange={(value) => onChange("country", value)}
          />
        </div>
      </div>
    </section>
  );
}

export default function InvoiceForm({
  mode,
  invoice,
  invoices,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => {
    if (mode === "edit" && invoice) {
      return {
        ...invoice,
        senderAddress: { ...invoice.senderAddress },
        clientAddress: { ...invoice.clientAddress },
        items: invoice.items.map((item) => ({ ...item })),
      };
    }
    return createEmptyForm();
  });

  const [errors, setErrors] = useState({});

  const total = useMemo(() => calculateInvoiceTotal(form.items), [form.items]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateAddress = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateItem = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        return {
          ...updated,
          total: calculateItemTotal(updated.quantity, updated.price),
        };
      }),
    }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: crypto.randomUUID(), name: "", quantity: 1, price: 0, total: 0 },
      ],
    }));
  };

  const removeItem = (id) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const buildPayload = (status) => ({
    ...form,
    id: mode === "create" ? generateInvoiceId(invoices) : form.id,
    paymentTerms: Number(form.paymentTerms),
    paymentDue: calculatePaymentDue(form.createdAt, form.paymentTerms),
    items: form.items.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
      price: Number(item.price),
      total: calculateItemTotal(item.quantity, item.price),
    })),
    total,
    status,
  });

  const handleSaveDraft = () => {
    const status =
      mode === "edit" && invoice?.status === "paid" ? "paid" : "draft";
    onSave(buildPayload(status), mode);
  };

  const handleSubmit = () => {
    const validationErrors = validateInvoice(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const status =
      mode === "edit" && invoice?.status === "paid" ? "paid" : "pending";
    onSave(buildPayload(status), mode);
  };

  return (
    <div className="h-full w-full max-w-[720px] overflow-hidden rounded-r-panel bg-white dark:bg-drawerDark md:max-w-[616px]">
      <div className="flex h-full flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-8 pb-36 md:px-14 md:pt-14">
          <h2 className="mb-8 text-[28px] font-bold tracking-[-0.5px]">
            {mode === "edit" ? (
              <>
                Edit <span className="text-mutedDark">#</span>
                {form.id}
              </>
            ) : (
              "New Invoice"
            )}
          </h2>

          <div className="space-y-8">
            <AddressGroup
              title="Bill From"
              values={form.senderAddress}
              errors={errors}
              prefix="sender"
              onChange={(field, value) =>
                updateAddress("senderAddress", field, value)
              }
            />

            <section>
              <h3 className="mb-5 text-xs font-bold text-primary">Bill To</h3>

              <div className="space-y-5">
                <FormInput
                  label="Client's Name"
                  value={form.clientName}
                  error={errors.clientName}
                  onChange={(value) => updateField("clientName", value)}
                />

                <FormInput
                  label="Client's Email"
                  value={form.clientEmail}
                  error={errors.clientEmail}
                  onChange={(value) => updateField("clientEmail", value)}
                />

                <FormInput
                  label="Street Address"
                  value={form.clientAddress.street}
                  error={errors.clientStreet}
                  onChange={(value) =>
                    updateAddress("clientAddress", "street", value)
                  }
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <FormInput
                    label="City"
                    value={form.clientAddress.city}
                    error={errors.clientCity}
                    onChange={(value) =>
                      updateAddress("clientAddress", "city", value)
                    }
                  />
                  <FormInput
                    label="Post Code"
                    value={form.clientAddress.postCode}
                    error={errors.clientPostCode}
                    onChange={(value) =>
                      updateAddress("clientAddress", "postCode", value)
                    }
                  />
                  <FormInput
                    label="Country"
                    value={form.clientAddress.country}
                    error={errors.clientCountry}
                    onChange={(value) =>
                      updateAddress("clientAddress", "country", value)
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormInput
                    type="date"
                    label="Invoice Date"
                    value={form.createdAt}
                    error={errors.createdAt}
                    onChange={(value) => updateField("createdAt", value)}
                  />

                  <label className="block">
                    <span className="label-text">Payment Terms</span>
                    <select
                      value={form.paymentTerms}
                      onChange={(e) =>
                        updateField("paymentTerms", e.target.value)
                      }
                      className="input-base h-11"
                    >
                      <option value={1}>Net 1 Day</option>
                      <option value={7}>Net 7 Days</option>
                      <option value={14}>Net 14 Days</option>
                      <option value={30}>Net 30 Days</option>
                    </select>
                  </label>
                </div>

                <FormInput
                  label="Project Description"
                  value={form.description}
                  error={errors.description}
                  onChange={(value) => updateField("description", value)}
                />
              </div>
            </section>

            <section>
              <h3 className="mb-4 text-lg font-bold text-[#777F98]">
                Item List
              </h3>

              <div className="space-y-4">
                {form.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-5">
                      <FormInput
                        label="Item Name"
                        value={item.name}
                        error={errors[`itemName-${index}`]}
                        onChange={(value) => updateItem(item.id, "name", value)}
                      />
                    </div>

                    <div className="col-span-3 md:col-span-2">
                      <FormInput
                        type="number"
                        label="Qty."
                        value={item.quantity}
                        error={errors[`itemQuantity-${index}`]}
                        onChange={(value) =>
                          updateItem(item.id, "quantity", value)
                        }
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2">
                      <FormInput
                        type="number"
                        label="Price"
                        value={item.price}
                        error={errors[`itemPrice-${index}`]}
                        onChange={(value) =>
                          updateItem(item.id, "price", value)
                        }
                      />
                    </div>

                    <div className="col-span-4 md:col-span-2">
                      <label className="block">
                        <span className="label-text">Total</span>
                        <div className="flex h-11 items-center px-2 text-sm font-bold text-muted">
                          {item.total.toFixed(2)}
                        </div>
                      </label>
                    </div>

                    <div className="col-span-1 flex items-end justify-center pb-3">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted transition hover:text-danger"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}

                {errors.items && (
                  <div className="space-y-1 text-xs font-semibold text-danger">
                    <p>- All fields must be added</p>
                    <p>- An item must be added</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={addItem}
                  className="btn-secondary w-full"
                >
                  + Add New Item
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-black/5 bg-white px-6 py-5 dark:border-white/5 dark:bg-drawerDark md:px-14">
          <div
            className={`flex flex-wrap items-center gap-3 ${
              mode === "edit" ? "justify-end" : "justify-between"
            }`}
          >
            <button type="button" onClick={onClose} className="btn-secondary">
              {mode === "edit" ? "Cancel" : "Discard"}
            </button>

            <div className="ml-auto flex gap-3">
              {mode === "create" && (
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="btn-dark"
                >
                  Save as Draft
                </button>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary"
              >
                {mode === "edit" ? "Save Changes" : "Save & Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
