const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const likeSchema = new Schema({
    type: String,
    userId: String,
    mailId: String,
    createdAt: Date,
});

let model = mongoose.model('Like', likeSchema);


const LikeType = new GraphQLObjectType({
  name: 'Like',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    type: { type: GraphQLString, },
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
  togleLike: {
    type: GraphQLBoolean,
    args: {
      userId: {
        type: GraphQLID,
      },
      mailId: {
        type: GraphQLID,
      },
    },
    async resolve(root, args, req, ctx) {
      let mail = await model.find({userId: args.userId, mailId: args.mailId});
      if (mail.length) {
        await model.findByIdAndDelete(mail[0].id)
        return false;
      } else {
        args.createdAt = new Date().toISOString();
        let like = new model(args);
        like.save()
        return true;
      }
    }
  },
  updateLike: {
    type: LikeType,
    args: {
      type: { type: GraphQLString, },
      userId: {
        type: GraphQLID,
      },
      mailId: {
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
const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType
const Mail = require('./Mail').model
const MailType = require('./Mail').MailType
