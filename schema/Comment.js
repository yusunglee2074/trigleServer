const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const commentSchema = new Schema({
    userId: String,
    content: String,
    nickname: String,
    profileImage: String,
    createdAt: Date,
    updatedAt: Date,
});

let model = mongoose.model('Comment', commentSchema);

const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    content: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    profileImage: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.profileImage);
      }
    },
    createdAt: { type: GraphQLString, },
    updatedAt: { type: GraphQLString, },
  }),
});

const Query = {
  comment: {
    type: CommentType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  comments: {
    type: new GraphQLList(CommentType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createComment: {
    type: CommentType,
    args: {
      userId: {
        type: GraphQLID
      },
      content: { type: GraphQLString, },
      nickname: { type: GraphQLString, },
      profileImage: {
        type: GraphQLID
      },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let comment = new model(args);
      return comment.save();
    }
  },
  updateComment: {
    type: CommentType,
    args: {
      userId: {
        type: GraphQLID
      },
      content: { type: GraphQLString, },
      nickname: { type: GraphQLString, },
      profileImage: {
        type: GraphQLID
      },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      args.updatedAt = new Date().toISOString();
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteComment: {
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

module.exports = { model, CommentType, Query, Mutation };
