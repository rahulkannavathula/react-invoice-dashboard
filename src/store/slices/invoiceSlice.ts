import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice, InvoiceFilters, InvoiceStatus, PaginationMeta } from '../../types/invoice';
import { invoiceService } from '../../services/invoiceService';

interface InvoiceState {
  items: Invoice[];
  selectedInvoice: Invoice | null;
  filters: InvoiceFilters;
  pagination: PaginationMeta;
  loading: boolean;
  error: string | null;
}

const initialFilters: InvoiceFilters = {
  status: 'all',
  vendor: '',
  dateFrom: '',
  dateTo: '',
  amountMin: null,
  amountMax: null,
};

const initialState: InvoiceState = {
  items: [],
  selectedInvoice: null,
  filters: initialFilters,
  pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 },
  loading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async (params: { filters: InvoiceFilters; page: number }, { rejectWithValue }) => {
    try {
      return await invoiceService.getInvoices(params.filters, params.page);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const approveInvoice = createAsyncThunk(
  'invoices/approve',
  async (invoiceId: string, { rejectWithValue }) => {
    try {
      return await invoiceService.updateStatus(invoiceId, 'approved');
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const rejectInvoice = createAsyncThunk(
  'invoices/reject',
  async (invoiceId: string, { rejectWithValue }) => {
    try {
      return await invoiceService.updateStatus(invoiceId, 'rejected');
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<InvoiceFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setSelectedInvoice(state, action: PayloadAction<Invoice | null>) {
      state.selectedInvoice = action.payload;
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchInvoices.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.data;
        state.pagination = payload.meta;
      })
      .addCase(fetchInvoices.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(approveInvoice.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex((i) => i.id === payload.id);
        if (idx !== -1) state.items[idx] = payload;
      })
      .addCase(rejectInvoice.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex((i) => i.id === payload.id);
        if (idx !== -1) state.items[idx] = payload;
      });
  },
});

export const { setFilters, setSelectedInvoice, resetFilters } = invoiceSlice.actions;
export default invoiceSlice.reducer;
