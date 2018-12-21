const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keywordSchema = new Schema({
    name: String
});

let model = mongoose.model('Keyword', keywordSchema);

module.exports = { model, types: `
  type Keyword {
    id: Int!
    name: String
  }
  input KeywordCreateInput {
    name: String
  }
  input KeywordUpdateInput {
    name: String
  }
  `,
  queries: `
  keyword(id: ID): Keyword
  keywords: [Keyword]
  `,
  mutations: `
  createKeyword(input: KeywordCreateInput) : Keyword
  updateKeyword(id: ID, input: KeywordUpdateInput): Keyword 
  deleteKeyword(id: ID): Boolean
  `
}
