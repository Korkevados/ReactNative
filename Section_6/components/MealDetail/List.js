/** @format */

import { StyleSheet, View, Text } from "react-native";

function List({ data }) {
  return data.map((datapoint) => (
    <View key={datapoint} style={styles.listitem}>
      <Text style={styles.itemtext}>{datapoint}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  listitem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#dd9446",
  },
  itemtext: {
    color: "#291a09",
    textAlign: "center",
  },
});
