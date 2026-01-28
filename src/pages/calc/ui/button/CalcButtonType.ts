const CalcButtonType = {
  digit: 'digit',
  operation: 'operation',
  equal: 'equal',
  disabled: "disabled"
} as const;

type CalcButtonType = (typeof CalcButtonType)[keyof typeof CalcButtonType];

export default CalcButtonType;