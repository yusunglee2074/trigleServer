const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;
const bcrypt = require('bcrypt');
const {
  GraphQLDateTime
} = require('graphql-iso-date');

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  nickname: String,
  age: Number,
  replyRate: Number,
  lastOnlinedAt: String,
  address1: String,
  address2: String,
  detailAddress: String,
  phoneNumber: String,
  gender: String,
  birthDay: String,
  profileImage: String,
  numberOfStamps: Number,
  createdAt: Date,
  updatedAt: Date,

  accessToken: String,
});
let model = mongoose.model('User', userSchema);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    email: { type: GraphQLString, },
    password: { type: GraphQLString, },
    name: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    age: { type: GraphQLInt, },
    replyRate: { type: GraphQLInt, },
    lastOnlinedAt: { type: GraphQLString, },
    gender: { type: GraphQLString, },
    address1: { type: GraphQLString, },
    address2: { type: GraphQLString, },
    detailAddress: { type: GraphQLString, },
    birthday: { type: GraphQLString, },
    profileImage: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.profileImage);
      }
    },
    numberOfStamps: { type: GraphQLInt, },

    accessToken: { type: GraphQLString, },
    updatedAt: { 
      type: GraphQLDateTime,
      resolve(parent, args) {
        return new Date(parent.updatedAt);
      }
    },
    createdAt: { 
      type: GraphQLDateTime,
      resolve(parent, args) {
        return new Date(parent.createdAt);
      }
    },
    keywords: { 
      type: new GraphQLList(UserKeywordType),
      resolve(parent, args) {
        return UserKeyword.find({ userId: parent.id });
      }
    },
  }),
});

const Query = {
  user: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  users: {
    type: new GraphQLList(UserType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  },
}

const Mutation = {
  createUser: {
    type: UserType,
    args: {
      email: { type: GraphQLString, },
      password: { type: GraphQLString, },
      profileImgIdx: { type: GraphQLString, },
    },
    async resolve(root, args, req, ctx) {
      let users = await model.find({ email: args.email });
      if (users.length) throw "email already exist";

      args.createdAt = new Date().toISOString();
      let media = await Media.findOne({ text: "users" + (Number(args.profileImgIdx) + 1) });
      args.profileImage = media.id;
      return bcrypt.hash(args.password, 10)
        .then(function(hash) {
          args.password = hash;
          args.accessToken = hash.slice(0, 10);
          user = new model(args);
          return user.save();
        })
        .catch(e => next(e));
    }
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
      email: { type: GraphQLString, },
      password: { type: GraphQLString, },
      name: { type: GraphQLString, },
      nickname: { type: GraphQLString, },
      age: { type: GraphQLInt, },
      replyRate: { type: GraphQLInt, },
      lastOnlinedAt: { type: GraphQLString, },
      gender: { type: GraphQLString, },
      birthday: { type: GraphQLString, },
      profileImage: { 
        type: GraphQLID,
      },
      address1: { type: GraphQLString, },
      address2: { type: GraphQLString, },
      detailAddress: { type: GraphQLString, },
      numberOfStamps: { type: GraphQLInt, },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      args.updatedAt = new Date().toISOString();
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteUser: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root, args, req, ctx) {
      if (await model.findByIdAndDelete(args.id)) return true;
      return false;
    }
  },
}

module.exports = { model, UserType, Query, Mutation };

const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const UserKeyword = require('./UserKeyword').model;
const UserKeywordType = require('./UserKeyword').UserKeywordType
