export class Coupon {
  constructor(
    // id
    private _id: number,
    // クーポン名
    private _name: string
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }
}
