import {Label, LABELS} from "../models/label";
import {User} from "../models/user";
import {DeletedUser} from "./SampleData";
import {clone} from "./clone";

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

  public static convertDeletedUser<TResult>(object: TResult): TResult{

    //convert label numbers to actual labels

    if(Array.isArray(object))
      object.forEach(o => {
        Converter.convertDeletedUser(o);
      });
    else
      Converter._convertDeletedUser(object);

    return object;
  }

  private static _convertDeletedUser<TResult extends {user?: User, friends?: User[]}>(object: TResult): TResult {
    if(object.user?.username == null) {
      object.user = Converter._convertDeletedUserBase(object.user!);
    }
    for (let i in object.friends) {
      // @ts-ignore
      if(object.friends[i].username == null)
        { // @ts-ignore
          object.friends[i] = Converter._convertDeletedUserBase(object.friends[i]);
        }
    }

    return object;
  }

  private static _convertDeletedUserBase(user: User): User {
    let temp = user?.id
    user = clone(DeletedUser);
    user.id = temp;

    return user;
  }

}
