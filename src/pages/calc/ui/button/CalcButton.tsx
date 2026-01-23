import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { textColor } from "../../../../features/values/colors";
import ICalcButtonData from "./ICalcButtonData";
import CalcButtonType from "./CalcButtonType";

export default function CalcButton({data}:{data:ICalcButtonData}) {
    return <TouchableOpacity 
        onPress={() => { if(data.action) data.action(data) }} 
        style={[
            styles.calcButton,
            ( data.buttonType == CalcButtonType.digit ? styles.digitButton
            : data.buttonType == CalcButtonType.operation ? styles.operButton
            : styles.equalButton
            )]}>
        <Text style={styles.calcButtonText}>{data.text}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    calcButton: {
        flex: 1,
        margin: 1.5,
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    calcButtonText: {
        color: textColor,
        fontSize: 18,
    },
    digitButton: {
        backgroundColor: "#3a3a3a",

    },
    operButton: {
        backgroundColor: "#333",

    },
    equalButton: {
        backgroundColor: "#4e97f1",

    }
});