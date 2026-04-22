# Invoice Management App

## Overview

A fully responsive Invoice Management Application built with React and TailwindCSS based on the provided Figma design for HNG Stage 2 (Frontend).

The app enables users to create, view, update, and delete invoices, manage statuses (Draft, Pending, Paid), filter invoices, and toggle between light and dark themes. Data is persisted using LocalStorage.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPO_URL
```

### 2. Navigate into the project

```bash
cd invoice-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## Architecture

The app follows a **component-based architecture** as recommended by HNG:

```
src/
├── components/
│   ├── AppShell.jsx
│   ├── EmptyState.jsx
│   ├── FilterDropdown.jsx
│   ├── StatusBadge.jsx
│   ├── InvoiceCard.jsx
│   ├── InvoiceForm.jsx
│   ├── InvoiceDrawer.jsx
│   ├── DeleteModal.jsx
│
├── pages/
│   ├── InvoicesPage.jsx
│   ├── InvoiceDetailsPage.jsx
│
├── context/
│   ├── ThemeContext.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│
├── utils/
│   ├── invoiceUtils.js
│   ├── validateInvoice.js
│   ├── formatters.js
│
├── data/
│   ├── seedInvoices.js
│
└── assets/
```

---

## Core Features

### 1️⃣ CRUD Functionality

- Create invoices via form
- View list of invoices
- View full invoice details
- Edit existing invoices
- Delete invoices (with confirmation modal)

---

### 2️⃣ Form Validation

- Required fields enforced
- Valid email format required
- At least one invoice item required
- Quantity and price must be positive numbers
- Visual error states and messages
- Submission blocked when invalid

---

### 3️⃣ Draft & Payment Flow

Invoices support three statuses:

- Draft
- Pending
- Paid

Rules:

- Draft invoices can be edited later
- Pending invoices can be marked as Paid
- Paid invoices cannot revert to Draft
- Status is reflected in both list and detail views

---

### 4️⃣ Filter by Status

- Filter by:
  - All
  - Draft
  - Pending
  - Paid

- Instant UI updates
- Empty state shown when no results match

---

### 5️⃣ Light & Dark Mode

- Toggle between light and dark themes
- Applied globally
- Preference stored in LocalStorage
- Accessible color contrast

---

### 6️⃣ Responsive Design

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- No horizontal overflow
- Layout adapts correctly across devices

---

### 7️⃣ Hover & Interactive States

- Buttons, links, cards, filters, and inputs have visible hover states

---

### 8️⃣ Data Persistence

- Invoice data persisted using **LocalStorage**

---

## Accessibility Notes

- Semantic HTML elements used (`button`, `form`, `label`)
- Inputs have associated labels
- Modal:
  - Closes with **ESC key**
  - Click outside closes modal

- Keyboard navigable interactions
- Good contrast in light/dark modes (WCAG-friendly)

---

## Trade-offs

- Used LocalStorage instead of backend for simplicity and speed
- State-based navigation instead of full routing
- Focused on UI accuracy and core functionality

---

## Improvements Beyond Requirements

- Reusable component structure
- Clean separation of logic using utility functions
- Persistent theme and data
- Drawer-based form UX
- Enhanced validation and error handling

---

## Evaluation Checklist

- ✅ CRUD functionality works
- ✅ Form validation prevents invalid submissions
- ✅ Status logic behaves correctly
- ✅ Filtering works accurately
- ✅ Theme persists after reload
- ✅ Fully responsive layout
- ✅ No console errors
- ✅ Accessibility best practices applied
