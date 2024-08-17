/** @format */

import { FlatList } from "react-native";
import RenderExpense from "./RenderExpense";

function ExpenseList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <RenderExpense itemData={item} />}
    />
  );
}

export default ExpenseList;
