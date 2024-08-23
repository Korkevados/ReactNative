/** @format */

import { Image, Platform, StyleSheet, Text, View } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/Colors";
import { useEffect, useMemo, useState, useCallback } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermission, requestPermission] = useForegroundPermissions();

  const mapPickedLocation = useCallback(
    route.params && {
      lat: route.params.latitude,
      lng: route.params.longitude,
    },
    [route.params]
  );

  useEffect(() => {
    async function handleAddress() {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation);
        onPickLocation({ ...pickedLocation, address: address });
      }
    }
    handleAddress();
  }, [pickedLocation, onPickLocation]);

  useEffect(() => {
    mapPickedLocation && setPickedLocation(mapPickedLocation);
  }, [mapPickedLocation]);

  async function verifyPermissions() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionresponse = await requestPermission();

      return permissionresponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert("אין הרשאות מיקום", "אנא אשר הרשאות מיקום");
      return false;
    }
    return true;
  }

  async function getLoactionHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>לא נבחר מיקום עדיין</Text>;

  if (pickedLocation) {
    let imgurl = "";
    if (Platform.OS === "ios") {
      imgurl = decodeURIComponent(
        getMapPreview(pickedLocation.lat, pickedLocation.lng)
      );
    } else {
      imgurl = getMapPreview(pickedLocation.lat, pickedLocation.lng);
    }

    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: imgurl,
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLoactionHandler}>
          לחץ לקבלת מיקום
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          לבחירת מיקום מהמפה
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
