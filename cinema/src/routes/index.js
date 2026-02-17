import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MoviesTabs } from "../components/MoviesTabs";
import Cinema from "../views/Cinemas";
import CinemaDetails from "../views/CinemaDetails";
import MovieDetails from "../views/MovieDetails";
import MovieIcon from "react-native-vector-icons/FontAwesome5";
import CinemasIcon from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    fontFamily: "MontserratRegular",
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === "Kvikmyndir") {
                        return (
                            <MovieIcon name="film" size={size} color={color} />
                        );
                    } else if (route.name === "Kvikmyndahús") {
                        return (
                            <CinemasIcon
                                name="theater"
                                size={size}
                                color={color}
                            />
                        );
                    }
                    return null;
                },
                tabBarActiveTintColor: "#929ff8",
                headerStyle: {
                    height: 110,
                },
                headerTitleAlign: "center",
                headerTit: "center",
                headerTitleStyle: {
                    fontFamily: "MontserratRegular",
                    verticalAlign: "buttom",
                    paddingTop: 10,
                    fontSize: 25,
                },
            })}
        >
            <Tab.Screen name="Kvikmyndir" component={MoviesTabs} />
            <Tab.Screen name="Kvikmyndahús" component={Cinema} />
        </Tab.Navigator>
    );
};

export const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Default"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="CinemaDetails" component={CinemaDetails} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
    );
};
