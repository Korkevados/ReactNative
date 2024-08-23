/** @format */

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails, fetchPlaces } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showMapHandler() {
    navigation.navigate("Map", {
      intiallat: fetchedPlace.location.lat,
      intiallng: fetchedPlace.location.lng,
    });
  }
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadplaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      navigation.setOptions({
        title: place.title,
      });
      setFetchedPlace(place);
    }

    loadplaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Data</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.Image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon={"map"} onPress={showMapHandler}>
          הצג במפה
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    alignItems: "center",
  },
  Image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  location: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
