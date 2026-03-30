import axios from 'axios';
import { Invoice, InvoiceFilters, InvoiceStatus, PaginationMeta } from '../types/invoice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface InvoiceListResponse {
  data: Invoice[];
  meta: PaginationMeta;
}

export const invoiceService = {
  async getInvoices(filters: InvoiceFilters, page = 1, pageSize = 20): Promise<InvoiceListResponse> {
    const params: Record<string, unknown> = { page, pageSize };
    if (filters.status !== 'all') params.status = filters.status;
    if (filters.vendor) params.vendor = filters.vendor;
    if (filters.dateFrom) params.dateFrom = filters.dateFrom;
    if (filters.dateTo) params.dateTo = filters.dateTo;
    if (filters.amountMin != null) params.amountMin = filters.amountMin;
    if (filters.amountMax != null) params.amountMax = filters.amountMax;
    const { data } = await api.get<InvoiceListResponse>('/invoices', { params });
    return data;
  },

  async getInvoiceById(id: string): Promise<Invoice> {
    const { data } = await api.get<Invoice>(`/invoices/${id}`);
    return data;
  },

  async updateStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    const { data } = await api.patch<Invoice>(`/invoices/${id}/status`, { status });
    return data;
  },
};
