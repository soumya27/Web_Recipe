/**
 * Comments Model Class
 */
export class Comments {
  id: string;
  name: string;
  emailAddress: string;
  comment: string;
  rating: string;
  constructor(name: string, emailAddress: string, comment: string, rating: string){
    this.name = name;
    this.emailAddress = emailAddress;
    this.comment = comment;
    this.rating = rating;
  }
}
