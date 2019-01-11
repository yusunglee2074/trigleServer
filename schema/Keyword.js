const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const graphql = require('graphql');
const { GraphQLEnumType, GraphQLInterfaceType, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean } = graphql;

const keywordSchema = new Schema({
  name: String,
  isDefaultKeyword: Boolean,
  keyword: String,
});

let model = mongoose.model('Keyword', keywordSchema);

const KeywordType = new GraphQLObjectType({
  name: 'Keyword',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), },
    keyword: { type: GraphQLString, },
    isDefaultKeyword: { type: GraphQLBoolean, },
  }),
});

const Query = {
  keyword: {
    type: KeywordType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(root, args, req, ctx) {
      return model.findById(args.id);
    }
  },
  keywords: {
    type: new GraphQLList(KeywordType),
    args: {
      isDefaultKeyword: { type: GraphQLBoolean },
      keyword: { type: GraphQLString },
    },
    resolve(root, args, req, ctx) {
      const where = {};
      args.hasOwnProperty('isDefaultKeyword') ? where['isDefaultKeyword'] = args.isDefaultKeyword : null; 
      args.hasOwnProperty('keyword') ? where['keyword'] = new RegExp(args.keyword) : null; 
      return model.find(where);
    }
  }
}

const Mutation = {
  createKeyword: {
    type: KeywordType,
    args: {
      keyword: { type: GraphQLString, },
      isDefaultKeyword: { type: GraphQLBoolean, },
    },
    resolve(root, args, req, ctx) {
      let keyword = new model(args);
      return keyword.save();
    }
  },
  updateKeyword: {
    type: KeywordType,
    args: {
      id: { type: GraphQLID, },
      keyword: { type: GraphQLString, },
      isDefaultKeyword: { type: GraphQLBoolean, },
    },
    resolve(root, args, req, ctx) {
      let id = args.id;
      delete args.id;
      return model.findByIdAndUpdate(id, args, { new: true });
    }
  },
  deleteKeyword: {
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

module.exports = { model, KeywordType, Query, Mutation };
