/** @format */

import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MealDetails from "./MealDetails";

function MealItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
  onPress,
}) {
  const navigation = useNavigation();

  function SelectMealHandler() {
    navigation.navigate("MealDetail", {
      id: id,
      title: title,
      imageUrl: imageUrl,
      duration: duration,
      complexity: complexity,
      affordability: affordability,
    });
  }

  return (
    <View style={styles.mealitem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonpressed : null)}
        onPress={SelectMealHandler}>
        <View style={styles.innercontainer}>
          <View>
            <Image style={styles.Image} source={{ uri: imageUrl }} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  innercontainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  mealitem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    backgroundColor: "white",
  },
  Image: {
    width: "100%",
    height: 200,
  },
  buttonpressed: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },
  detailedobjects: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailitem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
