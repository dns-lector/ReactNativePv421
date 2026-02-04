import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const AnimStyle = StyleSheet.create({
    animLayout: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 5.0,
    },
    animRow: {        
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    animItem: {
        flex: 1,
        margin: 5.0,
        backgroundColor: "#454545",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    animBlock: {
        width: 100.0,
        height: 100.0,
        backgroundColor: "#888",
    },
    animLabel: {
        color: textColor
    }
});

export default AnimStyle;