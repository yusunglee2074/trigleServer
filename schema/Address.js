module.exports = { types: `
  type Address {
    id: Int!
    receiverName: String
    receiverId: User
    address1: String
    address2: String
    detailAddress: String
    profileImage: Media
    numberOfSent: Int
    numberOfReceived: Int
  }`,
  queries: `
  `,
  mutations: `
  `
}
