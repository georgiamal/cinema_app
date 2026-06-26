import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Movies } from "../../Views/Movies";
import { UpcomingMovies } from "../../Views/UpcomingMovies";

const TopTab = createMaterialTopTabNavigator();

export const MoviesTabs = () => {
    return (
        <TopTab.Navigator
            initialRouteName="ShowingMovies"
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: "MontserratRegular",
                    fontSize: 14,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: "#929ff8",
                },
                tabBarStyle: {
                    backgroundColor: "#f8f8f8",
                },
            }}
        >
            <TopTab.Screen
                name="ShowingMovies"
                component={Movies}
                options={{ tabBarLabel: "Í sýningu" }}
            />
            <TopTab.Screen
                name="UpcomingMovies"
                component={UpcomingMovies}
                options={{ tabBarLabel: "Væntanlegar" }}
            />
        </TopTab.Navigator>
    );
};
