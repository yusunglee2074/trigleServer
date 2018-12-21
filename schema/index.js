const { buildSchema, graphql, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLBoolean, GraphQLList, } = require('graphql');
const fs = require('fs');


let queryFields = {}
let mutationFields = {}

// 현재 폴더내의 모든 파일들을 긁어 mutation과 query를 하나의 object로 합침
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach((file) => {
    let tempQuery = require('./' + file).Query;
    let tempMutation = require('./' + file).Mutation;
    for (let key in tempQuery) {
      queryFields[key] = tempQuery[key];
    }
    for (let key in tempMutation) {
      mutationFields[key] = tempMutation[key];
    }
  })

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: queryFields
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutationFields
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation })
