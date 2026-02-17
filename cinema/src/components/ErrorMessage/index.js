import { Text } from "react-native";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
    return <Text>{message || "An error occurred. Please try again."}</Text>;
};

export default ErrorMessage;

ErrorMessage.propTypes = {
    message: PropTypes.string,
};
