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
  profileImage: { type: Schema.Types.ObjectId, ref: 'Media' },
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
    profileImage: ID
    numberOfStamps: Int
  }
  input userUpdateInput {
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
    profileImage: ID
    numberOfStamps: Int
  }
  `,
  queries: `
  user(id: ID): User
  users: [User]
  `,
  mutations: `
  createUser(input: userCreateInput) : User
  updateUser(id: ID, input: userUpdateInput): User
  deleteUser(id: ID): Boolean
  `
}
