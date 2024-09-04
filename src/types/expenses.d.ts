/*interface Expense {
    id: number,
    expenses_date: string,
    provider: string,
    amount: number,
    is_paid: boolean
}*/

export interface ExpensesSummary {
  total_expenses_amount: number | null;
  total_expenses_count: number;
}
