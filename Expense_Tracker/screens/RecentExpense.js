/** @format */

import { Text } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expense_context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import ErrorOverLay from "../components/UI/ErrorOverLay";

function RecentExpense() {
  const expenseContext = useContext(ExpensesContext);
  const [IsLoading, setIsLoading] = useState(true);
  const [IsError, setIsError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        setIsError("לא הצליח לחלץ את המידע");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  function ErrorHandler() {
    setIsError(null);
  }

  if (IsError && !IsLoading)
    return <ErrorOverLay message={IsError} onConfirm={ErrorHandler} />;

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    //יוצרים פה תאריך של היום הנוכחי
    const today = new Date();
    //מפעילים פונקציית עזר שמוצאת את התאריך שהיה לפני 7 ימים
    const date7DaysAgo = getDateMinusDays(today, 7);
    //עושים השוואה האם התאריך של ההוצאה גדול יותר מלפני 7 ימים אם כן מחזיר אמת אם לא מחזיר שקר
    return expense.date > date7DaysAgo;
  });

  if (IsLoading) {
    return <LoadingOverLay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="7 ימים אחרונים"
      fallbacktext={"לא היו הוצאות ב 7 הימים האחרונים"}
    />
  );
}

export default RecentExpense;
