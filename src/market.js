const crypto          = require('crypto');
const actor_func_defs = require('./actor'); 

module.exports = data => { return {
    insertMarket: ({market}) => {
        const id = crypto.randomBytes(20).toString('hex');
        market.id = id;

        data.markets[id] = market;

        return market;
    },

    getMarket: ({id}) => {
        return data.markets[id];
    },
}}