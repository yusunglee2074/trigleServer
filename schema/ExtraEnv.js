const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const extraEnvSchema = new Schema({
    type: String,
    title: String,
    contents: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date,
    updatedAt: Date,
});

let model = mongoose.model('ExtraEnv', extraEnvSchema);

module.exports = { model, types: `
  type ExtraEnv {
    id: Int!
    type: String
    title: String
    contents: String
    userId: User
    createdAt: String
    updatedAt: String
  }
  input extraEnvCreateInput {
    type: String
    title: String
    contents: String
    userId: ID
    updatedAt: String
  }
  input extraEnvUpdateInput {
    type: String
    title: String
    contents: String
    userId: ID
    updatedAt: String
  }
  `,
  queries: `
  extraEnv(id: ID): ExtraEnv 
  extraEnvs: [ExtraEnv]
  `,
  mutations: `
  createExtraEnv(input: extraEnvCreateInput) : ExtraEnv
  updateExtraEnv(id: ID, input: extraEnvUpdateInput):ExtraEnv 
  deleteExtraEnv(id: ID): Boolean
  `
}
