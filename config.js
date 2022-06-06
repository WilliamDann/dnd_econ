const express         = require('express');
const { graphqlHTTP } = require('express-graphql');

const createApp = () => {
    const app = express();
    const db  = { actors: {}, markets: {}, listings: {} }

    app.use(express.static('public'));

    app.use('/graphql', graphqlHTTP({
        schema    : require('./schema'),
        rootValue : require('./root')(db),
        graphiql  : true,
    }));

    return {app:app, db:db}
}; module.exports = createApp;