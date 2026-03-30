export type InvoiceStatus = 'pending' | 'approved' | 'rejected' | 'discrepancy';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Discrepancy {
  id: string;
  field: string;
  invoiceValue: string | number;
  contractValue: string | number;
  severity: 'low' | 'medium' | 'high';
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendor: string;
  contractId: string;
  poNumber: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  lineItems: LineItem[];
  discrepancies: Discrepancy[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceFilters {
  status: InvoiceStatus | 'all';
  vendor: string;
  dateFrom: string;
  dateTo: string;
  amountMin: number | null;
  amountMax: number | null;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
