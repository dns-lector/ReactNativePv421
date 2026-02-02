import { GestureResponderEvent, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./css/SwipeStyle";

var startEvent:GestureResponderEvent|null = null;
const minSwipeLength = 100;    // dip
const minSwipeVelocity = 0.2;  // 100 dip / 500 ms

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const shortSide = Math.min(width, height);
    const fieldSide = 0.94 * shortSide;  // 94% від найменшого розміру
    const containerDirection = width < height ? "column" : "row";

    const beginGesture = (e:GestureResponderEvent) => {
        startEvent = e;
    };
    const endGesture = (e:GestureResponderEvent) => {
        if(startEvent != null) {
            const dx = e.nativeEvent.pageX - startEvent.nativeEvent.pageX;
            const dy = e.nativeEvent.pageY - startEvent.nativeEvent.pageY;
            const dt = e.nativeEvent.timestamp - startEvent.nativeEvent.timestamp;
            if(Math.abs(dx) > 2 * Math.abs(dy)) {   // horizontal
                if(Math.abs(dx) / dt > minSwipeVelocity && Math.abs(dx) > minSwipeLength) {
                    console.log("Horizontal")
                }
                else {
                    console.log("Horizontal but limited")
                }
            }
            else if(Math.abs(dy) > 2 * Math.abs(dx)) {  // vertical
                if(Math.abs(dy) / dt > minSwipeVelocity && Math.abs(dy) > minSwipeLength) {
                    console.log("Vertical")
                }
                else {
                    console.log("Vertical but limited")
                }
            }
            else {  // not sure -- diagonal
                console.log("not sure -- diagonal")
            }
            console.log(dx,dy,dt);
            startEvent = null;
        }
    };

    return <View style={[SwipeStyle.swipeContainer, {flexDirection: containerDirection}]}>

        <Text style={SwipeStyle.swipeTitle}>Swipe</Text>

        <TouchableWithoutFeedback
            onPressIn={beginGesture}
            onPressOut={endGesture}>
                <View style={[SwipeStyle.swipeField, {width: fieldSide, height: fieldSide}]}>
                </View>
        </TouchableWithoutFeedback>

        <View />

    </View>;
}
/*
Детектування свайпів зазвичай здійснюється з кількома обмеженнями:
- довжина проведення має бути більше граничної величини
- швидкість проведення має бути більше граничної величини (або час меншим)
- напрям свайпу має надійно визначатись (далекий від діагоналі)

Д.З. Реалізувати детектування діагональних жестів (свайпів):
розділити "головну діагональ" (лівий верх - правий низ) 
та "антидіагональ" (у термінології матриць).
До звіту додати скріншот або відеозапис консолі
*/