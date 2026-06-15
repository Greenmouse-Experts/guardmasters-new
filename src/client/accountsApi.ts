import apiClient from "./api";
import type { ApiResponse, ApiResponseV2 } from "types/api";

export interface Income {
  id: string | number;
  amount: number;
  type: string;
  source: string;
  description: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string | number;
  amount: number;
  category: string;
  categoryId?: string;
  paidTo: string;
  description: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncomeQueryParams {
  search?: string;
  status?: string;
  type?: string;
}

export interface ExpenseQueryParams {
  search?: string;
  categoryId?: string;
  status?: string;
}

export interface Contact {
  id: string;
  type: "individual" | "company";
  firstName?: string;
  lastName?: string;
  name?: string;
  companyName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  billingAddress?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  tags?: string[];
  source?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactQueryParams {
  search?: string;
  type?: "individual" | "company";
  status?: string;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  qty: number;
  unitPrice: number | string;
  total?: number | string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issuedDate: string;
  dueDate: string;
  items: InvoiceItem[];
  orderId?: string;
  contactId: string;
  contact?: Contact;
  billingAddress: string;
  subtotal: number | string;
  discount: number | string;
  tax: number | string;
  total: number | string;
  amountDue: number | string;
  currency: string;
  status: "draft" | "sent" | "paid" | "overdue" | "pending";
  paidAt?: string;
  pdfUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceQueryParams {
  search?: string;
  contactId?: string;
  status?: string;
}

export interface Quote {
  id: string | number;
  date: string;
  clientName: string;
  amount: number;
  description: string;
  status: "pending" | "accepted" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}

export interface QuoteQueryParams {
  search?: string;
  status?: string;
}

export interface InvoiceStatItem {
  status: string;
  count: number;
  total: string | number;
}

export interface DashboardStats {
  totalStaffs: number;
  totalInvoices: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueToday: string | number;
  newSignups: number;
}

// Income API
export const getIncomes = async (
  params?: IncomeQueryParams,
): Promise<ApiResponseV2<Income[]>> => {
  const response = await apiClient.get("/income", { params });
  return response.data;
};

export const getIncome = async (id: string | number): Promise<Income> => {
  const response = await apiClient.get(`/income/${id}`);
  return response.data;
};

export const createIncome = async (
  data: Partial<Income>,
): Promise<ApiResponse<Income>> => {
  const response = await apiClient.post("/income", data);
  return response.data;
};

export const updateIncome = async (
  id: string | number,
  data: Partial<Income>,
): Promise<ApiResponse<Income>> => {
  const response = await apiClient.patch(`/income/${id}`, data);
  return response.data;
};

export const deleteIncome = async (
  id: string | number,
): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete(`/income/${id}`);
  return response.data;
};

// Expenses API
export const getExpenses = async (
  params?: ExpenseQueryParams,
): Promise<ApiResponseV2<Expense[]>> => {
  const response = await apiClient.get("/expenses", { params });
  return response.data;
};

export const getExpense = async (id: string | number): Promise<Expense> => {
  const response = await apiClient.get(`/expenses/${id}`);
  return response.data;
};

export const createExpense = async (
  data: Partial<Expense>,
): Promise<ApiResponse<Expense>> => {
  const response = await apiClient.post("/expenses", data);
  return response.data;
};

export const updateExpense = async (
  id: string | number,
  data: Partial<Expense>,
): Promise<ApiResponse<Expense>> => {
  const response = await apiClient.patch(`/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (
  id: string | number,
): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete(`/expenses/${id}`);
  return response.data;
};

// Contacts API
export const getContacts = async (
  params?: ContactQueryParams,
): Promise<ApiResponseV2<Contact[]>> => {
  const response = await apiClient.get("/contacts", { params });
  return response.data;
};

export const getContact = async (id: string | number): Promise<Contact> => {
  const response = await apiClient.get(`/contacts/${id}`);
  return response.data;
};

export const createContact = async (
  data: Partial<Contact>,
): Promise<ApiResponse<Contact>> => {
  const response = await apiClient.post("/contacts", data);
  return response.data;
};

export const updateContact = async (
  id: string | number,
  data: Partial<Contact>,
): Promise<ApiResponse<Contact>> => {
  const response = await apiClient.patch(`/contacts/${id}`, data);
  return response.data;
};

export const deleteContact = async (
  id: string | number,
): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete(`/contacts/${id}`);
  return response.data;
};

// Invoices API
export const getInvoices = async (
  params?: InvoiceQueryParams,
): Promise<ApiResponseV2<Invoice[]>> => {
  const response = await apiClient.get("/invoices", { params });
  return response.data;
};

export const getInvoice = async (id: string | number): Promise<Invoice> => {
  const response = await apiClient.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (
  data: Partial<Invoice>,
): Promise<ApiResponse<Invoice>> => {
  const response = await apiClient.post("/invoices", data);
  return response.data;
};

export const updateInvoice = async (
  id: string | number,
  data: Partial<Invoice>,
): Promise<ApiResponse<Invoice>> => {
  const response = await apiClient.patch(`/invoices/${id}`, data);
  return response.data;
};

export const updateInvoiceStatus = async (
  id: string | number,
  status: string,
): Promise<ApiResponse<Invoice>> => {
  const response = await apiClient.patch(`/invoices/${id}/status`, { status });
  return response.data;
};

export const markInvoiceAsPaid = async (
  id: string | number,
): Promise<ApiResponse<Invoice>> => {
  const response = await apiClient.patch(`/invoices/${id}/mark-paid`);
  return response.data;
};

export const sendInvoice = async (
  id: string | number,
): Promise<ApiResponse<void>> => {
  const response = await apiClient.patch(`/invoices/${id}/send`);
  return response.data;
};

export const getInvoiceStats = async (): Promise<
  ApiResponseV2<InvoiceStatItem[]>
> => {
  const response = await apiClient.get("/invoices/stats");
  return response.data;
};

// Quotes API
export const getQuotes = async (
  params?: QuoteQueryParams,
): Promise<ApiResponseV2<Quote[]>> => {
  const response = await apiClient.get("/quotes", { params });
  return response.data;
};

export const getQuote = async (id: string | number): Promise<Quote> => {
  const response = await apiClient.get(`/quotes/${id}`);
  return response.data;
};

export const createQuote = async (
  data: Partial<Quote>,
): Promise<ApiResponse<Quote>> => {
  const response = await apiClient.post("/quotes", data);
  return response.data;
};

export const updateQuote = async (
  id: string | number,
  data: Partial<Quote>,
): Promise<ApiResponse<Quote>> => {
  const response = await apiClient.patch(`/quotes/${id}`, data);
  return response.data;
};

export const deleteQuote = async (
  id: string | number,
): Promise<ApiResponse<void>> => {
  const response = await apiClient.delete(`/quotes/${id}`);
  return response.data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await apiClient.get("/dashboard/stats");
  return response.data;
};
