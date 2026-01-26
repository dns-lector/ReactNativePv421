import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "./ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";

export default function Calc() {
    const {width, height} = useWindowDimensions();
    const [result, setResult] = useState<string>("0");
    const [expression, setExpression] = useState<string>("");
    const dotSymbol = ',';
    const minusSymbol = '-';

    const digitClick = (btn:ICalcButtonData) => {
        // Обмежити введення 16 цифрами (саме цифрами, точку та знак (мінус) ігнорувати)
        if(result.replace(dotSymbol, '').replace(minusSymbol, '').length >= 16) return;

        var res = result;
        console.log(res);
        if(res === "0") {
            res = "";
        }
        setResult(res + btn.text);
    };

    const backspaceClick = (_:ICalcButtonData) => {
        if(result.length > 1) {
            setResult(result.substring(0, result.length - 1));
        }
        else {
            setResult("0");
        }
    }

    const dotClick = (btn:ICalcButtonData) => {
        // десятична кома (точка):
        // якщо на рез. "0", то він не стирається, буде "0,"
        // якщо у рез. вже є кома, то натиснення ігнорується
        // Символ коми відповідає тексту на кнопці
        if(!result.includes(btn.text)) {
            setResult(result + btn.text);
        }
    };

    const portraitView = () => <View style={CalcStyle.calc}>
        <Text style={CalcStyle.expression}>{expression}</Text>
        <Text style={[CalcStyle.result, {fontSize: (result.length <= 12 ? 50 : (width - 20) / result.length * 1.8 )}]}>{result}</Text>
        <View style={CalcStyle.memoryRow}>
            <Text style={CalcStyle.memoryButton}>MC</Text>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"％",  buttonType: CalcButtonType.operation, action: (btn:ICalcButtonData) => console.log(btn.text)}}/>
            <CalcButton data={{text:"CE", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"C",  buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"⌫", buttonType: CalcButtonType.operation, action: backspaceClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1/x", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"x2", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"Vx", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"÷", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"7", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"8", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"9", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"×", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"4", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"5", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"6", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"-", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"2", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"3", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"+", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"+/-", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"0", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:dotSymbol, buttonType: CalcButtonType.digit, action: dotClick }}/>
            <CalcButton data={{text:"=", buttonType: CalcButtonType.equal    }}/>
        </View>
    </View>;

    const landscapeView = () => <View style={CalcStyle.calc}>
        <View style={CalcStyle.containerResExpMem}>
            <View style={CalcStyle.containerExpMem}>
                <Text style={CalcStyle.expression}>3 - 9 =</Text>
                <View style={CalcStyle.memoryRow}>
                    <Text style={CalcStyle.memoryButton}>MC</Text>
                </View>
            </View>            
            <Text style={CalcStyle.result}>-6</Text>
        </View>

        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"％",  buttonType: CalcButtonType.operation, action: (btn:ICalcButtonData) => console.log(btn.text)}}/>
            <CalcButton data={{text:"÷", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"7", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"8", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"9", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"C",  buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1/x", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"×", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"4", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"5", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"6", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"CE", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"x2", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"-", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"1", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"2", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"3", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"⌫", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"Vx", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"+", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"+/-", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"0", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:",", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"=", buttonType: CalcButtonType.equal    }}/>
        </View>
    </View>;        
        
    return width < height ? portraitView() : landscapeView();
}
/*
Д.З. Реалізувати розділення розрядів цифр при введенні довгих чисел
(пробіл між групами цифр по 3:   12 345 678), можна використати
спец символи Юнікоду - короткі пробіли. 
Скоригувати обмеження - не враховувати пробіли в обмеженні на 
максимальну кількість цифр, що можна набрати. 
Зауважити роботу Backspace, оскільки він перерозподілятиме пробіли
(12 345 678 -> 1 234 567)
*/