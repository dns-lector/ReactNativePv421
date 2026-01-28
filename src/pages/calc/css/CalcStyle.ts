import { StyleSheet } from "react-native";
import { textColor } from "../../../features/values/colors";

const CalcStyle = StyleSheet.create({
   calc: {
    flex: 1,
    width: "100%",
    backgroundColor: "#222",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
   },
   expression: {
    flex: 1,
    color: "#bbb",
    textAlign: "right",
    marginTop: 10,
   },
   result: {
    flex: 2,
    color: textColor,
    // fontSize: 50,
    textAlign: "right",
   },
   memoryRow: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
   },
   buttonRow: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
   },
   memoryButton: {
    color: "#bbb",
   },
   // Landscape
   containerResExpMem: {
      flex: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
   },
   containerExpMem: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
   }
});

export default CalcStyle;