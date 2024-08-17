/** @format */

import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expense_context";
import { getDateMinusDays } from "../util/date";

function RecentExpense() {
  const expenseContext = useContext(ExpensesContext);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    //יוצרים פה תאריך של היום הנוכחי
    const today = new Date();
    //מפעילים פונקציית עזר שמוצאת את התאריך שהיה לפני 7 ימים
    const date7DaysAgo = getDateMinusDays(today, 7);
    //עושים השוואה האם התאריך של ההוצאה גדול יותר מלפני 7 ימים אם כן מחזיר אמת אם לא מחזיר שקר
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="7 ימים אחרונים"
      fallbacktext={"לא היו הוצאות ב 7 הימים האחרונים"}
    />
  );
}

export default RecentExpense;
