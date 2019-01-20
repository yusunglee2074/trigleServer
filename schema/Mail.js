const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;
const {
  GraphQLDateTime
} = require('graphql-iso-date');
const moment = require('moment');

const mailSchema = new Schema({
  receiverAddressId: String,
  sender: String,
  senderId: String,
  content: String,
  paperId: String,
  envelopeId: String,
  likes: Number,
  images: String,
  video: String,
  price: Number,
  createdAt: Date,
  willSendAt: Date,
  isOffline: Boolean,
  isNormalPost: Boolean,
})

let model = mongoose.model('Mail', mailSchema);

const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType
const ExtraEnv = require('./ExtraEnv').model
const ExtraEnvType = require('./ExtraEnv').ExtraEnvType
const Address = require('./Address').model
const AddressType = require('./Address').AddressType

const MailType = new GraphQLObjectType({
  name: 'Mail',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    receiverAddressId: { 
      type: AddressType,
      resolve(parent, args) {
        return Address.findById(parent.receiverAddressId);
      }
    },
    sender: { type: GraphQLString, },
    content: { type: GraphQLString, },
    isNormalPost: { type: GraphQLBoolean, },
    isOffline: { type: GraphQLBoolean, },
    likes: { type: GraphQLInt, },
    price: { type: GraphQLInt, },
    senderId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
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
    video: {
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.video);
      }
    },
    willSendAt: { 
      type: GraphQLDateTime,
      resolve(parent, args) {
        return new Date(parent.willSendAt);
      }
    },
    createdAt: { 
      type: GraphQLDateTime,
      resolve(parent, args) {
        return new Date(parent.createdAt);
      }
    },
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
    args: {
      senderId: { type: GraphQLID },
      isOffline: { type: GraphQLBoolean },
    },
    resolve(root, args, req, ctx) {
      if (args.isOffline === false) {
        return model.aggregate([
          { $match: { isOffline: false } },
          { $addFields: { id: "$_id" } }
        ]);
      }
      return model.find({senderId: args.senderId});
    }
  }
}

const Mutation = {
  createMail: {
    type: MailType,
    args: {
      receiverAddressId: { type: GraphQLID, },
      sender: { type: GraphQLString, },
      content: { type: GraphQLString, },
      price: { type: GraphQLInt, },
      senderId: {
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
      video: {
        type: GraphQLID,
      },
      isOffline: { type: GraphQLBoolean },
      isNormalPost: { type: GraphQLBoolean },
    },
    resolve(root, args, req, ctx) {
      let willSendAt;
      if (args.isNormalPost) {
        willSendAt = moment().add(10, 'day')
        while (willSendAt.day() === 6 && willSendAt.day() === 0) {
          willSendAt.add(1, 'day');
        }
      }
      else {
        willSendAt = moment().add(4, 'day')
        while (willSendAt.day() === 6 && willSendAt.day() === 0) {
          willSendAt.add(1, 'day');
        }
      }
      args.createdAt = new Date().toISOString();
      args.likes = 0;
      args.willSendAt = willSendAt.toISOString();
      let mail = new model(args);
      return mail.save();
    }
  },
  updateMail: {
    type: MailType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID), },
      isOffline: { type: GraphQLBoolean },
      receiverAddressId: { type: GraphQLID, },
      sender: { type: GraphQLString, },
      content: { type: GraphQLString, },
      isNormalPost: { type: GraphQLBoolean, },
      likes: { type: GraphQLInt, },
      price: { type: GraphQLInt, },
      senderId: {
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
      video: {
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
