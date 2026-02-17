import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import PropTypes from "prop-types";

export function NavigationHeader({ title, subtitle, showBack = true }) {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title,
            headerBackTitle: subtitle,
            headerBackVisible: showBack,
            headerTitleAlign: "center",
            headerStyle: {
                height: 110,
            },
            headerTitleStyle: {
                fontFamily: "MontserratRegular",
                fontSize: 25,
                paddingTop: 10,
                verticalAlign: "buttom",
            },
        });
    }, [navigation, title, subtitle, showBack]);

    return null;
}

NavigationHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showBack: PropTypes.func,
};
