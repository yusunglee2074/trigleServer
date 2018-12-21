const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    receiver: String,
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: String,
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    contents: String,
    paperId: String,
    envelopeId: String,
    numberOfWord: Number,
    missing: Boolean,
    likes: Number ,
    images: { type: Schema.Types.ObjectId, ref: 'Media' },
    videos: { type: Schema.Types.ObjectId, ref: 'Media' },
    createdAt: Date,
    willSendAt: Date 
})
let model = mongoose.model('Mail', mailSchema);
module.exports = { model, types: `
  type Mail {
    id: ID!
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
  }
  input MailCreateInput {
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
    willSendAt: String
  }
  input MailUpdateInput {
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
    willSendAt: String
  }
  `,
  queries: `
  mail(id: ID): Mail 
  mails: [Mail]
  `,
  mutations: `
  createMail(input: MailCreateInput) : Mail
  updateMail(id: ID, input: MailUpdateInput): Mail
  deleteMail(id: ID): Boolean
  `
}
