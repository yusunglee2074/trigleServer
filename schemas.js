const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLList, } = require('graphql');
const { GiftType, LikeType, MailType, UserType, MediaType, OrderType, ExtraEnvType, KeywordType, AddressType, CommentType, UserKeywordsType, } = require('./tableSchemas');
const mongoose = require('mongoose');

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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return { id: 3, name: '이유성' };
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
