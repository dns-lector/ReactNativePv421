const CalcOperations = {
  add: 'add',
  sub: 'sub',
  mul: 'mul',
  div: 'div'
} as const;

type CalcOperations = (typeof CalcOperations)[keyof typeof CalcOperations];

export default CalcOperations;