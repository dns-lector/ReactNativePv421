import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const AuthStyle = StyleSheet.create({
    authContainer: {
        flex: 1,
        width: "100%",
        paddingTop: 30,
    },
    authRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30.0,
        marginVertical: 7.0,
    },
    authRowText: {
        color: textColor,
        flex: 1,
    },
    authRowInput: {
        borderWidth: 1.0,
        borderColor: textColor,
        borderRadius: 5.0,
        flex: 3,
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
        color: textColor,
        textAlign: "center",
    }
});

export default AuthStyle;
