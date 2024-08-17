/** @format */

import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ExpensesSummary from "./ExpensesSummary";
import ExpenseList from "./ExpenseList";
import { Title } from "react-native-paper";
import { GlobalStyles } from "../../constants/Styles";

function ExpensesOutput({ period, expenses, fallbacktext }) {
  let content = <Text style={styles.infotext}>{fallbacktext}</Text>;

  if (expenses.length > 0) {
    content = <ExpenseList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infotext: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
