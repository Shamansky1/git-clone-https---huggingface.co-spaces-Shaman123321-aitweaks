export default class EQ3Mock {
  constructor() {
    this.lowFrequency = { value: 0 };
    this.highFrequency = { value: 0 };
    this.low = { value: 0 };
    this.mid = { value: 0 };
    this.high = { value: 0 };
    this.toDestination = () => this;
  }
}
