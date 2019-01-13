const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const userKeywordSchema = new Schema({
  userId: { type: String },
  keywordId: { type: String },
});
let model = mongoose.model('UserKeyword', userKeywordSchema);

const User = require('./User').model
const UserType = require('./User').UserType
const Keyword = require('./Keyword').model
const KeywordType = require('./Keyword').KeywordType

const UserKeywordType = new GraphQLObjectType({
  name: 'UserKeyword',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    keywordId: {
      type: KeywordType,
      resolve(parent, args) {
        return Keyword.findById(parent.keywordId);
      }
    },
  }),
});

const Query = {
  userKeyword: {
    type: UserKeywordType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  userKeywords: {
    type: new GraphQLList(UserKeywordType),
    args: {
      userId: { type: GraphQLID }
    },
    resolve(root, args, req, ctx) {
      const where = args.userId ? { userId: args.userId } : {};
      return model.find(where);
    }
  }
}

const Mutation = {
  createUserKeyword: {
    type: UserKeywordType,
    args: {
      userId: {
        type: GraphQLID,
      },
      keywordId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      let userKeyword = new model(args);
      return userKeyword.save();
    }
  },
  updateUserKeyword: {
    type: UserKeywordType,
    args: {
      id: { type: GraphQLID },
      userId: {
        type: GraphQLID,
      },
      keywordId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteUserKeyword: {
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

module.exports = { model, UserKeywordType, Query, Mutation };
