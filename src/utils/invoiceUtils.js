export function calculateItemTotal(quantity, price) {
  return Number(quantity || 0) * Number(price || 0);
}

export function calculateInvoiceTotal(items) {
  return items.reduce(
    (sum, item) => sum + calculateItemTotal(item.quantity, item.price),
    0,
  );
}

export function calculatePaymentDue(createdAt, paymentTerms) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + Number(paymentTerms));
  return date.toISOString().slice(0, 10);
}

export function generateInvoiceId(existingInvoices) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

  do {
    id =
      letters[Math.floor(Math.random() * letters.length)] +
      letters[Math.floor(Math.random() * letters.length)] +
      Math.floor(1000 + Math.random() * 9000);
  } while (existingInvoices.some((invoice) => invoice.id === id));

  return id;
}
