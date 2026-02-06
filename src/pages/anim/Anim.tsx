import { Animated, Pressable, Text, View } from 'react-native';
import AnimStyle from './css/AnimStyle';
import { useRef } from 'react';

let opacityValue = new Animated.Value(1);      // З метою утворення анімації вводиться 
                                               // Animated.Value - об'єкт, що керує зміною значення
export default function Anim() {               // з ініціалізацією початковим значенням (тут - 1)
                                               // Даний об'єкт (opacityValue) зазначається як 
    const opacityPress = () => {               // стиль спеціалізованого блоку 
        // console.log("Press");                //  <Animated.View style={{opacity: opacityValue}}>
        Animated.timing(opacityValue, {        // в середині якого буде діяти анімація
            toValue: 0.0,                      // Запуск анімації здійснюється командою .start()
            useNativeDriver: true,             // для конфігураційного об'єкта, повернутого 
            duration: 1000,                    // Animated.-функціями, зокрема одиночна анімація
        }).start();                            // конфігурується Animated.timing
    };                                         // Така анімація не зворотня, після "програвання"
                                               // лишається у кінцевому стані

    const opacity2Value = useRef(              // Якщо є потреба інкапсулювати анімаційну величину
        new Animated.Value(1)                  // у функцію віджета, то вживається хук useRef, який
    ).current;                                 // забезпечує постійність посилання
                                               // 
    const opacity2Press = () => {              // 
        Animated.sequence([                    // Послідовність анімацій задається 
            Animated.timing(opacity2Value, {   //  Animated.sequence([ ... ])
                toValue: 0.0,                  // у даному прикладі спочатку здійснюється швидка
                useNativeDriver: true,         // анімація до 0-прозорості, 
                duration: 20,                  // 
            }),                                // 
            Animated.timing(opacity2Value, {   // після чого продовжується більш тривала
                toValue: 1.0,                  // анімація збільшення прозорості до початкового
                useNativeDriver: true,         // стану (1)
                duration: 1000,                // 
            }),                                // 
        ]).start();                            // старт - один раз для всієї послідовності
    };

    const scaleValue = useRef(
        new Animated.Value(1)
    ).current;
    const scalePress = () => {
        Animated.sequence([  
            Animated.timing(scaleValue, {
                toValue: 1.25,
                useNativeDriver: true,
                duration: 300,
            }),
            Animated.timing(scaleValue, {
                toValue: 1.0,
                useNativeDriver: true,
                duration: 300,
            }),
        ]).start();
    };

    const rotateValue = useRef(
        new Animated.Value(0)
    ).current;
    const rotatePress = () => {
        Animated.sequence([  
            Animated.timing(rotateValue, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300,
            }),
            Animated.timing(rotateValue, {
                toValue: 0,
                useNativeDriver: true,
                duration: 300,
            }),
        ]).start();
    };
    const rotateDeg = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],  // Map 0 to 0deg, 1 to 45deg
    });

    const translateValue = useRef(
        new Animated.Value(0)
    ).current;
    const transOpacityValue = useRef(
        new Animated.Value(1)
    ).current;
    const translatePress = () => {
        Animated.parallel([
            Animated.sequence([  
                Animated.timing(translateValue, {
                    toValue: 30,
                    useNativeDriver: true,
                    duration: 300,
                }),
                Animated.timing(translateValue, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 300,
                }),
            ]),
            Animated.sequence([  
                Animated.timing(transOpacityValue, {
                    toValue: 0.25,
                    useNativeDriver: true,
                    duration: 300,
                }),
                Animated.timing(transOpacityValue, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 300,
                }),
            ]),
        ]).start();
    };

    return <View style={AnimStyle.animLayout}>

        <View style={AnimStyle.animRow}>
            <View style={AnimStyle.animItem}>
                <Pressable onPress={opacityPress}>
                    <Animated.View style={{opacity: opacityValue}}>
                        <View style={AnimStyle.animBlock}></View>
                    </Animated.View>                    
                </Pressable>
                <Text style={AnimStyle.animLabel}>Fade out (зникнення)</Text>
            </View>
            
            <View style={AnimStyle.animItem}>
                <Pressable onPress={opacity2Press}>
                    <Animated.View style={{opacity: opacity2Value}}>
                        <View style={AnimStyle.animBlock}></View>
                    </Animated.View>                    
                </Pressable>
                <Text style={AnimStyle.animLabel}>Fade in (поява)</Text>
            </View>
        </View>

        <View style={AnimStyle.animRow}>
            <View style={AnimStyle.animItem}>
                <Pressable onPress={scalePress}>
                    <Animated.View style={{transform: [{scale: scaleValue}]}}>
                        <View style={AnimStyle.animBlock}></View>
                    </Animated.View>                    
                </Pressable>
                <Text style={AnimStyle.animLabel}>Scale (масштаб)</Text>
            </View>

            <View style={AnimStyle.animItem}>
                <Pressable onPress={rotatePress}>
                    <Animated.View style={{transform: [{rotate: rotateDeg}]}}>
                        <View style={AnimStyle.animBlock}></View>
                    </Animated.View>                    
                </Pressable>
                <Text style={AnimStyle.animLabel}>Rotate (поворот)</Text>
            </View>
        </View>
    
        <View style={AnimStyle.animRow}>
            <View style={AnimStyle.animItem}>
                <Pressable onPress={translatePress}>
                    <Animated.View style={{
                        opacity: transOpacityValue,
                        transform: [
                            {translateX: translateValue},
                        ]
                    }}>
                        <View style={AnimStyle.animBlock}></View>
                    </Animated.View>                    
                </Pressable>
                <Text style={AnimStyle.animLabel}>Translate + Fade</Text>
            </View>

            <View style={AnimStyle.animItem}>
                {/* Д.З. Реалізувати усі види анімацій до паралельного виконання:
                    вихідне положення (центр прозорість 0.6) -> 
                     зрушення праворуч і вгору, зменшення масштабу і прозорості (до 0.3), поворот на 30 гр. ->
                    центр ->
                     зрушення ліворуч і вниз, збільшення масштабу і прозорості (до 1.0), поворот на -30 гр. ->
                    центр   */}
            </View>
        </View>
    
    </View>;
}

/*
Анімації. 
Double Animation - різновид анімацій, який дозволяє автоматично перераховувати
зміну числової характеристики та розподіляти її за кадрами розгортки (CSS - transition).
У React Native є обмеження - базова анімація працює тільки з властивостями
прозорості (opacity) та різних видів трансформації (масштаб, перенесення, поворот)

Розширені можливості надають сторонні бібліотеки
*/