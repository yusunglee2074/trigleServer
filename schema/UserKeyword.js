const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userKeywordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  keywordId: { type: Schema.Types.ObjectId, ref: 'Keyword' },
});
let model = mongoose.model('UserKeyword', userKeywordSchema);
module.exports = { model, types: `
  type UserKeyword {
    id: ID!
    userId: User
    keywordId: Keyword
  }
  input UserKeywordCreateInput {
    userId: ID
    keywordId: ID
  }
  input UserKeywordUpdateInput {
    userId: ID
    keywordId: ID
  }
  `,
  queries: `
  userKeyword(id: ID): UserKeyword
  userKeywords: [UserKeyword]
  `,
  mutations: `
  createUserKeyword(input: UserKeywordCreateInput) : UserKeyword
  updateUserKeyword(id: ID, input: UserKeywordUpdateInput): UserKeyword
  deleteUserKeyword(id: ID): Boolean
  `
}
