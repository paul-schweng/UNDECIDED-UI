import {Subject} from "rxjs";

export abstract class Publisher<T> {

  protected _state: Subject<T> = new Subject<T>();

  set state(user: any) {
    this._state.next(user);
  }

  get state() {
    return this._state.asObservable();
  }

}
