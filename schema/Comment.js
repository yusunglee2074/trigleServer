const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    nickname: String,
    profileImage: { type: Schema.Types.ObjectId, ref: 'Media' },
    createdAt: Date,
    updatedAt: Date,
});

let model = mongoose.model('Comment', commentSchema);

module.exports = { model, types: `
  type Comment {
    id: ID!
    user: User
    content: String
    nickname: String
    profileImage: Media
    createdAt: String
    updatedAt: String
  }
  input commentCreateInput {
    user: ID
    content: String
    nickname: String
    profileImage: Media
    createdAt: String 
    updatedAt: String
  }
  input commentUpdateInput {
    user: ID
    content: String
    nickname: String
    profileImage: Media
    createdAt: String 
    updatedAt: String
  }`,
  queries: `
  comments: [Comment]
  comment(id: ID): Comment
  `,
  mutations: `
  createComment(input: commentCreateInput) : Comment
  updateComment(id: ID, input: commentUpdateInput): Comment
  deleteComment(id: ID): Boolean
  `
}
