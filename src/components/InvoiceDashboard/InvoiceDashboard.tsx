import React, { lazy, Suspense } from 'react';
import { InvoiceFilters } from '../InvoiceFilters/InvoiceFilters';
import { useInvoices } from '../../hooks/useInvoices';

const InvoiceTable = lazy(() =>
  import('../InvoiceTable/InvoiceTable').then((m) => ({ default: m.InvoiceTable }))
);

export const InvoiceDashboard: React.FC = () => {
  const { invoices, filters, pagination, loading, error, updateFilters, selectInvoice, approve, reject, clearFilters } =
    useInvoices();

  const discrepancyCount = invoices.filter((i) => i.discrepancies.length > 0).length;
  const pendingCount = invoices.filter((i) => i.status === 'pending').length;

  return (
    <div className="container-fluid py-4">
      <header className="mb-4">
        <h1 className="h3 fw-bold">AP Automation Dashboard</h1>
        <p className="text-muted">Real-time invoice processing &amp; discrepancy detection</p>
      </header>

      <div className="row g-3 mb-4">
        {[
          { label: 'Total Invoices', value: pagination.total, color: 'text-primary' },
          { label: 'Pending Review', value: pendingCount, color: 'text-warning' },
          { label: 'Discrepancies', value: discrepancyCount, color: 'text-danger' },
          { label: 'Page', value: `${pagination.page} / ${pagination.totalPages || 1}`, color: '' },
        ].map(({ label, value, color }) => (
          <div key={label} className="col-sm-6 col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <p className="text-muted small mb-1">{label}</p>
                <h4 className={`fw-bold ${color}`}>{value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <InvoiceFilters filters={filters} onFilterChange={updateFilters} onReset={clearFilters} />

      {error && <div className="alert alert-danger">{error}</div>}

      <Suspense fallback={<div className="d-flex justify-content-center py-5"><div className="spinner-border text-primary" /></div>}>
        <InvoiceTable
          invoices={invoices}
          loading={loading}
          onSelect={selectInvoice}
          onApprove={(id) => approve(id)}
          onReject={(id) => reject(id)}
        />
      </Suspense>
    </div>
  );
};
