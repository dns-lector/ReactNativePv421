import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "./ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";

const divZeroMessage = "Cannot divide by zero";

export default function Calc() {
    const {width, height} = useWindowDimensions();
    const [result, setResult] = useState<string>("0");  // TODO: поєднати окремі стани до одного об'єкту
    const [expression, setExpression] = useState<string>("");
    const [needClear, setNeedClear] = useState<boolean>(false);    // потреба стерти результат при початку введення (після операцій)
    const [needClrExp, setNeedClrExp] = useState<boolean>(false);  // потреба стерти вираз при початку введення (після операцій)
    const [isError, setError] = useState<boolean>(false);          // чи знаходиться калькулятор в аварійному стані (показ помилки)
    const dotSymbol = ',';
    const minusSymbol = '-';
    const maxDigits = 16;

    const digitClick = (btn:ICalcButtonData) => {
        var res = result;
        console.log(res);
        if(res === "0" || needClear || isError) {
            res = "";
            setNeedClear(false);
            setError(false);
        }
        if(needClrExp) {
            setExpression("");
            setNeedClrExp(false);
        }

        // Обмежити введення 16 (maxDigits) цифрами (саме цифрами, точку та знак (мінус) ігнорувати)
        if(res.replace(dotSymbol, '').replace(minusSymbol, '').length >= maxDigits) return;

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

    const inverseClick = (_:ICalcButtonData) => {
        setExpression(`1/(${result})`);
        var arg = resToNumber();
        if(arg == 0) {
            setResult(divZeroMessage);
            setError(true);
        }
        else {
            setResult( numToResult(1.0 / arg) );
        }        
        setNeedClear(true);
        setNeedClrExp(true);
        // 1. Перевищення кількості цифр 
        // 2. Символ точки (коми) не відповідає dotSymbol
        //  2.2 Через це також не парситься число, введене з комою (dotSymbol)
        // 3. 1/0 ??
        // 4. Натиснення цифрових кнопок дописується до результату 
        // 5. Не заповнюється поле виразу
        // 6. Блокування функціональних кнопок у випадку помилки (коли результат - повідомлення)
    };

    const clearClick = (_:ICalcButtonData) => {
        setResult("0");
        setExpression("");
        setError(false);
    }

    const resToNumber = (): number => {
        var res = result.replace(dotSymbol, '.').replace(minusSymbol, '-');
        return Number(res);
    };

    const numToResult = (num: number): string => {
        var res = num.toString();
        if(num >= 1e-6) {   // <= 9.9e-7 автоматично спрацьовує ехр-форма
            res = res.substring(0, maxDigits + 1);   // +1 - на символ коми
        }
        res = res.replace('.', dotSymbol);   // замінюємо стандарту десятичну точку на dotSymbol
        return res;
    }

    const portraitView = () => <View style={CalcStyle.calc}>
        <Text style={CalcStyle.expression}>{expression}</Text>
        <Text style={[CalcStyle.result, {fontSize: (result.length <= 12 ? 50 : (width - 20) / result.length * 1.8 )}]}>{result}</Text>
        <View style={CalcStyle.memoryRow}>
            <Text style={CalcStyle.memoryButton}>MC</Text>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"％",  buttonType: CalcButtonType.operation, action: (btn:ICalcButtonData) => console.log(btn.text)}}/>
            <CalcButton data={{text:"CE", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"C",  buttonType: CalcButtonType.operation, action: clearClick }}/>
            <CalcButton data={{text:"⌫", buttonType: CalcButtonType.operation, action: backspaceClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1/x", buttonType: isError ? CalcButtonType.disabled : CalcButtonType.operation, action: inverseClick}}/>
            <CalcButton data={{text:"x2",  buttonType: isError ? CalcButtonType.disabled : CalcButtonType.operation}}/>
            <CalcButton data={{text:"Vx",  buttonType: isError ? CalcButtonType.disabled : CalcButtonType.operation}}/>
            <CalcButton data={{text:"÷",   buttonType: isError ? CalcButtonType.disabled : CalcButtonType.operation}}/>
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
                <Text style={CalcStyle.expression}>{expression}</Text>
                <View style={CalcStyle.memoryRow}>
                    <Text style={CalcStyle.memoryButton}>MC</Text>
                </View>
            </View>            
            <Text style={[
                CalcStyle.result, 
                {fontSize: (result.length <= 12 ? 50 : (width - 20) / result.length * 1.8 )}]}>{result}</Text>
        </View>

        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"％",  buttonType: CalcButtonType.operation, action: (btn:ICalcButtonData) => console.log(btn.text)}}/>
            <CalcButton data={{text:"÷", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"7", buttonType: CalcButtonType.digit, action: digitClick    }}/>
            <CalcButton data={{text:"8", buttonType: CalcButtonType.digit, action: digitClick    }}/>
            <CalcButton data={{text:"9", buttonType: CalcButtonType.digit, action: digitClick    }}/>
            <CalcButton data={{text:"C",  buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1/x", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"×", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"4", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"5", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"6", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"CE", buttonType: CalcButtonType.operation}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"x2", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"-", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"1", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"2", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"3", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"⌫", buttonType: CalcButtonType.operation, action: backspaceClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"Vx", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"+", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"+/-", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"0", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:",", buttonType: CalcButtonType.digit, action: dotClick    }}/>
            <CalcButton data={{text:"=", buttonType: CalcButtonType.equal    }}/>
        </View>
    </View>;        
        
    return width < height ? portraitView() : landscapeView();
}
/*
Д.З. Модифікувати стиль для неактивної кнопки - зробити колір тексту менш яскравим. 
Доповнити деактивацією усі кнопки, що цього стосуються.
Внести усі напрацювання до ландшафтного представлення застосунку. 
До репозиторію або окремо до ДЗ додати два скріншоти у двох представленнях. 


Д.З. Реалізувати розділення розрядів цифр при введенні довгих чисел
(пробіл між групами цифр по 3:   12 345 678), можна використати
спец символи Юнікоду - короткі пробіли. 
Скоригувати обмеження - не враховувати пробіли в обмеженні на 
максимальну кількість цифр, що можна набрати. 
Зауважити роботу Backspace, оскільки він перерозподілятиме пробіли
(12 345 678 -> 1 234 567)
*/