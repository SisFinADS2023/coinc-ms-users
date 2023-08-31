
export interface IUser {
  id: String
  name: String
  email: String
  address: {
    street: String
    number: Number
    zipcode: String
  }
}
