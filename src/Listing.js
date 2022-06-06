const crypto           = require('crypto');
const actor_func_defs  = require('../src/actor');        

module.exports = data => { return {
    insertListing: ({listing}) => {
        const market = data.markets[listing.market_id];
        const lister = data.actors[listing.lister_id];
        const id     = crypto.randomBytes(20).toString('hex');

        if (!market)
            throw new Error(`Market ${market_id} does not exist`);
        if (!lister)
            throw new Error(`Market ${listing.lister_id} does not exist`);

        listing.id = id;

        const actor_funcs = actor_func_defs(data);
        actor_funcs.takeItem({actor_id:listing.lister_id, item:listing.give});

        data.listings[id] = listing;

        return listing;
    },

    removeListing: ({listing_id}) => {
        const listing = data.listings[listing_id];

        if (!listing)
            throw new Error(`Listing ${listing_id} does not exist`);

        const actor_funcs = actor_func_defs(data);
        actor_funcs.giveItem({actor_id:listing.lister_id, item:listing.give});

        data.listings[listing_id] = undefined;
    },

    completeListing: ({listing_id, completer_id}) => {
        const listing   = data.listings[listing_id];
        const completer = data.actors[completer_id];

        if (!listing)
            throw new Error(`Listing ${listing_id} does not exist`);
        if (!completer)
            throw new Error(`Market ${lister_id} does not exist`);

        const actor_funcs = actor_func_defs(data);
        actor_funcs.takeItem({actor_id:completer_id, item:listing.take});
        actor_funcs.giveItem({actor_id:completer_id, item:listing.give});
        actor_funcs.giveItem({actor_id:listing.lister_id, item:listing.take});

        data.listings[listing_id] = undefined;
    }
}};