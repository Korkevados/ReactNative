/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/Colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./screens/PlaceDetails";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  const [fontsLoaded] = useFonts({
    Assistant_ExtraBold: require("./assets/fonts/Assistant/Assistant-ExtraBold.ttf"),
    Assistant_ExtraLight: require("./assets/fonts/Assistant/Assistant-ExtraLight.ttf"),
    paskol: require("./assets/fonts/Assistant/paskol-webfont.ttf"),
    stam: require("./assets/fonts/Assistant/StamSefaradCLM.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Initialize the database
        await init();
        setDbInitialized(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded || !dbInitialized) {
    return null; // This can be replaced with a loading indicator if needed
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "המקומות האהובים עלייך",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon={"add"}
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={({ navigation }) => ({
              title: "הוספת מיקום",
              headerLeft: ({ tintColor }) => (
                <>
                  <IconButton
                    icon={"arrow-forward"}
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.goBack()}
                  />
                  <Text>אחורה</Text>
                </>
              ),
            })}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={({ navigation }) => ({
              title: "הוספת מיקום",
              headerLeft: ({ tintColor }) => (
                <>
                  <IconButton
                    icon={"arrow-forward"}
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.goBack()}
                  />
                  <Text>אחורה</Text>
                </>
              ),
            })}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={({ navigation }) => ({
              title: "הוספת מיקום",
              headerLeft: ({ tintColor }) => (
                <>
                  <IconButton
                    icon={"arrow-forward"}
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.goBack()}
                  />
                  <Text>אחורה</Text>
                </>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  TestText: {
    fontFamily: "Assistant_Regular",
    fontSize: 24,
  },
  TestText1: {
    fontFamily: "SemiBoldr",
    fontSize: 24,
  },
  Regular: {
    fontFamily: "paskol",
    fontSize: 48,
  },
  stam: {
    fontFamily: "stam",
    fontSize: 48,
  },
});
