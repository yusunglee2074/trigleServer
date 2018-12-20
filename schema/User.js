const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  loginId: String,
  password: String,
  name: String,
  nickname: String,
  age: Number,
  replyRate: Number,
  lastOnlinedAt: String,
  address1: String,
  address2: String,
  detailAddress: String,
  phoneNumber: String,
  gender: String,
  birthDay: String,
  profileImage: String,
  numberOfStamps: Number,
  createdAt: Date,
  updatedAt: Date,
});
let model = mongoose.model('User', userSchema);

module.exports = { 
  model,
  types: `
  type User {
    id: ID
    loginId: String
    password: String
    name: String
    nickname: String
    age: Int
    replyRate: Int
    lastOnlinedAt: String
    address1: String
    address2: String
    detailAddress: String
    phoneNumber: String
    gender: String
    birthDay: String
    profileImage: Media
    numberOfStamps: Int
    createdAt: String
    updatedAt: String
  }
  input userCreateInput {
    loginId: String
    profileImage: ID
    createdAt: String
  }
  `,
  queries: `
  user: User
  users: [User]
  `,
  mutations: `
  createUser(input: userCreateInput!) : User
  updateUser: User
  deleteUser: Boolean
  `
}
