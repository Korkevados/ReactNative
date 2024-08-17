/** @format */

import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function ExpensesSummary({ expenses, period }) {
  const expenseSum = expenses.reduce((curr, expense) => {
    return curr + expense.amount;
  }, 0);

  const formattedAmount = new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  }).format(expenseSum);

  return (
    <View style={styles.rootcontainer}>
      <Text style={styles.period}>{period}</Text>
      <Text style={styles.sum}>{formattedAmount}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  rootcontainer: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    alignItems: "center",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
  },
});
