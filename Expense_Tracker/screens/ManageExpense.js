/** @format */

import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title } from "react-native-paper";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/Styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expense_context";

function ManageExpense({ route, navigation }) {
  const editesexpenseId = route.params?.expenseId;

  const expensesCtx = useContext(ExpensesContext);

  const isEditing = !!editesexpenseId;

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
  function confirmhandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editesexpenseId, {
        description: "TEST!!!!!",
        amount: 19.99,
        date: new Date("01-01-1990"),
      });
    } else {
      expensesCtx.addExpense({
        description: "TEST!!!!!Test",
        amount: 1000,
        date: new Date("01-01-2000"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonscontainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          מחק
        </Button>
        <Button style={styles.button} onPress={confirmhandler}>
          {isEditing ? "עדכן" : "צור חדש"}
        </Button>
      </View>
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
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonscontainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
