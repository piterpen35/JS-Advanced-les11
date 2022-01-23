export class AuthorizeUser {
  firstName: string;
  lastName: string;
  userId: number;
  constructor(firstName: string, lastName: string, userId: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userId = userId;
  }
}
