
export class ResponseWrapper<T>  {
  constructor(public isSuccess: boolean, public data: T, public message: string) {
  }
}
