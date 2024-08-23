/** @format */

import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { getAddress } from "../../util/location";
import { Place } from "../../models/Place";

function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setTitle] = useState("");
  const [pickedLocation, setpickedLocation] = useState("");
  const [selectedImage, setselectedImage] = useState("");

  function ChangeTitleHandler(enteredtext) {
    setTitle(enteredtext);
  }

  function SavePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }

  function takeImageHandler(imageUri) {
    setselectedImage(imageUri);
  }
  const takeLocationHandler = useCallback((location) => {
    setpickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>שם המיקום</Text>
        <TextInput
          style={styles.input}
          onChangeText={ChangeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onImageTaken={takeImageHandler} />
      <LocationPicker onPickLocation={takeLocationHandler} />
      <Button onPress={SavePlaceHandler}>הוסף מיקום</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 8,
    marginTop: 36,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
    textAlign: "left",
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },
});
