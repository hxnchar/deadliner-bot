interface IOffsetItem {
  value: number,
  maxValue?: number,
  nextIncrease?: string,
  inputting: boolean,
}

interface IOffset {
  target: {
    years: IOffsetItem,
    months: IOffsetItem,
    weeks: IOffsetItem,
    days: IOffsetItem,
    hours: IOffsetItem,
    minutes: IOffsetItem,
    seconds: IOffsetItem,
  }
}

export { IOffset, IOffsetItem };
