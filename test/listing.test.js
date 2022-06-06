const assert = require('assert');

const db = { actors: {}, markets: {}, listings: {} };

const listing_func_defs  = require('../src/listing');
const listing_funcs      = listing_func_defs(db);
const market_func_defs = require('../src/market');
const market_funcs     = market_func_defs(db);
const actor_func_defs  = require('../src/actor');
const actor_funcs      = actor_func_defs(db);

describe('Listing', () => {
    describe('insertListing', () => {
        it('should insert the listing', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ {name: "GP Coin",stack: 100} ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            assert.equal(db.listings[listing_id].lister_id, trader_id)
            assert.equal(db.listings[listing_id].market_id, market_id);
            ;
        });

        it('should take the "give" items from the lister', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ {name: "GP Coin",stack: 100} ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            assert.equal(db.actors[trader_id].inventory[0].stack, 90)
        });
    });

    describe('removeListing', () => {
        it('should remove the listing', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ {name: "GP Coin",stack: 100} ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            listing_funcs.removeListing({listing_id: listing_id});

            assert.equal(db.listings[listing_id], undefined)
        });

        it('should return the "give" items from the lister', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ {name: "GP Coin",stack: 100} ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            listing_funcs.removeListing({listing_id: listing_id})

            assert.equal(db.actors[trader_id].inventory[0].stack, 100)
        });
    });

    describe('completeListing', () => {
        it('should give the "take" items to the lister and the "give" items to the completer', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ {name: "GP Coin",stack: 100} ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            listing_funcs.completeListing({listing_id: listing_id, completer_id: buyer_id});

            assert.equal(db.actors[trader_id].inventory[1].stack, 1);
            assert.equal(db.actors[buyer_id].inventory[1].stack, 10);
        });

        it('should fail if the completer does not have enough items for the completion of the listing', () => {
            const trader_id = actor_funcs.insertActor({actor:{
                name      : "Test Trader",
                inventory : [ {name: "Grain 1lb", stack: 100} ]
            }}).id;
    
            const buyer_id = actor_funcs.insertActor({actor:{
                name      : "Test Buyer",
                inventory : [ ]
            }}).id;  
            
            const market_id = market_funcs.insertMarket({market: {
                name: "Test Market",
            }}).id;

            const listing_id = listing_funcs.insertListing({listing: {
                give: {name: "Grain 1lb", stack: 10},
                take: {name: "GP Coin", stack: 1},

                lister_id: trader_id,
                market_id: market_id,
            }}).id;

            assert.throws(() => listing_funcs.completeListing({listing_id: listing_id, completer_id: buyer_id}), Error)
        });
    });
});