const { buildSchema, graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLList, } = require('graphql');
const mongoose = require('mongoose');

// TODO: fs모듈 이용해서 줄일것
const Address = require('./Address');
const User = require('./User');
const Keyword = require('./Keyword');
const Comments = require('./Comment');
const ExtraEnv = require('./ExtraEnv');
const Gift = require('./Gift');
const Like = require('./Like');
const Mail = require('./Mail');
const Media = require('./Media');
const Order = require('./Order');
const UserKeyword = require('./UserKeyword');

const schemas = [Address, User, Keyword, Comments, ExtraEnv, Gift, Like, Mail, Media, Order, UserKeyword];

// db connection
const dbConfig = {
  dev: {
    name: 'dev',
    host: '10.10.100.24:27017/trigle-dev'
  },
  production: {
    name: 'production',
  }
}
const dbConnection = dbConfig.dev
// const dbConnection = dbConfig.production

mongoose.connect('mongodb://' + dbConnection.host, { useNewUrlParser: true });
if (mongoose.connection.readyState ==! 2) {
  throw Error("DB is not connected");
} else {
  console.log("DB is connected to \"" + dbConnection.name + "\"");
};


const types = [];
const queries = [];
const mutations = [];


schemas.forEach((s) => {
  types.push(s.types);
  queries.push(s.queries);
  mutations.push(s.mutations);
});


module.exports = buildSchema(`
  ${types.join('\n')}
  type Query {
    temp: String
    ${queries.join('\n')}
  }
  type Mutation {
    temp: String
    ${mutations.join('\n')}
  }
  type Subscription {
    temp: String
  }
`);
