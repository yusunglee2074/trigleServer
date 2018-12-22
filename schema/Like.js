const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const likeSchema = new Schema({
    type: String,
    userId: String,
    mailId: String,
    nickname: String,
    profileImage: String,
    createdAt: Date,
});

let model = mongoose.model('Like', likeSchema);

const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType
const Mail = require('./Mail').model
const MailType = require('./Mail').MailType

const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    type: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    mailId: {
      type: MailType,
      resolve(parent, args) {
        return Mail.findById(parent.mailId);
      }
    },
    profileImage: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.profileImage);
      }
    },
    createdAt: { type: GraphQLString, },
  }),
});

const Query = {
  like: {
    type: LikeType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  likes: {
    type: new GraphQLList(LikeType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createLike: {
    type: LikeType,
    args: {
      type: { type: GraphQLString, },
      nickname: { type: GraphQLString, },
      userId: {
        type: GraphQLID,
      },
      mailId: {
        type: GraphQLID,
      },
      profileImage: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let like = new model(args);
      return like.save();
    }
  },
  updateLike: {
    type: LikeType,
    args: {
      type: { type: GraphQLString, },
      nickname: { type: GraphQLString, },
      userId: {
        type: GraphQLID,
      },
      mailId: {
        type: GraphQLID,
      },
      profileImage: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteLike: {
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

module.exports = { model, LikeType, Query, Mutation };
