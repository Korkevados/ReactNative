/** @format */

import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expense_context";

function AllExpenses() {
  const expenseContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      period="כל הזמן"
      fallbacktext={"אין הוצאות כלל וכלל"}
    />
  );
}

export default AllExpenses;
