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

const mediaSchema = new Schema({
    url: String,
    text: String,
    createdAt: Date
});
const model = mongoose.model('Media', mediaSchema);

const MediaType = new GraphQLObjectType({
  name: 'Media',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    url: { type: GraphQLNonNull(GraphQLString), },
    text: { type: GraphQLString, },
    createdAt: { type: GraphQLString, },
  }),
});

const Query = {
  media: {
    type: MediaType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  medias: {
    type: new GraphQLList(MediaType),
    resolve(root, args, req, ctx) {
      return model.find({});
    }
  }
}

const Mutation = {
  createMedia: {
    type: MediaType,
    args: {
      url: { type: GraphQLString, },
      text: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
      let media = new model(args.input);
      return media.save();
    }
  },
  updateMedia: {
    type: MediaType,
    args: {
      url: { type: GraphQLString, },
      text: { type: GraphQLString, },
    },
    resolve(root, args, req, ctx) {
    return model.findByIdAndUpdate(args.id, args.input, { new: true });
    }
  },
  deleteMedia: {
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

module.exports = { model, MediaType, Query, Mutation };
