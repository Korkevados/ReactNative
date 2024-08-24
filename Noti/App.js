/** @format */

import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  const [pushToken, setPushTokn] = useState("");
  useEffect(() => {
    requestPermissionsAsync();
    const token = Notifications.getExpoPushTokenAsync().then(
      (pushTokendata) => {
        console.log(pushTokendata);
      }
    );
    // setPushTokn(token);
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(JSON.stringify(notification, null, 2));
      }
    );
    return () => {
      subscription.remove();
    };
  }, []);

  function scheduleNotifacationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "הנוטיפקציה הראשונה שלי",
        body: "זה גוף ההודעה",
        data: { username: "Dani" },
      },
      trigger: null,
    });
  }

  return (
    <View style={styles.container}>
      <Text>
        <Button
          title="Schedule notifactions"
          onPress={scheduleNotifacationHandler}
        />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
