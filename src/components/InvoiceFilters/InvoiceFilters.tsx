import React from 'react';
import { InvoiceFilters as IFilters } from '../../types/invoice';

interface Props {
  filters: IFilters;
  onFilterChange: (partial: Partial<IFilters>) => void;
  onReset: () => void;
}

const STATUS_OPTIONS: Array<{ value: IFilters['status']; label: string }> = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'discrepancy', label: 'Discrepancy' },
];

export const InvoiceFilters: React.FC<Props> = ({ filters, onFilterChange, onReset }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title mb-3">Filters</h5>
      <div className="row g-3">
        <div className="col-md-3">
          <label htmlFor="status-filter" className="form-label">Status</label>
          <select
            id="status-filter"
            className="form-select"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as IFilters['status'] })}
          >
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="vendor-filter" className="form-label">Vendor</label>
          <input
            id="vendor-filter" type="text" className="form-control"
            placeholder="Search vendor..."
            value={filters.vendor}
            onChange={(e) => onFilterChange({ vendor: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="date-from" className="form-label">Date From</label>
          <input id="date-from" type="date" className="form-control" value={filters.dateFrom}
            onChange={(e) => onFilterChange({ dateFrom: e.target.value })} />
        </div>
        <div className="col-md-2">
          <label htmlFor="date-to" className="form-label">Date To</label>
          <input id="date-to" type="date" className="form-control" value={filters.dateTo}
            onChange={(e) => onFilterChange({ dateTo: e.target.value })} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-outline-secondary w-100" onClick={onReset}>Reset</button>
        </div>
      </div>
    </div>
  </div>
);
