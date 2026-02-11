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
    titleBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 50.0,
    },
    titleSearch: {
        flex: 1,
    },
    titleSearchImg: {

    },
    titleSearchInput: {

    },
    rateText: {
        color: textColor,
        flex: 1,
    },
    titleDate: {
        flex: 1,
    },
    titleDateText: {

    },
});

export default RatesStyle;
