module.exports = { types: `
  type Address {
    id: Int!
    receiverName: String
    receiverId: ID
    address1: String
    address2: String
    detailAddress: String
    profileImage: ID
    numberOfSent: Int
    numberOfReceived: Int
  }
  input addressInput {
    receiverName: String
    receiverId: String
    address1: String
    address2: String
    detailAddress: String
    profileImage: String
  }
  `,
  queries: `
  getAddresses: [Address]
  getAddress(id: Int!): Address
  `,
  mutations: `
  createAddress(input: addressInput, id: Int): Address
  updateAddress(input: addressInput): Address
  deleteAddress(id: Int!): Boolean
  `
}
