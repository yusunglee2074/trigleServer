const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const orderSchema = new Schema({
    userId: String,
    amount: Number,
    status: String,
    createdAt: Date,
});

let model = mongoose.model('Order', orderSchema);

const User = require('./User').model
const UserType = require('./User').UserType

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    amount: { type: GraphQLInt, },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    status: { type: GraphQLString, },
    createdAt: { type: GraphQLString, },
  }),
});

const Query = {
  order: {
    type: OrderType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  orders: {
    type: new GraphQLList(OrderType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createOrder: {
    type: OrderType,
    args: {
      amount: { type: GraphQLInt, },
      userId: {
        type: GraphQLID,
      },
      status: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let user = new model(args);
      return user.save();
    }
  },
  updateOrder: {
    type: OrderType,
    args: {
      amount: { type: GraphQLInt, },
      userId: {
        type: GraphQLID,
      },
      status: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteOrder: {
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

module.exports = { model, OrderType, Query, Mutation };
