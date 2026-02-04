import { GestureResponderEvent, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./css/SwipeStyle";
import { useState } from "react";

var startEvent:GestureResponderEvent|null = null;
const minSwipeLength = 100;    // dip
const minSwipeVelocity = 0.2;  // 100 dip / 500 ms

interface ISwipeData {
    eventDetails: string,
    eventMessage: string
};

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const [data, setData] = useState<ISwipeData>({
        eventDetails: "",
        eventMessage: ""
    });

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
                    if(dx > 0) {   // e1.x ----------> e2.x   =>  dx > 0 
                        data.eventMessage = "Right";
                    }
                    else {
                        data.eventMessage = "Left";
                    }
                }
                else {
                    data.eventMessage = "Horizontal but limited";
                }
            }
            else if(Math.abs(dy) > 2 * Math.abs(dx)) {  // vertical
                if(Math.abs(dy) / dt > minSwipeVelocity && Math.abs(dy) > minSwipeLength) {
                    if(dy > 0) {
                        data.eventMessage = "Bottom";
                    }
                    else {
                        data.eventMessage = "Top";
                    }                    
                }
                else {
                    data.eventMessage = "Vertical but limited";
                }
            }
            else {  // not sure -- diagonal
                data.eventMessage = "not sure -- diagonal";
            }
            setData({...data,
                eventDetails: `dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}, dt=${dt}`
            });
            startEvent = null;
        }
    };

    return <View style={[SwipeStyle.swipeContainer, {flexDirection: containerDirection}]}>

        <Text style={SwipeStyle.swipeTitle}>Swipe {data.eventMessage}</Text>

        <TouchableWithoutFeedback
            onPressIn={beginGesture}
            onPressOut={endGesture}>
                <View style={[SwipeStyle.swipeField, {width: fieldSide, height: fieldSide}]}>
                </View>
        </TouchableWithoutFeedback>

        <Text style={SwipeStyle.swipeTitle}>{data.eventDetails}</Text>

    </View>;
}
/*
Детектування свайпів зазвичай здійснюється з кількома обмеженнями:
- довжина проведення має бути більше граничної величини
- швидкість проведення має бути більше граничної величини (або час меншим)
- напрям свайпу має надійно визначатись (далекий від діагоналі)

Д.З. Реалізувати детектування діагональних жестів (свайпів):
додатково до попереднього ДЗ розділити жести на 4 типи - за кутом,
до якого вони спрямовані
*/