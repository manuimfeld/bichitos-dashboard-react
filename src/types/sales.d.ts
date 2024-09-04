interface Sale {
  sale_id: number;
  amount: number;
  payment_method: string;
  sale_date: string;
  turn: string;
  customer_dni?: number;
  created_by: number;
}

export interface SalesSummary {
  total_sales: number | null;
  total_sales_count: number;
}
