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

const addressSchema = new Schema({
    receiverName: String,
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    address1: String,
    address2: String,
    detailAddress: String,
    profileImage: { type: Schema.Types.ObjectId, ref: 'Media' },
    numberOfSent: Number,
    numberOfReceived: Number,
});
let model = mongoose.model('Address', addressSchema);

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID), },
    receiverName: { type: GraphQLNonNull(GraphQLString), },
    // receiverId: { type: UserType, },
    receiverId: { type: GraphQLNonNull(GraphQLString), },
    address1: { type: GraphQLNonNull(GraphQLString), },
    address2: { type: GraphQLNonNull(GraphQLString), },
    detailAddress: { type: GraphQLNonNull(GraphQLString), },
    // profileImage: { type: MediaType, },
    profileImage: { type: GraphQLNonNull(GraphQLString), },
    numberOfSent: { type: GraphQLNonNull(GraphQLInt), },
    numberOfReceived: { type: GraphQLNonNull(GraphQLInt), },
  }),
});

const Query = {
  address: {
    type: AddressType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      console.log("첫번째")
    }
  },
  addresses: {
    type: new GraphQLList(AddressType),
    resolve(root, args, req, ctx) {
      console.log("두번째")
    }
  }
}

const Mutation = {
  createAddress: {
    type: AddressType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      console.log("첫번째")
    }
  },
  updateAddress: {
    type: AddressType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      console.log("첫번째")
    }
  },
  deleteAddress: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      console.log("뮤테이션")
    }
  },
}

module.exports = { model, AddressType, Query, Mutation }
