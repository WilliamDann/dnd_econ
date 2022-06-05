const express         = require('express');
const { graphqlHTTP } = require('express-graphql');

const createApp = () => {
    const app = express();

    app.use(express.static('public'));

    app.use('/graphql', graphqlHTTP({
        schema    : require('./schema'),
        rootValue : require('./root'),
        graphiql  : true,
    }));

    return {app:app, db:{}}
}; module.exports = createApp;