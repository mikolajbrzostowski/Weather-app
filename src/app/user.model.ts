export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: string,
    public firstName: string,
    public lastName: string,
    public country: string,
    public city: string
  ) {}

  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  getRole() {
    return this.role;
  }

  getEmail() {
    return this.email;
  }

  getFirstName() {
    return this.firstName;
  }
}
