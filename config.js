const express         = require('express');
const { graphqlHTTP } = require('express-graphql');
const fs              = require('fs');

const createApp = () => {
    const app = express();
    const db  = JSON.parse(fs.readFileSync("dump.json"))

    app.use(express.static('public'));

    app.use('/graphql', graphqlHTTP({
        schema    : require('./schema'),
        rootValue : require('./root')(db),
        graphiql  : true,
    }));

    process.on('SIGINT', () => {
        console.log('SIGINT - dumping data before exit')
        fs.writeFileSync('dump.json', JSON.stringify(db))

        process.exit()
    });

    return {app:app, db:db}
}; module.exports = createApp;