import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  approveInvoice,
  fetchInvoices,
  rejectInvoice,
  resetFilters,
  setFilters,
  setSelectedInvoice,
} from '../store/slices/invoiceSlice';
import { Invoice, InvoiceFilters } from '../types/invoice';

export function useInvoices() {
  const dispatch = useAppDispatch();
  const { items, selectedInvoice, filters, pagination, loading, error } =
    useAppSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices({ filters, page: pagination.page }));
  }, [dispatch, filters, pagination.page]);

  return {
    invoices: items,
    selectedInvoice,
    filters,
    pagination,
    loading,
    error,
    updateFilters: useCallback((p: Partial<InvoiceFilters>) => dispatch(setFilters(p)), [dispatch]),
    selectInvoice: useCallback((inv: Invoice | null) => dispatch(setSelectedInvoice(inv)), [dispatch]),
    approve: useCallback((id: string) => dispatch(approveInvoice(id)), [dispatch]),
    reject: useCallback((id: string) => dispatch(rejectInvoice(id)), [dispatch]),
    clearFilters: useCallback(() => dispatch(resetFilters()), [dispatch]),
  };
}
