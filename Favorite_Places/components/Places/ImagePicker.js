/** @format */
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({ onImageTaken }) {
  const [statusPermission, requestPermission] = useCameraPermissions();
  const [pickedImage, setpickedImage] = useState();
  async function verifyPermissions() {
    if (statusPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (statusPermission.status === PermissionStatus.DENIED) {
      Alert.alert("אין הרשאות צילום", "אנא אשר הרשאות צילום במצלמה");
      return false;
    }
    return true;
  }

  async function takeimagehandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      console.log("No have permissions");
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setpickedImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  }

  let imagePreview = <Text>לא צולמה תמונה עדיין</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeimagehandler} icon={"camera"}>
        העלה תמונה
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
