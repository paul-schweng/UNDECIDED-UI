import {Label, LABELS} from "../models/label";

export class Converter {

  public static convertLabel<TResult>(object: TResult): TResult{

    //convert label numbers to actual labels

    if(Array.isArray(object))
      object.forEach(o => {
        Converter.convertLabel(o);
      });
    else
      Converter._convertLabel(object);

    return object;
  }

  private static _convertLabel<TResult extends {labels?: number[], labelList?: Label[]}>(object: TResult): TResult {
    object.labelList = object.labels?.flatMap((i: number) => LABELS.find(label => label.id == i) || [] ) || [];
    object.labelList?.sort((label1: Label, label2: Label) => label1.id - label2.id);
    delete object['labels'];
    return object;
  }

}
