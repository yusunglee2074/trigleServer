const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const addressSchema = new Schema({
    receiverName: String,
    receiverId: String,
    address1: String,
    address2: String,
    detailAddress: String,
    profileImage: String,
    numberOfSent: Number,
    numberOfReceived: Number,
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
    receiverId: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiverId);
      }
    },
    receiverName: { type: GraphQLString, },
    address1: { type: GraphQLString, },
    address2: { type: GraphQLString, },
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
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  addresses: {
    type: new GraphQLList(AddressType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createAddress: {
    type: AddressType,
    args: {
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
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    async resolve(root, args, req, ctx) {
      if (await model.findByIdAndDelete(args.id)) return true;
      return false;
    }
  },
}

module.exports = { model, AddressType, Query, Mutation }
