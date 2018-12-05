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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    age: { type: GraphQLInt },
    replyRate: { type: GraphQLInt },
    lastOnlinedAt: { type: GraphQLString },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    detailAddress: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    gender: { type: GraphQLString },
    birthDay: { type: GraphQLString },
    profileImage: { type: GraphQLID },
    numberOfStamps: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
});

const MailType = new GraphQLObjectType({
  name: 'Mail',
  fields: () => ({
    id: { type: GraphQLID },
    receiver: { type: GraphQLString },
    receiverId: { type: GraphQLID },
    sender: { type: GraphQLString },
    senderId: { type: GraphQLID },
    contents: { type: GraphQLString },
    paperId: { type: GraphQLString },
    envelopeId: { type: GraphQLString },
    numberOfWord: { type: GraphQLInt },
    missing: { type: GraphQLBoolean },
    likes: { type: GraphQLInt },
    images: { type: new GraphQLList(GraphQLID) },
    videos: { type: new GraphQLList(GraphQLID) },
    createdAt: { type: GraphQLString },
    willSendAt: { type: GraphQLString },
  })
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLID },
    receiverName: { type: GraphQLString },
    receiverId: { type: GraphQLID },
    address1: { type: GraphQLString },
    address2: { type: GraphQLString },
    detailAddress: { type: GraphQLString },
    profileImage: { type: GraphQLID },
    numberOfSent: { type: GraphQLInt },
    numberOfReceived: { type: GraphQLInt },
  })
});

const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    userId: { type: GraphQLID },
    mailId: { type: GraphQLID },
    nickname: { type: GraphQLString },
    profileImage: { type: GraphQLID },
    createdAt: { type: GraphQLString },
  })
});

const GiftType = new GraphQLObjectType({
  name: 'Gift',
  fields: () => ({
    id: { type: GraphQLID },
    senderId: { type: GraphQLID },
    receiverId: { type: GraphQLID },
    amount: { type: GraphQLInt },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    contents: { type: GraphQLString },
    nickname: { type: GraphQLString },
    profileImage: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
});

const ExtraEnvType = new GraphQLObjectType({
  name: 'ExtraEnv',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    title: { type: GraphQLString },
    contents: { type: GraphQLString },
    userId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
});

const MediaType = new GraphQLObjectType({
  name: 'Media',
  fields: () => ({
    id: { type: GraphQLID },
    url: { type: GraphQLString },
    text: { type: GraphQLText },
    createdAt: { type: GraphQLString },
  })
});

const KeywordType = new GraphQLObjectType({
  name: 'Keyword',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

const UserKeywordsType = new GraphQLObjectType({
  name: 'UserKeywords',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    keywordId: { type: GraphQLID },
  })
});

//TODO::오더 테이블h
const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLInt },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  })
});

module.exports = {
  GiftType,
  LikeType,
  MailType,
  UserType,
  MediaType,
  OrderType,
  ExtraEnvType,
  KeywordType,
  AddressType,
  CommentType,
  UserKeywordsType
}
