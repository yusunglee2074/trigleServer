const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const addressSchema = new Schema({
    userId: String,
    receiverName: String,
    receiverId: String,
    address1: String,
    address2: String,
    detailAddress: String,
    profileImage: String,
    numberOfSent: Number,
    numberOfReceived: Number,
    phoneNumber: String,
});
const model = mongoose.model('Address', addressSchema);


const Media = require('./Media').model
const MediaType = require('./Media').MediaType
const User = require('./User').model
const UserType = require('./User').UserType

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID), },
    userId: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    receiverId: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiverId);
      }
    },
    receiverName: { type: GraphQLString, },
    address1: { type: GraphQLString, },
    address2: { type: GraphQLString, },
    phoneNumber: { type: GraphQLString, },
    detailAddress: { type: GraphQLString, },
    profileImage: { 
      type: MediaType,
      resolve(parent, args) {
        return Media.findById(parent.profileImage);
      }
    },
    numberOfSent: { type: GraphQLInt, },
    numberOfReceived: { type: GraphQLInt, },
  }),
});

const Query = {
  address: {
    type: AddressType,
    args: {
      id: { type: GraphQLID },
      userId: { type: GraphQLID },
      receiverId: { type: GraphQLID },
    },
    resolve(root, args, req, ctx) {
      const where = {}
      if (args.userId) where.userId = args.userId;
      if (args.id) where._id = args.id;
      if (args.receiverId) where.receiverId = args.receiverId;
      return model.findOne(where);
    }
  },
  addresses: {
    type: new GraphQLList(AddressType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(root, args, req, ctx) {
      return model.find({ userId: args.userId });
    }
  }
}

const Mutation = {
  createAddress: {
    type: AddressType,
    args: {
      userId: { 
        type: GraphQLID,
      },
      receiverId: { 
        type: GraphQLID,
      },
      receiverName: { type: GraphQLString, },
      address1: { type: GraphQLString, },
      address2: { type: GraphQLString, },
      detailAddress: { type: GraphQLString, },
      profileImage: { 
        type: GraphQLID,
      },
      numberOfSent: { type: GraphQLInt, },
      numberOfReceived: { type: GraphQLInt, },
    },
    resolve(root, args, req, ctx) {
      let address = new model(args);
      return address.save();
    }
  },
  updateAddress: {
    type: AddressType,
    args: {
      id: { type: GraphQLID },
      receiverId: { 
        type: GraphQLID,
      },
      receiverName: { type: GraphQLString, },
      address1: { type: GraphQLString, },
      address2: { type: GraphQLString, },
      detailAddress: { type: GraphQLString, },
      profileImage: { 
        type: GraphQLID,
      },
      numberOfSent: { type: GraphQLInt, },
      numberOfReceived: { type: GraphQLInt, },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteAddress: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      receiverId: { type: new GraphQLNonNull(GraphQLID) },
    },
    async resolve(root, args, req, ctx) {
      if (await model.remove({ userId: args.userId, receiverId: args.receiverId })) return true;
      return false;
    }
  },
}

module.exports = { model, AddressType, Query, Mutation }
