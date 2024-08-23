/** @format */

import { FlatList, StyleSheet, Text, View, ViewBase } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate("PlaceDetails", { placeId: id });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackcontainer}>
        <Text style={styles.fallbackText}>לא התווספו מקומות חדשים עדיין</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontFamily: "Assistant_ExtraLight",
    fontSize: 24,
    color: Colors.primary200,
  },
});
