/** @format */
import { Text, View, StyleSheet, Platform } from "react-native";

function MealDetails({
  duration,
  complexity,
  affordability,
  style,
  textstyle,
}) {
  return (
    <View style={styles.detailedobjects}>
      <Text style={[styles.detailitem, textstyle]}>{duration} m</Text>
      <Text style={[styles.detailitem, textstyle]}>{complexity}</Text>
      <Text style={[styles.detailitem, textstyle]}>{affordability}</Text>
    </View>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  detailedobjects: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailitem: {
    marginHorizontal: 4,
    fontSize: 16,
  },
});
