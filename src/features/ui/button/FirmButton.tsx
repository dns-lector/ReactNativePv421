import { Children } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { textColor } from "../../values/colors";

export const ButtonTypes = {
  primary: 'primary',
  success: 'success',
  danger: 'danger',
} as const;

export type ButtonTypes = typeof ButtonTypes[keyof typeof ButtonTypes];

export function FirmButton({buttonType, title, action, style}:{
    buttonType?:ButtonTypes,
    title: string,
    action?: () => void,
    style?: StyleProp<ViewStyle>
}) {
    if(!buttonType) {
        buttonType = ButtonTypes.primary;
    }
    return <TouchableOpacity onPress={() => { if(action) action(); }}
    style={[styles.firmButton, 
        (buttonType == ButtonTypes.danger ? styles.danger
        :buttonType == ButtonTypes.success ? styles.success
        :styles.primary 
        ), style
    ]}>
        <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    title: {
        color: textColor,
        textAlign: "center"
    },
    firmButton: {
        borderRadius: 7.0,
        borderWidth: 1.0,
        padding: 5.0,
    },
    primary: {
        backgroundColor: "#333",
        borderColor: "#222"
    },
    success: {
        backgroundColor: "#353",
        borderColor: "#242"

    },
    danger: {
        backgroundColor: "#533",
        borderColor: "#422"

    }
});
