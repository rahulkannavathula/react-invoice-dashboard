# React Invoice Dashboard

> AP Automation invoice processing dashboard — real-time discrepancy detection, Redux Toolkit state management, code splitting & lazy loading.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=flat-square&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?style=flat-square&logo=redux)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

A production-grade **Accounts Payable (AP) Automation** dashboard that identifies discrepancies between invoices, purchase orders, and contracts in real time. Built with a scalable component architecture and optimized for performance.

## Features

- **Real-time Discrepancy Detection** — flags mismatches between invoices and contracts
- **Redux Toolkit** state management with async thunks for predictable data flow
- **Code Splitting & Lazy Loading** — React.lazy + Suspense for fast initial load
- **Memoized Selectors** — reselect-based selectors to prevent unnecessary re-renders
- **Reusable Component Library** — Button, Table, Modal, Badge, Filter components
- **TypeScript** — fully typed props, state, and API responses
- **Responsive Design** — CSS Grid + Flexbox, Bootstrap utilities
- **Cross-browser Compatible** — Chrome, Firefox, Safari, Edge

## Tech Stack

| Layer | Technology |
|-------|------------|
| UI | React 18, TypeScript, CSS3 |
| State | Redux Toolkit, Redux Thunk |
| Styling | Bootstrap 5, CSS Modules |
| HTTP | Axios |
| Build | Vite |
| Testing | Jest, React Testing Library |

## Project Structure

```
src/
├── components/
│   ├── InvoiceDashboard/
│   ├── InvoiceTable/
│   └── InvoiceFilters/
├── store/
│   ├── index.ts
│   └── slices/
│       └── invoiceSlice.ts
├── hooks/
│   └── useInvoices.ts
├── services/
│   └── invoiceService.ts
├── types/
│   └── invoice.ts
└── App.tsx
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Architecture Decisions

- **Redux Toolkit** pattern for modular, testable state slices
- **Immutable state updates** using Immer (built into RTK)
- **API layer abstraction** via service classes — UI components never call fetch directly
- **Lazy-loaded routes** with React.lazy to keep bundle size minimal

## License

MIT © [Rahul Karnavathula](https://github.com/rahulkannavathula)
