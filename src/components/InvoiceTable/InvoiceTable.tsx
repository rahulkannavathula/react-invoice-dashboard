import React, { memo } from 'react';
import { Invoice, InvoiceStatus } from '../../types/invoice';

interface Props {
  invoices: Invoice[];
  loading: boolean;
  onSelect: (invoice: Invoice) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
  discrepancy: 'info',
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export const InvoiceTable: React.FC<Props> = memo(
  ({ invoices, loading, onSelect, onApprove, onReject }) => {
    if (loading)
      return (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );

    if (!invoices.length)
      return <div className="alert alert-info">No invoices match the current filters.</div>;

    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Invoice #</th><th>Vendor</th><th>PO #</th>
              <th>Issue Date</th><th>Due Date</th><th>Amount</th>
              <th>Status</th><th>Discrepancies</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(inv)}>
                <td><strong>{inv.invoiceNumber}</strong></td>
                <td>{inv.vendor}</td>
                <td>{inv.poNumber}</td>
                <td>{new Date(inv.issueDate).toLocaleDateString()}</td>
                <td>{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td>{fmt(inv.amount)}</td>
                <td>
                  <span className={`badge bg-${STATUS_BADGE[inv.status]}`}>
                    {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                  </span>
                </td>
                <td>
                  {inv.discrepancies.length > 0
                    ? <span className="badge bg-danger">{inv.discrepancies.length}</span>
                    : <span className="text-muted">—</span>}
                </td>
                <td>
                  <div className="d-flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button className="btn btn-sm btn-success"
                      onClick={() => onApprove(inv.id)} disabled={inv.status === 'approved'}
                      aria-label={`Approve ${inv.invoiceNumber}`}>Approve</button>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => onReject(inv.id)} disabled={inv.status === 'rejected'}
                      aria-label={`Reject ${inv.invoiceNumber}`}>Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
InvoiceTable.displayName = 'InvoiceTable';
