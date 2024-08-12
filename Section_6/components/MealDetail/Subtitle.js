/** @format */
import { View, Text, StyleSheet } from "react-native";
function Subtitle({ children }) {
  return (
    <View style={styles.subtitlecontainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    color: "#dd9446",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitlecontainer: {
    margin: 4,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: "#dd9446",
    borderBottomWidth: 2,
  },
});
