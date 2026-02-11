import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const RatesStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    rateView: {
        margin: 2.0,
        padding: 7.0,
        borderColor: "#888",
        borderWidth: 1.0,
        borderRadius: 5.0,
        backgroundColor: "#333",
    },
    rateText: {
        color: textColor,
        flex: 1,
    },
    titleBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        width: "100%",
        height: 40.0,
    },
    titleSearch: {
        flex: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#888",
        borderWidth: 1.0,
        borderRadius: 5.0,
        backgroundColor: "#333",
    },
    titleSearchImg: {
        tintColor: textColor,
        height: 16.0,
        width: 16.0,
        marginLeft: 5.0,
    },
    titleSearchInput: {
        flex: 1,
        color: textColor,
    },    
    pageTitle: {
        flex: 3,
        backgroundColor: "#333",
    },
    pageTitleText: {
        color:  textColor,
        textAlign: "center",
        marginTop: 9.0
    },
    titleDate: {
        flex: 2,
        borderColor: "#888",
        borderWidth: 1.0,
        borderRadius: 5.0,
        backgroundColor: "#333",
    },
    titleDateText: {
        color: textColor,
        textAlign: "center",
        marginTop: 9.0
    },
});

export default RatesStyle;
