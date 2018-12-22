const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const giftSchema = new Schema({
    senderId: String,
    receiverId: String,
    amount: Number,
    message: String,
    createdAt: Date,
});

let model = mongoose.model('Gift', giftSchema);

const User = require('./User').model
const UserType = require('./User').UserType

const GiftType = new GraphQLObjectType({
  name: 'Gift',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    amount: { type: GraphQLInt, },
    message: { type: GraphQLString, },
    senderId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId);
      }
    },
    receiverId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiverId);
      }
    },
    createdAt: { type: GraphQLString, },
  }),
});

const Query = {
  gift: {
    type: GiftType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  gifts: {
    type: new GraphQLList(GiftType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createGift: {
    type: GiftType,
    args: {
      amount: { type: GraphQLInt, },
      message: { type: GraphQLString, },
      senderId: {
        type: GraphQLID,
      },
      receiverId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let gift = new model(args);
      return gift.save();
    }
  },
  updateGift: {
    type: GiftType,
    args: {
      amount: { type: GraphQLInt, },
      message: { type: GraphQLString, },
      senderId: {
        type: GraphQLID,
      },
      receiverId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteGift: {
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

module.exports = { model, GiftType, Query, Mutation };
