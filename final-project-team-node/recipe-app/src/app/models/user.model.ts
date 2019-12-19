/** My User Model */
export class User{
    id: string;
    username: string;
    password: string;
    name: string;
    gender: string;
    token?: string;
    constructor(username: string, password: string,name: string,gender: string) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.gender = gender;
  }
}
