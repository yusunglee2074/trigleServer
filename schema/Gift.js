const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    message: String,
    createdAt: Date,
});

let model = mongoose.model('Gift', giftSchema);

module.exports = { model, types: `
  type Gift {
    id: ID!
    senderId: User
    receiverId: User
    amount: Int
    message: String
    createdAt: String
  }
  input GiftCreateInput {
    senderId: ID
    receiverId: ID
    amount: Int
    message: String
  }
  input GiftUpdateInput {
    senderId: ID
    receiverId: ID
    amount: Int
    message: String
  }
  `,
  queries: `
  gift(id: ID): Gift 
  gifts: [Gift]
  `,
  mutations: `
  createGift(input: GiftCreateInput) : Gift
  updateGift(id: ID, input: GiftUpdateInput): Gift
  deleteGift(id: ID): Boolean
  `
}
