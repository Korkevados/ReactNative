/** @format */

import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const intialLocation = route.params && {
    latitude: route.params.intiallat,
    longitude: route.params.intiallng,
  };

  const [selectedLocation, setLoacatedLocation] = useState(intialLocation);

  const region = {
    latitude: intialLocation ? intialLocation.latitude : 31.0461,
    longitude: intialLocation ? intialLocation.longitude : 34.8516,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function SelectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setLoacatedLocation({ latitude: lat, longitude: lng });
  }

  const SavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("לא נבחר מיקום", "אנא בחר מיקום מהמפה");
      return;
    }
    navigation.navigate("AddPlace", {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (intialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={SavePickedLocation}
        />
      ),
    });
  }, [navigation, SavePickedLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={SelectLocationHandler}>
      {selectedLocation && (
        <Marker title="מיקום נבחר" coordinate={selectedLocation} />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
