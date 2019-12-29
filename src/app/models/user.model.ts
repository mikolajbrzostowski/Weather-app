export class User {
  constructor(
    public uid: string,
    public email: string,
    public password: string,
    public role: string,
    public firstName: string,
    public lastName: string,
    public country: string,
    public city: string
  ) {}

}
