import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const ChatStyle = StyleSheet.create({
    chatContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    messagesScroller: {
        // backgroundColor: "lime",
        flex: 1,
    },
    messages: {
        display: "flex",
        flexDirection: "column",

    },
    sendBlock: {
        width: "100%",
        height: 50.0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sendInput: {
        flex: 1,
        color: textColor,
        
    },
    sendButton: {
        width: 42.0,
        height: 42.0,
    },
    sendButtonImg: {
        width: 42.0,
        height: 42.0,
        tintColor: textColor,
    },
    post: {
        borderWidth: 1.0,
        borderColor: "green",
        backgroundColor: "lime",
        borderBottomRightRadius: 10.0,
        borderTopLeftRadius: 10.0,
        borderTopRightRadius: 10.0,
        marginLeft: 10.0,
        marginVertical: 5.0,
        marginRight: 40.0,
        width: "auto",
        alignSelf: "flex-start",
        paddingVertical: 3.0,
        paddingHorizontal: 10.0,
    },
    myPost: {
        borderWidth: 1.0,
        borderTopLeftRadius: 10.0,
        borderTopRightRadius: 10.0,
        borderColor: "darksteelblue",
        backgroundColor: "steelblue",
        borderBottomLeftRadius: 10.0,
        marginLeft: 40.0,
        marginRight: 10.0,
        alignSelf: "flex-end",
        width: "auto",
        marginVertical: 5.0,
        paddingVertical: 3.0,
        paddingHorizontal: 10.0,
    },
});

export default ChatStyle;