/** @format */

import { StyleSheet, View, Text } from "react-native";
import MealList from "../components/MealList/MealList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorites-contexts";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavoritesScreen() {
  const favoritesMealsContext = useContext(FavoritesContext);

  const favoriteMealids = useSelector((state) => state.favoritesMeals.ids);

  const favoritemeals = MEALS.filter((meal) =>
    favoriteMealids.includes(meal.id)
  );

  if (favoriteMealids.length === 0) {
    return (
      <View style={styles.rootcontainer}>
        <Text style={styles.text}>לא בחרת עדיין ארוחות מועדפות</Text>
      </View>
    );
  }
  return <MealList items={favoritemeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
