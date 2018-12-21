const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    type: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    mailId: { type: Schema.Types.ObjectId, ref: 'Mail' },
    nickname: String,
    profileImage: { type: Schema.Types.ObjectId, ref: 'Media' },
    createdAt: Date,
});

let model = mongoose.model('Like', likeSchema);
module.exports = { model, types: `
  type Like {
    id: ID!
    type: String
    userId: User
    mailId: Mail
    nickname: String
    profileImage: Media
    createdAt: String
  }
  input LikeCreateInput {
    type: String
    userId: User
    mailId: Mail
    nickname: String
    profileImage: Media
  }
  input LikeUpdateInput {
    type: String
    userId: User
    mailId: Mail
    nickname: String
    profileImage: Media
  }
  `,
  queries: `
  like(id: ID): Like
  likes: [Like]
  `,
  mutations: `
  createLike(input: LikeCreateInput) : Like
  updateLike(id: ID, input: LikeUpdateInput): Like
  deleteLike(id: ID): Boolean
  `
}
