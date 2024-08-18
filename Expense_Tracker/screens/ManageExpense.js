/** @format */

import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expense_context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const editesexpenseId = route.params?.expenseId;

  const expensesCtx = useContext(ExpensesContext);

  const isEditing = !!editesexpenseId;

  const selectesexpense = expensesCtx.expenses.find(
    (expense) => expense.id === editesexpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "ערוך הוצאה" : "הוסף הוצאה",
    });
  }, [navigation, isEditing]);

  function deleteHandler() {
    expensesCtx.deleteExpense(editesexpenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmhandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editesexpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValue={selectesexpense}
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmhandler}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            iconname={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
