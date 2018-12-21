const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    receiverName: String,
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    address1: String,
    address2: String,
    detailAddress: String,
    profileImage: { type: Schema.Types.ObjectId, ref: 'Media' },
    numberOfSent: Number,
    numberOfReceived: Number,
});

let model = mongoose.model('Address', addressSchema);

module.exports = { model, types: `
  type Address {
    id: ID!
    receiverName: String
    receiverId: User
    address1: String
    address2: String
    detailAddress: String
    profileImage: Media
    numberOfSent: Int
    numberOfReceived: Int
  }
  input addressCreateInput {
    receiverName: String
    receiverId: ID 
    address1: String
    address2: String
    detailAddress: String
    profileImage: ID
  }
  input addressUpdateInput {
    receiverName: String
    receiverId: ID 
    address1: String
    address2: String
    detailAddress: String
    profileImage: ID
  }
  `,
  queries: `
  addresses: [Address]
  address(id: ID!): Address
  `,
  mutations: `
  createAddress(input: addressCreateInput): Address
  updateAddress(input: addressUpdateInput, id: Int): Address
  deleteAddress(id: Int!): Boolean
  `
}
