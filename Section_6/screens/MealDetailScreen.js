/** @format */

import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
// import { FavoritesContext } from "../store/context/favorites-contexts";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
function MealDetailScreen({ route, navigation }) {
  // const favoriteContext = useContext(FavoritesContext);

  const favoriteMealids = useSelector((state) => state.favoritesMeals.ids);
  const dispatch = useDispatch();
  const mealId = route.params.id;

  const selectedMeal = MEALS.find((meal) => mealId == meal.id);

  const mealIsfavorite = favoriteMealids.includes(mealId);

  function ChangeFavoriteMeal() {
    if (mealIsfavorite) {
      // favoriteContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
      // favoriteContext.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsfavorite ? "star" : "star-outline"}
            color="white"
            onPress={ChangeFavoriteMeal}
          />
        );
      },
    });
  }, [navigation, ChangeFavoriteMeal]);

  return (
    <ScrollView>
      <View style={styles.rootcontainer}>
        <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.affordability}
          textstyle={styles.detailtext}
        />
        <View style={styles.listOutercontainer}>
          <View style={styles.listcontainer}>
            <Subtitle>Ingridiants</Subtitle>
            <List data={selectedMeal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={selectedMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootcontainer: { marginBottom: 32 },
  listcontainer: { width: "80%", alignContent: "center" },
  detailtext: {
    color: "white",
  },
  listOutercontainer: { alignItems: "center" },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
});
