import React, { useEffect } from "react";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StackNavigator } from "./src/routes";

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [loaded, error] = useFonts({
        MontserratRegular: require("./assets/fonts/MontserratRegular.ttf"),
        MontserratSemiBold: require("./assets/fonts/MontserratSemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <StoreProvider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </GestureHandlerRootView>
        </StoreProvider>
    );
};

export default App;
