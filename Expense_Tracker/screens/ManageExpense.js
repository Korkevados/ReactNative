/** @format */

import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import { ExpensesContext } from "../store/expense_context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { DeleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverLay from "../components/UI/LoadingOverLay";
import ErrorOverLay from "../components/UI/ErrorOverLay";

function ManageExpense({ route, navigation }) {
  const [IsLoading, setIsLoading] = useState(false);
  const [IsError, setIsError] = useState();

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

  async function deleteHandler() {
    setIsLoading(true);
    try {
      await DeleteExpense(editesexpenseId);
      expensesCtx.deleteExpense(editesexpenseId);
      navigation.goBack();
    } catch (error) {
      setIsError("לא הצליח למחוק את המידע");
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmhandler(expenseData) {
    setIsLoading(true);

    if (isEditing) {
      try {
        await updateExpense(editesexpenseId, expenseData);
        expensesCtx.updateExpense(editesexpenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setIsError("לא הצליח לעדכן את ההוצאה");
        setIsLoading(false);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);

        expensesCtx.addExpense({ ...expenseData, id: id });
        navigation.goBack();
      } catch (error) {
        setIsError("לא הצליח להוסיף את ההוצאה");
        setIsLoading(false);
      }
    }
  }

  if (IsError && !IsLoading) {
    return (
      <ErrorOverLay
        message={IsError}
        onConfirm={() => {
          setIsError(null);
        }}
      />
    );
  }

  if (IsLoading) {
    return <LoadingOverLay />;
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
