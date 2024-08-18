/** @format */

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import Input from "./Input";
import { useState } from "react";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
import Button from "../../components/UI/Button";
import { GlobalStyles } from "../../constants/Styles";

function ExpenseForn({ onCancel, isEditing, onSubmit, defaultValue }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? defaultValue.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: amountIsValid },
          date: { value: currentInput.date.value, isValid: dateIsValid },
          description: {
            value: currentInput.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const fromIsValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.form_style}>
        <Text style={styles.title}>ההוצאה שלך</Text>
        <View style={styles.amount_date_container}>
          <Input
            style={styles.row_input_style}
            invalid={!inputs.amount.isValid}
            label="מחיר"
            textinputconfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangeHandler.bind(this, "amount"),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={styles.row_input_style}
            invalid={!inputs.date.isValid}
            label="תאריך"
            textinputconfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangeHandler.bind(this, "date"),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label="תיאור"
          invalid={!inputs.description.isValid}
          textinputconfig={{
            multiline: true,
            // autoCorrect: false,
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        {fromIsValid && (
          <Text style={styles.errortext}>
            "הכנסת נתונים שגויים אנא בדוק את מה שהכנסת"
          </Text>
        )}
        <View style={styles.buttonscontainer}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            מחק
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {isEditing ? "עדכן" : "צור חדש"}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ExpenseForn;

const styles = StyleSheet.create({
  form_style: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  amount_date_container: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  row_input_style: {
    flex: 1,
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
  errortext: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
