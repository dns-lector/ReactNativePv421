import CalcButtonType from "./CalcButtonType";

export default interface ICalcButtonData {
    text: string,
    buttonType: CalcButtonType,
    action?: (data:ICalcButtonData) => void,  // TODO: remove "?" for production
};
