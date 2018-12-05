module.exports = { types: `
  type Mail {
    id: Int!
    receiver: String
    receiverId: User
    sender: String
    senderId: User
    contents: String
    paperId: String
    envelopeId: String
    numberOfWord: Int
    missing: Boolean
    likes: Int
    images: Media
    videos: Media
    createdAt: String
    willSendAt: String
  }`,
  queries: `
  `,
  mutations: `
  `
}
