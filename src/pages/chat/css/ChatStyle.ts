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
        backgroundColor: "lime",
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
    }
});

export default ChatStyle;