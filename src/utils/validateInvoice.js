export function validateInvoice(form) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.senderAddress.street.trim()) errors.senderStreet = "can't be empty";
  if (!form.senderAddress.city.trim()) errors.senderCity = "can't be empty";
  if (!form.senderAddress.postCode.trim())
    errors.senderPostCode = "can't be empty";
  if (!form.senderAddress.country.trim())
    errors.senderCountry = "can't be empty";

  if (!form.clientName.trim()) errors.clientName = "can't be empty";

  if (!form.clientEmail.trim()) {
    errors.clientEmail = "can't be empty";
  } else if (!emailPattern.test(form.clientEmail)) {
    errors.clientEmail = "invalid email";
  }

  if (!form.clientAddress.street.trim()) errors.clientStreet = "can't be empty";
  if (!form.clientAddress.city.trim()) errors.clientCity = "can't be empty";
  if (!form.clientAddress.postCode.trim())
    errors.clientPostCode = "can't be empty";
  if (!form.clientAddress.country.trim())
    errors.clientCountry = "can't be empty";

  if (!form.createdAt) errors.createdAt = "can't be empty";
  if (!form.description.trim()) errors.description = "can't be empty";

  if (!form.items.length) errors.items = "must have at least 1 item";

  form.items.forEach((item, index) => {
    if (!item.name.trim()) errors[`itemName-${index}`] = "required";
    if (Number(item.quantity) <= 0) errors[`itemQuantity-${index}`] = "invalid";
    if (Number(item.price) <= 0) errors[`itemPrice-${index}`] = "invalid";
  });

  return errors;
}
