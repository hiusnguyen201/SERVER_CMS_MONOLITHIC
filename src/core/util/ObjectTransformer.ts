export class ObjectTransformer {
  public static removeUndefinedValues(obj: object): object {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
  }
}
