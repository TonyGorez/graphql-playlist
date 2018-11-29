const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql
const _ = require('lodash');

const fakeBooks = [
    { name: 'Data Structures', id: '1', genre: 'Computer Science'},
    { name: 'Algorithms', id: '2', genre: 'Computer Science'},
    { name: 'ReactJs', id: '3', genre: 'Computer Science'},
    { name: 'Angular', id: '4', genre: 'Computer Science'}
]

const fakeAuhtors = [
    { name: 'Eric Elliot', age: 54, id: '1'},
    { name: 'Dan Abramov', age: 12, id: '2'},
    { name: 'Bill Gates', age: 35, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLInt }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(fakeBooks, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return _.find(fakeAuhtors, { id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});