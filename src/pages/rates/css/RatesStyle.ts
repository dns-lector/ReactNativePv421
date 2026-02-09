import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const RatesStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageTitle: {
        color:  textColor,
        width: "100%",
        textAlign: "center",
    },
    rateView: {
        margin: 5.0,
        padding: 5.0,
        borderColor: "#888",
        borderWidth: 1.0,
        borderRadius: 5.0,
        backgroundColor: "#333",
    },
    rateText: {
        color: textColor,
    },
});

export default RatesStyle;
