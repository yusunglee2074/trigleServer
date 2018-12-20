const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    url: String,
    text: String,
    createdAt: String
});
let model = mongoose.model('Media', mediaSchema);

module.exports = { model, types: `
  type Media {
    id: ID
    url: String
    text: String
    createdAt: String
  }
  input mediaCreateInput {
    url: String!
    text: String
  }
  input mediaUpdateInput {
    url: String!
    text: String
  }
  `,
  queries: `
  media(id: ID): Media
  medias: [Media]
  `,
  mutations: `
  createMedia(input: mediaCreateInput!): Media
  updateMedia(id: ID!, input: mediaUpdateInput!): Media
  deleteMedia(id: ID!): Boolean
  `
}
