const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;
const {
  GraphQLDateTime
} = require('graphql-iso-date');

const extraEnvSchema = new Schema({
    type: String,
    title: String,
    contents: String,
    userId: String,
    createdAt: Date,
    updatedAt: Date,
});

let model = mongoose.model('ExtraEnv', extraEnvSchema);

const User = require('./User').model
const UserType = require('./User').UserType

const ExtraEnvType = new GraphQLObjectType({
  name: 'ExtraEnv',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    type: { type: GraphQLString, },
    title: { type: GraphQLString, },
    content: { type: GraphQLString, },
    userId: {
      type: UserType,
      resolve(parent, args) {
        return Media.findById(parent.profileImage);
      }
    },
    updatedAt: { 
      type: GraphQLDateTime,
      resolve(parent, args) {
        return new Date(parent.updatedAt);
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
  extraEnv: {
    type: ExtraEnvType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  extraEnvs: {
    type: new GraphQLList(ExtraEnvType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createExtraEnv: {
    type: ExtraEnvType,
    args: {
      type: { type: GraphQLString, },
      title: { type: GraphQLString, },
      content: { type: GraphQLString, },
      userId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      args.createdAt = new Date().toISOString();
      let extraEnv = new model(args);
      return extraEnv.save();
    }
  },
  updateExtraEnv: {
    type: ExtraEnvType,
    args: {
      type: { type: GraphQLString, },
      title: { type: GraphQLString, },
      content: { type: GraphQLString, },
      userId: {
        type: GraphQLID,
      },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      args.updatedAt = new Date().toISOString();
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteExtraEnv: {
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

module.exports = { model, ExtraEnvType, Query, Mutation };
