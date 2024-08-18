/** @format */

import { TextInput, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/Styles";

function Input({ label, style, textinputconfig, invalid }) {
  const inputstyles = [styles.input];
  if (textinputconfig && textinputconfig.multiline) {
    inputstyles.push(styles.inputmultiline);
  }
  if (invalid) {
    inputstyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputcontainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidlabel]}>
        {label}
      </Text>
      <TextInput style={inputstyles} {...textinputconfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  inputcontainer: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    textAlign: "left",
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
    textAlign: "right",
  },
  inputmultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidlabel: { color: GlobalStyles.colors.error500 },
  invalidInput: { backgroundColor: GlobalStyles.colors.error50 },
});
