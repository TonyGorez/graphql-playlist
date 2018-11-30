const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://admin:gor93ton@ds161780.mlab.com:61780/graphql-test')
mongoose.connection.once('open', () => {
    console.log('Connected to database !')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Listen on port 4000!')
})