const assert = require('assert');

const db = { actors: {}, markets: {} };

const market_func_defs = require('../src/market');
const market_funcs     = market_func_defs(db);
const actor_func_defs  = require('../src/actor');
const actor_funcs      = actor_func_defs(db);

describe('Market', () => {
    describe('insertMarket', () => {
        it('should insert the specified market', () => {
            const payload = {
                name     : "Test Market",
                listings : []
            }
            const returned = market_funcs.insertMarket({market:payload});

            assert.equal(db.markets[returned.id].name, payload.name);
            assert.equal(db.markets[returned.id].listings.length, payload.listings.length);
        });
    });

    describe('getMarket', () => {
        it('should get the specified market', () => {
            const payload = {
                name     : "Test Market",
                listings : []
            }
            const id       = market_funcs.insertMarket({market:payload}).id;
            const returned = market_funcs.getMarket({id:id});

            assert.equal(returned.name, payload.name);
            assert.equal(returned.listings.length, payload.listings.length);
        });
    });
})