import { View, ActivityIndicator } from "react-native";

const LoadingSpinner = () => {
    return (
        <View>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default LoadingSpinner;
