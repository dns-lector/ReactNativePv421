import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const HomeStyle = StyleSheet.create({
    homeContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    homeLabel: {
        color: textColor,
        fontSize: 28.0,
    },
    homeImage: {
        width: 50,
        height: 50,
        tintColor: textColor,
        marginLeft: 10.0,
        marginRight: 15.0,
    },
    menuItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems:"center",
        borderColor: textColor,
        borderBlockColor:textColor,
        borderLeftColor:textColor,
        borderRightColor: textColor,
        borderRadius: 10.0,
        borderWidth: 1.0,
        marginHorizontal: 20.0,
        marginVertical: 10.0,
        padding: 10.0,
    },
});

export default HomeStyle;
