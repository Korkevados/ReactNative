/** @format */

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/Styles";
import Button from "./Button";

function ErrorOverLay({ message, onConfirm }) {
  return (
    <View style={style.container}>
      <Text style={[style.text, style.title]}>קרתה תקלה</Text>
      <Text style={style.text}>{message}</Text>
      <Button onPress={onConfirm}>אוקיי</Button>
    </View>
  );
}

export default ErrorOverLay;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray700,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {},
});
