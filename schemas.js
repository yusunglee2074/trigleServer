const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const {
  GiftType,
  LikeType,
  MailType,
  UserType,
  MediaType,
  OrderType,
  ExtraEnvType,
  KeywordType,
  AddressType,
  CommneType,
} = require('./tableSchemas');


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
