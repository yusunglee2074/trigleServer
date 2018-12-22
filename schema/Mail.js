const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const mailSchema = new Schema({
    receiver: String,
    receiverId: String,
    sender: String,
    senderId: String,
    content: String,
    paperId: String,
    envelopeId: String,
    numberOfWord: Number,
    missing: Boolean,
    likes: Number ,
    images: String,
    videos: String,
  price: Number,
    createdAt: Date,
    willSendAt: Date
})

let model = mongoose.model('Mail', mailSchema);

const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType
const ExtraEnv = require('./ExtraEnv').model
const ExtraEnvType = require('./ExtraEnv').ExtraEnvType

const MailType = new GraphQLObjectType({
  name: 'Mail',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    receiver: { type: GraphQLString, },
    sender: { type: GraphQLString, },
    content: { type: GraphQLString, },
    numberOfWord: { type: GraphQLInt, },
    missing: { type: GraphQLBoolean, },
    likes: { type: GraphQLInt, },
    price: { type: GraphQLInt, },
    senderId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
      }
    },
    receiverId: {
      type: User,
      resolve(parent, args) {
        return Media.findById(parent.receiverId);
      }
    },
    paperId: {
      type: ExtraEnvType,
      resolve(parent, args) {
        return ExtraEnv.findById(parent.paperId);
      }
    },
    envelopeId: {
      type: ExtraEnvType,
      resolve(parent, args) {
        return ExtraEnv.findById(parent.envelopeId);
      }
    },
    images: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.images);
      }
    },
    videos: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.videos);
      }
    },
    willSendAt: { type: GraphQLString, },
    createdAt: { type: GraphQLString, },
  }),
});

const Query = {
  mail: {
    type: MailType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  mails: {
    type: new GraphQLList(MailType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createMail: {
    type: MailType,
    args: {
      receiver: { type: GraphQLString, },
      sender: { type: GraphQLString, },
      content: { type: GraphQLString, },
      numberOfWord: { type: GraphQLInt, },
      missing: { type: GraphQLBoolean, },
      likes: { type: GraphQLInt, },
      price: { type: GraphQLInt, },
      senderId: {
        type: GraphQLID,
      },
      receiverId: {
        type: GraphQLID,
      },
      paperId: {
        type: GraphQLID,
      },
      envelopeId: {
        type: GraphQLID,
      },
      images: {
        type: GraphQLID,
      },
      videos: {
        type: GraphQLID,
      },
      willSendAt: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let mail = new model(args);
      return mail.save();
    }
  },
  updateMail: {
    type: MailType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID), },
      receiver: { type: GraphQLString, },
      sender: { type: GraphQLString, },
      content: { type: GraphQLString, },
      numberOfWord: { type: GraphQLInt, },
      missing: { type: GraphQLBoolean, },
      likes: { type: GraphQLInt, },
      price: { type: GraphQLInt, },
      senderId: {
        type: GraphQLID,
      },
      receiverId: {
        type: GraphQLID,
      },
      paperId: {
        type: GraphQLID,
      },
      envelopeId: {
        type: GraphQLID,
      },
      images: {
        type: GraphQLID,
      },
      videos: {
        type: GraphQLID,
      },
      willSendAt: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteMail: {
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

module.exports = { model, MailType, Query, Mutation };
