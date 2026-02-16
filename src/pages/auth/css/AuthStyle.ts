import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const AuthStyle = StyleSheet.create({
    authContainer: {
        flex: 1,
        width: "100%",
        paddingTop: 10,
    },
    pageSwitch: {        
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10.0,
        paddingBottom: 20,
    },
    pageSwitchButton: {
        flex: 1, 
        marginHorizontal: 10.0,
    },
    authRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 10.0,
        marginRight: 20.0,
        marginVertical: 7.0,
    },
    authRowText: {
        color: textColor,
        flex: 2,
    },
    authRowInput: {
        borderWidth: 1.0,
        borderColor: textColor,
        borderRadius: 5.0,
        flex: 5,
        color: textColor,
        paddingHorizontal: 5.0,
        paddingVertical: 10.0,
        minHeight: 42.0,
    },
    authButton: {
        borderWidth: 1.0,
        borderColor: textColor,
        borderRadius: 5.0,
        marginHorizontal: "25%",
        marginTop: 20.0,
        padding: 10.0,
        backgroundColor: "#333",
    },
    authButtonText: {
        // color: textColor,
        textAlign: "center",
    }
});

export default AuthStyle;
