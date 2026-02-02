import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "./ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";
import CalcOperations from "./model/CalcOperations";

const divZeroMessage = "Cannot divide by zero";
const dotSymbol = ',';
const minusSymbol = '-';
const addSymbol = '+';
const divSymbol = '÷';
const mulSymbol = '×';
const subSymbol = '-';
const maxDigits = 16;

interface ICalcState {
    result: string,                           // вміст основного поля калькулятора - "екрану"
    expression: string,                       // вираз, що формується вище "результату"
    needClearResult: boolean,                 // потреба стерти результат при початку введення (після операцій)                    
    needClearExpression: boolean,             // потреба стерти вираз при початку введення (після операцій)                 
    isError: boolean,                         // чи знаходиться калькулятор в аварійному стані (показ помилки)    
    operation?: CalcOperations | undefined,   // операція, що була натиснена (+/-/*...)
    prevArgument?: number | undefined,        // аргумент, що був перед натисненням операції
};

const initialState:ICalcState = {
    result: "0",
    expression: "",
    needClearResult: false,        
    needClearExpression: false,
    isError: false,    
};

export default function Calc() {
    const {width, height} = useWindowDimensions();
    const [calcState, setCalcState] = useState<ICalcState>(initialState);

    const operationClick = (btn:ICalcButtonData) => {
        const newState:ICalcState = {...calcState,
            needClearResult: true,
            needClearExpression: false,
            operation: 
                btn.text == divSymbol ? CalcOperations.div
                : btn.text == mulSymbol ? CalcOperations.mul
                : btn.text == addSymbol ? CalcOperations.add
                : btn.text == subSymbol ? CalcOperations.sub
                : undefined,
        };
        if(calcState.operation) {   // повторне натискання -- є попередня невиконана операція, слід обчислити
            const prevResult = doOperationWithState();
            const res = numToResult(prevResult);
            newState.expression = res + ' ' + btn.text;
            newState.result = res;
            newState.prevArgument = prevResult;
        }
        else {
            newState.expression = calcState.result + ' ' + btn.text;
            newState.prevArgument = resToNumber();
        }
        setCalcState(newState);
    };

    const equalClick = (_:ICalcButtonData) => {
        if(calcState.operation) {
            setCalcState({...calcState,
                expression: calcState.expression + ' ' + calcState.result + ' =',
                needClearResult: true,
                needClearExpression: true,
                prevArgument: undefined,
                operation: undefined,
                result: numToResult( doOperationWithState() ),
            });
        }
    };

    const doOperationWithState = ():number => {
        const arg = resToNumber();
        return calcState.operation == CalcOperations.div ? calcState.prevArgument! / arg 
            :  calcState.operation == CalcOperations.mul ? calcState.prevArgument! * arg 
            :  calcState.operation == CalcOperations.add ? calcState.prevArgument! + arg 
            :  calcState.operation == CalcOperations.sub ? calcState.prevArgument! - arg 
            :  Number.NaN
    };

    const digitClick = (btn:ICalcButtonData) => {
        var res = calcState.result;
        if(res === "0" || calcState.needClearResult || calcState.isError) {
            res = "";
            calcState.needClearResult = false;
            calcState.isError = false;
        }
        if(calcState.needClearExpression) {
            calcState.needClearExpression = false;
            calcState.expression = "";
        }

        // Обмежити введення 16 (maxDigits) цифрами (саме цифрами, точку та знак (мінус) ігнорувати)
        if(res.replace(dotSymbol, '').replace(minusSymbol, '').length >= maxDigits) return;

        setCalcState({...calcState, result: res + btn.text});
    };

    const backspaceClick = (_:ICalcButtonData) => {
        // setCalcState({...calcState, 
        //     result: calcState.result.length > 1
        //     ? calcState.result.substring(0, calcState.result.length - 1)
        //     : "0"
        // });
        setCalcState(prevState => {
            if(prevState.needClearExpression) {
                prevState.needClearExpression = false;
                prevState.expression = "";
            }
            if(prevState.needClearResult) {
                prevState.needClearResult = false;
                prevState.result = "0";
            }
            else {
                prevState.result = calcState.result.length > 1
                 ? calcState.result.substring(0, calcState.result.length - 1)
                 : "0"
            }
            return {...prevState};
        });
    }

    const dotClick = (btn:ICalcButtonData) => {
        // десятична кома (точка):
        // якщо на рез. "0", то він не стирається, буде "0,"
        // якщо у рез. вже є кома, то натиснення ігнорується
        // Символ коми відповідає тексту на кнопці
        const newState = {...calcState};

        if(calcState.needClearExpression) {
            newState.expression = "";
            newState.needClearExpression = false;
        }

        if(calcState.needClearResult) {
            newState.result = "0" + dotSymbol;
            newState.needClearResult = false;
        }
        else if(! calcState.result.includes(btn.text)) {
            newState.result = calcState.result + btn.text;
        }
        setCalcState(newState);
    };

    const inverseClick = (_:ICalcButtonData) => {
        var arg = resToNumber();
        setCalcState({...calcState, 
            expression: `1/(${calcState.result})`,
            needClearExpression: true,
            needClearResult: true,
            isError: arg == 0,
            result: arg == 0
                ? divZeroMessage
                : numToResult(1.0 / arg)
        });
        // 1. Перевищення кількості цифр 
        // 2. Символ точки (коми) не відповідає dotSymbol
        //  2.2 Через це також не парситься число, введене з комою (dotSymbol)
        // 3. 1/0 ??
        // 4. Натиснення цифрових кнопок дописується до результату 
        // 5. Не заповнюється поле виразу
        // 6. Блокування функціональних кнопок у випадку помилки (коли результат - повідомлення)
    };

    const clearClick = (_:ICalcButtonData) => {
        setCalcState({...calcState, 
            expression: "",
            isError: false,
            result: "0",
            operation: undefined,
            prevArgument: undefined
        });
    }

    const resToNumber = (): number => {
        var res = calcState.result.replace(dotSymbol, '.').replace(minusSymbol, '-');
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
        <Text style={CalcStyle.expression}>{calcState.expression}</Text>
        <Text style={[CalcStyle.result, {fontSize: (calcState.result.length <= 12 ? 50 : (width - 20) / calcState.result.length * 1.8 )}]}>{calcState.result}</Text>
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
            <CalcButton data={{text:"1/x", buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: inverseClick}}/>
            <CalcButton data={{text:"x2",  buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation}}/>
            <CalcButton data={{text:"Vx",  buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation}}/>
            <CalcButton data={{text:divSymbol,   buttonType: calcState.isError ? CalcButtonType.disabled : CalcButtonType.operation, action: operationClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"7", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"8", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"9", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:mulSymbol, buttonType: CalcButtonType.operation, action: operationClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"4", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"5", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"6", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:subSymbol, buttonType: CalcButtonType.operation, action: operationClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"1", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"2", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"3", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:addSymbol, buttonType: CalcButtonType.operation, action: operationClick}}/>
        </View>
        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"+/-", buttonType: CalcButtonType.digit    }}/>
            <CalcButton data={{text:"0", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:dotSymbol, buttonType: CalcButtonType.digit, action: dotClick }}/>
            <CalcButton data={{text:"=", buttonType: CalcButtonType.equal, action: equalClick }}/>
        </View>
    </View>;

    const landscapeView = () => <View style={CalcStyle.calc}>
        <View style={CalcStyle.containerResExpMem}>
            <View style={CalcStyle.containerExpMem}>
                <Text style={CalcStyle.expression}>{calcState.expression}</Text>
                <View style={CalcStyle.memoryRow}>
                    <Text style={CalcStyle.memoryButton}>MC</Text>
                </View>
            </View>            
            <Text style={[
                CalcStyle.result, 
                {fontSize: (calcState.result.length <= 12 ? 50 : (width - 20) / calcState.result.length * 1.8 )}]}>{calcState.result}</Text>
        </View>

        <View style={CalcStyle.buttonRow}>
            <CalcButton data={{text:"％",  buttonType: CalcButtonType.operation, action: (btn:ICalcButtonData) => console.log(btn.text)}}/>
            <CalcButton data={{text:"÷", buttonType: CalcButtonType.operation}}/>
            <CalcButton data={{text:"7", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"8", buttonType: CalcButtonType.digit, action: digitClick }}/>
            <CalcButton data={{text:"9", buttonType: CalcButtonType.digit, action: digitClick }}/>
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

Д.З. Завершити проєкт "Калькулятор"
*/