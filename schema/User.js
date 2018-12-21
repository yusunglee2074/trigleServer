const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

const userSchema = new Schema({
  loginId: String,
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
});
let model = mongoose.model('User', userSchema);

const Media = require('./Media').model
const MediaType = require('./Media').MediaType

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    loginId: { type: GraphQLString, },
    password: { type: GraphQLString, },
    name: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    age: { type: GraphQLInt, },
    replyRate: { type: GraphQLInt, },
    lastOnlinedAt: { type: GraphQLString, },
    gender: { type: GraphQLString, },
    birthday: { type: GraphQLString, },
    profileImage: {
      type: MediaType,
      resolve(parent, args) {
        console.log(parent)
        return Media.findById(parent.profileImage);
      }
    },
    numberOfStamps: { type: GraphQLInt, },
    createdAt: { type: GraphQLString, },
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
  }
}

const Mutation = {
  createUser: {
    type: UserType,
    args: {
      loginId: { type: GraphQLString, },
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
      numberOfStamps: { type: GraphQLInt, },
    },
    resolve(root, args, req, ctx) {
      let user = new model(args);
      return user.save();
    }
  },
  updateUser: {
    type: UserType,
    args: {
      loginId: { type: GraphQLString, },
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
      numberOfStamps: { type: GraphQLInt, },
    },
    resolve(root, args, req, ctx) {
      return model.findByIdAndUpdate(args.id, args, { new: true });
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
